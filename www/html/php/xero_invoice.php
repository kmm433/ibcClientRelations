<?php
include 'db_handler.php';
require 'vendor/autoload.php';
use XeroPHP\Application\PublicApplication;
use XeroPHP\Remote\Request;
use XeroPHP\Remote\URL;

// Retrieve the consumer key, secret and the callback URI from the database
$db = new DB_handler();
$consumerDetails = $db->getXeroConsumerDetails($_SESSION['chamber']);
$callbackURI = $db->getXeroInvoiceCallbackURI()['uri'];
preg_match_all('[^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)]', $callbackURI, $matches);
$websiteAddress = $matches[0][0];


//These are the minimum settings - for more options, refer to examples/config.php
$config = [
    'oauth' => [
        'callback'        => $callbackURI,
        'consumer_key'    => $consumerDetails['xero_key'],
        'consumer_secret' => $consumerDetails['xero_secret'],
    ],
    'curl' => [
        CURLOPT_CAINFO => __DIR__.'/certs/ca-bundle.crt',
    ],
];

if (isset($_GET['user_id'])) {
  $_SESSION['invoice_user_id'] = $_GET['user_id'];
}

$xero = new PublicApplication($config);

//if no session or if it is expired
if (null === $oauth_session = getOAuthSession()) {
    $url = new URL($xero, URL::OAUTH_REQUEST_TOKEN);
    $request = new Request($xero, $url);
    //Here's where you'll see if your keys are valid.
    //You can catch a BadRequestException.
    try {
        $request->send();
    } catch (Exception $e) {
        print_r($e);
        if ($request->getResponse()) {
            print_r($request->getResponse()->getOAuthResponse());
        }
    }
    $oauth_response = $request->getResponse()->getOAuthResponse();
    setOAuthSession(
        $oauth_response['oauth_token'],
        $oauth_response['oauth_token_secret']
    );
    header('Location: '.$xero->getAuthorizeURL($oauth_response['oauth_token']));
    exit;
} else {
    $xero->getOAuthClient()
        ->setToken($oauth_session['token'])
        ->setTokenSecret($oauth_session['token_secret']);
    if (isset($_REQUEST['oauth_verifier'])) {
        $xero->getOAuthClient()->setVerifier($_REQUEST['oauth_verifier']);
        $url = new URL($xero, URL::OAUTH_ACCESS_TOKEN);
        $request = new Request($xero, $url);
        $request->send();
        $oauth_response = $request->getResponse()->getOAuthResponse();
        setOAuthSession(
            $oauth_response['oauth_token'],
            $oauth_response['oauth_token_secret'],
            $oauth_response['oauth_expires_in']
        );
        //drop the qs
        $uri_parts = explode('?', $_SERVER['REQUEST_URI']);
        //Just for demo purposes
        header('Location: '.$websiteAddress.'/invoice/'.$_SESSION['invoice_user_id']);
        exit;
    }
}

/*
*
*
* Here we can safely do stuff after the 0-authentication has occurred.
* For example after authenticating proceed to the invoice page.
*
*
*/
if (isset($_GET['operation']) && $_GET['operation'] == 'unset_session') {
  unset($_SESSION['oauth']);
}
// Retrieves all invoices
elseif (isset($_GET['operation']) && $_GET['operation'] == 'fetch_invoices') {
  $invoices = $xero->load('Accounting\\Invoice')
    ->execute();
  echo json_encode($invoices);
}
// Gets the available items, in this case they are membership subscriptions
elseif (isset($_GET['operation']) && $_GET['operation'] == 'fetch_items') {
  $items = $xero->load('Accounting\\Item')
    ->execute();
  echo json_encode($items);
}
// Creates a new invoice for a specified member
elseif (isset($_GET['operation']) && $_GET['operation'] == 'create_invoice') {
  // Create the contact that the invoice will be sent to
  $contact = new \XeroPHP\Models\Accounting\Contact($xero);
  $contact->setName($_POST['first_name'] . ' ' . $_POST['last_name'])
    ->setFirstName($_POST['first_name'])
    ->setLastName($_POST['last_name'])
    ->setEmailAddress($_POST['email_address']);

  // Create the line item for the membership 'sale'
  $lineItem = new \XeroPHP\Models\Accounting\Invoice\Lineitem($xero);
  $lineItem->setQuantity(1)
    ->setLineItemID($_POST['item_id'])
    ->setUnitAmount($_POST['unit_price'])
    ->setItemCode($_POST['item_code'])
    ->setDescription($_POST['item_description']);

  // Creat the due date of the invoice
  $dueDate = new DateTime();
  $dueDate->setDate($_POST['due_date'][0], $_POST['due_date'][1], $_POST['due_date'][2]);

  // Create a new invoice
  $invoice = new \XeroPHP\Models\Accounting\Invoice($xero);
  $invoice->setType('ACCREC')
    ->setContact($contact)
    ->addLineItem($lineItem)
    ->setStatus('AUTHORISED')
    ->setDueDate($dueDate);

  // Save the new invoice
  $invoice->save();

  echo json_encode(array('status' => 200, 'value' => $invoice));
}
// Gets the available items, in this case they are membership subscriptions
elseif (isset($_GET['operation']) && $_GET['operation'] == 'download_invoice') {
  $invoice = $xero->load('Accounting\\Invoice')
    ->where('InvoiceNumber', $_GET['invoice_number'])
    ->execute();
  if ( !$invoice ) {
    echo json_encode(array('status' => 500, 'value' => 'Error: Something went wrong.'));
  } else {
    // retrieve the invoice's pdf
    $pdfData = $invoice[0]->getPDF();
    $pdfFile = 'Invoice_' . $invoice[0]->getInvoiceNumber() . '.pdf';
    $handle = fopen($pdfFile, 'w') or die('Cannot open file:  '.$pdfFile);
    fwrite($handle, $pdfData);
    fclose($handle);
    // Send the PDF to the browser
    header("Content-type:application/pdf");
    header("Content-Disposition:attachment;filename='".$pdfFile."'");
    readfile($pdfFile);
    // Remove the new PDF
    unlink($pdfFile);
    echo json_encode(array('status' => 200, 'value' => 'OK'));
  }
}
else {
  header('Location: '.$websiteAddress.'/invoice/'.$_SESSION['invoice_user_id']);
}

//The following two functions are just for a demo
//you should use a more robust mechanism of storing tokens than this!
function setOAuthSession($token, $secret, $expires = null)
{
    // expires sends back an int
    if ($expires !== null) {
        $expires = time() + intval($expires);
    }
    $_SESSION['oauth'] = [
        'token' => $token,
        'token_secret' => $secret,
        'expires' => $expires
    ];
}
function getOAuthSession()
{
    //If it doesn't exist or is expired, return null
    if (!isset($_SESSION['oauth'])
        || ($_SESSION['oauth']['expires'] !== null
        && $_SESSION['oauth']['expires'] <= time())
    ) {
        return null;
    }
    return $_SESSION['oauth'];
}
