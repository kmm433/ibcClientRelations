<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $postChamber = $_POST['postChamber'];
  $groups = (isset($_POST['groups']) ? $_POST['groups'] : null);
  $business = (isset($_POST['business']) ? $_POST['business'] : null);

  if ($postChamber == "on"){
      // Pull all chambers emails
      $result = $db->get_Chamber_Emails($_SESSION['chamber']);
  }
  else {
    // Add each Groups emails
    $res1 = array();
    foreach((array)$groups as $group){
        $res = $db->get_Group_Emails($group);
        $res1 = array_merge($res1,$res);
    }
    // Add each Businesses emails
    $res2 = array();
    foreach((array)$business as $bus){
        $res = $db->get_Business_Emails($bus);
        $res2 = array_merge($res2,$res);
    }
    $result = array_unique(array_merge($res1,$res2), SORT_REGULAR);
  }

  echo json_encode($result);
?>
