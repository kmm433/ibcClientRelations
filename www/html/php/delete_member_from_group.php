<?php
include 'db_handler.php';
include 'mailchimp_handler.php';

$db = new DB_Handler();
$groupID = $db->checkIfExistingGroup($_SESSION['chamber'], $_POST['group']);
if($groupID) {
  $result = $db->deleteMemberFromGroup($_POST['memberID'], $groupID['groupID']);
  if ( $result ) {
    $apiKey = $db->getMailChimpAPIKey($_SESSION['chamber']);
    if ($apiKey) {
      try {
        $mailchimp = new MailChimp_Handler( $apiKey );
        $listID = $db->getMailListID($groupID['groupID']);
        if ($listID) {
          $mailchimp->removeFromEmailList($listID, $db->getMemberEmail($_POST['memberID']));
        }
      } catch ( Exception $e ) {
        echo json_encode($e);
      }
    }
  }
  echo json_encode($result);
}
?>
