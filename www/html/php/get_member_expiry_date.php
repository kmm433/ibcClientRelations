<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $resonse = array('status' => 500, 'value' => 'Error: Something went wrong.');

  $result = $db->getMemberExpiryDate($_POST['user_id']);
  if ($result)
    $response =array('status' => 200, 'value' => $result['expiry']);

  echo json_encode($response);
