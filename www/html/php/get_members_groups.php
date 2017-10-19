<?php
include 'db_handler.php';

$db = new DB_Handler();
if(isset($_SESSION['user'])){
    $groups = $db->getMembersGroups($_POST['memberID']);
    echo json_encode($groups);
}
else {
    echo json_encode(false);
}
?>
