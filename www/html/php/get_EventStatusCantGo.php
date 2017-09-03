<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $EventID = $_POST["EventID"];
  $results = $db->get_EventStatusCantGo($EventID);
  echo json_encode($results);
?>
