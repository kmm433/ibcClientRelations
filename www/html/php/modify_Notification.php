<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $notifID = $_POST['notifID'];
  $title = $_POST['title'];
  $message = $_POST['message'];

  $result = $db->modify_Notification($notifID,$title,$message);
  echo json_encode($result);
?>
