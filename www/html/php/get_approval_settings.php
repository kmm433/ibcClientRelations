<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['chamber'])){
        $chamber = $_SESSION['chamber'];
    }
    else {
        $chamber = $_POST['chamber'];
    }
    $results = $db->getApproval($chamber);

echo json_encode($results);

?>
