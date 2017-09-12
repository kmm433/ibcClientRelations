<?php
include 'db_handler.php';

$db = new DB_Handler();
$details = $_POST['details'];
$results = '';

# Update the standard details
foreach ($details as $detail) {
  if (!preg_match('/BUSINESS_/', $detail[1]['tablename'])) {
    $results = $db->setDetail($_POST['member'], $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
  }
  else {
    $results = $db->setChamberSpecificDetail($_POST['member'], $detail[1]['DataID'], $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
  }
}

if($results) {
  $db->addNote($_SESSION['user'], $_POST['member'], 'Modified member\'s details');
}

echo json_encode($results);

?>
