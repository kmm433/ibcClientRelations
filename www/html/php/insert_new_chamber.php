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


BEGIN;
INSERT INTO CHAMBER (ABN, parent_id, name) VALUES($abn, '$parentID', '$name');
SELECT @chamber := 'chamberID' from CHAMBER where name = '$name';
INSERT INTO USER (email, password, type, chamberID, firstname, lastname) VALUES('$email', '$password', 1, @chamber, '$firstname', '$lastname');
INSERT INTO ADDRESS (line1, line2, city, postcode, state, chamberID) VALUES('$line1', '$line2', '$city', $postcode, '$state', @chamber);
SELECT @chamber := 'chamberID' from CHAMBER where name = '$name';
COMMIT;

$results = $db->getList("SELECT chamberID, name FROM CHAMBER where parent_id=1");

echo json_encode($results);

?>
