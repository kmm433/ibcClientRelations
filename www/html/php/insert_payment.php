<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $userid = $_POST['userid'];
    $membershipID = $_POST['membershipID'];
    $amount = $_POST['amount'];

    $results = $db->insertPayment($userid, $membershipID, $amount, 'NOW()');

    echo json_encode($results);

?>
