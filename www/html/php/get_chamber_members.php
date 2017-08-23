<?php
include 'db_handler.php';

$db = new DB_Handler();
$chamber_members = $db->getChamberMembers($_SESSION['chamber']);
echo json_encode($chamber_members);
?>
