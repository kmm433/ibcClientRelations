<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['user'])){
        $userid = $_POST['userid'];
        $amount = $_POST['amount'];
        $results = $db->approvePayment($userid, $amount, 'CURRENT_TIMESTAMP()');

        echo json_encode($results);
    }
    else {
        echo json_encode(false);
    }
?>
