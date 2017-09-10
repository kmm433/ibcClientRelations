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
  echo json_encode($matchedResults);
  #$result = $db->getDetail($member, $_POST['member']);
  #if($result)
  #  echo json_encode($result['0']);
?>
