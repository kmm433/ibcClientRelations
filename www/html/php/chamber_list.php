<?php
include 'db_handler.php';

$db = new DB_Handler();
$results = $db->getList("SELECT name FROM CHAMBER");

echo json_encode($results);

?>
