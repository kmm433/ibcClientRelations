<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $chamber = $_SESSION['chamber'];

  $approval = $db->countUser("select approval from APPROVAL where chamberID=$chamber");
  $result1 = $db->countUser("select paypal from CHAMBERPAYPAL where chamberID=$chamber");
  $result2 = $db->countUser("select count(*) from MEMBERSHIPS where chamberID = $chamber and disabled = 0");

  $live = true;
  if(empty($result1) || $result1 == null){
      $live=false;
  }
  if(($approval  == 1) && ($result2 != 0)){
      $live=true;
  }

  if ($live == true){
       $result = $db->justExecute("UPDATE CHAMBER SET live = 1 where chamberID=$chamber");
  }
  else{
       $result = $db->justExecute("UPDATE CHAMBER SET live = 0 where chamberID=$chamber");
  }

  echo json_encode($result1);
?>
