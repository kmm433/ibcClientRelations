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

  // Request Messages
  function get_messages(){ /*todo: pass group ID, select * where groupID matches*/
    $sql = $this->db->prepare("SELECT * FROM NOTIFICATION");
    if($sql->execute()) {
        $row = $sql->fetchAll(PDO::FETCH_ASSOC);
        //$results = array ('NotificationID'=>$row['NotificationID'],'NoticeTitle'=>$row['NoticeTitle'], 'Notice'=>$row['Notice'], 'GroupID'=>$row['GroupID'], 'DatePosted'=>$row['DatePosted']);
        return $row;
    }
    return false;
  }

}

?>
