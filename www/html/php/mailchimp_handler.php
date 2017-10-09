<?php

class MailChimp_Handler{

  // Class Variables
  private $curl = null;
  private $api_key = null;
  private $mailchimp_url = null;

  // On construction the class requires an API key,
  // the server address will be determined from this.
  function __construct($api_key) {
    $this->curl = curl_init();
    $this->api_key = $api_key;
    curl_setopt($this->curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($this->curl, CURLOPT_USERPWD, 'username:' . $this->api_key);
    if (strpos($api_key, '-') != false) {
      $mailchimp_server = explode('-', $api_key)[1];
      $this->mailchimp_url = 'https://' . $mailchimp_server . '.api.mailchimp.com/3.0/';
    }
    else {
      throw new Exception('Error: Invalid API key provided.');
    }
  }

  // Ping the server to ensure that the settings are correct
  // Returns value:'Ping Succeeded' if the ping is successful
  function ping() {
    $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
    curl_setopt($this->curl, CURLOPT_URL, $this->mailchimp_url . 'ping');
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->curl, CURLOPT_HTTPGET, true);
    $result = json_decode(curl_exec($this->curl));
    if ($result != NULL && array_key_exists('health_status', $result)) {
      $response = array('status' => 200, 'value' => 'Ping Succeeded');
    } elseif ($result != NULL && array_key_exists('status', $result)) {
      $response = array('status' => $result->status, 'value' => $result->title . '. ' . $result->detail);
    }
    return $response;
  }

  // Retreives the exitisting mail lists
  // Returns value: An array of lists objects if successful
  function getMailLists() {
    $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
    curl_setopt($this->curl, CURLOPT_URL, $this->mailchimp_url . 'lists');
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->curl, CURLOPT_HTTPGET, true);
    $result = json_decode(curl_exec($this->curl));
    if (array_key_exists('lists', $result)) {
      $response = array('status' => 200, 'value' => $result->lists);
    } elseif (array_key_exists('status', $result)) {
      $response = array('status' => $result->status, 'value' => $result->title . '. ' . $result->detail);
    }
    return $response;
  }

  // Retrieves the members that are in a specified list
  // Returns value: An array of members objects if successful
  function getListMembers($list_id) {
    $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
    curl_setopt($this->curl, CURLOPT_URL, $this->mailchimp_url . 'lists/' . $list_id . '/members');
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->curl, CURLOPT_HTTPGET, true);
    $result = json_decode(curl_exec($this->curl));
    if (array_key_exists('members', $result)) {
      $response = array('status' => 200, 'value' => $result->members);
    } elseif (array_key_exists('status', $result)) {
      $response = array('status' => $result->status, 'value' => $result->title . '. ' . $result->detail);
    }
    return $response;
  }

  // Adds an email address to as pecified  Mail List
  function addToMailList($list_id, $email_address) {
    $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
    curl_setopt($this->curl, CURLOPT_URL, $this->mailchimp_url . 'lists/' . $list_id . '/members');
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->curl, CURLOPT_POST, true);
    curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode(
      array(
        'email_address' => $email_address,
        'status' => 'subscribed'
      )
    ));
    $result = json_decode(curl_exec($this->curl));
    if ($result && array_key_exists('id', $result)) {
      $response = array('status' => 200, 'value' => 'Adding email succeeded');
    } elseif ($result && array_key_exists('status', $result)) {
      if ($result->title == 'Member Exists') {
        $response = array('status' => 200, 'value' => 'Email already exists');
      } else {
        $response = array('status' => $result->status, 'value' => $result->title . '. ' . $result->detail);
      }
    }
    return $response;
  }

  // Removes an email address from a specified mail list
  // Returns status: 200 on success
  function removeFromEmailList($list_id, $email_address) {
    $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
    curl_setopt($this->curl, CURLOPT_URL, $this->mailchimp_url . 'lists/' . $list_id . '/members/' . md5(strtolower($email_address)));
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
    $result = json_decode(curl_exec($this->curl));
    if (!$result) {
      $response = array('status' => 200, 'value' => 'Removing email succeeded.');
    } elseif (array_key_exists('status', $result)) {
      $response = array('status' => $result->status, 'value' => $result->title . '. ' . $result->detail);
    }
    return $response;
  }

  // Modifies the email address of an existing subscriber
  // Returns status: 200 on success
  function updateEmailAddress($list_id, $existing_email_address, $updated_email_address) {
    $response = array('status' => 500, 'value' => 'Error: Something went wrong.');
    curl_setopt($this->curl, CURLOPT_URL, $this->mailchimp_url . 'lists/' . $list_id . '/members/' . md5(strtolower($existing_email_address)));
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode(
      array('email_address' => $updated_email_address)
    ));
    $result = json_decode(curl_exec($this->curl));
    if (array_key_exists('email_address', $result) && $result->email_address == $updated_email_address) {
      $response = array('status' => 200, 'value' => 'Updating email succeeded.');
    } elseif (array_key_exists('status', $result)) {
      $response = array('status' => $result->status, 'value' => $result->title . '. ' . $result->detail);
    }
    return $response;
  }
}

?>
