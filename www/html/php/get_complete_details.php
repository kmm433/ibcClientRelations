<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->getCompleteMemberDetails($_POST['member']);
  if($result)
    echo json_encode($result['0']);
?>
