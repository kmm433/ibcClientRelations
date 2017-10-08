<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $notifID = $_POST['notifID'];

  $db->reject_TmpNotifications($notifID, $_SESSION['chamber']);             // remove tmp lookup reference
  $result = $db->insert_notificationLookup($notifID, NULL, $_SESSION['chamber'], NULL, NULL,false);

  echo json_encode($result);
?>
