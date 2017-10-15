<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $eventID = $_POST['eventID'];

  $result = $db->delete_Event($eventID, $_SESSION['chamber']);
  echo json_encode($result);
?>
