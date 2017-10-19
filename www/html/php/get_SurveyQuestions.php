<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  if(isset($_SESSION['user'])){
      $surveyID = $_POST["surveyID"];
      $results = $db->get_SurveyQuestions($surveyID);
      echo json_encode($results);
  }
  else {
      echo json_encode(false);
  }
?>
