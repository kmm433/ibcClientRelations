<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $EventID = $_POST['EventID'];

      $result = $db->get_EventGoing($EventID);
      echo json_encode($result);
  }
  else {
      echo json_encode(false);
  }
?>
