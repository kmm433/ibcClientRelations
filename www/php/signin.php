<?php
include 'dbinfo.inc';
try {
  $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
} catch (PDOException $e){
  echo "Connection Failed " . $e->getMessage();
}
?>
