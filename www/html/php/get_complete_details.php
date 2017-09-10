<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  $fields = json_decode($_POST['fields'], true);
  $indexOfFirst = 0;
  $query = '';
  # Find the first MANDATORYFIELD field
  foreach ($fields as $index => $field) {
    if (!preg_match('/BUSINESS_/', $field['tablename'])){
      $indexOfFirst = $index;
      break;
    }
  }
  # Create a list of MANDATORYFIELD fields
  $query = $fields[$indexOfFirst]['tablename'] . '.' . $fields[$indexOfFirst]['columnname'];
  foreach ($fields as $index => $field) {
    if ($index != $indexOfFirst and (!preg_match('/BUSINESS_/', $field['tablename'])) and $field['tablename'] != '') {
      $query .= ', ' . strval($field['tablename']) . '.' . strval($field['columnname']);
    }
  }

  # This matches the displaynames provided by the input to the query result,
  # ignoring blank columns and the password column
  $result = $db->getDetail($_POST['member'], $query);
  $index = 0;
  $matchedResults = array();
  foreach($fields as $field) {
    if (!preg_match('/BUSINESS_/', $field['tablename']) and ($field['tablename'] != '')) {
      if($field['columnname'] != 'password')
        $matchedResults[strval($field['displayname'])] = $result[0][$index];
      $index += 1;
    }
  }

  #
  $matchedResults['chamberSpecific'] = 'CHAMBER SPECIFIED STUFF!';

  echo json_encode($matchedResults);
?>
