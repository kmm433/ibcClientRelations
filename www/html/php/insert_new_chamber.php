<?php
include 'db_handler.php';
$db = new DB_Handler();

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

$address = $_POST['address'];
$postal = $_POST['postal'];

$established = null;

$addressid = null;
$postalid = null;
$id = null;

$options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
$password = password_hash($password, PASSWORD_BCRYPT, $options);

$results =  $db->insertAddress($address['line1'], $address['line2'], $address['city'], $address['state'], $address['postcode'], $address['country']);
$addressid = $db->getLastID();

if(!(isset($postal) || empty($postal))){
    $results =  $db->insertAddress($postal['line1'], $postal['line2'], $postal['city'], $postal['state'], $postal['postcode'], $postal['country']);
    $postalid = $db->getLastID();
}
else{
    $postalid = $addressid;
}

$results = $db->insertChamber($established, $addressid, $postalid, $abn, $parentID, $name, $businessphone, $mobilephone, $anziccode, $website);
$id = $db->getLastID();
$a = array($email, $password, null, $id, $firstname, $lastname, null, $jobtitle, 1);


$results = $db->insertUser($email, $password, null, $id, $firstname, $lastname, null, $jobtitle, 1);

$optionaltable = "OPTIONALFIELDS_";
$optionaltable .= $id;

$businesstable = "BUSINESS_";
$businesstable .= $id;


$db->justExecute("CREATE TABLE $optionaltable (
                      `DataID` int(11) NOT NULL AUTO_INCREMENT,
                      `displayname` varchar(45) NOT NULL,
                      `columnname` varchar(45) DEFAULT NULL,
                      `inputtype` varchar(45) NOT NULL,
                      `mandatory` varchar(5) NOT NULL,
                      `tablename` varchar(45) DEFAULT NULL,
                      `ordering` int(11) NOT NULL,
                      `minimum` int(11) DEFAULT NULL,
                      `maximum` int(11) DEFAULT NULL,
                      `disabled` tinyint(4) NOT NULL DEFAULT '0',
                      PRIMARY KEY (`DataID`),
                      UNIQUE KEY `displayname_UNIQUE` (`displayname`)
                    )ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1");

$db->justExecute("CREATE TABLE $businesstable (
                      `DataID` int(11) NOT NULL,
                      `answer` varchar(45) DEFAULT NULL,
                      `BUSINESSID` varchar(45) DEFAULT NULL,
                      `answerID` int(11) NOT NULL AUTO_INCREMENT,
                      PRIMARY KEY (`answerID`)
                    )");

//default settings to automatically expire new members a year from sign up date
$db->addPayment("Annual", null, $id);
//default settings to automatcally approve new users
$db->justExecute("INSERT INTO APPROVAL (chamberID) VALUES ($id)");


echo json_encode($results);

?>
