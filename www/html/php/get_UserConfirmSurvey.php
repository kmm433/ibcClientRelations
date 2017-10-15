<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $SurveyID = $_POST['SurveyID'];

  $results = $db->get_UserConfirmSurvey($SurveyID);
  echo json_encode($results);
?>
