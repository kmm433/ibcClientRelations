<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $userid = $_POST['userid'];
    $amount = $_POST['amount'];
    $expiry = $_POST['expiry'];
    $results = $db->approvePayment($userid, $amount, $expiry);
    $results2= $db->updateUserExpiry($userid, $expiry);


    echo json_encode($results2);

?>
