<?php
include 'db_handler.php';

$db = new DB_Handler();
if(isset($_SESSION['user'])){
    $result = $db->getNotes($_POST['memberID']);

    if ($result)
      echo json_encode($result);
    else
      echo json_encode(array());
}
else {
    echo json_encode(false);
}
?>
