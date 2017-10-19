<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['user'])){
        $addressid = $_POST["addressid"];
        $postalid = $_POST["postalid"];

        $results = $db->getAddress($addressid);
        $results1 = $db->getAddress($postalid);

        array_push($results, $results1);
        echo json_encode($results);
    }
    else {
        echo json_encode(false);
    }

?>
