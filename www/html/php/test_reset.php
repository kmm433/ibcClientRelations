<?php
include "db_handler.php";
$db = new DB_Handler();

$result = $db->resetPassword('123456', 'password');
?>
<html>
<body>
    <?php echo json_encode($result); ?>
</body>
</html>
