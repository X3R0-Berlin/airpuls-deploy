<?php
/**
 * Newsletter double opt-in confirmation endpoint.
 * GET /api/newsletter-confirm.php?token={token}
 *
 * Validates the token, confirms the subscriber, and redirects
 * to a success or error page on the frontend.
 */
require_once __DIR__ . '/config.php';

// This is a GET endpoint (clicked from email link), so no POST requirement.
// CORS headers are not needed since this is a browser redirect, not an AJAX call.

try {
    $ip = getClientIp();
    if (isRateLimited("newsletter-confirm:$ip", 10, 60)) {
        http_response_code(429);
        echo 'Zu viele Anfragen. Bitte versuche es später erneut.';
        exit;
    }

    $token = trim($_GET['token'] ?? '');
    $baseUrl = getenv('NEXT_PUBLIC_BASE_URL') ?: 'https://airimpuls.de';

    if (!$token || !preg_match('/^[a-f0-9]{64}$/', $token)) {
        header('Location: ' . rtrim($baseUrl, '/') . '/?newsletter=invalid');
        exit;
    }

    $db = getDb();

    // Look up the token
    $stmt = $db->prepare(
        'SELECT id, email, created_at FROM newsletter_tokens WHERE token = ?'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        // Token not found (already used or never existed)
        header('Location: ' . rtrim($baseUrl, '/') . '/?newsletter=invalid');
        exit;
    }

    // Check if token is expired (24 hours)
    $createdAt = new DateTime($row['created_at']);
    $now = new DateTime();
    $diff = $now->getTimestamp() - $createdAt->getTimestamp();

    if ($diff > 86400) {
        // Token expired – clean up
        $stmt = $db->prepare('DELETE FROM newsletter_tokens WHERE id = ?');
        $stmt->execute([$row['id']]);

        header('Location: ' . rtrim($baseUrl, '/') . '/?newsletter=expired');
        exit;
    }

    // Confirm the subscriber
    $stmt = $db->prepare(
        'UPDATE newsletter_subscribers SET confirmed = 1 WHERE email = ?'
    );
    $stmt->execute([$row['email']]);

    // Delete the used token
    $stmt = $db->prepare('DELETE FROM newsletter_tokens WHERE id = ?');
    $stmt->execute([$row['id']]);

    // Redirect to success page
    header('Location: ' . rtrim($baseUrl, '/') . '/?newsletter=confirmed');
    exit;

} catch (PDOException $e) {
    error_log('[Newsletter-Confirm] DB Error: ' . $e->getMessage());
    $baseUrl = getenv('NEXT_PUBLIC_BASE_URL') ?: 'https://airimpuls.de';
    header('Location: ' . rtrim($baseUrl, '/') . '/?newsletter=error');
    exit;
} catch (\Exception $e) {
    error_log('[Newsletter-Confirm] Error: ' . $e->getMessage());
    $baseUrl = getenv('NEXT_PUBLIC_BASE_URL') ?: 'https://airimpuls.de';
    header('Location: ' . rtrim($baseUrl, '/') . '/?newsletter=error');
    exit;
}
