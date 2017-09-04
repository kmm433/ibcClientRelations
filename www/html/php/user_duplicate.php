<?php
include 'db_handler.php';

$db = new DB_Handler();
$email = $_POST["email"];
$results = $db->countUser("SELECT COUNT(*) FROM USER where email='$email'");

echo json_encode($results);
?>
