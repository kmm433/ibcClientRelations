<?php
include "db_handler.php";
$db = new DB_Handler();
$token = str_replace('/', '', $_POST['token']);
$password = $_POST['password'];
$confirmPassword = $_POST['confirm_password'];

if($password != $confirmPassword) {
  header('Location: /reset_password.php?status=passwords&token='.$token);
  exit();
}
$status = $db->resetPassword($token, $password);
if ($status == 'success') {
  header('Location: /reset_password.php?status=success');
}
else {
  header('Location: /reset_password.php?status=invalid');
}

exit();
