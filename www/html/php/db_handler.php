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
    $sql = $this->db->prepare("SELECT firstname, lastname, email, businessID FROM USER WHERE chamberID=$chamberID;");
    if ($sql->execute()) {
      return $sql->fetchall();
    }
    return $chamberID;
  }
}

?>
