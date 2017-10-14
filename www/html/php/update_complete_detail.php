<?php
include 'db_handler.php';
include 'mailchimp_handler.php';

$db = new DB_Handler();
$detail = $_POST['detail'];
$results = null;
$emailSynced = false;

// If this detail is an email address
if ($detail[1]['columnname'] == 'email') {
  // if the email address has changed update the mail list
  $newEmail = $oldEmail = $db->getMemberEmail($_POST['member_id']);
    $newEmail = $detail[1]['value'];
  if ($oldEmail != $newEmail) {
    // Check if mailchimp is setup
    $apiKey = $db->getMailChimpAPIKey($_SESSION['chamber']);
    if ($apiKey) {
      try {
        $mailchimp = new MailChimp_Handler($apiKey);
        $groups = $db->getMembersGroups($_POST['member_id']);
        $errors = array();
        forEach( $groups as $group) {
          $listID = $db->getMailListID($group['groupID']);
          if ($listID) {
            $result = $mailchimp->updateEmailAddress($listID, $oldEmail, $newEmail);
            if ($result['status'] != 200) {
              array_push($errors, $result['value']);
            }
          }
        }
        if (empty($errors)) {
          $emailSynced = true;
        } else {
          $emailSynced  = json_encode(array('status' => 500, 'value' => $errors));
        }
      } catch (Exception $e) {
        $emailSynced = json_encode(array('status' => 500, 'value' => $e));
      }
    }
  }
}

// Check if there is a business registered to this user, if not create one (it can be empty)
$businessID = $db->getBusinessID($_POST['member_id']);
if (!$businessID) {
  $businessID = $db->createEmptyBusiness($_SESSION['chamber'], $_POST['member_id']);
}

// Update the standard details
if (!preg_match('/BUSINESS_/', $detail[1]['tablename']) && $detail[1]['disabled'] == 'false') {
  $results = $db->setDetail($_POST['member_id'], $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
}
else {
  if ($detail[1]['value'] != '')
  $results = $db->setChamberSpecificDetail($_POST['member_id'], $detail[1]['DataID'], $businessID, $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
}

echo json_encode(array('status' => 200, 'value' => array('email_syncronized' => $emailSynced)));

?>
