<?php
include 'db_handler.php';
$db = new DB_Handler();

//removes HTML tags, decodes url, replaces multiple spaces and leading and trailing spaces
function sanitise($variable){
    $sanitised = trim(preg_replace('/ +/', ' ', html_entity_decode(strip_tags($variable))));
    return $sanitised;
}

$error = "success";
$chamber = $_POST["chamber"];

$tablename = "BUSINESS_";
$tablename .= $chamber;

$answers = $_POST["answers"];
$column = $_POST["columnname"];
$table = $_POST["tablename"];
$DataID = $_POST["DataID"];
$membershipID = $_POST["membershipID"];

$email = null;
$password = null;
$firstname = null;
$lastname = null;
$jobtitle = null;

$abn = null;
$businessname = null;
$businessphone = null;
$anzic = null;
$established=null;
$mobile=null;
$numofemployees=null;
$website=null;
$addressid=null;
$id="HELLO";

$address = $_POST['address'];
$postal = $_POST['postal'];


$size = count($answers);


for($i = 0; $i<($size); $i++){

    if($table[$i]=='USER' && $answers[$i] != ""){

        if($column[$i] == 'email'){
            !filter_var($answers[$i], FILTER_VALIDATE_EMAIL) ? $error = "Invalid Input 1" : $email = $answers[$i];
        }
        else if($column[$i] == 'password')
            $password = $answers[$i];
        else if($column[$i] == 'firstname')
            $firstname = $answers[$i];
        else if($column[$i] == 'lastname')
            $lastname = $answers[$i];
        else if($column[$i] == 'jobtitle')
            $jobtitle = $answers[$i];
        else
            $error = $column[$i];
    }

    else if($table[$i]=='BUSINESS' && $answers[$i] != ""){
        if($column[$i] == 'established')
            $established = $answers[$i];

        else if($column[$i] == 'ABN'){
            !filter_var($answers[$i], FILTER_VALIDATE_INT) ? $error = "Invalid Input Field: ABN" : ($abn = $answers[$i]);
        }
        else if($column[$i] == 'businessphone'){
            filter_var($answers[$i], FILTER_VALIDATE_INT) ? ($businessphone = $answers[$i]) : $error = "Invalid Input Field: Business Phone";
        }
        else if($column[$i] == 'businessname'){
            $businessname = sanitise($answers[$i]);
        }
        else if($column[$i] == 'mobile'){
            filter_var($answers[$i], FILTER_VALIDATE_INT) ? ($mobile = $answers[$i]) : $error = "Invalid Input Field: mobile";
        }
        else if($column[$i] == 'anziccode'){
            filter_var($answers[$i], FILTER_VALIDATE_INT) ? ($anzic = $answers[$i]) : $error = "Invalid Input Field: Anzic Code";
        }
        else if($column[$i] == 'numofemployees'){
            filter_var($answers[$i], FILTER_VALIDATE_INT) ? $numofemployees = $answers[$i] : $error = "Invalid Input Field: Number of Employees";
        }
        else if($column[$i] == 'website'){
            $website = sanitise($answers[$i]);
        }
        else{
            $error = "Error";
        }

    }
}

$options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
$password = password_hash($password, PASSWORD_DEFAULT, $options);

$results =  $db->insertAddress($address['line1'], $address['line2'], $address['city'], $address['state'], $address['postcode'], $address['country']);
$addressid = $db->getLastID();
if(!isset($postal) || empty($postal)){
    $postalid =  $db->insertAddress($postal['line1'], $postal['line2'], $postal['city'], $postal['state'], $postal['postcode'], $postal['country']);
    $postalid = $db->getLastID();
}
else{
    $postalid = $addressid;
}


$results = $db->insertBusiness($established, $chamber, $addressid, $postalid, $abn, $businessname, $businessphone, $mobile, $anzic, $numofemployees, $website);
$id = $db->getLastID();

$results1 =  $db->insertUser($email, $password, $id, $chamber, $firstname, $lastname, 'CURRENT_TIMESTAMP() - INTERVAL 1 DAY', $jobtitle, 3);
$userid = $db->getLastID();


$var = null;
for($i = 0; $i<($size); $i++){
    if($table[$i]==$tablename){

        $var = $answers[$i];
        $data = $DataID[$i];

        $db->insertExtraUserData($tablename, $data, $var, $id);
    }
}

echo json_encode($userid);
$db->insert_StatNewMember($userID,$chamber);

?>
