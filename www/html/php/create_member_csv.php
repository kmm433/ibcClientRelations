<?php
include 'db_handler.php';

// Required to make the output a download
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=chamber_members.csv');
$csvFile = fopen('php://output', 'w');

$db = new DB_Handler();
$chamber = $_SESSION["chamber"];
$fields = $db->getFields("SELECT * FROM MANDATORYFIELD UNION
                            SELECT * FROM OPTIONALFIELDS_$chamber
                            ORDER BY ordering ASC");

// Remove the password and confirmation fields
$displayedFields = array();
foreach ($fields as $field) {
  if($field['columnname'] != 'ignore' && $field['displayname'] != 'Password')
    array_push($displayedFields, $field);
}

// Add the expiry column
$expiry = array(
  'DataID' => "1",
  'columnname' => "expiry",
  'displayname' => "Membership Expiry Date",
  'inputtype' => "date",
  'mandatory' => "1",
  'maximum' => "",
  'minimum' => "",
  'ordering'=> "1000000",
  'tablename'=>"USER"
);
array_push($displayedFields, $expiry);

// Write just the headings to the CSV
$headings = array();
foreach ($displayedFields as $field) {
  array_push($headings, $field['displayname']);
}
fputcsv($csvFile, $headings);

//TODO: Get a list of all chamber members

//TODO: Recursively get each member's details and put in the csv

fclose($csvFile);
exit();
?>
