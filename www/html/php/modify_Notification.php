<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $notifID = $_POST['notifID'];
      $title = $_POST['title'];
      $message = $_POST['message'];

      $result = $db->modify_Notification($notifID,$title,$message);
      echo json_encode($result);
  }
  else {
      echo json_encode(false);
  }

?>
