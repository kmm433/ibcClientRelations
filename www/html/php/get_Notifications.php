<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $results = $db->get_Notifications();
      echo json_encode($results);
  }
  else {
      echo json_encode(false);
  }
?>
