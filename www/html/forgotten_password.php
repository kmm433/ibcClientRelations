<?php
session_start();
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Slater Chamber | Forgotten Password</title>
    <link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type ="text/css" href="css/signin.css">
  </head>
  <body>
    <!--Blue background panel-->
    <div class="background-blue">
      <div class="container logo-container">
        <img class="logo" src="img/nswbc-logo.png" />
      </div>
      <!--Contains the login form-->
      <div class="container login-box">
        <div class="container logo-position">
        </div>
        <div class="container">
          <?php if(isset($_GET['status']) && $_GET['status']=='success'): ?>
            <p>An email has been sent. Please your inbox and spam folders.</p>
          <?php elseif(isset($_GET['status']) && $_GET['status']=='error'): ?>
            <p>The provided email address was not recognized.</p>
          <?php endif; ?>
          <?php if(!(isset($_GET['status']) && $_GET['status']=='success')): ?>
            <form action="php/process_forgotten_password.php" method="POST">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" class="form-underline" name="email">
              </div>
              <button type="submit" class="btn btn-primary" name="signin">Recover Password</button>
            </form>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </body>
</html>
