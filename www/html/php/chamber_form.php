<?php
include 'db_handler.php';

$db = new DB_Handler();
$test = $_POST["test"];
$results = $db->getFields("SELECT * FROM MANDATORYFIELD UNION
                            SELECT * FROM OPTIONALFIELDS_666
                            ORDER BY ordering ASC");

/* WHEREMANDATORYFIELD.CHAMBERID = PARENTID OF 666*/

echo json_encode($results);
?>
