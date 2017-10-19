<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $response = array('status' => 500, 'value' => 'Error: Something went wrong.');

  if($_SESSION['user']) {
    $result = $db->getBusinessAddresses($_POST['user_id']);
    if($result)
      $response = array('status' => 200, 'value' => $result);
    echo json_encode($response);
  }
  else {
    echo json_encode($response);
  }

?>
