<?php
include 'db_handler.php';

$db = new DB_Handler();

if(isset($_SESSION['user'])){
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
}
else {
    echo json_encode(false);
}
?>
