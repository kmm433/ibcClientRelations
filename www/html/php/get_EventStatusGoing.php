<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $EventID = $_POST["EventID"];

      $going = $db->get_EventStatusGoing($EventID);
      $notGoing = $db->get_EventStatusCantGo($EventID);

      echo json_encode(array($going, $notGoing));
  }
  else {
      echo json_encode(false);
  }
?>
