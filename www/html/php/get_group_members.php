<?php
include 'db_handler.php';

$db = new DB_Handler();
$groups = $_POST['groups'];
$allMembers = array();
foreach($groups as $group) {
  $members = $db->getGroupsMembers($group);
  foreach($members as $member) {
    array_push($allMembers, $member['email']);
  }
}
$uniqueMembers = array_values(array_unique($allMembers));
echo json_encode($uniqueMembers);
?>
