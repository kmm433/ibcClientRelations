<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $result = $db->updateChamber($_SESSION['chamber'], $_POST['name'], $_POST['abn'], $_POST['businessphone'], $_POST['mobilephone'],$_POST['anziccode'],$_POST['website'],$_POST['chamberemail']);


    if ($result)
      echo json_encode('Success');
    else
      echo json_encode('Error');
?>
