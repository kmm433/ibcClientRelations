<?php
include 'db_handler.php';
include 'mailchimp_handler.php';

$db = new DB_Handler();

$groupID = $db->checkIfExistingGroup($_SESSION['chamber'], $_POST['group']);

if(!$groupID){
  $groupID = $db->createGroup($_SESSION['chamber'], $_POST['group']);
}
$result = $db->addMemberToGroup($_POST['memberID'], $groupID['groupID']);

$apiKey = $db->getMailChimpAPIKey($_SESSION['chamber']);
if ($apiKey) {
  try {
    $mailchimp = new MailChimp_Handler($apiKey);
    $listID = $db->getMailListID($groupID['groupID']);
    if ($listID) {
      $mailchimp->addToMailList($listID, $db->getMemberEmail($_POST['memberID']));
    }
  } catch(Exception $e) {
    echo json_encode($e);
  }
}

echo json_encode($result);
?>
