<?php
include 'db_handler.php';

$response = array('status' => 500, 'value' => 'Error: Something went wrong.');

$db = new DB_Handler();
$policy = $db->getRenewalPolicy($_SESSION['chamber']);
if ($policy)
  $response = array('status' => 200, 'value' => $policy);
echo json_encode($response);
?>
