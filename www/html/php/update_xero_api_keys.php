<?php
  include './db_handler.php';
  $db = new DB_Handler();

  $db->updateXeroAPIKeys($_SESSION['chamber'], $_POST['consumer_key'], $_POST['consumer_secret']);
  echo json_encode(array('status' => 200, 'value' => 'OK'));
?>
