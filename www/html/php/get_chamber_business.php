<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->get_chamber_business();
  if($result)
    echo json_encode($result);
?>
