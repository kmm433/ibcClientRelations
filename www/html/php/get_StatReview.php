<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->get_StatReview();
  echo json_encode($result);
?>
