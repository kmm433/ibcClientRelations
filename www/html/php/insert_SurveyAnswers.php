<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  if(isset($_SESSION['user'])){
      $data = $_POST["data"];
      $thisID = $_POST["surveyID"];

      $count = count($data);

      for($i = 0; $i < $count; $i++){
          $surveyID = $data[$i]['surveyID'];
          $questionNo = $data[$i]['questionNo'];
          $question = $data[$i]['question'];
          $AnswerID = $data[$i]['AnswerID'];
          $Answer = $data[$i]['Answer'];
          if($surveyID == $thisID){
              $db->insert_SurveyAnswers($surveyID, $questionNo, $question, $AnswerID, $Answer);
          }
      }
      echo json_encode($surveyID);
  }
  else {
      echo json_encode(false);
  }
?>
