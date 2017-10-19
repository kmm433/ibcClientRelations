<?php
include 'db_handler.php';
$db = new DB_Handler();

  if(isset($_SESSION['user'])){
    $email = $_POST["email"];
    $password = $_POST["password"];
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $jobtitle = $_POST["jobtitle"];
    $chamber = $_POST["chamber"];

    $options = [
        'cost' => 11,
        'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
    ];
    $password = password_hash($password, PASSWORD_DEFAULT, $options);


    $results =  $db->insertChamberUser($email, $password, null, $chamber, $firstname, $lastname, null, $jobtitle, 1);
    echo json_encode($results);
  }
else {
    echo json_encode(false);
}
?>
