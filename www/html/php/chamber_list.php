<?php
include 'db_handler.php';

$db = new DB_Handler();

if(isset($_SESSION['user'])){
    $results = $db->getList("SELECT chamberID, name FROM CHAMBER ORDER BY name DESC");
    echo json_encode($results);
}
else {
    echo json_encode(false);
}
?>
