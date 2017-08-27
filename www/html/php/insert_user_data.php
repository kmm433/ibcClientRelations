<?php
include 'db_handler.php';

$db = new DB_Handler();

$chamber = $_POST["chamberID"];
$email = $_POST["email"];
$extra_business_table = "BUSINESS_";
$extra_business_table .= $chamber;

$options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
$password = password_hash($_POST["password"], PASSWORD_BCRYPT, $options);


$answers = $_POST["answers"];
$column = $_POST["column"];
$table = $_POST["table"];

$size = count($answers);

$a=NULL;
$col=NULL;
$varB=NULL;
$colB=NULL;

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

}
echo json_encode($colB);
$db->insertUser("INSERT INTO USER (email, password, expiry, chamberID$col)
                    VALUES('$email', '$password', CURRENT_TIMESTAMP + INTERVAL 1 YEAR, $chamber $a)");

$db->insertUser("INSERT INTO BUSINESS (chamberID, $colB)
                    VALUES($chamber, $varB)");

?>
