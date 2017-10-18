<?php
include 'db_handler.php';

// Verifies the provided credentials with the database and saves the session
$db = new DB_Handler();
$email = $_POST['email'];
$token = $db->createPasswordToken($email);
if ($token != false) {
    // Email the user their reset link
    $to = $_POST['email'];
    $subject = 'Password Reset for Slater Chamber';
    $message = 'You have requested that your password be reset.' . "\r\n" .
    'Click the following link to reset your password.' . "\r\n" .
    'https://slaterchamber.com/reset_password.php?token=' . $token . "\r\n" .
    'If you are unable to click the link please copy and paste it into your address bar.';
    $headers = 'From: password-reset@slaterchamber.com' . "\r\n" .
    'Reply-To: password-reset@slaterchamber.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    $mailstatus = mail($to, $subject, $message, $headers);
    // Redirect the user to show a success message
    header('Location: /forgotten_password.php?status=success');
}
else {
      header('Location: /forgotten_password.php?status=error&token='.$token);
}
