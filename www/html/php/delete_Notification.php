<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $notifID = $_POST['notifID'];

  $result = $db->delete_Notification($notifID, $_SESSION['chamber']);
  echo json_encode($result);
?>
