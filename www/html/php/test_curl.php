<?php
  include './db_handler.php';
  include './mailchimp_handler.php';
  $mailchimp = new MailChimp_Handler('79f5bd779686b2b21ce748a0652361fb-us16');
  $db = new DB_Handler();

  $response = $mailchimp->updateEmailAddress('59f0ed4a10', 'charis@charisconsulting.com', 'haris@charisconsulting.com' );
  echo json_encode($response);
  $response = $mailchimp->updateEmailAddress('e91387c5dd', 'charis@charisconsulting.com', 'haris@charisconsulting.com'  );
  echo json_encode($response);
?>
