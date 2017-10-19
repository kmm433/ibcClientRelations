<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
  $result = $db->updateMemberType($_POST['user_id'], $_POST['user_type']);
  if ($result)
    $response = array('status' => 200, 'value' => 'OK');
  echo json_encode($response);
