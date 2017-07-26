<?php
include 'db_handler.php';

$db = new DB_Handler();
$user_details = $db->getUserData('test@gmail.com');
echo json_encode($user_details);
?>
