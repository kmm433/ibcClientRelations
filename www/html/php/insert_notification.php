<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $title = $_POST['title'];
  $content = $_POST['content'];
  $postChamber = $_POST['postChamber'];
  $postChild = $_POST['postChild'];
  $groups = (isset($_POST['groups']) ? $_POST['groups'] : null);
  $business = (isset($_POST['business']) ? $_POST['business'] : null);

  $ID = $db->insert_notification($title,$content,false);        // insert_notification will add the notification to DB and return the new ID

  if ($postChamber == "on"){
      // Add to my Chamber
      $res1 = $db->insert_notificationLookup($ID, NULL, $_SESSION['chamber'], NULL, NULL,false);
  }
  if ($postChild == "on"){
      $res2 = $db->get_Child_Chambers($_SESSION['chamber']);                                  // Get a list of all child chambers
      $newID = $db->insert_notification($title,$content,true);                                // OPTIONALLY add notification
      foreach ($res2 as $childID){
          $db->insert_notificationLookup($newID, NULL, $childID['chamberID'], NULL, NULL,true);            // OPTIONALLY add lookup with childID
      }
  }
  foreach((array)$groups as $group){
      $res3 = $db->insert_notificationLookup($ID, NULL, NULL, NULL, $group,false);
  }
  foreach((array)$business as $bus){
      $res4 = $db->insert_notificationLookup($ID, NULL, NULL, $bus, NULL,false);
  }

  echo json_encode($ID);
?>
