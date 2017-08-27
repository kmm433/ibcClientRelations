<?php
include '../../inc/dbinfo.inc';
session_start();
// Verify that the user has signed in and enfore if they have not
if(!$_SESSION['user'])
  header('Location: ../signin.php');

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
    $sql = $this->db->prepare("SELECT password FROM USER WHERE email='$username'");
    if($sql->execute()) {
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      if(password_verify($password, $row['password']))
        return $username;
    }
    return false;
  }

  // Returns the user's chamberID
  function getChamber($email_addr) {
    $sql = $this->db->prepare("SELECT chamberID FROM USER WHERE email='$email_addr'");
    if ($sql->execute()) {
      $result = $sql->fetch(PDO::FETCH_ASSOC);
      return $result['chamberID'];
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

  // Retrieve all members of a chamber
  function getChamberMembers($chamberID) {
      $sql = $this->db->prepare("SELECT firstname, lastname, email, businessname, expiry
          FROM USER LEFT OUTER JOIN BUSINESS ON USER.businessID=BUSINESS.businessID WHERE USER.chamberID=$chamberID
          ORDER BY lastname;");
    if ($sql->execute()) {
      return $sql->fetchall();
    }
    return $chamberID;
  }

  // return messages
  function get_messages(){ /*todo: pass group ID, select * where groupID matches*/
    $sql = $this->db->prepare("SELECT * FROM NOTIFICATION");
    if($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        //$results = array ('NotificationID'=>$row['NotificationID'],'NoticeTitle'=>$row['NoticeTitle'], 'Notice'=>$row['Notice'], 'GroupID'=>$row['GroupID'], 'DatePosted'=>$row['DatePosted']);
        return $row;
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



 // NoticeBoard Surveys: submit Survey Answers
function insert_SurveyAnswers($surveyID, $questionNo, $question, $AnswerID, $Answer){
    $sql = $this->db->prepare("CALL SPinsertSurveyAnswers(0,$surveyID,$questionNo,'$question',$AnswerID,'$Answer');");
    $sql->execute();
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

  function getFields($query){
      $sql = $this->db->prepare($query);
      if ($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $row;
      }
      return false;
  }

  function insertUser($query){
      $sql = $this->db->prepare($query);
      $sql->execute();

  }
  function countUser($query){
      $sql = $this->db->prepare($query);
      $count = $sql->rowCount();
      return $count;

  }
}

  // Creates a group for a specified chamber using a specified name
  function createGroup($chamberId, $groupName) {
    $sql = $this->db->prepare("INSERT INTO CHAMBER_GROUPS_$chamberId (groupName) VALUES ('$groupName')");
    if ($sql->execute()) {
      return true;
    }
    return false;
  }
}
?>
