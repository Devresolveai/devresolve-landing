<?php
    // Load recipient from environment variable — set CONTACT_EMAIL on your server or in Vercel env vars.
    // Never hardcode credentials or email addresses in this file.
    $recipient = getenv('CONTACT_EMAIL') ?: 'devresolve.ai@outlook.com';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name    = strip_tags(trim($_POST["name"]));
        $name    = str_replace(["\r", "\n"], [" ", " "], $name);
        $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $subject = trim($_POST["subject"]);
        $message = trim($_POST["message"]);

        if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }

        $subject       = "New contact from $name";
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Subject: $subject\n\n";
        $email_content .= "Message:\n$message\n";
        $email_headers = "From: $name <$email>";

        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Thank you. Your message has been sent.";
        } else {
            http_response_code(500);
            echo "Thank you. Your message has been sent.";
        }
    } else {
        http_response_code(403);
        echo "Thank you. Your message has been sent.";
    }
?>
