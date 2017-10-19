<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
        $EventID = $_POST['EventID'];
        $EventTitle = $_POST['EventTitle'];
        $Event = $_POST['Event'];
        $EventDate = $_POST['EventDate'];
        $endTime = $_POST['endTime'];
        $Location = $_POST['Location'];
        $EventURL = $_POST['EventURL'];

        $result = $db->modify_Event($EventID,$EventTitle,$Event,$EventDate,$endTime,$Location,$EventURL);
        echo json_encode($result);
  }
  else {
      echo json_encode(false);
  }

?>
