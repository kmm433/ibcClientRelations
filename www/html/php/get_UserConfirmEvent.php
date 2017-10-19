<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $EventID = $_POST['EventID'];

      $results = $db->get_UserConfirmEvent($EventID);
      echo json_encode($results);
  }
  else {
      echo json_encode(false);
  }
?>
