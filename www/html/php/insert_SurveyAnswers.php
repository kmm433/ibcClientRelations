<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $data = $_POST["data"];

  $count = count($data);

  for($i = 0; $i < $count; $i++){
      $surveyID = $data[$i]['surveyID'];
      $questionNo = $data[$i]['questionNo'];
      $question = $data[$i]['question'];
      $AnswerID = $data[$i]['AnswerID'];
      $Answer = $data[$i]['Answer'];
      $db->insert_SurveyAnswers($surveyID, $questionNo, $question, $AnswerID, $Answer);
  }
  echo json_encode($surveyID);


?>
