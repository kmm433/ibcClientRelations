<?php
include 'db_handler.php';

//get active chambers
$db = new DB_Handler();

$mode = $_POST["mode"];
$results = $db->getChamberList($mode);

echo json_encode($results);

?>
