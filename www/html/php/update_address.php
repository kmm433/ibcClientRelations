<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $addressID = $_POST['addressID'];
    $line1 = $_POST['line1'];
    $line2 = $_POST['line2'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $postcode = $_POST['postcode'];
    $country = $_POST['country'];
    if($_POST['postal'] == 1 || $_POST['postal'] == '1'){
        $result1 = $db->updateAddress($postalID, $postalline1, $postalline2, $postalcity, $postalstate, $postalpostcode, $postalcountry);
        $postalID = $_POST['postalID'];
        $postalline1 = $_POST['postalline1'];
        $postalline2 = $_POST['postalline2'];
        $postalcity = $_POST['postalcity'];
        $postalstate = $_POST['postalstate'];
        $postalpostcode = $_POST['postalpostcode'];
        $postalcountry = $_POST['postalcountry'];
    }

    $result = $db->updateAddress($addressID, $line1, $line2, $city, $state, $postcode, $country);


    if ($result)
      echo json_encode('Success');
    else
      echo json_encode('Error');
?>
