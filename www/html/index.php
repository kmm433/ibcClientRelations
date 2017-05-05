<!DOCTYPE>
<?php include "../inc/dbinfo.inc"?>
<html>
  <head>
    <title>Illawara Business Chamber | Login</title>
    <link rel="stylesheet" href="css/index.css">
  </head>
  <body>
    <div class="pageHeader"></div>
    <div class="page">
      <div class="signinBox">
        <img class="logo" src="img/nswbc-logo.png" alt="NSW Business Chamber Logo">
        <form class="signInForm">
        <p class="signInLabel">Email Address</p>
        <input type="text" class="signInInput" name="email">
        <p class="signInLabel">Password</p>
        <input type="password" class="signInInput" label="password">
        <input type="submit" class="signInButton" value="Sign in">
        <p class="forgotPassword"><a href="#">Forgot Password?</a></p>
        </form>
      </div>
    </div>
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
