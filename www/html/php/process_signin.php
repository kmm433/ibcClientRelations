<?php
session_start();
include 'db_handler.php';
include '../../inc/dbinfo.inc';

// Verifies the provided credentials with the database and saves the session
$db = new DB_Handler(DB_HOST, DB_NAME, DB_USER, DB_PASS);
$email = $_POST['email'];
$password = $_POST['password'];

$user = $db->validateUser($email, $password);
if($user) {
  $_SESSION['user'] = $user;
  header('Location: ../index.php');
} else {
  header('Location: ../signin.php?status=invalid');
}

?>
