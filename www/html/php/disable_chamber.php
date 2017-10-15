<?php
include 'db_handler.php';
$db = new DB_Handler();

$chamber = $_POST["chamber"];

$results = $db->disableChamber($chamber);
$results = $db->removeParent($chamber);

echo json_encode($results);

?>
