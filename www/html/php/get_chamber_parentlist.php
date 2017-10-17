<?php
include 'db_handler.php';
$db = new DB_Handler();

$mode = $_POST['mode'];
$results = $db->chamberParentList($mode);

echo json_encode($results);

?>
