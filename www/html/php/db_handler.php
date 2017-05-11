<?php

class DB_Handler
{
  private $db = null;

  // Initiates a connection to the database on construction
  function __construct($db_host, $db_name, $db_user, $db_pass) {
    try {
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
    $sql = $this->db->prepare("SELECT pass, ID FROM users WHERE name='$username'");
    if($sql->execute()) {
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      if($row['pass'] == $password)
        return $row['ID'];
    }
    return false;
  }
}

?>
