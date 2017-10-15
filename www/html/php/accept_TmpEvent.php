<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $eventID = $_POST['eventID'];

  $db->reject_TmpEvent($eventID, $_SESSION['chamber']);             // remove tmp lookup reference
  $result = $db->insert_eventLookup($eventID,NULL,$_SESSION['chamber'],NULL,NULL,false);

  echo json_encode($result);
?>
