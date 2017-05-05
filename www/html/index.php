<!DOCTYPE html>
<html>
  <head>
    <title>Illawarra Business Chamber | Login</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type ="text/css" href="css/index.css">
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
          <form>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" class="form-underline" id="email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-underline" id="password">
            </div>
            <button type="submit" class="btn btn-primary sign-in">Sign in</button>
            <p id="forgotten-password"><a href="#">Forgotten Password</a></p>
          </form>
        </div>
        <div class="container signup-box">
          <p>Not a member? <a href="#">Sign up!</a></p>
        </div>
      </div>
    </div>
  </body>
</html>
