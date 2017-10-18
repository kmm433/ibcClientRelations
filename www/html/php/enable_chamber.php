<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $chamber = $_POST["chamber"];

    $results = $db->enableChamber($chamber);
    //$results = $db->addParent($chamber);

    echo json_encode($results);

?>
