<!DOCTYPE html>
<html>
  <head>
    <title>Slater Chamber | Reset Password</title>
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
      <!--Contains the new password form-->
      <div class="container login-box">
        <div class="container logo-position">
        </div>
        <div class="container">
          <form action="php/process_reset_password.php" method="POST">
            <?php if(isset($_GET['status']) && $_GET['status'] == 'invalid'): ?>
              <p>The provided token is incorrect or expired.</p>
            <?php elseif(isset($_GET['status']) && $_GET['status'] == 'success'): ?>
              <p>Password has been successfully reset.</p>
            <?php elseif(!isset($_GET['token'])): ?>
              <p>No password reset token was provided.</p>
            <?php else: ?>
              <?php if(isset($_GET['status']) && $_GET['status'] == 'passwords'): ?>
                <p>The provided provided passwords do not match.</p>
              <?php endif; ?>
              <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" class="form-underline" name="password">
              </div>
              <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" class="form-underline" name="confirm_password">
              </div>
              <input type="hidden" name="token" value=<?php echo $_GET['token']; ?>/>
              <button type="submit" class="btn btn-primary" name="update">Update Password</button>
            <?php endif; ?>
          </form>
        </div>
      </div>
    </div>
  </body>
</html>
