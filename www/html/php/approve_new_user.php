<?php
include 'db_handler.php';
$db = new DB_Handler();

if(isset($_SESSION['user'])){
    $userid = $_POST["userid"];
    $results = $db->approveUser($userid);

    echo json_encode($results);
}
else {
    echo json_encode(false);
}
?>
