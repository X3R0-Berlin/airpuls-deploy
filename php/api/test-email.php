<?php
require_once __DIR__ . '/config.php';

// Simulate an order confirmation email body
$baseUrl = 'https://airimpuls.de';
$customerName = 'Test User';
$orderNumber = 'TEST1234';
$itemsHtml = "
    <tr style='border-bottom: 1px solid #eee;'>
        <td style='padding: 10px;'>Vitair Luftreiniger</td>
        <td style='padding: 10px;'>1x</td>
        <td style='padding: 10px; text-align: right;'>1.649,00 €</td>
    </tr>
";
$total = '1.649,00 €';
$shippingHtml = "
    <h3 style='margin-top: 0; font-size: 16px; color: #000;'>Lieferadresse</h3>
    <p style='margin-bottom: 0;'>Musterstraße 1<br>12345 Musterstadt<br>Deutschland</p>
";

$html = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        /* Fallback CSS animation for email clients that support it (e.g. Apple Mail) */
        @keyframes slowPulse {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.03); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
        }
        .animated-logo {
            animation: slowPulse 4s infinite ease-in-out;
            display: block;
            margin: 0 auto 20px auto;
            max-width: 180px;
        }
    </style>
</head>
<body style='margin: 0; padding: 20px; background-color: #ffffff;'>
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;'>
        <div style='text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;'>
            <img src='{$baseUrl}/images/Airimpuls_Logo.svg' alt='AIRIMPULS' class='animated-logo' style='max-width: 180px; height: auto;' />
            <h1 style='color: #000; margin-top: 20px; font-size: 24px;'>Vielen Dank für deine Bestellung!</h1>
        </div>
        
        <p>Hallo {$customerName},</p>
        <p>wir haben deine Bestellung <strong>#{$orderNumber}</strong> erhalten und bearbeiten sie schnellstmöglich. Hier ist eine Übersicht deiner Artikel:</p>
        
        <table style='width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px;'>
            <thead>
                <tr style='border-bottom: 2px solid #eee; text-align: left;'>
                    <th style='padding: 10px; color: #666; font-size: 14px;'>Produkt</th>
                    <th style='padding: 10px; color: #666; font-size: 14px;'>Menge</th>
                    <th style='padding: 10px; color: #666; font-size: 14px; text-align: right;'>Preis</th>
                </tr>
            </thead>
            <tbody>
                {$itemsHtml}
            </tbody>
            <tfoot>
                <tr style='border-top: 2px solid #eee;'>
                    <td colspan='2' style='padding: 15px 10px; font-weight: bold;'>Gesamtbetrag</td>
                    <td style='padding: 15px 10px; font-weight: bold; text-align: right;'>{$total}</td>
                </tr>
            </tfoot>
        </table>
        
        <div style='background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;'>
            {$shippingHtml}
        </div>
        
        <p>Sobald dein Paket auf dem Weg ist, erhältst du eine weitere E-Mail mit einem Link zur Sendungsverfolgung.</p>
        <br>
        <p>Viele Grüße,<br>Dein AIRIMPULS Team</p>
    </div>
</body>
</html>
";

file_put_contents(__DIR__ . '/test-email-output.html', $html);
echo "HTML saved to test-email-output.html. You can open it in a browser to see the animation.\n";

// Try to send an email (might fail locally depending on windows SMTP config, but will work on IONOS)
$to = 'test@example.com';
$subject = 'Test: Bestellbestätigung mit animiertem Logo';

$success = sendEmail($to, $subject, $html);
if ($success) {
    echo "Mail function called successfully (Note: Windows local environment might still not deliver it unless configured).\n";
} else {
    echo "Mail function failed. Checking local configuration...\n";
}
