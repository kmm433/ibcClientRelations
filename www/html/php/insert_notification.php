<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $title = $_POST['title'];
  $content = $_POST['content'];
  //$postChamber = $_POST['postChamber'];
  //$postChild = $_POST['postChild'];
  //$groups = $_POST['groups'];
  //$business = $_POST['business'];

  $results = $db->insert_notification($title,$content);
  echo json_encode($results);
?>
