<?php
include 'db_handler.php';

$db = new DB_Handler();
$chamber = $_POST['chamber'];
$results = $db->getFields("SELECT * FROM MANDATORYFIELD UNION
                            SELECT * FROM OPTIONALFIELDS_$chamber
                            WHERE disabled = 0
                            ORDER BY ordering");

/* WHEREMANDATORYFIELD.CHAMBERID = PARENTID OF 666 */

echo json_encode($results);
?>
