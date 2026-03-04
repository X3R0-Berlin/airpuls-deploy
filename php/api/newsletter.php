<?php
/**
 * Newsletter subscription endpoint.
 * POST /api/newsletter.php
 * Body: { "email": "user@example.com" }
 */
require_once __DIR__ . '/config.php';

handlePreflight();
setCorsHeaders();
requirePost();

try {
    $ip = getClientIp();
    if (isRateLimited("newsletter:$ip", 5, 60)) {
        jsonError('Zu viele Anfragen. Bitte versuche es später erneut.', 429);
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $email = strtolower(trim($input['email'] ?? ''));

    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Bitte gib eine gültige E-Mail-Adresse ein.');
    }

    $db = getDb();

    // Check for duplicate
    $stmt = $db->prepare('SELECT id FROM newsletter_subscribers WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        jsonError('Diese E-Mail-Adresse ist bereits angemeldet.', 409);
    }

    // Insert subscriber
    $stmt = $db->prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)');
    $stmt->execute([$email]);

    jsonResponse([
        'success' => true,
        'message' => 'Vielen Dank! Du bist jetzt für unseren Newsletter angemeldet.',
    ]);
} catch (PDOException $e) {
    error_log('[Newsletter] DB Error: ' . $e->getMessage());
    jsonError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', 500);
} catch (\Exception $e) {
    error_log('[Newsletter] Error: ' . $e->getMessage());
    jsonError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', 500);
}
