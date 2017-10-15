<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $SurveyID = $_POST['SurveyID'];
  $result = $db->reject_TmpSurvey($SurveyID, $_SESSION['chamber']);

  echo json_encode($result);
?>
