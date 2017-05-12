<?php
  session_start();
  // Verify that the user has signed in and enfore if they have not
  if(!$_SESSION['user'])
    header('Location: signin.php');
    echo('Welcome.');
?>
<!DOCTYPE html>\
<html>
  <body>
    <form action="php/process_signout.php" method="POST">
      <button type="submit">Sign Out</button>
    </form>
  </body>
</html>
