<?php
include 'db_handler.php';
include 'mailchimp_handler.php';

$db = new DB_Handler();
try {
  $mailchimp = new MailChimp_Handler($_POST['api_key']);
  $response = array('status' => 500, 'text' => 'Error: Something went wrong.');
  $ping = $mailchimp->ping();

  if (array_key_exists('status', $ping) && $ping['status'] == 200) {
    $result = $db->updateMailChimpAPIKey($_SESSION['chamber'], $_POST['api_key']);
    if ($result)
      $response = array('status' => 200, 'value' => 'Successfully updated the API key.');
  } elseif (array_key_exists('value', $ping)) {
    $response = array('status' => $ping['status'], 'value' => $ping['value']);
  } else {
    return $response;
  }
  echo json_encode($response);
}
catch ( Exception $e ) {
  echo json_encode( array( 'status' => 500, 'value' => $e->getMessage() ));
}
?>
