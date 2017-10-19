<?php
include 'db_handler.php';
$db = new DB_Handler();

if(isset($_SESSION['user'])){
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $abn = $_POST["abn"];
    $businessphone = $_POST["businessphone"];
    $mobilephone = $_POST["mobilephone"];
    $anziccode = $_POST["anziccode"];
    $website = $_POST["website"];
    $parentID = $_POST["parentID"];
    $jobtitle = $_POST["jobtitle"];
    $chamberemail = $_POST['chamberemail'];

    $address = $_POST['address'];
    $postal = $_POST['postal'];

    if(!isset($postal['line1']) || $postal['line1'] == ""){
        $postal = $address;
    }

    $options = [
        'cost' => 11,
        'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
    ];
    $password = password_hash($password, PASSWORD_BCRYPT, $options);

    $results = $db->insertChamberTransaction($name, $email, $password, $firstname, $lastname, $abn, $businessphone,$mobilephone, $anziccode,$website, $parentID, $jobtitle,$chamberemail, $address, $postal);

    echo json_encode($results);

}
else {
    echo json_encode(false);
}
?>
