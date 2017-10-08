<?php
include 'db_handler.php';
include 'mailchimp_handler.php';

$db = new DB_Handler();
$apiKey = $db->getMailChimpAPIKey($_SESSION['chamber']);
$valid = false;
if ($apiKey != NULL) {
  $mailchimp = new MailChimp_Handler($apiKey);
  // Get all of the lists that exist for the registered API group
  $mailLists = $mailchimp->getMailLists();
  if (array_key_exists('status', $mailLists) && $mailLists['status'] == 200) {
    forEach ( $mailLists['value'] as $list ) {
      if ($list->id == $_POST['list_id'])
        $valid = true;
    }
    if ($valid) {
      if ($db->updateMailChimpListID($_POST['group_id'], $_POST['list_id'])) {
        // Remove all of the emails currently on the Mail list
        $members = $mailchimp->getListMembers($_POST['list_id']);
        if (array_key_exists('status', $members) && $members['status'] == 200 ) {
          forEach( $members['value'] as $member ) {
            $mailchimp->removeFromEmailList($_POST['list_id'], $member->email_address);
          }
          // Add the group members to the mail group.
          $groupMembers = $db->getGroupsMembers($_POST['group_id']);
          $addedMembers = array();
          forEach( $groupMembers as $member ) {
            $res = $mailchimp->addToMailList($_POST['list_id'], $member['email']);
            if ($res['status'] != 200)
              array_push($addedMembers, array($member['email'], $res['value']));
          }
          echo json_encode(array('status' => 200, 'value' => $addedMembers));
        } elseif (array_key_exists('status', $members)) {
          echo json_encode(array('status' => $members['status'], 'value' => $members['value']));
        } else {
          echo json_encode(array('status' => 500, 'value' => 'Error: Something went wrong.'));
        }
      } else {
        echo json_encode(array('status' => 500, 'value' => 'Error: Something went wrong.'));
      }
    } else{
      echo json_encode(array('status' => 500, 'value' => 'Error: The ListID could not be found.'));
    }
  } elseif (array_key_exists('value', $mailLists)) {
    echo json_encode(array('status' => $mailLists['status'], 'value' => $mailLists['value']));
  } else {
    echo json_encode(array('status' => 500, 'value' => 'Error: Something went wrong.'));
  }
} else {
  echo json_encode(array('status' => 500, 'value' => 'Error: The API key has not yet been provided.'));
}
?>
