<?php
include 'db_handler.php';
include 'mailchimp_handler.php';

$db = new DB_Handler();
$details = $_POST['details'];
$results = '';

// if the email address has changed update the mail list
$newEmail = $oldEmail = $db->getMemberEmail($_POST['memberID']);
forEach( $details as $detail) {
  if ($detail[1]['columnname'] == 'email')
    $newEmail = $detail[1]['value'];
}
if ($oldEmail != $newEmail) {
  // Check if mailchimp is setup
  $apiKey = $db->getMailChimpAPIKey($_SESSION['chamber']);
  if ($apiKey) {
    try {
      $mailchimp = new MailChimp_Handler($apiKey);
      $groups = $db->getMembersGroups($_POST['memberID']);
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
        echo json_encode(true);
      } else {
        echo json_encode($errors);
      }
    } catch (Exception $e) {
      echo json_encode($e);
    }
  }
}

$businessID = $db->getBusinessID($_POST['memberID']);

// Update the standard details
foreach ($details as $detail) {
  if (!preg_match('/BUSINESS_/', $detail[1]['tablename'])) {
    $results = $db->setDetail($_POST['memberID'], $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
  }
  else {
    if ($detail[1]['value'] != '')
      $results = $db->setChamberSpecificDetail($_POST['memberID'], $detail[1]['DataID'], $businessID, $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
  }
}

if($results) {
  $db->addNote($_SESSION['user'], $_POST['memberID'], 'Modified member\'s details.');
}


?>
