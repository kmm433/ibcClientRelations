<?php
include 'db_handler.php';

$db = new DB_Handler();
$test = $_POST["test"];

$size = count($test);

for( $i = 0; $i<($size-2); $i++ ) {
    $a .= $test[$i];
    $a .= ", ";
}
$a .= $test[$size-1];

$results = $db->getFields("SELECT '$test' FROM MANDATORYFIELD where chamberID=1");

echo json_encode("success");

?>
