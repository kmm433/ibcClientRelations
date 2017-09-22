<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $inserttable = "OPTIONALFIELDS_";
    $inserttable .= $_SESSION['chamber'];

    $tablename = "BUSINESS_";
    $tablename .= $_SESSION['chamber'];

    $results = $db->updateField($inserttable, $_POST['name'], $_POST['optional'], $_POST['type'], $tablename, $_POST['minimum'], $_POST['maximum'], $_POST['DataID']);

    echo json_encode($results);
?>
