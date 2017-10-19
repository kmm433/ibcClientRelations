<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $result = $db->deleteGroups($_POST['group_ids']);
      if($result)
        echo json_encode('Successfully deleted groups');
      else
        echo json_encode('Error: Unable to delete groups');
  }
  else {
      echo json_encode(false);
  }

?>
