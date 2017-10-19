<?php
include 'db_handler.php';

$db = new DB_Handler();

if(isset($_SESSION['user'])){
    $email = $_POST["email"];
    $results = $db->countUserEmail($email);
    echo json_encode($results);
}
else {
    echo json_encode(false);
}
?>
