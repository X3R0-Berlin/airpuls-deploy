<?php
/**
 * Contact form endpoint.
 * POST /api/contact.php
 * Body: { "name": "...", "email": "...", "subject": "...", "message": "..." }
 */
require_once __DIR__ . '/config.php';

handlePreflight();
setCorsHeaders();
requirePost();

try {
    $ip = getClientIp();
    if (isRateLimited("contact:$ip", 3, 60)) {
        jsonError('Zu viele Anfragen. Bitte versuche es später erneut.', 429);
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $name = trim($input['name'] ?? '');
    $email = strtolower(trim($input['email'] ?? ''));
    $subject = trim($input['subject'] ?? '');
    $message = trim($input['message'] ?? '');

    // Validate
    if (!$name || mb_strlen($name) < 2) {
        jsonError('Bitte gib deinen Namen ein.');
    }
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Bitte gib eine gültige E-Mail-Adresse ein.');
    }
    if (!$subject || mb_strlen($subject) < 3) {
        jsonError('Bitte gib einen Betreff ein.');
    }
    if (!$message || mb_strlen($message) < 10) {
        jsonError('Die Nachricht muss mindestens 10 Zeichen lang sein.');
    }

    // Save to database
    $db = getDb();
    $stmt = $db->prepare(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$name, $email, $subject, $message]);

    // Send notification email to shop owner
    $shopEmail = getenv('SMTP_FROM') ?: 'kontakt@airimpuls.de';
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    sendEmail(
        $shopEmail,
        "[Kontaktformular] $subject",
        "<h2>Neue Kontaktanfrage</h2>
         <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
         <p><strong>E-Mail:</strong> " . htmlspecialchars($email) . "</p>
         <p><strong>Betreff:</strong> " . htmlspecialchars($subject) . "</p>
         <hr />
         <p>$safeMessage</p>"
    );

    jsonResponse([
        'success' => true,
        'message' => 'Vielen Dank für deine Nachricht! Wir melden uns schnellstmöglich bei dir.',
    ]);
} catch (PDOException $e) {
    error_log('[Contact] DB Error: ' . $e->getMessage());
    jsonError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', 500);
} catch (\Exception $e) {
    error_log('[Contact] Error: ' . $e->getMessage());
    jsonError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', 500);
}
