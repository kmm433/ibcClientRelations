<?php
    include 'db_handler.php';
    $db = new DB_Handler();

    $chamber = $_SESSION['chamber'];
        //Get the content of the image and then add slashes to it
        $image=addslashes($_FILES["image"]["tmp_name"]);
        $name=addslashes($_FILES['myimage']["name"]);
        $image = file_get_contents($image);
        $image = base64_encode($image);

        $query="SELECT logo FROM LOGO WHERE chamberID=$chamber";


        $result = $db->justExecute($query);
        if($result){
            $message = "Logo Uploaded Successfully";
        }
        else{
            $message = "Logo not Uploaded";
        }

        echo json_encode($message);

        <?php
mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("registrations") or die(mysql_error());
$id = addslashes($_REQUEST['id']);
$image = mysql_query("SELECT * FROM test_image WHERE id=$id");
$image = mysql_fetch_assoc($image);
$image = $image['image'];
header("Content-type: image/jpeg");
echo $image;
?>



?>
