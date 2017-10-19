<?php
include 'db_handler.php';

$db = new DB_Handler();
if(!isset($_POST['chamber']) || empty($_POST['chamber'])) {
    $chamber = $_SESSION['chamber'];
} else {
    $chamber = $_POST['chamber'];
}

$results = $db->getFields("SELECT * FROM MANDATORYFIELD UNION
                            SELECT * FROM OPTIONALFIELDS_$chamber
                            WHERE disabled = 0
                            ORDER BY ordering");

echo json_encode($results);
?>
