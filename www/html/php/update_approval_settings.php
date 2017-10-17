<?php
include 'db_handler.php';
$db = new DB_Handler();

$chamber = $_SESSION['chamber'];
$approval = $_POST['approval'];
$results = $db->updateApproval($chamber, $approval);

echo json_encode($results);

?>
