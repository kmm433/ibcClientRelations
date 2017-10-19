<?php

    include 'db_handler.php';
    $db = new DB_Handler();

    $addressid = $_POST["addressid"];
    $postalid = $_POST["postalid"];

    $results = $db->getAddress($addressid);
    $results1 = $db->getAddress($postalid);

    $address = array( 'address' => $results, 'postal' => $results1);


    echo json_encode($address);

?>
