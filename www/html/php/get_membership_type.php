<?php
include 'db_handler.php';

$db = new DB_Handler();

$chamber = $_SESSION['chamber'];
$results = $db->getFields("SELECT type, expiry_date FROM PAYMENTTYPES where chamberID=$chamber");

echo json_encode($results);
?>
