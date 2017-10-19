<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $title = $_POST['title'];
      $questions = (isset($_POST['questions']) ? $_POST['questions'] : null);
      $answers = (isset($_POST['answers']) ? $_POST['answers'] : null);

      $postChamber = $_POST['postChamber'];
      $postChild = $_POST['postChild'];
      $groups = (isset($_POST['groups']) ? $_POST['groups'] : null);
      $business = (isset($_POST['business']) ? $_POST['business'] : null);

      $ID = $db->insert_Survey($title,false,NULL);        // insert_survey will add the event to DB and return the new ID
      foreach((array)$questions as $q){
            $db->insert_surveyQuestion($ID,$q["questionNo"],$q["question"],$q["answerType"]);
      }
      foreach((array)$answers as $a){
            $db->insert_surveyAnswer($ID, $a["questionNo"], $a["answer"]);
      }

      if ($postChamber == "on"){
          // Add to my Chamber
          $res1 = $db->insert_SurveyLookup($ID, NULL, $_SESSION['chamber'], NULL, NULL,false);
      }
      if ($postChild == "on"){
          $res2 = $db->get_Child_Chambers($_SESSION['chamber']);                                      // Get a list of all child chambers
          $db->insert_Survey($title,true,$ID);                                                        // OPTIONALLY add Survey
          foreach ($res2 as $childID){
              $db->insert_SurveyLookup($ID, NULL, $childID['chamberID'], NULL, NULL,true);            // OPTIONALLY add lookup with childID
          }
      }
      foreach((array)$groups as $group){
          $res3 = $db->insert_SurveyLookup($ID, NULL, NULL, NULL, $group,false);
      }
      foreach((array)$business as $bus){
          $res4 = $db->insert_SurveyLookup($ID, NULL, NULL, $bus, NULL,false);
      }

      echo json_encode($ID);
  }
  else {
      echo json_encode(false);
  }


?>
