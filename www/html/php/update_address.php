<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    if(isset($_SESSION['user'])){
        $addressID = $_POST['addressID'];
        $line1 = $_POST['line1'];
        $line2 = $_POST['line2'];
        $city = $_POST['city'];
        $state = $_POST['state'];
        $postcode = $_POST['postcode'];
        $country = $_POST['country'];

        if($_POST['postal'] == 1 || $_POST['postal'] == '1'){

            $postalline1 = $_POST['postalline1'];
            $postalline2 = $_POST['postalline2'];
            $postalcity = $_POST['postalcity'];
            $postalstate = $_POST['postalstate'];
            $postalpostcode = $_POST['postalpostcode'];
            $postalcountry = $_POST['postalcountry'];

            if(isset($_POST['postalID'])){
                $postalID = $_POST['postalID'];
                $result1 = $db->updateAddress($postalID, $postalline1, $postalline2, $postalcity, $postalstate, $postalpostcode, $postalcountry);
            } else {
                $db->insertAddress($postalline1, $postalline2, $postalcity, $postalstate, $postalpostcode, $postalcountry);
                $id = $db->getLastID();
                $result = $db->justExecute("UPDATE CHAMBER SET postal = $id WHERE chamberID=$chamber");
            }

        }

        $result = $db->updateAddress($addressID, $line1, $line2, $city, $state, $postcode, $country);


        if ($result)
          echo json_encode('Success');
        else
          echo json_encode('Error');
    }
    else {
        echo json_encode(false);
    }


?>
