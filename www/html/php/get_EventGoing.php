<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $EventID = $_POST['EventID'];

  $result = $db->get_EventGoing($EventID);
  echo json_encode($result);
?>
