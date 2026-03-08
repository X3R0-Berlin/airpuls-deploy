<?php
/**
 * Newsletter subscription endpoint (Double Opt-In).
 * POST /api/newsletter.php
 * Body: { "email": "user@example.com" }
 *
 * Instead of directly confirming the subscriber, this endpoint generates
 * a confirmation token and sends a verification email. The subscriber
 * must click the link to confirm (see newsletter-confirm.php).
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

    // Check if already confirmed
    $stmt = $db->prepare('SELECT id, confirmed FROM newsletter_subscribers WHERE email = ?');
    $stmt->execute([$email]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing && $existing['confirmed']) {
        jsonError('Diese E-Mail-Adresse ist bereits angemeldet.', 409);
    }

    // Insert unconfirmed subscriber if not yet present
    if (!$existing) {
        $stmt = $db->prepare('INSERT INTO newsletter_subscribers (email, confirmed) VALUES (?, 0)');
        $stmt->execute([$email]);
    }

    // Remove any existing tokens for this email (allow re-request)
    $stmt = $db->prepare('DELETE FROM newsletter_tokens WHERE email = ?');
    $stmt->execute([$email]);

    // Generate confirmation token
    $token = bin2hex(random_bytes(32));

    $stmt = $db->prepare('INSERT INTO newsletter_tokens (email, token) VALUES (?, ?)');
    $stmt->execute([$email, $token]);

    // Build confirmation link
    $baseUrl = getenv('NEXT_PUBLIC_BASE_URL') ?: 'https://airimpuls.de';
    $confirmUrl = rtrim($baseUrl, '/') . '/api/newsletter-confirm.php?token=' . urlencode($token);

    // Send confirmation email
    sendEmail(
        $email,
        'AIRIMPULS Newsletter – Bitte bestätige deine Anmeldung',
        "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">
            <h2 style=\"color: #1a1a1a;\">Newsletter-Anmeldung bestätigen</h2>
            <p>Hallo,</p>
            <p>du hast dich für den AIRIMPULS Newsletter angemeldet.
               Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Button klickst:</p>
            <p style=\"text-align: center; margin: 30px 0;\">
                <a href=\"$confirmUrl\"
                   style=\"background-color: #2563eb; color: #ffffff; padding: 12px 24px;
                          text-decoration: none; border-radius: 6px; font-weight: bold;
                          display: inline-block;\">
                    Anmeldung bestätigen
                </a>
            </p>
            <p style=\"font-size: 14px; color: #666;\">
                Oder kopiere diesen Link in deinen Browser:<br />
                <a href=\"$confirmUrl\">$confirmUrl</a>
            </p>
            <p style=\"font-size: 14px; color: #666;\">
                Dieser Link ist 24 Stunden gültig. Falls du diese Anmeldung nicht angefordert hast,
                kannst du diese E-Mail einfach ignorieren.
            </p>
            <hr style=\"border: none; border-top: 1px solid #eee; margin: 20px 0;\" />
            <p style=\"font-size: 12px; color: #999;\">AIRIMPULS – Luftenergizer für dein Wohlbefinden</p>
        </div>"
    );

    jsonResponse([
        'success' => true,
        'message' => 'Bitte bestätige deine E-Mail-Adresse. Wir haben dir eine Bestätigungsmail gesendet.',
    ]);
} catch (PDOException $e) {
    error_log('[Newsletter] DB Error: ' . $e->getMessage());
    jsonError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', 500);
} catch (\Exception $e) {
    error_log('[Newsletter] Error: ' . $e->getMessage());
    jsonError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.', 500);
}
