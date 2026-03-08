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

$htmlBody = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2>Neue Kontaktanfrage über die Webseite</h2>
        <p><strong>Von:</strong> " . htmlspecialchars($name) . " &lt;" . htmlspecialchars($email) . "&gt;</p>
        <p><strong>Betreff:</strong> " . htmlspecialchars($subject) . "</p>
        <hr>
        <p><strong>Nachricht:</strong></p>
        <p style='white-space: pre-wrap;'>" . htmlspecialchars($message) . "</p>
    </body>
    </html>
    ";

// Call the generic sendEmail function from config.php with Reply-To
$success = sendEmail($to, $subject, $htmlBody, $email);

if ($success) {
    jsonResponse([
        'status' => 'success',
        'message' => 'Vielen Dank für deine Nachricht. Wir werden uns in Kürze melden.'
    ]);
} else {
    jsonError('Die E-Mail konnte nicht versendet werden. Bitte versuche es später noch einmal.', 500);
}
