<?php
include 'db_handler.php';

$db = new DB_Handler();
$email = $_POST["email"];
$results = $db->countUser("SELECT * FROM USER where email='$email'");

echo json_encode($result)

//if($results != "0")
//    echo json_encode(false); /*if user already exists then return false*/
//else
//    echo json_encode(true); /*if user doesn't exists then return true*/

?>
