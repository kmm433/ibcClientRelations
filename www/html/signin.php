<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Slater Chamber | Login</title>
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
        <img class="logo" src="img/isopods-logo.png" />
      </div>
      <!--Contains the login form-->
      <div class="container login-box">
        <div class="container logo-position">
        </div>
        <div class="container">
          <?php if(isset($_GET['status'])): ?>
            <p>Invalid username or password.</p>
          <?php endif; ?>
          <form action="php/process_signin.php" method="POST">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" class="form-underline" name="email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-underline" name="password">
            </div>
            <button type="submit" class="btn btn-primary sign-in" name="signin">Sign in</button>
            <p id="forgotten-password"><a href="/forgotten_password.php">Forgotten Password</a></p>
          </form>
        </div>
        <div class="container signup-box">
          <p>Not a member? <a href="./signup.php">Sign up!</a></p>
        </div>
      </div>
    </div>
  </body>
</html>
