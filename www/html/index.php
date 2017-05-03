<?php include "../inc/dbinfo.inc"?>
<html>
  <head>
    <title>Illaware Business Chamber | Placeholder</title>
  </head>
  <body>
    <?php echo '<p>Placeholder for Illawara Business Chamber Client Relations Management System</p>'; ?>
    <?php
      $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
      if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();
      $database = mysqli_select_db($connection, DB_DATABASE);
      $result = mysqli_query($connection, "SELECT * FROM test");
      while($query_data = mysqli_fetch_row($result)) {
        echo "<p>";
        echo $query_data[0];
        echo " - ";
        echo $query_data[1];
        echo "</p>";
      }
    ?>
  </body>
</html>
