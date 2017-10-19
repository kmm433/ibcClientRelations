<?php
include 'db_handler.php';
$db = new DB_Handler();

if(isset($_SESSION['user'])){
    $chamber = $_POST["chamber"];

    $results = $db->disableChamber($chamber);
    $results = $db->removeParent($chamber);

    echo json_encode($results);
}
else {
    echo json_encode(false);
}

?>
