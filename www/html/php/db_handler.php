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

  // Retrieve all Businesses of a chamber
  function get_chamber_business(){
      $sql = $this->db->prepare("SELECT businessID, businessname FROM BUSINESS WHERE chamberID = :chamberid;");

      $result = $sql->execute(array(
        "chamberid" => $_SESSION['chamber'],
      ));

      if ($result)
        return $sql->fetchAll(PDO::FETCH_ASSOC);
      else
        return false;
  }

    // NoticeBoard: Return Notifications
   function get_Notifications(){
     $sql = $this->db->prepare("CALL SPgetNotifications(:userid,:chamberid,:businessID);");
     $result = $sql->execute(array(
       "userid" => $_SESSION['userid'],
       "chamberid" => $_SESSION['chamber'],
       "businessID" => $_SESSION['businessid']
     ));
     if ($result)
        return $sql->fetchAll(PDO::FETCH_ASSOC);
     else
         return false;

   }
   // NoticeBoard: Return Notifications passed down from parent
  function get_NotificationsTEMP(){
    $sql = $this->db->prepare("CALL SPgetNotificationsTEMP(:userid,:chamberid,:businessID);");
    $result = $sql->execute(array(
      "userid" => $_SESSION['userid'],
      "chamberid" => $_SESSION['chamber'],
      "businessID" => $_SESSION['businessid']
    ));
    if ($result)
       return $sql->fetchAll(PDO::FETCH_ASSOC);
    else
        return false;
  }

   // NoticeBoard: Return Events
   function get_EventsNoticeBoard(){
     $sql = $this->db->prepare("CALL SPgetEventsNoticeBoard(:userid,:chamberid,:businessID);");
     $result = $sql->execute(array(
       "userid" => $_SESSION['userid'],
       "chamberid" => $_SESSION['chamber'],
       "businessID" => $_SESSION['businessid']
     ));
     if ($result)
        return $sql->fetchAll(PDO::FETCH_ASSOC);
     else
         return false;
   }
   function get_EventsNoticeBoardTEMP(){
       $sql = $this->db->prepare("CALL SPgetEventsNoticeBoardTEMP(:userid,:chamberid,:businessID);");
       $result = $sql->execute(array(
         "userid" => $_SESSION['userid'],
         "chamberid" => $_SESSION['chamber'],
         "businessID" => $_SESSION['businessid']
       ));
       if ($result)
          return $sql->fetchAll(PDO::FETCH_ASSOC);
       else
           return false;
   }

   // NoticeBoard: Hide Events (from the noticeboard)
   function hide_Events($EventID) {
     $sql = $this->db->prepare("INSERT INTO MYEVENTHIDDEN (`EventID`, `UserID`) VALUES (:event,:user)");
     $result = $sql->execute(array(
       "user" => $_SESSION['userid'],
       "event" => $EventID
     ));
     if ($result)
        return true;
     else
         return false;
   }

   // Event Page: Return Events
   function get_Events(){
     $sql = $this->db->prepare("CALL SPgetEvents(:userid,:chamberid,:businessID)");
     $result = $sql->execute(array(
         "userid" => $_SESSION['userid'],
         "chamberid" => $_SESSION['chamber'],
         "businessID" => $_SESSION['businessid']
     ));
     if ($result)
        return $sql->fetchAll(PDO::FETCH_ASSOC);
     else
         return false;
   }

   // Event and Survey Results page
   function get_AllSurveys(){
       $sql = $this->db->prepare("SELECT DISTINCT s.SurveyID, s.SurveyTitle, s.DatePosted FROM SURVEYLOOKUP L LEFT JOIN SURVEY s ON s.SurveyID = L.SurveyID
                                  WHERE  :chamberid = L.ChamberID or :chamberid = L.RelatedChamber ORDER BY s.DatePosted DESC;");
       $result = $sql->execute(array(
         "chamberid" => $_SESSION['chamber']
       ));
       if ($result)
          return $sql->fetchAll(PDO::FETCH_ASSOC);
       else
           return false;
   }
   // Event and Survey Results page
   function get_AllEvents(){
       $sql = $this->db->prepare("SELECT DISTINCT e.EventID, e.EventTitle, e.Event, e.EventDate, e.endTime, e.EventURL, e.DatePosted, e.Location
                                FROM MYEVENTLOOKUP L
                                LEFT JOIN MYEVENT e ON e.EventID = L.EventID
                                WHERE :chamberid = L.ChamberID or :chamberid = L.RelatedChamber
                                ORDER BY e.DatePosted DESC;");
       $result = $sql->execute(array(
         "chamberid" => $_SESSION['chamber']
       ));
       if ($result)
          return $sql->fetchAll(PDO::FETCH_ASSOC);
       else
           return false;
   }
   // Event and Survey Results page
   function get_QuestionResult($SurveyID,$QuestionNo){
       $sql = $this->db->prepare("SELECT * FROM SURVEYRESULTS WHERE SurveyID = :surveyid AND questionNo = :qNo;");
       $result = $sql->execute(array(
         "surveyid" => $SurveyID,
         "qNo" => $QuestionNo,
       ));
       if ($result)
          return $sql->fetchAll(PDO::FETCH_ASSOC);
       else
           return false;
   }

   // Events: Mark Event as Going
   function set_EventGoing($EventID) {
     $going = $this->get_EventStatusGoing($EventID);
     if (count($going) == 0) {
         $sql = $this->db->prepare("CALL SPsetEventGoing(:event, :user);");
         $result = $sql->execute(array(
           "event" => $EventID,
           "user" => $_SESSION['userid']
         ));
         if ($result)
            return true;
         else
             return false;
     }
   }

   // Events: Mark Event as Cant Go
   function set_EventCantgo($EventID) {
     $notGoing = $this->get_EventStatusCantGo($EventID);
     if (count($notGoing) == 0) {
        $sql = $this->db->prepare("CALL SPsetEventCantgo(:event, :user);");
        $result = $sql->execute(array(
          "event" => $EventID,
          "user" => $_SESSION['userid']
        ));
        if ($result)
            return true;
        else
            return false;
      }
   }

   function get_EventStatusGoing($EventID){
     $sql = $this->db->prepare("SELECT GoingID FROM MYEVENTGOING WHERE EventID = :event and UserID = :user;");
     $result = $sql->execute(array(
       "event" => $EventID,
       "user" => $_SESSION['userid']
     ));
     if ($result)
        return $sql->fetchAll(PDO::FETCH_ASSOC);
     else
        return false;
   }

   function get_EventStatusCantGo($EventID){
       $sql = $this->db->prepare("SELECT CantgoID FROM MYEVENTCANTGO WHERE EventID = :event and UserID = :user;");
       $result = $sql->execute(array(
         "event" => $EventID,
         "user" => $_SESSION['userid']
       ));
       if ($result)
          return $sql->fetchAll(PDO::FETCH_ASSOC);
       else
          return false;
   }

    // NoticeBoard: Return Surveys (only ID's and titles)
   function get_Surveys(){
     $sql = $this->db->prepare("CALL SPgetSurvey2(:userid,:chamberID,:businessID);");
     $result = $sql->execute(array(
       "userid" => $_SESSION['userid'],
       "chamberID" => $_SESSION['chamber'],
       "businessID" => $_SESSION['businessid'],
     ));
     if ($result){
         return $sql->fetchAll(PDO::FETCH_ASSOC);
     }
     else{
         return false; // was array(); HL 10/10/17
     }
   }
   function get_SurveysTEMP(){
     $sql = $this->db->prepare("CALL SPgetSurveyTEMP(:userid,:chamberID,:businessID);");
     $result = $sql->execute(array(
       "userid" => $_SESSION['userid'],
       "chamberID" => $_SESSION['chamber'],
       "businessID" => $_SESSION['businessid'],
     ));
     if ($result){
         return $sql->fetchAll(PDO::FETCH_ASSOC);
     }
     else{
         return false;
     }
   }

    // NoticeBoard: Return Surveys Questions
   function get_SurveyQuestions($surveyID){
       $sql = $this->db->prepare("SELECT * FROM SURVEYQUESTION WHERE SurveyID = :surveyid;");
       $result = $sql->execute(array(
         "surveyid" => $surveyID
       ));
       if ($result){
           return $sql->fetchAll(PDO::FETCH_ASSOC);
       }
       else{
           return false;
       }
   }

   // NoticeBoard: Return Surveys Answers
  function get_SurveyAnswers($surveyID){
      $sql = $this->db->prepare("CALL SPgetSurveyAnswers(:surveyid);");
      $result = $sql->execute(array(
        "surveyid" => $surveyID
      ));
      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }

   // NoticeBoard Surveys: submit Survey Answers
  function insert_SurveyAnswers($surveyID, $questionNo, $question, $AnswerID, $Answer){
    $sql = $this->db->prepare("CALL SPinsertSurveyAnswers(:user,:survey,:qNo,:q,:aID,:a);");
    $result = $sql->execute(array(
      "user" => $_SESSION['userid'],
      "survey" => $surveyID,
      "qNo" => $questionNo,
      "q" => $question,
      "aID" => $AnswerID,
      "a" => $Answer
    ));
    if ($result)
       return true;
    else
       return false;
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

  function insertUser($query){
      $sql = $this->db->prepare($query);
      if($sql->execute())
        return true;
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

  function insertBusiness($query){
      $sql = $this->db->prepare($query);
      $next = $this->db->prepare("SELECT LAST_INSERT_ID()");
      if($sql->execute()){
          $next->execute();
          $id = $next->fetchColumn(0);
          return $id;
      }
      else
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

  // Retrieves the information required to complete an invoice for a member
  function getMemberInvoiceData($UserID) {
    $sql = $this->db->prepare("SELECT USER.email, USER.firstname, USER.lastname FROM USER WHERE USER.UserID=:user_id");
    $sql->execute(array('user_id' => $UserID));
    return $sql->fetch( PDO::FETCH_ASSOC );
  }

  // Retrieves the chambers renewal policy
  function getRenewalPolicy($chamberId) {
    $sql = $this->db->prepare("SELECT type, expiry_date FROM PAYMENTTYPES WHERE chamberid=:chamber_id");
    $sql->execute(array('chamber_id' => $chamberId));
    return $sql->fetch(PDO::FETCH_ASSOC);
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
      return $sql->fetchAll(PDO::FETCH_ASSOC);
    else
      return false;
  }
  // Create New Notice: Insert a notification into the database
  function insert_notification($title,$content,$tempStatus,$tmpID){

      if($tempStatus == true){
          $sql = $this->db->prepare("INSERT INTO NOTIFICATIONtemp (`NotificationID`,`NoticeTitle`, `Notice`, `DatePosted`, `UserID`) VALUES (:id, :title, :content, NOW(), :userid);");
          $result = $sql->execute(array(
            "title" => $title,
            "content" => $content,
            "userid" => $_SESSION['userid'],     // Keep track of who is posting notifications, only stored in DB, not visible in site
            "id" => $tmpID
          ));

          if ($result)
            return true;        // Returns only the new notification ID
          else
            return false;
      }else {
          $sql = $this->db->prepare("SELECT insertNotification(:title, :content, :userid);");
          $result = $sql->execute(array(
            "title" => $title,
            "content" => $content,
            "userid" => $_SESSION['userid']     // Keep track of who is posting notifications, only stored in DB, not visible in site
          ));

          if ($result)
            return $sql->fetchColumn(0);        // Returns only the new notification ID
          else
            return false;
      }
  }

  function insert_event($title,$content,$sDate,$eDate,$location,$link,$tempStatus,$tmpID){
      if($tempStatus == true){
          $sql = $this->db->prepare("INSERT INTO MYEVENTtemp (`EventID`,`EventTitle`, `Event`, `EventDate`, `endTime`, `Location`, `EventURL`, `DatePosted`, `UserID`) VALUES (:id, :title, :content, :sDate, :eDate, :loc, :url, NOW(),:userid);");
          $result = $sql->execute(array(
            "title" => $title,
            "content" => $content,
            "sDate" => $sDate,
            "eDate" => $eDate,
            "loc" => $location,
            "url" => $link,
            "userid" => $_SESSION['userid'],     // Keep track of who is posting notifications, only stored in DB, not visible in site
            "id" => $tmpID
          ));

          if ($result)
            return true;        // Returns only the new event ID
          else
            return false;

      }else {
          $sql = $this->db->prepare("SELECT insertEvent(:title, :content, :sDate, :eDate, :loc, :url, :userid);");
          $result = $sql->execute(array(
            "title" => $title,
            "content" => $content,
            "sDate" => $sDate,
            "eDate" => $eDate,
            "loc" => $location,
            "url" => $link,
            "userid" => $_SESSION['userid']     // Keep track of who is posting events, only stored in DB, not visible in site
          ));

          if ($result)
            return $sql->fetchColumn(0);        // Returns only the new event ID
          else
            return false;
      }
  }

  function insert_Survey($title,$tempStatus,$tmpID){
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      if($tempStatus == true){
          $sql = $this->db->prepare("INSERT INTO SURVEYtemp (`SurveyID`, `SurveyTitle`, `DatePosted`, `UserID`) VALUES (:id, :mytitle, NOW(),:userid);");
          $result = $sql->execute(array(
            "id" => $tmpID,
            "mytitle" => $title,
            "userid" => $_SESSION['userid']
          ));

          if ($result)
            return true;                        // Returns only the new event ID
          else
            return false;

      }else {
          $sql = $this->db->prepare("SELECT insertSurvey(:title, :thisuserid);");
          $result = $sql->execute(array(
            "thisuserid" => (int)$_SESSION['userid'],
            "title" => $title
          ));

          if ($result)
            return $sql->fetchColumn(0);        // Returns only the new event ID
          else
            return false;
      }
  }
  function insert_surveyQuestion($surveyID,$questionNo,$question,$type){
      $sql = $this->db->prepare("INSERT INTO SURVEYQUESTION (`SurveyID`, `questionNo`, `question`, `answerType`) VALUES (:surveyid, :qNO, :q, :answerType);");
      $result = $sql->execute(array(
        "surveyid" => $surveyID,
        "qNO" => $questionNo,
        "q" => $question,
        "answerType" => $type
      ));

      if ($result)
        return true;
      else
        return false;
  }
  function insert_surveyAnswer($surveyID,$questionNo,$answer){
      $sql = $this->db->prepare("INSERT INTO SURVEYANSWER (`SurveyID`, `questionNo`, `answer`) VALUES (:surveyid, :qNO, :a);");
      $result = $sql->execute(array(
        "surveyid" => $surveyID,
        "qNO" => $questionNo,
        "a" => $answer
      ));

      if ($result)
        return true;
      else
        return false;
  }



  function insert_notificationLookup($ID,$userID,$chamberID,$businessID,$groupID,$tempStatus){
      if($tempStatus == true){
         $sql = $this->db->prepare("INSERT INTO NOTIFICATIONLOOKUPtemp (`NotificationID`, `UserID`, `ChamberID`, `BusinessID`, `GroupID`) VALUES (:id,:userid,:chamberid,:businessID,:groupID);");
         $result = $sql->execute(array(
           "id" => $ID,
           "userid" => $userID,
           "chamberid" => $chamberID,
           "businessID" => $businessID,
           "groupID" => $groupID,
         ));
      }else {
         $sql = $this->db->prepare("INSERT INTO NOTIFICATIONLOOKUP (`NotificationID`, `UserID`, `ChamberID`, `BusinessID`, `GroupID`, `RelatedChamber`) VALUES (:id,:userid,:chamberid,:businessID,:groupID,:relChamber);");
         $result = $sql->execute(array(
           "id" => $ID,
           "userid" => $userID,
           "chamberid" => $chamberID,
           "businessID" => $businessID,
           "groupID" => $groupID,
           "relChamber" => $_SESSION['chamber']
         ));
      }

      if ($result)
        return true;
      else
        return false;
  }

  function insert_eventLookup($ID,$userID,$chamberID,$businessID,$groupID,$tempStatus){

      if($tempStatus == true){
          $sql = $this->db->prepare("INSERT INTO MYEVENTLOOKUPtemp (`EventID`, `UserID`, `ChamberID`, `BusinessID`, `GroupID`) VALUES (:id,:userid,:chamberid,:businessID,:groupID);");
          $result = $sql->execute(array(
              "id" => $ID,
              "userid" => $userID,
              "chamberid" => $chamberID,
              "businessID" => $businessID,
              "groupID" => $groupID
          ));
      }else {
         $sql = $this->db->prepare("INSERT INTO MYEVENTLOOKUP (`EventID`, `UserID`, `ChamberID`, `BusinessID`, `GroupID`, `RelatedChamber`) VALUES (:id,:userid,:chamberid,:businessID,:groupID,:relChamber);");
         $result = $sql->execute(array(
            "id" => $ID,
            "userid" => $userID,
            "chamberid" => $chamberID,
            "businessID" => $businessID,
            "groupID" => $groupID,
            "relChamber" => $_SESSION['chamber']
         ));
      }

      if ($result)
        return true;
      else
        return false;
  }

  function insert_SurveyLookup($ID,$userID,$chamberID,$businessID,$groupID,$tempStatus){
      if($tempStatus == true){
          $sql = $this->db->prepare("INSERT INTO SURVEYLOOKUPtemp (`SurveyID`, `UserID`, `ChamberID`, `BusinessID`, `GroupID`) VALUES (:id,:userid,:chamberid,:businessID,:groupID);");
          $result = $sql->execute(array(
            "id" => $ID,
            "userid" => $userID,
            "chamberid" => $chamberID,
            "businessID" => $businessID,
            "groupID" => $groupID,
          ));
      }else {
         $sql = $this->db->prepare("INSERT INTO SURVEYLOOKUP (`SurveyID`, `UserID`, `ChamberID`, `BusinessID`, `GroupID`, `RelatedChamber`) VALUES (:id,:userid,:chamberid,:businessID,:groupID,:relChamber);");
         $result = $sql->execute(array(
            "id" => $ID,
            "userid" => $userID,
            "chamberid" => $chamberID,
            "businessID" => $businessID,
            "groupID" => $groupID,
            "relChamber" => $_SESSION['chamber']
         ));
      }

      if ($result)
        return true;
      else
        return false;
  }


  // Returns a list of child chamber ID's
  function get_Child_Chambers($chamber){
      $sql = $this->db->prepare("SELECT chamberID from CHAMBER where parent_id=:myChamber;");

      $result = $sql->execute(array(
        "myChamber" => $chamber
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }


  function reject_TmpNotifications($notifID, $chamber){
      $sql = $this->db->prepare("CALL SPrejectNotificationTmp(:id,:chamberID)");

      $result = $sql->execute(array(
        "id" => $notifID,
        "chamberID" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }

  function reject_TmpEvent($eventID, $chamber){
      $sql = $this->db->prepare("CALL SPrejectEventTmp(:id,:chamberID)");

      $result = $sql->execute(array(
        "id" => $eventID,
        "chamberID" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }
  function reject_TmpSurvey($SurveyID, $chamber){
      $sql = $this->db->prepare("CALL SPrejectSurveyTmp(:id,:chamberID)");

      $result = $sql->execute(array(
        "id" => $SurveyID,
        "chamberID" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }

  // Deletes the reference to a notication for a given chamber
  function delete_Notification($notifID, $chamber){
      $sql = $this->db->prepare("DELETE FROM NOTIFICATIONLOOKUP WHERE NotificationID = :id AND RelatedChamber = :chamberID;");

      $result = $sql->execute(array(
        "id" => $notifID,
        "chamberID" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }
  function delete_Event($eventID, $chamber){
      $sql = $this->db->prepare("DELETE FROM MYEVENTLOOKUP WHERE EventID = :id AND RelatedChamber = :chamberID;");

      $result = $sql->execute(array(
        "id" => $eventID,
        "chamberID" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }
  function delete_Survey($surveyid, $chamber){
      $sql = $this->db->prepare("DELETE FROM SURVEYLOOKUP WHERE SurveyID = :id AND RelatedChamber = :chamberID;");

      $result = $sql->execute(array(
        "id" => $surveyid,
        "chamberID" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }

  // Returns a list of emails related to a given chamber
  function get_Chamber_Emails($chamber){
      $sql = $this->db->prepare("SELECT email FROM USER WHERE chamberID = :chamberID;");

      $result = $sql->execute(array(
        "chamberID" => $chamber
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_NUM);
      }
      else{
          return false;
      }
  }

  function get_Group_Emails($group){
      $sql = $this->db->prepare("SELECT u.email FROM USER u LEFT JOIN GROUPMEMBERS g on g.UserID = u.UserID WHERE g.GroupID = :groupID;");

      $result = $sql->execute(array(
        "groupID" => $group
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_NUM);
      }
      else{
          return false;
      }
  }

  function get_Business_Emails($bus){
      $sql = $this->db->prepare("SELECT email FROM USER where businessID = :busID;");

      $result = $sql->execute(array(
        "busID" => $bus
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_NUM);
      }
      else{
          return false;
      }
  }

  // Returns the count of people going to an event
  function get_EventGoing($EventID){
      $sql = $this->db->prepare("SELECT COUNT(*) FROM MYEVENTGOING WHERE EventID = :id;");

      $result = $sql->execute(array(
        "id" => $EventID
      ));

      if ($result){
          return $sql->fetchColumn(0);
      }
      else{
          return false;
      }
  }
  // Returns the count of people not going to an event
  function get_EventNotGoing($EventID){
      $sql = $this->db->prepare("SELECT COUNT(*) FROM MYEVENTCANTGO WHERE EventID = :id;");

      $result = $sql->execute(array(
        "id" => $EventID
      ));

      if ($result){
          return $sql->fetchColumn(0);
      }
      else{
          return false;
      }
  }
   // Returns the count of people who where offered an event
  function get_EventCount($EventID){
      $sql = $this->db->prepare("CALL SPgetEventCount(:id)");

      $result = $sql->execute(array(
        "id" => $EventID
      ));

      if ($result){
          return $sql->fetchColumn(0);
      }
      else{
          return false;
      }
  }
  // Returns a list of names of people marked attending an event
  function get_EventNamesAttending($EventID){
      $sql = $this->db->prepare("SELECT u.firstname, u.lastname, e.EventID FROM MYEVENTGOING e
                                LEFT JOIN USER u on e.UserID = u.UserID WHERE e.EventID = :event;");
      $result = $sql->execute(array(
        "event" => $EventID
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }
  // Returns a list of names of people marked NOT attending an event
  function get_EventNamesNotGoing($EventID){
      $sql = $this->db->prepare("SELECT u.firstname, u.lastname, e.EventID FROM MYEVENTCANTGO e
                                LEFT JOIN USER u on e.UserID = u.UserID WHERE e.EventID = :event;");
      $result = $sql->execute(array(
        "event" => $EventID
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }

}
?>
