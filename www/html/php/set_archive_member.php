<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->setArchiveMember($_POST['memberID'], $_POST['archive_status']);
  if ($result){
    if ($_POST['archive_status'] == '0')
      $db->addNote($_SESSION['user'], $_POST['memberID'], 'Unarchived Member.');
    else
      $db->addNote($_SESSION['user'], $_POST['memberID'], 'Archived Member.');
  }
  if($result)
    echo json_encode('Successfully changed archive status');
  else
    echo json_encode('Error: Unable to change archive status.');
?>
