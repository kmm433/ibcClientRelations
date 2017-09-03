<?php
include 'db_handler.php';
$db = new DB_Handler();

$displayname = $_POST["displayname"];
$columnname = $_POST["displayname"];
$inputtype = $_POST["inputtype"];
$mandatory = $_POST["mandatory"];
$tablename = "OPTIONALFIELDS_";
$tablename .= $_SESSION['chamber'];
$minimum = $_POST["minimum"];
$maximum = $_POST["maximum"];

$db->insertUser("INSERT INTO $tablename (displayname, columnname, inputtype, mandatory, tablename, minimum, maximum)
            VALUES('$displayname', '$columnname', '$inputtype','$mandatory', '$tablename', '$minimum', '$maximum')");

echo json_encode($tablename);
?>
