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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="css/theme.css">

  </head>
  <body>
  <div id="signup-app"></div>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgiBwW3iH3aW18pprG0trK1lVWNOe0OOM&libraries=places"></script>
  <script type="text/javascript" src="/js/signup.index.js"></script>
  </body>
</html>
