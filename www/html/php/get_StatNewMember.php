<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->get_StatNewMember();
  echo json_encode($result);
?>
