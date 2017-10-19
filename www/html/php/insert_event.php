<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $title = $_POST['title'];
      $content = $_POST['content'];
      $sDate = $_POST['sDate'];
      $eDate = $_POST['eDate'];
      $location = $_POST['location'];
      $link = $_POST['link'];

      $postChamber = $_POST['postChamber'];
      $postChild = $_POST['postChild'];
      $groups = (isset($_POST['groups']) ? $_POST['groups'] : null);
      $business = (isset($_POST['business']) ? $_POST['business'] : null);


      $ID = $db->insert_event($title,$content,$sDate,$eDate,$location,$link,false,NULL);        // insert_event will add the event to DB and return the new ID

      if ($postChamber == "on"){
          // Add to my Chamber
          $res1 = $db->insert_eventLookup($ID, NULL, $_SESSION['chamber'], NULL, NULL,false);
      }
      if ($postChild == "on"){
          $res2 = $db->get_Child_Chambers($_SESSION['chamber']);                                      // Get a list of all child chambers
          $db->insert_event($title,$content,$sDate,$eDate,$location,$link,true,$ID);                  // OPTIONALLY add event
          foreach ($res2 as $childID){
              $db->insert_eventLookup($ID, NULL, $childID['chamberID'], NULL, NULL,true);             // OPTIONALLY add lookup with childID
          }
      }
      foreach((array)$groups as $group){
          $res3 = $db->insert_eventLookup($ID, NULL, NULL, NULL, $group,false);
      }
      foreach((array)$business as $bus){
          $res4 = $db->insert_eventLookup($ID, NULL, NULL, $bus, NULL,false);
      }

      echo json_encode($ID);
  }
  else {
      echo json_encode(false);
  }
?>
