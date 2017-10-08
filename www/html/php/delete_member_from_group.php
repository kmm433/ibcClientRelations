<?php
include 'db_handler.php';

$db = new DB_Handler();
$groupID = $db->checkIfExistingGroup($_SESSION['chamber'], $_POST['group']);
if($groupID) {
  $result = $db->deleteMemberFromGroup($_POST['memberID'], $groupID['groupID']);
  echo json_encode($result);
}
?>
