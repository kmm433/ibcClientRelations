<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $table = "OPTIONALFIELDS_";
    $table .= $_SESSION['chamber'];

    $tablename = "BUSINESS_";
    $tablename .= $_SESSION['chamber'];

    $name = $_POST['name'];

    $results = $db->justExecute("UPDATE $table SET disabled=0 WHERE displayname = '$name'");

    echo json_encode($_POST['name']);
?>
