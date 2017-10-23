<?php
  include 'db_handler.php';
  $db = new DB_Handler();

if(isset($_SESSION['user'])){
    $oldChamber = $_POST['oldChamber'];
    $newChamber = $_POST['newChamber'];

    $result=$db->mergeChambers($oldChamber, $newChamber);

    echo json_encode($result);
}
else {
    echo json_encode(false);
}

?>
