<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->getGroups($_SESSION['chamber']);
  if($result)
    echo json_encode($result);
?>
