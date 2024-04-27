<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include the Composer autoloader
require 'vendor/autoload.php';

use SendGrid\Mail\Mail;
use SendGrid\Mail\To;

// Database connection
$servername = "localhost";
$username = "zimalxqv_mailAdmin";
$password = "9010mr9010@forca_mE";
$database = "zimalxqv_mailSubs";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the email from the form submission
$email = $_POST['email'];

// Prepare and execute SQL statement to insert the email and offer into the database
$stmt = $conn->prepare("INSERT INTO GrowSMBook (email, tag, offer) VALUES (?, ?, ?)");
$tag = "GrowSMBook"; // Assign GrowSMBook to tag
$offer = "50percentoff"; // Assign 50percentoff to offer
$stmt->bind_param("sss", $email, $tag, $offer);
$stmt->execute();

// Close statement and connection
$stmt->close();
$conn->close();

// Send email to the user using SendGrid API
$to = $email;
$subject = "It’s time to start your journey!";
$html_content = file_get_contents('growsmbook.html');

// Create a new SendGrid email
$email = new Mail();
$email->setFrom("matt@zimapeak.com", "Matt | ZimaPeak Marketing");
$email->setSubject($subject);
$email->addTo(new To($to));
$email->addContent("text/html", $html_content);

// Send the email
try {
    // Attempt to send the email
    $sendgrid = new SendGrid('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'); // Replace with your SendGrid API key
    $response = $sendgrid->send($email);

    // Check if the email was sent successfully
    if ($response->statusCode() == 202) {
        echo "success"; // Return success message
    } else {
        echo "error: " . $response->body(); // Return error message
    }
} catch (SendGrid\Mail\TypeException $e) {
    echo "error: Invalid email data. " . $e->getMessage(); // Return error message
} catch (Exception $e) {
    echo "error: " . $e->getMessage(); // Return error message for other exceptions
}
?>
