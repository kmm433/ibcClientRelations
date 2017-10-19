<?php

    include 'db_handler.php';
    $db = new DB_Handler();

    $addressid = $_POST["addressid"];
    $postalid = $_POST["postalid"];

    $results = $db->getAddress($addressid);
    $results1 = $db->getAddress($postalid);

    array_push($results, $results1);


    echo json_encode($results);

?>
