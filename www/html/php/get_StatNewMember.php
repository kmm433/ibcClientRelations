<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $result = $db->get_StatNewMember();
      echo json_encode($result);
  }
  else {
      echo json_encode(false);
  }

?>
