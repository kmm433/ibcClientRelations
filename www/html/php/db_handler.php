<?php
include '../../inc/dbinfo.inc';

class DB_Handler
{
  private $db = null;

  // Initiates a connection to the database on construction
  function __construct() {
    try {
      $db_host = DB_HOST;
      $db_name = DB_NAME;
      $db_user = DB_USER;
      $db_pass = DB_PASS;
      $this->db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    } catch (PDOException $e){
      echo "Connection Failed " . $e->getMessage();
    }
  }

  // Closes the connection ot the database on destruction
  function __destruct() {
    $this->db=null;
  }

  // Request validation of a user profile return ID if successful
  function validateUser($username, $password) {
    $sql = $this->db->prepare("SELECT password, ID FROM users WHERE name='$username'");
    if($sql->execute()) {
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      if(password_verify($password, $row['password']))
        return $row['ID'];
    }
    return false;
  }

  // Get the user's metadata
  function getUserData($email_addr) {
    $sql = $this->db->prepare("SELECT firstname, lastname, type, chamberID, businessID FROM USER WHERE email='$email_addr'");
    if ($sql->execute()) {
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      $results = array ('firstname'=>$row['firstname'],'lastname'=>$row['lastname'], 'type'=>$row['type'], 'chamberID'=>$row['chamberID'], 'businessID'=>$row['businessID']);
      return $results;
    }
    return false;
  }

  // NoticeBoard: Return Notifications
  function get_Notifications(){
    $sql = $this->db->prepare("CALL SPgetNotifications(0,-1,-1,-1);");
    if($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $row;
    }
  }

  // NoticeBoard: Return Events
  function get_Events(){
    $sql = $this->db->prepare("CALL SPgetEvents(0,-1,-1,-1);");
    if($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $row;
    }
  }

   // NoticeBoard: Return Surveys (only ID's and titles)
  function get_Surveys(){
    $sql = $this->db->prepare("CALL SPgetSurvey(0,-1,-1,-1);");
    if($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $row;
    }
  }

   // NoticeBoard: Return Surveys Questions
  function get_SurveyQuestions($surveyID){
      $sql = $this->db->prepare("CALL SPgetSurveyQuestion($surveyID);");
      if($sql->execute()) {
          $row = $sql->fetchAll(PDO::FETCH_ASSOC);
          return $row;
      }
  }

  // NoticeBoard: Return Surveys Answers
 function get_SurveyAnswers($surveyID){
     $sql = $this->db->prepare("CALL SPgetSurveyAnswers($surveyID);");
     if($sql->execute()) {
         $row = $sql->fetchAll(PDO::FETCH_ASSOC);
         return $row;
     }
 }


  //return a column
  function getList($query) {
    $sql = $this->db->prepare($query);
    if ($sql->execute()) {
      $row = $sql->fetchAll(PDO::FETCH_KEY_PAIR);
      return $row;
    }
    return false;
  }

  function getEntries($query){
      $sql = $this->db->prepare($query);
      if ($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_KEY_PAIR);
        return $row;
      }
      return false;
  }
}

?>
