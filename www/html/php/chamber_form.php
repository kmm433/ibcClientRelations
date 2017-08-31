<?php
include 'db_handler.php';

$db = new DB_Handler();
$test = $_POST["test"];
$results = $db->getFields("SELECT displayname, columnname, inputtype, tablename FROM MANDATORYFIELD where chamberID=1");

echo json_encode($results);

?>
