<?php
include 'db_handler.php';
$db = new DB_Handler();

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$abn = $_POST["abn"];
$line1 = $_POST["line1"];
$line2 = $_POST["line2"];
$city = $_POST["city"];
$postcode = $_POST["postcode"];
$state = $_POST["state"];
$country = $_POST["country"];
$parentID = $_POST["parentID"];


$id = $db->insertBusiness("INSERT INTO CHAMBER (ABN, parent_id, name)
                            VALUES($abn, '$parentID', '$name')");

$results = $db->insertUser("INSERT INTO USER (email, password, type, chamberID, firstname, lastname)
                                VALUES('$email', '$password', 1, $id, '$firstname', '$lastname');");


echo json_encode($results);

?>
