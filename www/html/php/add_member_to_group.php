<?php
include 'db_handler.php';

$db = new DB_Handler();
$groupID = $db->checkIfExistingGroup($_SESSION['chamber'], $_POST['group']);

if(!$groupID){
  $groupID = $db->createGroup($_SESSION['chamber'], $_POST['group']);
}
$result = $db->addMemberToGroup($_POST['member'], $groupID['groupID']);
echo json_encode($result);
?>
