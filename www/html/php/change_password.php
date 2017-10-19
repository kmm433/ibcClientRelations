<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $response = array('status' => 500, 'value' => 'Error: Something went wrong.');

      $result = $db->changePassword($_POST['user_id'], $_POST['current_password'], $_POST['new_password']);
      if($result == 'success')
        $response = array('status' => 200, 'value' => 'OK');
      elseif ($result == 'unauthorized')
        $response = array('status' => 401, 'value' => 'unauthorized');
      echo json_encode($response);
  }
  else {
      echo json_encode(false);
  }
?>
