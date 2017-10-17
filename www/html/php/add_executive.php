<?php
include 'db_handler.php';
$db = new DB_Handler();

$email = $_POST["email"];
$password = $_POST["password"];
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$jobtitle = $_POST["jobtitle"];
$chamber = $_POST["chamber"];

$results =  $db->insertUser($email, $password, null, $chamber, $firstname, $lastname, null, $jobtitle, 1);

echo json_encode($results);
?>
