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
      $row = $sql->fetch( PDO::FETCH_ASSOC );
      $results = array ('firstname'=>$row['firstname'],'lastname'=>$row['lastname'], 'type'=>$row['type'], 'chamberID'=>$row['chamberID'], 'businessID'=>$row['businessID']);
      return $results;
    }
    return false;
  }

  // Retrieves the groups that a member is in
  function getMembersGroups($memberID) {
    $sql = $this->db->prepare("SELECT GROUPS.groupID, GROUPS.name FROM GROUPMEMBERS LEFT JOIN GROUPS ON GROUPMEMBERS.groupID=GROUPS.groupID WHERE GROUPMEMBERS.UserID='$memberID'");
    if($sql->execute()) {
      return $sql->fetchall( PDO::FETCH_ASSOC );
    }
    return false;
  }

  // Retrieves all of the members within a group
  function getGroupsMembers($groupID) {
    $sql = $this->db->prepare("SELECT USER.email FROM USER JOIN GROUPMEMBERS ON USER.UserID=GROUPMEMBERS.UserID WHERE GROUPMEMBERS.groupID=:group_id");
    if($sql->execute(array(
      'group_id' => $groupID,
    ))) {
      return $sql->fetchall(PDO::FETCH_ASSOC);
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

  // Determines if a member is in a specified group
  function checkIfMemberInGroup($userID, $groupID) {
    $sql = $this->db->prepare("SELECT groupID FROM GROUPMEMBERS WHERE UserID=:user_id AND groupID=:group_id");
    $sql->execute(array(
      'user_id' => $userID,
      'group_id' => $groupID,
    ));
    return $sql->fetch(PDO::FETCH_ASSOC);
  }

  // Inserts a member into a group
  function addMemberToGroup($userID, $groupID) {
    $sql = $this->db->prepare("INSERT INTO GROUPMEMBERS (groupID, UserID) VALUES (:group_id, :user_id)");
    if ($sql->execute(array(
      'group_id' => $groupID,
      'user_id' => $userID,
    )))
      return true;
    return false;
  }

  // Removes a member from a group
  function deleteMemberFromGroup($userID, $groupID) {
    $sql = $this->db->prepare("DELETE FROM GROUPMEMBERS WHERE groupID=:group_id AND UserID=:user_id");
    $result = $sql->execute(array(
      'group_id' => $groupID,
      'user_id' => $userID,
    ));
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
          FROM USER LEFT OUTER JOIN BUSINESS ON USER.businessID=BUSINESS.businessID WHERE USER.chamberID=:chamber_id
          ORDER BY lastname;");
    if ($sql->execute(array(
      'chamber_id' => $chamberID,
    ))) {
      return $sql->fetchall(PDO::FETCH_ASSOC);
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


  function insertNewField($inserttable, $name, $optional, $type, $tablename, $minimum, $maximum, $ordering){
      $sql = $this->db->prepare("INSERT INTO $inserttable (displayname, inputtype, mandatory, tablename, minimum, maximum, ordering)
                  VALUES(:name, :type, :optional, :tablename, :minimum, :maximum, :ordering)");

      $sql->bindParam(':name', $name, PDO::PARAM_STR);
      $sql->bindParam(':type', $type, PDO::PARAM_STR);
      $sql->bindParam(':optional', $optional, PDO::PARAM_INT);
      $sql->bindParam(':tablename', $tablename, PDO::PARAM_STR);
      $sql->bindParam(':minimum', $minimum, PDO::PARAM_INT);
      $sql->bindParam(':maximum', $maximum, PDO::PARAM_INT);
      $sql->bindParam(':ordering', $ordering, PDO::PARAM_INT);
      if($sql->execute()){
          return true;
      }
      else{
          return false;
      }
  }

  function updateField($inserttable, $name, $optional, $type, $tablename, $minimum, $maximum, $dataID){
      $sql = $this->db->prepare("UPDATE $inserttable SET displayname = :name, mandatory = :optional, inputtype=:type,
           tablename=:tablename, minimum = :minimum, maximum=:maximum WHERE DataID = :dataID");

      $sql->bindParam(':name', $name, PDO::PARAM_STR);
      $sql->bindParam(':optional', $optional, PDO::PARAM_INT);
      $sql->bindParam(':type', $type, PDO::PARAM_STR);
      $sql->bindParam(':tablename', $tablename, PDO::PARAM_STR);
      $sql->bindParam(':minimum', $minimum, PDO::PARAM_INT);
      $sql->bindParam(':maximum', $maximum, PDO::PARAM_INT);
      $sql->bindParam(':dataID', $dataID, PDO::PARAM_INT);
      if($sql->execute())
        return true;
      else
          return false;

  }

  function insertUser($email, $password, $id, $chamber, $firstname, $lastname, $expiry, $jobtitle){

      if(!isset($jobtitle) || empty($jobtitle)) { $jobtitle= null; }

      $sql = $this->db->prepare("INSERT INTO USER (email, password, businessID, chamberID, firstname, lastname, expiry, jobtitle)
                          VALUES(:email, :password, $id, $chamber, :firstname, :lastname, $expiry, :jobtitle)");

      $sql->bindParam(':email', $email, PDO::PARAM_STR);
      $sql->bindParam(':password', $password, PDO::PARAM_STR);
      $sql->bindParam(':firstname', $firstname, PDO::PARAM_STR);
      $sql->bindParam(':lastname', $lastname, PDO::PARAM_STR);
      $sql->bindParam(':jobtitle', $jobtitle, PDO::PARAM_STR);

      try{
          if($sql->execute()){
              return ("success");
          }
          else{
              return("error");
          }

      } catch(PDOExecption $e) {
          echo $e->getMessage();
      }

  }

  function insertExtraUserData($tablename, $data, $var, $id){
      $sql = $this->db->prepare("INSERT INTO $tablename (DataID, answer, BUSINESSID)
                          VALUES($data, :var, $id)");

      $sql->bindParam(':var', $var, PDO::PARAM_STR);

      if($sql->execute()){
          return ("success");
      }
      else{
          return("error");
      }

  }

  function getLastID(){
      $sql = $this->db->prepare("SELECT LAST_INSERT_ID()");
      if($sql->execute()){
          $id = $sql->fetchColumn(0);
          return $id;
      }
    else
        return false;
  }

  function getMaximum($query){
      $sql = $this->db->prepare($query);
      if($sql->execute()){
          $id = $sql->fetchColumn(0);
          return $id;
      }
    else
        return false;

  }

  function insertBusiness($established, $chamber, $addressid, $abn, $businessname, $businessphone, $mobile, $anzic, $numofemployees, $website){

            if(!isset($established) || empty($established)) { $established = null; }
            if(!isset($addressid) || empty($addressid)) { $addressid = null; }
            if(!isset($mobile) || empty($mobile)) { $mobile = null; }
            if(!isset($anzic) || empty($anzic)) { $anzic = null; }
            if(!isset($numofemployees) || empty($numofemployees)) { $numofemployees = null; }
            if(!isset($website) || empty($website)) { $website = null; }

          $sql = $this->db->prepare("INSERT INTO BUSINESS (established, chamberID, addressid, ABN, businessname, businessphone, mobile, anziccode, numofemployees, website)
                              VALUES(:established, $chamber, null, :abn, :businessname, :businessphone, :mobile, :anzic, :numofemployees, :website)");
        $sql->bindParam(':abn', $abn, PDO::PARAM_INT);
        $sql->bindParam(':businessname', $businessname, PDO::PARAM_STR);
        $sql->bindParam(':businessphone', $businessphone, PDO::PARAM_INT);
          $sql->bindParam(':established', $established, PDO::PARAM_STR);
          $sql->bindParam(':mobile', $mobile, PDO::PARAM_INT);
          $sql->bindParam(':anzic', $anziccode, PDO::PARAM_INT);
          $sql->bindParam(':numofemployees', $numofemployees, PDO::PARAM_INT);
          $sql->bindParam(':website', $website, PDO::PARAM_STR);

          try{
              if($sql->execute())
                return ("success");
            else {
                return("fail");
            }
          } catch(PDOExecption $e) {
              echo $e->getMessage();
          }
  }

function updatePayment($payment, $expiry, $chamber){

    if(!isset($expiry) || empty($expiry)) { $expiry = null; }

    $sql = $this->db->prepare("UPDATE PAYMENTTYPES SET type='$payment', expiry_date=$expiry where chamberid=$chamber");
    if($sql->execute()){
        return true;
    }
    return false;
}

  function justExecute($query){
      $sql = $this->db->prepare($query);
      if($sql->execute()){
          return true;
      }
      return false;
  }

  //count how many users exists with this value
  function countUser($query){
      $sql = $this->db->prepare($query);
      if ($sql->execute()) {
        $row = $sql->fetchColumn(0);
        return $row;
      }
      return false;
  }

  // Updates the MailChimp API key for a given chamber
  function updateMailChimpAPIKey($chamberID, $APIkey) {
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->db->beginTransaction();
    $sql = $this->db->prepare( "SELECT COUNT(chamberID) FROM CHAMBER_API_KEYS WHERE chamberID=:chamber_id" );
    $sql->execute( array(
      'chamber_id' => $chamberID,
    ));
    $existing = $sql->fetch( PDO::FETCH_ASSOC );
    // If there is an existing entry update it
    if( $existing['COUNT(chamberID)'] > 0) {
      $sql = $this->db->prepare("UPDATE CHAMBER_API_KEYS SET mailchimp=:mailchimp_key WHERE chamberID=:chamber_id");
      if  ( $sql->execute( array(
        'chamber_id' => $chamberID,
        'mailchimp_key' => $APIkey,
      )))
      {
        $this->db->commit();
        return true;
      }
      else {
        $this->db->rollBack();
        return false;
      }
    }
    // If there is no existing entry create one
    else {
      $sql = $this->db->prepare( "INSERT INTO CHAMBER_API_KEYS (chamberID, mailchimp) VALUES (:chamber_id, :mailchimp_key)" );
      if  ( $sql->execute( array(
        'chamber_id' => $chamberID,
        'mailchimp_key' => $APIkey,
      )))
      {
        $this->db->commit();
        return true;
      }
      else {
        $this->db->rollBack();
        return false;
      }
    }
  }

  // Retrieves the mailchimp API key for a chamber
  function getMailChimpAPIKey($chamberID) {
    $sql = $this->db->prepare("SELECT mailchimp FROM CHAMBER_API_KEYS WHERE chamberID=:chamber_id");
    $sql->execute(array(
      'chamber_id' => $chamberID,
    ));
    $result = $sql->fetch( PDO::FETCH_ASSOC );
    return $result['mailchimp'];
  }

  // Update Mailchimp ListID
  function updateMailChimpListID($groupID, $listID) {
    $sql = $this->db->prepare("UPDATE GROUPS SET mailchimp_list_id=:list_id WHERE groupID=:group_id");
    if($sql->execute(array(
      'list_id' => $listID,
      'group_id' => $groupID,
    )))
      return true;
    else {
      return false;
    }
  }

  // Can be use to unregister a saved mail list id associated with a group
  function unregisterMailListID($groupID) {
    $sql = $this->db->prepare("UPDATE GROUPS SET mailchimp_list_id=NULL WHERE groupID=:group_id" );
    if($sql->execute( array('group_id' => $groupID,))) {
      return true;
    } else {
      return false;
    }
  }

  // Retrieves the mail list associated with a group.
  function getMailListID($groupID) {
    $sql = $this->db->prepare( "SELECT mailchimp_list_id FROM GROUPS WHERE groupID=:group_id" );
    $sql->execute(array( 'group_id' => $groupID));
    $result = $sql->fetch( PDO::FETCH_ASSOC );
    return $result['mailchimp_list_id'];
  }

  // Retrieves a member's email address
  function getMemberEmail($UserID) {
    $sql = $this->db->prepare( "SELECT email FROM USER WHERE UserID=:user_id" );
    $sql->execute(array('user_id' => $UserID));
    $result = $sql->fetch( PDO::FETCH_ASSOC );
    if ($result) {
      return $result['email'];
    } else {
      return false;
    }
  }

  // Creates a group for a specified chamber using a specified name
  function createGroup($chamberId, $name) {
    $sql = $this->db->prepare("INSERT INTO GROUPS (name, chamberID) VALUES (:group_name, :chamber_id)");
    if ($sql->execute(array(
      'group_name' => $name,
      'chamber_id' => $chamberId,
    ))) {
      return $this->checkIfExistingGroup($chamberId, $name);
    }
    return false;
  }

  // Deletes a specified list of groups from a chamber
  function deleteGroups($groupIDs) {
    $successCounter = 0;
    foreach($groupIDs as $group) {
      $sql = $this->db->prepare("DELETE FROM GROUPS WHERE groupID=:group_id");
      if($sql->execute(array(
        'group_id' => $group
      )))
        $successCounter++;
    }
    if ($successCounter == count($groupIDs))
      return true;
    else
      return false;
  }

  // Allows for the retrieval of a groupsID
  function getGroupID($chamberID, $name) {
    $sql = $this->db->prepare("SELECT groupID FROM GROUPS WHERE chamberID=:chamber_id AND name=:group_name");
    $sql->execute(array(
      'chamber_id' => $chamberID,
      'group_name' => $name,
    ));
    return $sql->fetch(PDO::FETCH_ASSOC);
  }

  // Find all of the groups that exist within a chamber
  function getGroups($chamberId) {
    $sql = $this->db->prepare("SELECT groupID, name, mailchimp_list_id FROM GROUPS WHERE chamberID=:chamberID ORDER BY name");
    if ($sql->execute(array(
      "chamberID" => $chamberId
    ))) {
      $row = $sql->fetchAll(PDO::FETCH_ASSOC);
      return $row;
    }
    return false;
  }

  // Retrives the number opf users assigned to a group
  function getGroupData($chamberId) {
    $sql = $this->db->prepare("SELECT DISTINCT(g.groupID), g.name, g.mailchimp_list_id, COUNT(gm.groupID) FROM GROUPS AS g LEFT OUTER JOIN GROUPMEMBERS as gm ON g.groupID = gm.groupID WHERE g.chamberID=:chamber_id GROUP BY g.groupID ORDER BY COUNT(gm.groupID) DESC");
    if ($sql->execute(array(
      "chamber_id" => $chamberId
    ))) {
      $groups = $sql->fetchAll(PDO::FETCH_ASSOC);
      return $groups;
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

  function insert_notification($title,$content, $chamberid){
      $userid =  $_SESSION['userid'];
      $sql = $this->db->prepare("CALL SPinsertNotification($userid,'$title','$content', $chamberid);");
      if ($sql->execute()) {
          return true;
      }
      return false;
  }
}
?>
