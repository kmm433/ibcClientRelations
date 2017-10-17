<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $name = $_POST['name'];
    $chamber = $_SESSION['chamber'];
    $able = $_POST['able'];
    //will enable if able is 0 and disable if able is 1
    $results = $db->enableSignupField($chamber, $name, $able);

    echo json_encode($results);
?>
