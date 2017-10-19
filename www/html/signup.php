<?php
  session_start();
  $_SESSION['user'] = 'signup';
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Slater Chamber | Sign Up</title>
    <link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Cache-control" content="no-cache">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="css/theme.css">
    <link rel="stylesheet" href="/css/edit-signup.css" />
  </head>
  <body>
  <div id="signup-app"></div>
  <script type="text/javascript" src="/js/signup.index.js"></script>
  </body>
</html>
