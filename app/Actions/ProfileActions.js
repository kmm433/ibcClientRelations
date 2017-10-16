import $ from 'jquery';

// Allows a user to update their password.
// First validates their current password then submits the
// new value to the database
export function updateUserPassword(userId, currentPassword, newPassword) {
  $.ajax({
    url: "/php/change_password.php",
    type: 'POST',
    dataType: 'json',
    data: {
      'user_id': userId,
      'current_password': currentPassword,
      'new_password': newPassword,
    }, success: result => {
      if (result.status === 200)
        alert('Password has been successfully changed');
      else if (result.status === 401)
        alert('Error: Current Password is incorrect.');
      else
        alert('Error: Something went wrong.');
    }, error: result => {
      alert('Password could not be changed.');
    }
  });
}
