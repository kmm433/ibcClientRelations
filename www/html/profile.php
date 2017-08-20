<?php
  session_start();
  // Verify that the user has signed in and enfore if they have not
  if(!$_SESSION['user'])
    header('Location: profile.php');
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Illawarra Business Chamber | Profile</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="css/theme.css">
  </head>
  <body>
                <style type="text/css">
                  .tg  {border-collapse:collapse;border-spacing:0;}
                  .tg td{padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;}
                  .tg th{font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;}
                  .tg .tg-yw4l{vertical-align:top}
                </style>

<h1> BUSINESS NAME </h1> <button type="button" onclick="alert('NOT ACTIVE YET!')">Send Message</button>

                <table class="tg" align ="center" style="width:100%">
                <tr>
                  <td class="tg-yw4l">Bussines Owner:</td>
                  <td class="tg-yw4l"></td>
                  <td ROWSPAN=6 width=25%>PHOTO!?</td>
                </tr>
                <tr>
                  <td class="tg-yw4l">Contact Number:</td>
                  <td class="tg-yw4l"></td>
                </tr>
                <tr>
                  <td class="tg-yw4l">Business address:<td>
                  <td class="tg-yw4l"></td>
                </tr>
                <tr>
                  <td class="tg-yw4l">Website:</td>
                  <td class="tg-yw4l"></td>
                </tr>
                <tr>
                  <td class="tg-yw4l">Member Of:</td>
                  <td class="tg-yw4l"></td>
                </tr>
                <tr>
                  <td class="tg-yw4l">Description:</td>
                  <td class="tg-yw4l"></td>
                </tr>
                </table>

                <table align="right">
                  <tbody>
                    <tr>
                      <td> <input type="button" src="fblogo.png"/> </td>
                      <td> <input type="button" style="background-image:url('linkedin.png')"/> </td>
                    </tr>
                </table>

                <br><br><br>
                <center>
                ________________________________________________________________________________
                </center>

                This is how your profile is dispayed to other chamber members
                <button type="button" onclick="alert('NOT ACTIVE YET!')"> Edit Page </button>

  </body>
</html>
