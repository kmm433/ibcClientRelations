<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $result = $db->setArchiveMember($_POST['member'], $_POST['archive_status']);
  if ($result){
    if ($_POST['archive_status'] == '0')
      $db->addNote($_SESSION['user'], $_POST['member'], 'Unarchived Member');
    else
      $db->addNote($_SESSION['user'], $_POST['member'], 'Archived Member');
  }
  if($result)
    echo json_encode('Successfully changed archive status');
  else
    echo json_encode('Error: Unable to change archive status.');
?>
