<?php
    include 'db_handler.php';
    $db = new DB_Handler();


    $result = $db->insertNewMembership($_POST['name'], $_POST['info'], $_POST['amount']);

    echo json_encode($ordering);
?>
