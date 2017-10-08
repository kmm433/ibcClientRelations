<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->deleteGroups($_SESSION['chamber'], $_POST['groupNames']);
  if($result)
    echo json_encode('Successfully deleted groups');
  else
    echo json_encode('Error: Unable to delete groups');
?>
