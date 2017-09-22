<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $title = $_POST['title'];
  $content = $_POST['content'];
  
  $results = $db->insert_notification($title,$content);
  echo json_encode($results);

?>
