<?php
  session_start();
  // Verify that the user has signed in and enfore if they have not
  if(!$_SESSION['user'])
    header('Location: signin.php');
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Illawarra Business Chamber | Home</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" href="css/theme.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/js/homepage.index.js"></script>
  </body>
</html>
