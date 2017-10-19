<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['user'])){
        $chamber = $_POST["chamber"];

        $results = $db->enableChamber($chamber);
        //$results = $db->addParent($chamber);

        echo json_encode($results);
    }
    else {
        echo json_encode(false);
    }
?>
