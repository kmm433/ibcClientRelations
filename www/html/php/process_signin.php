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
  $_SESSION['userid'] = $db->getUserID($user);
  $_SESSION['businessid'] = $db->getBusinessID($_SESSION['userid']);
  echo $_SESSION['chamber'];
  if (isset($_SESSION['survey'])) {
      header('Location: ../index.php?survey='.$_SESSION['survey']);
  }
  elseif (isset($_SESSION['event'])) {
      header('Location: ../index.php?event='.$_SESSION['event']);
  }else {
     header('Location: ../index.php');
  }
} else {
  header('Location: ../signin.php?status=invalid');
}

?>
