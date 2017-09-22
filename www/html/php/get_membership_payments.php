<?php
include 'db_handler.php';

$db = new DB_Handler();
$chamber = $_SESSION['chamber'];
$results = $db->getFields("SELECT * FROM MEMBERSHIPS");

echo json_encode($results);
?>
