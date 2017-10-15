<?php
include 'db_handler.php';
$db = new DB_Handler();

$chamber = $_SESSION['chamber'];
$results = $db->getAllChamberInfo($chamber);
echo json_encode($results)
?>
