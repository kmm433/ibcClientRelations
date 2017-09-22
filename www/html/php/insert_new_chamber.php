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

$options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
$password = password_hash($password, PASSWORD_BCRYPT, $options);


$id = $db->insertBusiness("INSERT INTO CHAMBER (ABN, parent_id, name)
                            VALUES($abn, '$parentID', '$name')");

$results = $db->insertUser("INSERT INTO USER (email, password, type, chamberID, businessID, firstname, lastname)
                                VALUES('$email', '$password', 1, $id, 100000, '$firstname', '$lastname');");
$optionaltable = "OPTIONALFIELDS_";
$optionaltable .= $id;

$businesstable = "BUSINESS_";
$businesstable .= $id;

$db->justExecute("CREATE TABLE $optionaltable LIKE OPTIONALFIELDS_666");
$db->justExecute("CREATE TABLE $businesstable LIKE BUSINESS_666");


echo json_encode($results);

?>
