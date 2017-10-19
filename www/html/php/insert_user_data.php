<?php
include 'db_handler.php';
$db = new DB_Handler();

//removes HTML tags, decodes url, replaces multiple spaces and leading and trailing spaces
function sanitise($variable){
    $sanitised = trim(preg_replace('/ +/', ' ', html_entity_decode(strip_tags($variable))));
    return $sanitised;
}

$error = "success";
if(!isset($_POST['chamber']) || empty($_POST['chamber'])) {
    $chamber = $_SESSION['chamber'];
} else {
    $chamber = $_POST['chamber'];
}

$tablename = "BUSINESS_";
$tablename .= $chamber;
$answers = $_POST["answers"];
$column = $_POST["columnname"];
$table = $_POST["tablename"];
$DataID = $_POST["DataID"];

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
$postalid = null;
$id="HELLO";

$address = $_POST['address'];
$postal = $_POST['postal'];

$requireApproval = $_POST['requireApproval'];
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
            else if($column[$i] == 'ABN')
                $abn = $answers[$i];
            else if($column[$i] == 'businessname')
                $businessname = $answers[$i];
            else if($column[$i] == 'businessphone')
                $businessphone = $answers[$i];
            else if($column[$i] == 'mobile')
                $mobile = $answers[$i];
            else if($column[$i] == 'anziccode')
                $anziccode = $answers[$i];
            else if($column[$i] == 'numofemployees')
                $numofemployees = $answers[$i];
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

$userid = $db->insertUserTransaction($size, $firstname, $lastname, $jobtitle, $email, $table, $tablename, $password, $address, $postal, $postalid, $addressid, $established, $chamber, $abn, $businessname, $businessphone, $mobile, $anzic, $numofemployees, $website, $DataID, $answers, $requireApproval)

?>
