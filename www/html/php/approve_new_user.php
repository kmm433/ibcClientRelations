<?php
include 'db_handler.php';

$db = new DB_Handler();
$userid = $_POST["userid"];
$results = $db->approveUser($userid);

echo json_encode($results);
?>
