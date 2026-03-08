<?php
require_once 'config.php';

// Handle CORS
handlePreflight();
setCorsHeaders();
requirePost();

// Rate limiting by IP (max 5 requests per 60 seconds)
$userIp = getClientIp();
if (isRateLimited("contact_$userIp", 5, 60)) {
    jsonError('Too many requests. Please try again later.', 429);
}

// Read JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    jsonError('Invalid JSON payload');
}

// Extract and sanitize fields
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? 'Neue Kontaktanfrage');
$message = trim($data['message'] ?? '');

// Validation
if (empty($name) || empty($email) || empty($message)) {
    jsonError('Name, E-Mail und Nachricht sind Pflichtfelder.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonError('Ungültige E-Mail-Adresse.');
}

// 1. Save to database (optional backup/record)
try {
    $db = getDb();
    $stmt = $db->prepare('INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $email, $subject, $message]);
} catch (Throwable $e) {
    error_log("Database Error (Ignored) in contact.php: " . $e->getMessage());
}

// 2. Prepare Email to the shop team
$to = 'team@airimpuls.com'; // Admin Email Receiving the Contact Form
$baseUrl = 'https://airimpuls.com';

$htmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        @keyframes slowPulse {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.03); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
        }
        .animated-logo {
            animation: slowPulse 4s infinite ease-in-out;
            display: inline-block;
            max-width: 180px;
            height: auto;
        }
        .static-logo {
            display: none;
            max-width: 180px;
            height: auto;
            mso-hide: all;
        }
        @media print {
            .animated-logo { display: none !important; }
            .static-logo { display: inline-block !important; }
        }
    </style>
</head>
<body style='margin: 0; padding: 20px; background-color: #ffffff;'>
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;'>
        <div style='text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;'>
            
            <!-- Outlook Static Fallback -->
            <!--[if mso]>
            <img src='{$baseUrl}/images/Airimpuls_Logo.png' alt='AIRIMPULS' width='180' style='width: 180px; display: block; margin: 0 auto 20px auto;' />
            <![endif]-->
            
            <!-- Modern Email Clients (GIF) & Print Fallback (PNG) -->
            <!--[if !mso]><!-->
            <div style='text-align: center; margin-bottom: 20px;'>
                <img src='{$baseUrl}/animations/airimpuls-logo.gif' alt='AIRIMPULS' class='animated-logo' />
                <img src='{$baseUrl}/images/Airimpuls_Logo.png' alt='AIRIMPULS' class='static-logo' />
            </div>
            <!--<![endif]-->

            <h1 style='color: #000; margin-top: 20px; font-size: 24px;'>Neue Kontaktanfrage</h1>
        </div>
        
        <p>Hallo AIRIMPULS Team,</p>
        <p>es ist eine neue Anfrage über das Kontaktformular der Webseite eingegangen:</p>
        
        <div style='background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;'>
            <p style='margin: 0 0 10px 0;'><strong>Von:</strong> " . htmlspecialchars($name) . " &lt;" . htmlspecialchars($email) . "&gt;</p>
            <p style='margin: 0;'><strong>Betreff:</strong> " . htmlspecialchars($subject) . "</p>
        </div>
        
        <h3 style='margin-top: 0; font-size: 16px; color: #000;'>Nachricht:</h3>
        <div style='background-color: #ffffff; border: 1px solid #eee; padding: 15px; border-radius: 4px; margin-bottom: 20px; white-space: pre-wrap; font-family: inherit;'>" . htmlspecialchars($message) . "</div>
        
        <p style='color: #666; font-size: 14px;'>Du kannst direkt auf diese E-Mail antworten, um " . htmlspecialchars($name) . " zu schreiben.</p>
    </div>
</body>
</html>
";

// Call the generic sendEmail function from config.php with Reply-To (Send to Admin)
$successAdmin = sendEmail($to, $subject, $htmlBody, $email);

// 3. Prepare Auto-Responder Email to the Customer
$customerSubject = "Eingangsbestätigung: " . $subject;
$customerHtmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        @keyframes slowPulse {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.03); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
        }
        .animated-logo {
            animation: slowPulse 4s infinite ease-in-out;
            display: inline-block;
            max-width: 180px;
            height: auto;
        }
        .static-logo {
            display: none;
            max-width: 180px;
            height: auto;
            mso-hide: all;
        }
        @media print {
            .animated-logo { display: none !important; }
            .static-logo { display: inline-block !important; }
        }
    </style>
</head>
<body style='margin: 0; padding: 20px; background-color: #ffffff;'>
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;'>
        <div style='text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;'>
            
            <!--[if mso]>
            <img src='{$baseUrl}/images/Airimpuls_Logo.png' alt='AIRIMPULS' width='180' style='width: 180px; display: block; margin: 0 auto 20px auto;' />
            <![endif]-->
            
            <!--[if !mso]><!-->
            <div style='text-align: center; margin-bottom: 20px;'>
                <img src='{$baseUrl}/animations/airimpuls-logo.gif' alt='AIRIMPULS' class='animated-logo' />
                <img src='{$baseUrl}/images/Airimpuls_Logo.png' alt='AIRIMPULS' class='static-logo' />
            </div>
            <!--<![endif]-->

            <h1 style='color: #000; margin-top: 20px; font-size: 24px;'>Vielen Dank für deine Nachricht!</h1>
        </div>
        
        <p>Hallo " . htmlspecialchars($name) . ",</p>
        <p>wir haben deine Anfrage erhalten und werden uns schnellstmöglich bei dir melden. In der Regel antworten wir innerhalb von 24 Stunden.</p>
        
        <h3 style='margin-top: 30px; font-size: 16px; color: #000;'>Deine gesendete Nachricht:</h3>
        <div style='background-color: #f9f9f9; border-left: 4px solid #000; padding: 15px; border-radius: 4px; margin-bottom: 30px; white-space: pre-wrap; font-family: inherit; color: #555;'>" . htmlspecialchars($message) . "</div>
        
        <p>Viele Grüße,<br>Dein AIRIMPULS Team</p>
    </div>
</body>
</html>
";

// Send to Customer (No Reply-To needed here since it comes from the default system address)
$successCustomer = sendEmail($email, $customerSubject, $customerHtmlBody);

if ($successAdmin) {
    jsonResponse([
        'status' => 'success',
        'message' => 'Vielen Dank für deine Nachricht. Wir werden uns in Kürze melden.'
    ]);
} else {
    // If admin email fails, we consider the process failed even if customer email succeeded
    jsonError('Die E-Mail konnte nicht versendet werden. Bitte versuche es später noch einmal.', 500);
}
