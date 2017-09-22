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

  // Session Set: Returns the user's chamberID
  function getChamber($user) {
    $sql = $this->db->prepare("SELECT chamberID FROM USER WHERE email='$user'");
    if ($sql->execute()) {
      $result = $sql->fetch(PDO::FETCH_ASSOC);
      return $result['chamberID'];
    }
    return false;
  }

  // Session Set: Returns the user's userID
  function getUserID($user) {
      $sql = $this->db->prepare("SELECT UserID FROM USER WHERE email='$user'");
      if ($sql->execute()) {
        $result = $sql->fetch(PDO::FETCH_ASSOC);
        return $result['UserID'];
      }
      return false;
    }

  // Session Set: Returns the user's Business ID
  function getBusinessID($userID) {
    $sql = $this->db->prepare("SELECT businessID FROM USER WHERE UserID='$userID'");
    if ($sql->execute()) {
      $result = $sql->fetch(PDO::FETCH_ASSOC);
      return $result['businessID'];
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

  // Retrieves the groups that a member is in
  function getMembersGroups($memberID) {
    $sql = $this->db->prepare("SELECT GROUPS.name FROM GROUPMEMBERS LEFT JOIN GROUPS ON GROUPMEMBERS.groupID=GROUPS.groupID WHERE GROUPMEMBERS.UserID='$memberID'");
    if($sql->execute()) {
      return $sql->fetchall();
    }
    return false;
  }

  // Gets all variable information about a user
  function getDetail($memberID, $query) {
    $completeQuery = "SELECT $query FROM USER JOIN BUSINESS on USER.businessID=BUSINESS.businessID WHERE USER.UserID='$memberID'";
    $sql = $this->db->prepare($completeQuery);
    if($sql->execute());
      return  $sql->fetchall();
    return false;
  }

  // Allows a standard detail to be updated for a user
  function setDetail($memberID, $value, $column, $table) {
    $sql = $this->db->prepare("UPDATE BUSINESS JOIN USER ON BUSINESS.businessID=USER.businessId SET $table.$column='$value' WHERE USER.UserID='$memberID'");
    if($sql->execute())
      return true;
    else
      return false;
  }

  // Allows a chamber specific detail to be updated for a user
  function setChamberSpecificDetail($memberID, $dataID, $businessID, $value, $column, $table) {
    // Check if there is s preexisting value
    $queryString = "SELECT * FROM $table JOIN BUSINESS ON $table.BUSINESSID=BUSINESS.businessID JOIN USER ON USER.businessID=BUSINESS.businessID WHERE USER.UserID='$memberID' AND $table.DataID='$dataID'";
    $sql = $this->db->prepare($queryString);
    if ($sql->execute()) {
      if ($sql->rowCount() > 0)
        $queryString = "UPDATE $table JOIN BUSINESS ON $table.BUSINESSID=BUSINESS.businessID JOIN USER ON USER.businessID=BUSINESS.businessID SET $table.answer='$value' WHERE USER.UserID='$memberID' AND $table.DataID=$dataID";
      else
        $queryString = "INSERT INTO $table (DataID, answer, BUSINESSID) VALUES ($dataID, '$value', $businessID)";
      $sql = $this->db->prepare($queryString);
      if ($sql->execute())
        return true;
      else
        return false;
    }
    else {
      return ('Failed to check for existing entry.');
    }
  }

  // Gets chamber specific information about a user
  function getChamberSpecificDetail($memberID, $dataID, $column, $table) {
    $queryString = "SELECT $table.answer FROM $table JOIN BUSINESS ON $table.BUSINESSID=BUSINESS.businessID JOIN USER ON USER.businessID=BUSINESS.businessID WHERE USER.UserID='$memberID' AND $table.DataID=$dataID";
    $sql = $this->db->prepare($queryString);
    if ($sql->execute()) {
      return $sql->fetch();
    }
    else {
      return false;
    }
  }

  // Checks to see if a group already exists
  function checkIfExistingGroup($chamber, $group) {
    $sql = $this->db->prepare("SELECT groupID FROM GROUPS WHERE name='$group' AND chamberID=$chamber");
    if ($sql->execute()){
      if (!($sql->rowCount() == 0))
        return $sql->fetch(PDO::FETCH_ASSOC);
      else
        return false;
    }
  }

  // Inserts a member into a group
  function addMemberToGroup($memberID, $groupID) {
    $sql = $this->db->prepare("INSERT INTO GROUPMEMBERS (groupID, UserID) VALUES ($groupID, '$memberID')");
    if ($sql->execute())
      return true;
    return false;
  }

  // Removes a member from a group
  function deleteMemberFromGroup($memberID, $groupID) {
    $sql = $this->db->prepare("DELETE FROM GROUPMEMBERS WHERE groupID=$groupID AND UserID='$memberID'");
    $result = $sql->execute();
    return $groupID;
  }

  // Changes whether a member is archived or not.
  function setArchiveMember($memberID, $archived) {
    $sql = $this->db->prepare("UPDATE USER SET archived=$archived WHERE UserID='$memberID'");
    $result = $sql->execute();
    return $result;
  }

  // Retrieve all members of a chamber
  function getChamberMembers($chamberID) {
      $sql = $this->db->prepare("SELECT UserID, firstname, lastname, email, businessname, expiry, archived
          FROM USER LEFT OUTER JOIN BUSINESS ON USER.businessID=BUSINESS.businessID WHERE USER.chamberID=$chamberID
          ORDER BY lastname;");
    if ($sql->execute()) {
      return $sql->fetchall();
    }
    return $chamberID;
  }

    // NoticeBoard: Return Notifications
   function get_Notifications(){
     $userid =  $_SESSION['userid'];
     $chamberID = $_SESSION['chamber'];
     $businessID = $_SESSION['businessid'];
     $sql = $this->db->prepare("CALL SPgetNotifications($userid,$chamberID,$businessID);");
     if($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
         return $row;
     }
     else{
         return array();
     }
   }

   // Event Page: Return Events
   function get_Events(){
     $userid =  $_SESSION['userid'];
     $chamberID = $_SESSION['chamber'];
     $businessID = $_SESSION['businessid'];
     $sql = $this->db->prepare("CALL SPgetEvents($userid,$chamberID,$businessID);");
     if($sql->execute()) {
         $row = $sql->fetchAll(PDO::FETCH_ASSOC);
         return $row;
     }
     else{
         return array();
     }
   }

   // NoticeBoard: Return Events
   function get_EventsNoticeBoard(){
     $userid =  $_SESSION['userid'];
     $chamberID = $_SESSION['chamber'];
     $businessID = $_SESSION['businessid'];
     $sql = $this->db->prepare("CALL SPgetEventsNoticeBoard($userid,$chamberID,$businessID);");
     if($sql->execute()) {
         $row = $sql->fetchAll(PDO::FETCH_ASSOC);
         return $row;
     }
     else{
         return array();
     }
   }

   // NoticeBoard: Hide Events (from the noticeboard)
   function hide_Events($EventID) {
     $userid =  $_SESSION['userid'];
     $sql = $this->db->prepare("INSERT INTO MYEVENTHIDDEN (`EventID`, `UserID`) VALUES ('$EventID','$userid')");
     if ($sql->execute()) {
       return true;
     }
     return false;
   }

   // Events: Mark Event as Going
   function set_EventGoing($EventID) {
     $userid =  $_SESSION['userid'];
     $going = $this->get_EventStatusGoing($EventID);
     if (count($going) == 0) {
         $sql = $this->db->prepare("CALL SPsetEventGoing('$EventID', '$userid');");
         if ($sql->execute()) {
             return true;
         }
         return false;
     }
   }

   // Events: Mark Event as Cant Go
   function set_EventCantgo($EventID) {
     $userid =  $_SESSION['userid'];
     $notGoing = $this->get_EventStatusCantGo($EventID);
     if (count($notGoing) == 0) {
        $sql = $this->db->prepare("CALL SPsetEventCantgo('$EventID', '$userid');");
        if ($sql->execute()) {
        return true;
        }
        return false;
      }
   }

   function get_EventStatusGoing($EventID){
     $userid =  $_SESSION['userid'];
     $sql = $this->db->prepare("SELECT GoingID FROM MYEVENTGOING WHERE EventID = $EventID and UserID = $userid;");
     if ($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $row;
     }
     return false;
   }

   function get_EventStatusCantGo($EventID){
       $userid =  $_SESSION['userid'];
       $sql = $this->db->prepare("SELECT CantgoID FROM MYEVENTCANTGO WHERE EventID = $EventID and UserID = $userid;");
       if ($sql->execute()) {
          $row = $sql->fetchAll(PDO::FETCH_ASSOC);
          return $row;
       }
       return false;
   }

    // NoticeBoard: Return Surveys (only ID's and titles)
   function get_Surveys(){
     $userid =  $_SESSION['userid'];
     $chamberID = $_SESSION['chamber'];
     $businessID = $_SESSION['businessid'];
     $sql = $this->db->prepare("CALL SPgetSurvey($userid,$chamberID,$businessID);");
     if($sql->execute()) {
         $row = $sql->fetchAll(PDO::FETCH_ASSOC);
         return $row;
     }
     else{
         return array();
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
    $userid =  $_SESSION['userid'];
    $sql = $this->db->prepare("CALL SPinsertSurveyAnswers($userid,$surveyID,$questionNo,'$question',$AnswerID,'$Answer');");
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
      if ($sql->execute()) {
        $row = $sql->fetchColumn(0);
        return $row;
      }
      return false;
  }

  // Creates a group for a specified chamber using a specified name
  function createGroup($chamberId, $name) {
    $sql = $this->db->prepare("INSERT INTO GROUPS (name, chamberID) VALUES ('$name', $chamberId)");
    if ($sql->execute()) {
      return $this->checkIfExistingGroup($chamberId, $name);
    }
    return false;
  }

  // Deletes a specified list of groups from a chamber
  function deleteGroups($chamberId, $groupNames) {
    $successCounter = 0;
    foreach($groupNames as $group) {
      $sql = $this->db->prepare("DELETE FROM CHAMBER_GROUPS_$chamberId WHERE groupName='$group'");
      if($sql->execute())
        $successCounter++;
    }
    if ($successCounter == count($groupNames))
      return true;
    else
      return false;
  }

  // Find all of the groups that exist within a chamber
  function getGroups($chamberId) {
    $sql = $this->db->prepare("SELECT groupID, name FROM GROUPS WHERE chamberID=$chamberId ORDER BY name");
    if ($sql->execute()) {
      $row = $sql->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }
    return false;
  }

  // Adds a note about a member to the notes table
  function addNote($userID, $memberID, $note) {
    $sql = $this->db->prepare("INSERT INTO NOTES (about, leftBy, note) VALUES (:about, :leftBy, :note)");
    $result = $sql->execute(array(
      "about" => $memberID,
      "leftBy" => $userID,
      "note" => $note
    ));
    if ($result)
      return true;
    else
      return false;
  }

  // Retrieves all notes about a member from the database
  function getNotes($memberID) {
    $sql = $this->db->prepare("SELECT NOTES.ts, USER.firstname, USER.lastname, note FROM NOTES JOIN USER ON NOTES.leftBy=USER.UserID WHERE about=:memberID ORDER BY ts ASC");
    $result = $sql->execute(array(
      "memberID" => $memberID
    ));
    if ($result)
      return $sql->fetchall(PDO::FETCH_ASSOC);
    else
      return false;
  }

  function insert_notification($title,$content){
      $userid =  $_SESSION['userid'];
      $sql = $this->db->prepare("CALL SPinsertNotification($userid,'$title','$content');");
      if ($sql->execute()) {
          return true;
      }
      return false;
  }
}
?>
