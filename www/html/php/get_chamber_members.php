<?php
include 'db_handler.php';

$db = new DB_Handler();
$response = array('status' => 500, 'value' => 'Error: Something went wrong.');
$chamber_members = $db->getChamberMembers($_SESSION['chamber']);
if ($chamber_members)
  $response = array('status' => 200, 'value' => $chamber_members);

echo json_encode($response);
