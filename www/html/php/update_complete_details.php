<?php
include 'db_handler.php';

$db = new DB_Handler();
$details = $_POST['details'];
$results = '';

$businessID = $db->getBusinessID($_POST['memberID']);

# Update the standard details
foreach ($details as $detail) {
  if (!preg_match('/BUSINESS_/', $detail[1]['tablename'])) {
    $results = $db->setDetail($_POST['memberID'], $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
  }
  else {
    if ($detail[1]['value'] != '')
      $results = $db->setChamberSpecificDetail($_POST['memberID'], $detail[1]['DataID'], $businessID, $detail[1]['value'], $detail[1]['columnname'], $detail[1]['tablename']);
  }
}

if($results) {
  $db->addNote($_SESSION['user'], $_POST['memberID'], 'Modified member\'s details.');
}

echo json_encode($results);

?>
