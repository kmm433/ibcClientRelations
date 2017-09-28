<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $inserttable = "OPTIONALFIELDS_";
    $inserttable .= $_SESSION['chamber'];

    $tablename = "BUSINESS_";
    $tablename .= $_SESSION['chamber'];

    $ordering = $db->getMaximum("SELECT MAX(ordering)+1 FROM $inserttable");
    if($ordering == null){
        $ordering = 30;
    }

    $result = $db->insertNewField($inserttable, $_POST['name'], $_POST['optional'], $_POST['type'], $tablename, $_POST['minimum'], $_POST['maximum'], $ordering);

    echo json_encode($ordering);
?>
