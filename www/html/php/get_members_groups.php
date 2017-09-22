<?php
include 'db_handler.php';

$db = new DB_Handler();
$groups = $db->getMembersGroups($_POST['memberID']);
echo json_encode($groups);
?>
