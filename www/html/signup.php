<?php 
  session_start();
  $_SESSION['user'] = 'signup';
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Sign Up</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Cache-control" content="no-cache">
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="css/signup.css">
    <link rel="stylesheet" href="css/theme.css">
  </head>
  <body style="background-color:#f5f5f5;text-align:center" >
    <div class="header-blue">
      <div class="container logo-container">
        <h1>Membership Application</h1>
        <img class="logo" src="img/nswbc-logo.png" />
      </div>
    </div>
  <div id="signup-app"></div>
  <script type="text/javascript" src="/js/signup.index.js"></script>
  </body>
</html>
