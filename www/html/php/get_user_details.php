<?php
include 'db_handler.php';

session_start();

$db = new DB_Handler();
$user_details = $db->getUserData($_SESSION['user']);
echo json_encode($user_details);
?>
