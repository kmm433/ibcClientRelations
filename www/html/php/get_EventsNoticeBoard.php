<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $results = $db->get_EventsNoticeBoard();
  echo json_encode($results);
?>