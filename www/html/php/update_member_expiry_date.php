<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $result = $db->updateMemberExpiryDate($_POST['user_id'], $_POST['date']);

  echo json_encode(array('status' => 200, 'value' => 'OK'));
