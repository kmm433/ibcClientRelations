<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $SurveyID = $_POST['SurveyID'];

  $db->reject_TmpSurvey($SurveyID, $_SESSION['chamber']);             // remove tmp lookup reference
  $result = $db->insert_SurveyLookup($SurveyID, NULL, $_SESSION['chamber'], NULL, NULL,false);

  echo json_encode($result);
?>
