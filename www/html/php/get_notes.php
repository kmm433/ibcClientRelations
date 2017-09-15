<?php
include 'db_handler.php';

$db = new DB_Handler();
$result = $db->getNotes($_POST['member']);

if ($result)
  echo json_encode($result);
else
  echo json_encode(array());
?>
