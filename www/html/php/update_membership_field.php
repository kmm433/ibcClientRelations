<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $name = $_POST['name'];
    $info = $_POST['info'];
    $amount = $_POST['amount'];
    $membershipID = $_POST['membershipID'];
    $chamber = $_SESSION['chamber'];

    $results = $db->updateMembership($membershipID, $name, $info, $amount);

    echo json_encode($results);
?>
