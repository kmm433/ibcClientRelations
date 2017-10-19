<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  if(isset($_SESSION['user'])){
      $resonse = array('status' => 500, 'value' => 'Error: Something went wrong.');

      $result = $db->getMemberExpiryDate($_POST['user_id']);
      if ($result)
        $response =array('status' => 200, 'value' => $result['expiry']);

      echo json_encode($response);
  }
  else {
      echo json_encode(false);
  }
