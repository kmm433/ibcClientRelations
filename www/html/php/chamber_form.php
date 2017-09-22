<?php
include 'db_handler.php';

$db = new DB_Handler();

$chamber = $_SESSION['chamber'];
$results = $db->getFields("SELECT * FROM MANDATORYFIELD UNION
                            SELECT * FROM OPTIONALFIELDS_$chamber
                            ORDER BY disabled, ordering");

/* WHEREMANDATORYFIELD.CHAMBERID = PARENTID OF 666 */

echo json_encode($results);
?>
