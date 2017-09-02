<?php
require 'db_handler.php';

$db = new DB_Handler();
$id = isset($_GET['id']) ? $_GET['id'] : $_SESSION['business'];
$business = $db->getBusinessProfile($id);

echo json_encode($business);
