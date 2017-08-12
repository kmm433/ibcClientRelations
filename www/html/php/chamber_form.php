<?php
include 'db_handler.php';

$db = new DB_Handler();
$test = $_POST["test"];
$results = $db->getList("SELECT chamberID, name FROM CHAMBER");

echo json_encode($results);

?>
