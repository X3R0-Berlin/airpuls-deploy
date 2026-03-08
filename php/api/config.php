<?php
/**
 * Shared configuration for PHP API endpoints.
 * Environment variables are injected by IONOS Deploy Now.
 */

if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php'; // IONOS deployment path
} elseif (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../vendor/autoload.php'; // Local dev path
}

// CORS headers
function setCorsHeaders(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = getenv('ALLOWED_ORIGIN') ?: 'https://airimpuls.de';

    if ($allowed === '*' || $origin === $allowed) {
        header("Access-Control-Allow-Origin: $origin");
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json; charset=utf-8');
}

// Handle CORS preflight
function handlePreflight(): void
{
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        setCorsHeaders();
        http_response_code(204);
        exit;
    }
}

// Require POST method
function requirePost(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonError('Method Not Allowed', 405);
    }
}

// JSON response helpers
function jsonResponse(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonError(string $message, int $status = 400): void
{
    jsonResponse(['error' => $message], $status);
}

// Database connection (MariaDB via IONOS Deploy Now)
function getDb(): PDO
{
    static $pdo = null;
    if ($pdo)
        return $pdo;

    $host = getenv('IONOS_DB_HOST') ?: getenv('DB_HOST') ?: 'localhost';
    $name = getenv('IONOS_DB_NAME') ?: getenv('DB_NAME') ?: 'airimpuls';
    $user = getenv('IONOS_DB_USER') ?: getenv('DB_USER') ?: 'root';
    $pass = getenv('IONOS_DB_PASSWORD') ?: getenv('DB_PASS') ?: '';

    $pdo = new PDO(
        "mysql:host=$host;dbname=$name;charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Auto-migration
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            confirmed TINYINT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(500) NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS newsletter_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(64) NOT NULL UNIQUE,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_token (token),
            INDEX idx_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    return $pdo;
}

// Load product data for price validation
function getProducts(): array
{
    static $products = null;
    if ($products !== null)
        return $products;

    $file = __DIR__ . '/products.json';
    if (!file_exists($file)) {
        return [];
    }
    $products = json_decode(file_get_contents($file), true) ?: [];
    return $products;
}

function getProductBySlug(string $slug): ?array
{
    foreach (getProducts() as $product) {
        if ($product['slug'] === $slug) {
            return $product;
        }
    }
    return null;
}

// Simple rate limiting (file-based)
function isRateLimited(string $key, int $maxRequests = 5, int $windowSeconds = 60): bool
{
    $dir = sys_get_temp_dir() . '/airimpuls_ratelimit';
    if (!is_dir($dir))
        @mkdir($dir, 0755, true);

    $file = $dir . '/' . md5($key) . '.json';
    $now = time();

    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : null;

    if (!$data || $now > ($data['reset_at'] ?? 0)) {
        $data = ['count' => 1, 'reset_at' => $now + $windowSeconds];
    } else {
        $data['count']++;
    }

    file_put_contents($file, json_encode($data));
    return $data['count'] > $maxRequests;
}

// Get client IP
function getClientIp(): string
{
    return $_SERVER['HTTP_X_FORWARDED_FOR']
        ? explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]
        : ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

// Send email (uses PHPMailer via IONOS SMTP)
function sendEmail(string $to, string $subject, string $htmlBody, string $replyToEmail = ''): bool
{
    $from = getenv('SMTP_FROM') ?: getenv('IONOS_MAIL_FROM') ?: 'team@airimpuls.com';
    $smtpHost = getenv('SMTP_HOST') ?: 'smtp.ionos.de';
    $smtpUser = getenv('SMTP_USER') ?: 'team@airimpuls.com';
    $smtpPass = getenv('SMTP_PASS') ?: 'Airimpulse2026...'; // User's provided password fallback
    $smtpPort = getenv('SMTP_PORT') ?: 465;

    // Use PHPMailer if available
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPass;
            $mail->SMTPSecure = ($smtpPort == 465) ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $smtpPort;

            $mail->CharSet = 'UTF-8';
            $mail->setFrom($from, 'AIRIMPULS Team');
            $mail->addAddress($to);
            $actualReplyTo = !empty($replyToEmail) ? $replyToEmail : $from;
            $mail->addReplyTo($actualReplyTo);

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlBody;

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("PHPMailer Error: {$mail->ErrorInfo}");
            return false;
        }
    }

    // Fallback if composer somehow fails
    $actualReplyTo = !empty($replyToEmail) ? $replyToEmail : $from;
    $headers = [
        'From' => $from,
        'Reply-To' => $actualReplyTo,
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/html; charset=UTF-8',
    ];
    return mail($to, $subject, $htmlBody, $headers, "-f$from");
}
