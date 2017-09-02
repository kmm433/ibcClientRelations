<?php
// include 'db_handler.php';
// $db = new DB_Handler();

// $results = $db->get_Business($_GET['id']);

$business = array(
  name => "Kiama Florist",
  owner => "Mary Smith",
  phone => "0223844293472",
  address => "13 Fuckoff Lane",
  website => "http://mail.morrissey.com",
  chamber => "THE DUNGEON",
  description => "SOMEONE KILL ME PLEASE",
);

echo json_encode($business);
