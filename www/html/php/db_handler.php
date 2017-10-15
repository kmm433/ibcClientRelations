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

//inserts a new field for the sign up form
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
//updates changes made to a field on the sign up form
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
//inserts a new user
  function insertUser($email, $password, $id, $chamber, $firstname, $lastname, $expiry, $jobtitle, $type){
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      try{
          if(!isset($jobtitle) || empty($jobtitle)) { $jobtitle = null; }
          if(!isset($businessID) || empty($businessID)) { $businessID = null; }
          if(!isset($expiry) || empty($expiry)) { $expiry = null; }

          $sql = $this->db->prepare("INSERT INTO `USER` (`email`, `password`, `businessID`, `chamberID`, `firstname`, `lastname`, `expiry`, `jobtitle`, `type`)
                              VALUES(:email, :password, :id, :chamber, :firstname, :lastname, :expiry, :jobtitle, :type)");

          $sql->bindParam(':email', $email, PDO::PARAM_STR);
          $sql->bindParam(':password', $password, PDO::PARAM_STR);
          $sql->bindParam(':firstname', $firstname, PDO::PARAM_STR);
          $sql->bindParam(':lastname', $lastname, PDO::PARAM_STR);
          $sql->bindParam(':jobtitle', $jobtitle, PDO::PARAM_STR);
          $sql->bindParam(':expiry', $expiry, PDO::PARAM_STR);
          $sql->bindParam(':chamber', $chamber, PDO::PARAM_INT);
          $sql->bindParam(':id', $id, PDO::PARAM_INT);
          $sql->bindParam(':type', $type, PDO::PARAM_INT);

      } catch(PDOExecption $e) {
          echo $e->getMessage();
      }


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

  function getAllChamberInfo($chamber){

      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      try{
          $sql = $this->db->prepare("SELECT c.name, c.businessphone, a.line1, a.line2, a.city, a.postcode, a.state, a.country FROM CHAMBER c
                                                        LEFT OUTER JOIN ADDRESS a ON c.location = a.addressID WHERE c.chamberID = :chamber");
          $sql->bindParam(':chamber', $chamber, PDO::PARAM_INT);

          if($sql->execute()){
              $row = $sql->fetchAll(PDO::FETCH_ASSOC);
              return $row;
          }
          else{
              return("error");
          }

      } catch(PDOExecption $e) {
          echo $e->getMessage();
      }

  }

//inserts extra information about a user
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

  function getChamberList($archived){
      $sql = $this->db->prepare("SELECT DISTINCT chamberID, name FROM CHAMBER WHERE archived = :archived");
      $sql->bindParam(':archived', $archived, PDO::PARAM_STR);

      if ($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_KEY_PAIR);
        return $row;
      }
      else{
          return("error");
      }

  }


  //inserts extra information about a user
    function insertAddress($line1, $line2, $city, $state, $postcode, $country){
        $sql = $this->db->prepare("INSERT INTO ADDRESS (line1, line2, city, state, postcode, country)
                            VALUES(:line1, :line2, :city, :state, :postcode, :country)");

        $sql->bindParam(':line1', $line1, PDO::PARAM_STR);
        $sql->bindParam(':line2', $line2, PDO::PARAM_STR);
        $sql->bindParam(':city', $city, PDO::PARAM_STR);
        $sql->bindParam(':state', $state, PDO::PARAM_STR);
        $sql->bindParam(':postcode', $postcode, PDO::PARAM_INT);
        $sql->bindParam(':country', $country, PDO::PARAM_STR);

        if($sql->execute()){
            return ("success");
        }
        else{
            return("error");
        }

    }

    function disableChamber($chamber){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        try{
            $archiveChamber = $this->db->prepare("UPDATE CHAMBER SET archived = 1 WHERE chamberID = :chamber");
            $archiveChamber->bindParam(':chamber', $chamber, PDO::PARAM_INT);

            $archiveUser = $this->db->prepare("UPDATE USER SET archived = 1 WHERE chamberID = :chamber");
            $archiveUser->bindParam(':chamber', $chamber, PDO::PARAM_INT);

            if($archiveChamber->execute() && $archiveUser->execute()){
                return ("success");
            }
            else{
                return("error");
            }

        } catch(PDOExecption $e) {
            echo $e->getMessage();
        }
    }

    function removeParent($parentID){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        try{
            $sql = $this->db->prepare("UPDATE CHAMBER SET parent_id = NULL WHERE parent_id = :parentID");
            $sql->bindParam(':parentID', $parentID, PDO::PARAM_INT);

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

    function chamberParentList($archived){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        try{
            $sql = $this->db->prepare("SELECT name, parent_id FROM CHAMBER where archived = :archived");
            $sql->bindParam(':archived', $archived, PDO::PARAM_INT);

            if($sql->execute()){
                $row = $sql->fetchAll(PDO::FETCH_ASSOC);
                return $row;
            }
            else{
                return("error");
            }

        } catch(PDOExecption $e) {
            echo $e->getMessage();
        }
    }

    function disabledChamberList(){

    }

    function enableChamber($chamber){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        try{
            $unarchiveChamber = $this->db->prepare("UPDATE CHAMBER SET archived = 0 WHERE chamberID = :chamber");
            $unarchiveChamber->bindParam(':chamber', $chamber, PDO::PARAM_INT);

            $unarchiveUser = $this->db->prepare("UPDATE USER SET archived = 0 WHERE chamberID = :chamber");
            $unarchiveUser->bindParam(':chamber', $chamber, PDO::PARAM_INT);

            if($unarchiveChamber->execute()){
                if($unarchiveUser->execute()){
                    return ("success");
                }
            }
            else{
                return("error");
            }

        } catch(PDOExecption $e) {
            echo $e->getMessage();
        }
    }

//return the last ID of an inserted road
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

  function getClientID($chamber){
      $sql = $this->db->prepare("SELECT paypal FROM CHAMBERPAYPAL WHERE chamberid = $chamber");
      if($sql->execute()){
          $id = $sql->fetchColumn(0);
          return($id);
      }
      else {
          return false;
      }

  }

  function addClientID($chamber, $id){
      $sql = $this->db->prepare("INSERT INTO CHAMBERPAYPAL (chamberid, paypal) VALUES (:chamber, :id)");

      $sql->bindParam(':chamber', $chamber, PDO::PARAM_INT);
      $sql->bindParam('id', $id, PDO::PARAM_STR);

      if($sql->execute()){
          return true;
      }
      else {
          return false;
      }

  }
  function removeClientID($chamber){
      $sql = $this->db->prepare("DELETE FROM CHAMBERPAYPAL WHERE chamberid = $chamber");

      if($sql->execute()){
          return true;
      }
      else {
          return false;
      }
  }

//insert a new business
  function insertBusiness($established, $chamber, $addressid, $abn, $businessname, $businessphone, $mobile, $anzic, $numofemployees, $website){

            if(!isset($established) || empty($established)) { $established = null; }
            if(!isset($addressid) || empty($addressid)) { $addressid = null; }
            if(!isset($mobile) || empty($mobile)) { $mobile = null; }
            if(!isset($anzic) || empty($anzic)) { $anzic = null; }
            if(!isset($numofemployees) || empty($numofemployees)) { $numofemployees = null; }
            if(!isset($website) || empty($website)) { $website = null; }

          $sql = $this->db->prepare("INSERT INTO BUSINESS (established, chamberID, addressid, postal, ABN, businessname, businessphone, mobile, anziccode, numofemployees, website)
                              VALUES(:established, $chamber, $addressid, $postalid, :abn, :businessname, :businessphone, :mobile, :anzic, :numofemployees, :website)");
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

  //insert a new business
    function insertChamber($established, $baddressID, $paddressID, $abn, $parentID, $name, $businessphone, $mobilephone, $anziccode, $website){

        //$this->db->setAttribute(PDO::ATTR_ERRMODE, ERROMODE_EXCEPTION);

        if(!isset($established) || empty($established)) { $established = null; }
        if(!isset($paddressID) || empty($paddressID)) { $paddressID = null; }
        if(!isset($parentID) || empty($parentID)) { $parentID = null; }
        if(!isset($anziccode) || empty($anziccode)) { $anziccode = null; }
        if(!isset($website) || empty($website)) { $website = null; }

        $sql = $this->db->prepare("INSERT INTO CHAMBER (established, location, postal, ABN, parent_id, name, businessphone, mobilephone, anziccode, website)
                    VALUES(null, :baddressID, :paddressID, :abn, :parentID, :name, :businessphone, :mobilephone, :anziccode, :website)");

        //$sql->bindParam(':established,', $established, PDO::PARAM_STR);
        $sql->bindParam(':baddressID', $baddressID, PDO::PARAM_INT);
        $sql->bindParam(':paddressID', $paddressID, PDO::PARAM_INT);
        $sql->bindParam(':abn', $abn, PDO::PARAM_INT);
        $sql->bindParam(':parentID', $parentID, PDO::PARAM_INT);
        $sql->bindParam(':name', $name, PDO::PARAM_STR);
        $sql->bindParam(':businessphone', $businessphone, PDO::PARAM_INT);
        $sql->bindParam(':mobilephone', $mobilephone, PDO::PARAM_INT);
        $sql->bindParam(':anziccode', $anziccode, PDO::PARAM_INT);
        $sql->bindParam(':website', $website, PDO::PARAM_STR);

        if($sql->execute())
            return ("success");
        else {
            return ("fail");
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
