<?php
session_start();
include 'db_handler.php';

// Verifies the provided credentials with the database and saves the session
$db = new DB_Handler();
$email = $_POST['email'];
$password = $_POST['password'];

$user = $db->validateUser($email, $password);
if($user) {
  $_SESSION['user'] = $user;
  $_SESSION['chamber'] = $db->getChamber($user);
  echo $_SESSION['chamber'];
  header('Location: ../index.php');
} else {
  header('Location: ../signin.php?status=invalid');
}

?>
