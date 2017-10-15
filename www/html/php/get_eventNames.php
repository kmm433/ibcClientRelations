<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $EventID = $_POST['EventID'];

  $attending = $db->get_EventNamesAttending($EventID);
  $notgoing = $db->get_EventNamesNotGoing($EventID);

  echo json_encode(array($attending,$notgoing));
?>
