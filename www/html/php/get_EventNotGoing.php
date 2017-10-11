<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $EventID = $_POST['EventID'];

  $result = $db->get_EventNotGoing($EventID);
  echo json_encode($result);
?>
