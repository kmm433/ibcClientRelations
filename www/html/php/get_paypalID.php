<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $mode = $_POST['mode'];
      $results = null;
      $chamber = null;

      isset($_POST['chamber']) ? $chamber = $_POST['chamber'] : $chamber = $_SESSION['chamber'];

      switch ($mode) {
        case "RETRIEVE":
            $results = $db->getClientID($chamber);
            break;
        case "ADD":
            $results = $db->addClientID($chamber, $_POST['id']);
            break;
        case "REMOVE":
            $results = $db->removeClientID($chamber);
            break;
        default:
            $results = "error";
    }

    echo json_encode($results);
  }
  else {
      echo json_encode("error");
  }

?>
