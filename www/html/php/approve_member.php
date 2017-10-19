<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $response = array('status' => 200, 'value' => 'Error: Something went wrong');
  if ($db->approveMember($_POST['user_id'])) {
    $response = array('status' => 200, 'value' => 'OK');
    // $_SESSION[userid] is the name of the member making the change
    $db->addNote($_SESSION['userid'], $_POST['user_id'], 'Approved Member.');
  }

  echo json_encode($response);
