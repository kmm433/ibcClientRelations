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
    $sql = $this->db->prepare("SELECT password FROM USER WHERE email=:user_name");
    if($sql->execute(array('user_name' => $username))) {
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      if(password_verify($password, $row['password']))
        return $username;
    }
    return false;
  }

  // Checks that an email account exists in the users table, used for password reset
  function createPasswordToken($email) {
    $this->db->beginTransaction();
    $sql = $this->db->prepare("SELECT UserID FROM USER WHERE email=:email_address");
    $sql->execute(array('email_address' => $email));
    $userId = $sql->fetch(PDO::FETCH_ASSOC)['UserID'];
    if($userId) {
      $sql = $this->db->prepare("SELECT token, expiry FROM RESET_TOKEN");
      $sql->execute();
      $existingTokens = $sql->fetchAll(PDO::FETCH_ASSOC);
      $token = '';
      do {
        for($i = 0; $i < 16; $i++) {
          $token .= mt_rand(0, 9);
        }
      } while(in_array($token, $existingTokens['token']));
      // Delete any existing tokens that have expired
      $sql = $this->db->prepare("DELETE FROM RESET_TOKENS WHERE expiry < NOW()");
      $sql->execute();
      // New tokens are valid for one hour
      $sql = $this->db->prepare("INSERT INTO RESET_TOKENS (UserID, token, expiry) VALUES (:user_id, :token, DATE_ADD(NOW(), INTERVAL 1 HOUR))");
      $sql->execute(array(
        'user_id' => $userId,
        'token' => $token
      ));
      $this->db->commit();
      return $token;
    }
    $this->db->rollBack();
    return false;
  }

  // Checks that a provided password reset token both exists and is not expired
  // If succes returns the associated userid
  function resetPassword($token, $password) {
    $sql = $this->db->prepare("SELECT UserID FROM RESET_TOKENS WHERE token=:token AND expiry > NOW()");
    $sql->execute(array('token' => $token));
    $userId = $sql->fetch(PDO::FETCH_ASSOC)['UserID'];
    if ($userId) {

      $options = [
          'cost' => 11,
          'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
      ];
      $passwordHashed = password_hash($password, PASSWORD_DEFAULT, $options);

      $sql = $this->db->prepare("UPDATE USER SET password=:new_password WHERE UserID=:user_id");
      $sql->execute(array(
        'new_password' => $passwordHashed,
        'user_id' => $userId,
      ));
      $sql = $this->db->prepare("DELETE FROM RESET_TOKENS WHERE token=:token");
      $sql->execute(array('token' => $token));
      return 'success';
    }
    return 'invalid';
  }

  // Changes a current user's password
  function changePassword($userId, $currentPassword, $newPassword) {
    $this->db->beginTransaction();
    $sql = $this->db->prepare("SELECT password from USER where UserID=:user_id");
    if ($sql->execute(array('user_id' => $userId))) {
      $datatbasePassword = $sql->fetch(PDO::FETCH_ASSOC)['password'];
      if(password_verify($currentPassword, $datatbasePassword)) {
        $options = [
            'cost' => 11,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];
        $passwordHashed = password_hash($newPassword, PASSWORD_DEFAULT, $options);
        $sql = $this->db->prepare("UPDATE USER SET password=:new_password WHERE UserID=:user_id");
        if ($sql->execute(array(
          'new_password' => $passwordHashed,
          'user_id' => $userId
        ))) {
          $this->db->commit();
          return 'success';
        }
      }
      else {
        $this->db->rollBack();
        return 'unauthorized';
      }
    }
    $this->db->rollBack();
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
    $sql = $this->db->prepare("SELECT UserID, firstname, lastname, type, chamberID, businessID FROM USER WHERE email=:email_address");
    if ($sql->execute(array('email_address' => $email_addr))) {
      $results = $sql->fetch( PDO::FETCH_ASSOC );
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

  // Creates a dummy business for a user if for some reason one hasn't been provided
  function createEmptyBusiness($chamberId, $userId) {
    $this->db->beginTransaction();
    $sql = $this->db->prepare("INSERT INTO BUSINESS (chamberID, businessname, businessphone) VALUES (:chamber_id, '', 0)");
    if ($sql->execute(array('chamber_id' => $chamberId))) {
      $sql = $this->db->prepare("SELECT LAST_INSERT_ID()");
      if ($sql->execute()) {
        $businessId = $sql->fetch(PDO::FETCH_NUM)[0];
        $sql = $this->db->prepare("UPDATE USER SET businessID=:business_id WHERE UserID=:user_id");
        if ($sql->execute(array(
          'business_id' => $businessId,
          'user_id' => $userId
        ))) {
          $this->db->commit();
          return $businessId;
        }
      }
    }
    $this->db->rollBack();
    return false;
  }

  // Gets all variable information about a user
  function getDetail($memberID, $query) {
    $completeQuery = "SELECT $query FROM USER LEFT JOIN BUSINESS on USER.businessID=BUSINESS.businessID WHERE USER.UserID='$memberID'";
    $sql = $this->db->prepare($completeQuery);
    if($sql->execute());
      return  $sql->fetchall();
    return false;
  }

  // Allows a standard detail to be updated for a user
  function setDetail($memberID, $value, $column, $table) {
    // Quote the input strings best we can do here
    $value = $this->db->quote($value);
    $sql = $this->db->prepare("UPDATE BUSINESS LEFT JOIN USER ON BUSINESS.businessID=USER.businessId SET $table.$column=$value WHERE USER.UserID='$memberID'");
    if($sql->execute())
      return true;
    else
      return false;
  }

  // Allows a chamber specific detail to be updated for a user
  function setChamberSpecificDetail($memberID, $dataID, $businessID, $value, $column, $table) {
    //Quote the input strings best we can do here
    $value = $this->db->quote($value);
    // Check if there is s preexisting value
    $queryString = "SELECT * FROM $table JOIN BUSINESS ON $table.BUSINESSID=BUSINESS.businessID JOIN USER ON USER.businessID=BUSINESS.businessID WHERE USER.UserID='$memberID' AND $table.DataID='$dataID'";
    $sql = $this->db->prepare($queryString);
    if ($sql->execute()) {
      if ($sql->rowCount() > 0) {
        $sql = $this->db->prepare("UPDATE $table JOIN BUSINESS ON $table.BUSINESSID=BUSINESS.businessID JOIN USER ON USER.businessID=BUSINESS.businessID SET $table.answer='$value' WHERE USER.UserID='$memberID' AND $table.DataID=$dataID");
        if ($sql->execute()) {
          return true;
        }
      }
      else {
        $sql = $this->db->prepare("INSERT INTO $table (DataID, answer, BUSINESSID) VALUES ($dataID, $value, $businessID)");
        if ($sql->execute()) {
          return true;
        }
      }
    }
    return false;
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

  // Retrieves the callback domain for xero from the database
  function getXeroInvoiceCallbackDomain() {
    $sql = $this->db->prepare("SELECT domain from CALLBACK_URIS WHERE callback='xero_invoice'");
    $sql->execute();
    return $sql->fetch(PDO::FETCH_ASSOC);
  }

  //Updates the Xero APIs Consumer Key and Secret for a given chamber
  function updateXeroAPIKeys($chamberId, $consumerKey, $consumerSecret) {
    $this->db->beginTransaction();
    $sql = $this->db->prepare( "SELECT COUNT(chamberID) FROM CHAMBER_API_KEYS WHERE chamberID=:chamber_id" );
    $sql->execute( array(
      'chamber_id' => $chamberId,
    ));
    $existing = $sql->fetch( PDO::FETCH_ASSOC );
    // If there is an existing entry update it
    if( $existing['COUNT(chamberID)'] > 0) {
      $sql = $this->db->prepare("UPDATE CHAMBER_API_KEYS SET xero_key=:consumer_key, xero_secret=:consumer_secret WHERE chamberID=:chamber_id");
      if  ( $sql->execute( array(
        'chamber_id' => $chamberId,
        'consumer_key' => $consumerKey,
        'consumer_secret' => $consumerSecret,
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
      $sql = $this->db->prepare( "INSERT INTO CHAMBER_API_KEYS (chamberID, xero_key, xero_secret) VALUES (:chamber_id, :consumer_key, :consumer_secret)" );
      if  ( $sql->execute( array(
        'chamber_id' => $chamberId,
        'consumer_key' => $consumerKey,
        'consumer_secret' => $consumerSecret,
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

  // Retrieves the consumer key and secret from the database
  function getXeroConsumerDetails($chamberId) {
    $sql = $this->db->prepare("SELECT xero_key, xero_secret FROM CHAMBER_API_KEYS WHERE chamberID=:chamber_id");
    $sql->execute(array('chamber_id' => $chamberId));
    return $sql->fetch(PDO::FETCH_ASSOC);
  }

  // Retrieves the callback uri for xero Invoices
  function getXeroInvoiceCallbackURI() {
    $sql = $this->db->prepare("SELECT uri FROM CALLBACK_URIS WHERE callback='xero_invoice'");
    $sql->execute();
    return $sql->fetch(PDO::FETCH_ASSOC);
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

  // Retrieves the expiry date for a specified user
  function getMemberExpiryDate($userId) {
    $sql = $this->db->prepare("SELECT expiry FROM USER WHERE UserID=:user_id");
    $sql->execute(array('user_id' => $userId));
    return $sql->fetch(PDO::FETCH_ASSOC);
  }

  // Updates a specified user's expiry date in the database
  function updateMemberExpiryDate($userId, $date) {
    $sql = $this->db->prepare("UPDATE USER SET expiry=:expiry_date WHERE UserID=:user_id");
    if($sql->execute(array(
      'user_id' => $userId,
      'expiry_date' => $date
    )))
      return true;
    else {
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

  function get_UserConfirmSurvey($SurveyID){
      $sql = $this->db->prepare("CALL SPconfirmUserSurvey(:survey,:user);");
      $result = $sql->execute(array(
        "survey" => $SurveyID,
        "user" =>$_SESSION['userid']
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }
  function get_UserConfirmEvent($EventID){
      $sql = $this->db->prepare("CALL SPconfirmUserEvent(:event,:user);");
      $result = $sql->execute(array(
        "event" => $EventID,
        "user" =>$_SESSION['userid']
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
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

//update the payment type (switch to annual or pro rata) if annual expiry is null
function updatePayment($payment, $expiry, $chamber){

    if(!isset($expiry) || empty($expiry)) { $expiry = null; }

    $sql = $this->db->prepare("UPDATE PAYMENTTYPES SET type= :type, expiry_date=:expiry_date where chamberid=:chamber");
    if($sql->execute(array(
      "type" => $payment,
      "expiry_date" => $expiry,
      "chamber" => $chamber
    ))){
        return true;
    }
    return false;
}


//add default payment type upon creating a chamber
function addPayment($payment, $expiry, $chamber){
    try{
        if(!isset($expiry) || empty($expiry)) { $expiry = null; }

        $sql = $this->db->prepare("INSERT INTO PAYMENTTYPES (chamberid, type, expiry_date) VALUES (:chamber, :type, :expiry_date)");
        if($sql->execute(array(
          "type" => $payment,
          "expiry_date" => $expiry,
          "chamberid" => $chamber
        ))){
            return true;
        }
        return false;
    }
    catch(PDOExecption $e) {
        echo $e->getMessage();
    }
}

  function justExecute($query){
      $sql = $this->db->prepare($query);
      if($sql->execute()){
          return true;
      }
      return false;
  }

  //count how many users exists with this value (to check for email or name duplicates)
  function countUser($query){
      $sql = $this->db->prepare($query);
      if ($sql->execute()) {
        $row = $sql->fetchColumn(0);
        return $row;
      }
      return false;
  }

  function enableSignupField($chamber, $name, $able){
      try{

          $sql = $this->db->prepare("UPDATE MEMBERSHIPS SET disabled=:disabled WHERE name = :name AND chamberID = :chamberID");
          if($sql->execute(array(
            "disabled" => $able,
            "name" => $name,
            "chamberID" => $chamber
          ))){
              return true;
          }
          return false;
      }
      catch(PDOExecption $e) {
          echo $e->getMessage();
      }
  }

  function insertNewMembership($chamber, $name, $info, $amount){
      try{
          $sql = $this->db->prepare("INSERT INTO MEMBERSHIPS (chamberID, name, info, amount, 1) SET disabled=0 WHERE displayname = '$name'");
          if($sql->execute(array(
            "type" => $payment,
            "expiry_date" => $expiry,
            "chamberid" => $chamber
          ))){
              return true;
          }
          return false;
      }
      catch(PDOExecption $e) {
          echo $e->getMessage();
      }
  }


    function updateMembership($membershipID, $name, $info, $amount){
        try{
            $sql = $this->db->prepare("UPDATE MEMBERSHIPS SET name = :name, info = :info, amount = :amount WHERE membershipID = :membershipID");
            if($sql->execute(array(
              "membershipID" => $membershipID,
              "name" => $name,
              "info" => $info,
              "amount" => $amount
            ))){
                return true;
            }
            return false;
        }
        catch(PDOExecption $e) {
            echo $e->getMessage();
        }

    }


    function getApproval($chamber){
        try{
            $sql = $this->db->prepare("SELECT approval FROM APPROVAL WHERE chamberID = :chamber");
            $sql->bindParam(':chamber', $chamber, PDO::PARAM_INT);

            if($sql->execute()){
                return $sql->fetchColumn(0);
            }
            return false;
        }
        catch(PDOExecption $e) {
            echo $e->getMessage();
        }

    }

    function updateApproval($chamber, $approval){
        try{
            $sql = $this->db->prepare("UPDATE APPROVAL SET approval = :approval WHERE chamberID = :chamber");
            $sql->bindParam(':chamber', $chamber, PDO::PARAM_INT);
            $sql->bindParam(':approval', $approval, PDO::PARAM_INT);

            if($sql->execute()){
                return true;
            }
            return false;
        }
        catch(PDOExecption $e) {
            echo $e->getMessage();
        }
    }


  function modify_Notification($notifID,$title,$message){
      $sql = $this->db->prepare("UPDATE NOTIFICATION SET `NoticeTitle`=:thisTitle, `Notice`=:thisMessage WHERE `NotificationID`=:id;");
      $result = $sql->execute(array(
        ":id" => $notifID,
        ":thisTitle" => $title,
        ":thisMessage" => $message
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }

  function modify_Event($EventID,$EventTitle,$Event,$EventDate,$endTime,$Location,$EventURL){
      $sql = $this->db->prepare("UPDATE MYEVENT SET `EventTitle`=:thisTitle, `Event`=:thisEvent, `EventDate`=:thisEventDate, `endTime`=:thisendTime, `Location`=:thislocation, `EventURL`=:thisUrl WHERE `EventID`=:id;");
      $result = $sql->execute(array(
        ":id" => $EventID,
        ":thisTitle" => $EventTitle,
        ":thisEvent" => $Event,
        ":thisEventDate" => $EventDate,
        ":thisendTime" => $endTime,
        ":thislocation" => $Location,
        ":thisUrl" => $EventURL
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }

  function get_StatReview(){
      $sql = $this->db->prepare("SELECT * FROM STAT_RENEW WHERE ChamberID = :chamber ORDER BY RenewDate;");
      $result = $sql->execute(array(
        ":chamber" => $_SESSION['chamber']
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }
  function insert_StatReview(){
      $sql = $this->db->prepare("INSERT INTO STAT_RENEW (UserID, ChamberID, RenewDate) VALUES (:user,:chamber,NOW());");
      $result = $sql->execute(array(
          ":user" => $_SESSION['userid'],
          ":chamber" => $_SESSION['chamber']
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }
  function get_StatNewMember(){
      $sql = $this->db->prepare("SELECT * FROM STAT_NEWMEMBER WHERE ChamberID = :chamber ORDER BY MemberDate;");
      $result = $sql->execute(array(
        ":chamber" => $_SESSION['chamber']
      ));

      if ($result){
          return $sql->fetchAll(PDO::FETCH_ASSOC);
      }
      else{
          return false;
      }
  }
  function insert_StatNewMember($userID,$chamber){
      $sql = $this->db->prepare("INSERT INTO STAT_NEWMEMBER (UserID, ChamberID, MemberDate) VALUES (:user,:chamber,NOW());");
      $result = $sql->execute(array(
          ":user" => $userID,
          ":chamber" => $chamber
      ));

      if ($result){
          return true;
      }
      else{
          return false;
      }
  }

  }



?>
