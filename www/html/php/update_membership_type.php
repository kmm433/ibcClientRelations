<?php
  include 'db_handler.php';
  $db = new DB_Handler();

  $payment = $_POST["type"];
  $expiry = $_POST["expiry"];
  $chamber = $_SESSION["chamber"];

  $d = $db->updatePayment($payment, $expiry, $chamber);
  $results = $db->getFields("SELECT type, expiry_date FROM PAYMENTTYPES where chamberID=$chamber");

  echo json_encode($d);
?>
