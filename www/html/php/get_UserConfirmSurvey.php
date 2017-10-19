<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $SurveyID = $_POST['SurveyID'];

      $results = $db->get_UserConfirmSurvey($SurveyID);
      echo json_encode($results);
  }
  else {
      echo json_encode(false);
  }
?>
