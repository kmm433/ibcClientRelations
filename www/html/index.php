<?php
  session_start();

  // Verify that the user has signed in and enforce if they have not
  if(!$_SESSION['user']){
      if (isset($_GET['survey'])) {
          $_SESSION['survey'] = $_GET['survey'];
      }
      if (isset($_GET['event'])) {
          $_SESSION['event'] = $_GET['event'];
      }
      header('Location: ../signin.php');
  }
  if (isset($_GET['survey'])) {
      header('Location: /survey/'.$_GET['survey']);
  }
  if (isset($_GET['event'])) {
      header('Location: /event/'.$_GET['event']);
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Slater Chamber</title>
    <link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/react-day-picker/lib/style.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/reactTags.css" />
    <link rel="stylesheet" type="text/scss" href="/css/datepicker.scss" />
    <link rel="stylesheet" href="/bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" href="/css/theme.css" />
    <link rel="stylesheet" href="/css/side_menu.css" />
    <link rel="stylesheet" href="/css/member_management.css" />
    <link rel="stylesheet" href="/css/group_management.css" />
    <link rel="stylesheet" href="/css/invoice_management.css" />
    <link rel="stylesheet" href="/css/profile.css" />
    <link rel="stylesheet" href="/css/admin.css" />
    <link rel="stylesheet" href="/css/edit-signup.css" />
  </head>
  <body>
    <base href="/" />
    <div id="app"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/js/homepage.index.js"></script>
  </body>
</html>
