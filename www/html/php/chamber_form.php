<?php
include 'db_handler.php';

$db = new DB_Handler();
$test = $_POST["chamber"];
$results = $db->getFields("SELECT * FROM MANDATORYFIELD UNION
                            SELECT * FROM OPTIONALFIELDS_$test
                            ORDER BY ordering ASC");

/* WHEREMANDATORYFIELD.CHAMBERID = PARENTID OF 666*/

echo json_encode($results);
?>
