<?php
include 'db_handler.php';

    $db = new DB_Handler();

    $userID = $_POST['userID'];
    $ids = $db->getIds($userID);

    echo json_encode($ids);
?>
