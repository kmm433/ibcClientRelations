<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['user'])){
        $addressid = $_POST["addressid"];
        $postalid = $_POST["postalid"];

        $results = $db->getAddress($addressid);
        $results1 = $db->getAddress($postalid);

        $addresses = array('address' => $results, 'postal' => $results1);
        echo json_encode($addresses);
    }
    else {
        echo json_encode(false);
    }

?>
