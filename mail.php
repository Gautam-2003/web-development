<?php

if (isset($_POST['enquiry_form'])) {

    // --- 1. Sanitize and Validate Inputs ---

    // Sanitize inputs for security (especially for headers/database use)
    $name     = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email    = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $services = filter_input(INPUT_POST, 'services', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message  = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // Validate email format and check if required fields are present
    if (empty($name) || empty($email) || empty($services) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Return 0 for failure (bad input)
        echo "0";
        exit; 
    }

    // --- 2. Setup Email Parameters ---

    $to      = "shravanphutanr@gmail.com";
    $subject = "Website - Enquiry from $name"; // Include name in subject for clarity

    $htmlMessage = "
        <html>
            <head>
                <title>Website Enquiry</title>
            </head>
            <body>
                <h2>New Website Enquiry</h2>
                <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
                <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                <p><strong>Service Needed:</strong> " . htmlspecialchars($services) . "</p>
                <p><strong>Message:</strong></p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
            </body>
        </html>
    ";

    // --- 3. Construct Headers (CRITICAL: Header Sanitization) ---

    // Ensure the 'From' email is sanitized to remove any potential newlines
    // If a valid email is not present, use a safe default (e.g., noreply@yourdomain.com)
    $safe_from_email = ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) ? $email : "noreply@yourwebsite.com";
    
    // Set 'Return-Path' to ensure bounces go to a monitored address (often the same as 'From')
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: $safe_from_email\r\n"; 
    $headers .= "Reply-To: $email\r\n"; // Allow easy reply to the user's address
    $headers .= "X-Mailer: PHP/" . phpversion(); // Good practice

    // --- 4. Send Email ---
    $mailsent = mail($to, $subject, $htmlMessage, $headers);

    if ($mailsent) {
        // Mail sent successfully
        echo "1";
    } else {
        // Mail failed (usually a server configuration issue)
        echo "0";
    }
}
// Optional: handle case where the script is accessed without a POST request
// else {
//     echo "0";
// }

?>