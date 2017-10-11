<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $eventID = $_POST['eventID'];
  $result = $db->reject_TmpEvent($eventID, $_SESSION['chamber']);

  echo json_encode($result);
?>
