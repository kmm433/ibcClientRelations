<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $SurveyID = $_POST['surveyID'];
  $QuestionNo = $_POST['questionNo'];

  $results = $db->get_QuestionResult($SurveyID,$QuestionNo);
  echo json_encode($results);
?>
