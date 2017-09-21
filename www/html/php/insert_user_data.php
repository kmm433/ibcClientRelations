<?php
include 'db_handler.php';
$db = new DB_Handler();


$chamber = $_POST["chamber"];

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

$abn = null;
$businessname = null;
$businessphone = null;
$anzic = null;


$size = count($answers);
for($i = 0; $i<($size); $i++){
    if($table[$i]=='USER'){
        if($column[$i] == 'email')
            $email = $answers[$i];
        else if($column[$i] == 'password')
            $password = $answers[$i];
        else if($column[$i] == 'firstname')
            $firstname = $answers[$i];
        else if($column[$i] == 'lastname')
            $lastname = $answers[$i];
    }
    else if($table[$i]=='BUSINESS'){
        if($column[$i] == 'ABN')
            $abn = $answers[$i];
        else if($column[$i] == 'businessname')
            $businessname = $answers[$i];
        else if($column[$i] == 'businessphone')
            $businessphone = $answers[$i];
        else if($column[$i] == 'anziccode')
            $anzic = $answers[$i];
    }
}

$options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
$password = password_hash($password, PASSWORD_BCRYPT, $options);

$id = $db->insertBusiness("INSERT INTO BUSINESS (chamberID, ABN, businessname, businessphone, anziccode)
                    VALUES($chamber, $abn, '$businessname', $businessphone, $anzic)");

$results = $db->insertUser("INSERT INTO USER (businessID, email, password, chamberID, firstname, lastname, expiry)
                    VALUES($id,'$email', '$password', $chamber, '$firstname', '$lastname', CURRENT_TIMESTAMP + INTERVAL 1 YEAR)");

for($i = 0; $i<($size); $i++){
    if($table[$i]==$tablename){
        $varC = $answers[$i];
        $data = $DataID[$i];

        $db->insertUser("INSERT INTO $tablename (DataID, answer, BUSINESSID)
                            VALUES($data, '$varC', $id)");
    }
}

echo json_encode($data);


/*
$size = count($answers);

$a=NULL;
$col=NULL;
$varB=NULL;
$colB=NULL;
$varC=NULL;
$colC=NULL;

for( $i = 0; $i<($size); $i++ ) {

    if($table[$i]=='USER'){

        $a .= ", '";
        $a .= $answers[$i];
        $a .= "'";

        $col .= ", ";
        $col .= $column[$i];
    }

    else if($table[$i]=='BUSINESS'){

        if($i != 0){
            $varB .= ", '";
            $colB .= ", ";
        }
        else {
            $varB .= "'";
        }

        $varB .= $answers[$i];
        $varB .= "'";

        $colB .= $column[$i];
    }

    else if($table[$i]==$tablename){

        if($i != 0){
            $varC .= ", '";
            $colC .= ", ";
        }
        else {
            $varC .= "'";
        }

        $varC = $answers[$i];
        $data = $DataID[$i];

        $db->insertUser("INSERT INTO $tablename (DataID, answer, BUSINESSID)
                            VALUES($data, '$varC', 1233)");
    }

}
$db->insertUser("INSERT INTO USER (expiry, chamberID$col)
                    VALUES(CURRENT_TIMESTAMP + INTERVAL 1 YEAR, $chamber $a)");

$db->insertUser("INSERT INTO BUSINESS (chamberID, $colB)
                    VALUES($chamber, $varB)");
*/
?>
