<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['user'])){
        $result = $db->updateMemberExpiryDate($_POST['user_id'], $_POST['date']);
        $db->insert_StatReview();

        echo json_encode(array('status' => 200, 'value' => 'OK'));
    }
    else {
        echo json_encode(false);
    }
