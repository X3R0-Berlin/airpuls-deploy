<?php
require_once __DIR__ . '/config.php';

$customerEmail = 'team@airimpuls.com';
$customerName = 'Max Mustermann';
$orderNumber = 'TEST9999';

// Mock Items with images
$items = [
    [
        'name' => 'Airimpuls® Forma — Atemtrainer',
        'quantity' => 1,
        'price' => '14,99 €',
        'image' => 'https://airimpuls.com/images/products/forma/cover.webp' // testing fallback image type
    ],
    [
        'name' => 'Vitair',
        'quantity' => 1,
        'price' => '1.649,00 €',
        'image' => 'https://airimpuls.com/images/products/vitair/front.webp' // testing fallback image type
    ]
];

$total = '1.663,99 €';
$baseUrl = 'https://airimpuls.com';

$shippingHtml = "
    <h3 style='margin-top: 0; font-size: 16px; color: #000;'>Lieferadresse</h3>
    <p style='margin-bottom: 0;'>Musterstraße 1<br>
    12345 Musterstadt<br>
    Deutschland</p>
";

$itemsHtml = '';
foreach ($items as $it) {
    $imgHtml = '';
    if (!empty($it['image'])) {
        // Small, print-friendly, 60x60 object-fit: contain to not break layout
        $imgHtml = "<td style='padding: 10px; width: 60px;'><img src='{$it['image']}' alt='" . htmlspecialchars($it['name']) . "' style='width: 60px; height: 60px; object-fit: contain; border-radius: 4px; display: block;' /></td>";
    } else {
        // Blank cell if no image available to maintain column alignment
        $imgHtml = "<td style='padding: 10px; width: 60px;'></td>";
    }

    $itemsHtml .= "
        <tr style='border-bottom: 1px solid #eee;'>
            {$imgHtml}
            <td style='padding: 10px;'>{$it['name']}</td>
            <td style='padding: 10px; text-align: center;'>{$it['quantity']}x</td>
            <td style='padding: 10px; text-align: right;'>{$it['price']}</td>
        </tr>
    ";
}

$html = "
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

                <h1 style='color: #000; margin-top: 20px; font-size: 24px;'>Vielen Dank für deine Bestellung!</h1>
            </div>
            
            <p>Hallo {$customerName},</p>
            <p>wir haben deine Bestellung <strong>#{$orderNumber}</strong> erhalten und bearbeiten sie schnellstmöglich. Hier ist eine Übersicht deiner Artikel:</p>
            
            <table style='width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px;'>
                <thead>
                    <tr style='border-bottom: 2px solid #eee; text-align: left;'>
                        <th style='padding: 10px; color: #666; font-size: 14px; width: 60px;'></th>
                        <th style='padding: 10px; color: #666; font-size: 14px;'>Produkt</th>
                        <th style='padding: 10px; color: #666; font-size: 14px; text-align: center;'>Menge</th>
                        <th style='padding: 10px; color: #666; font-size: 14px; text-align: right;'>Preis</th>
                    </tr>
                </thead>
                <tbody>
                    {$itemsHtml}
                </tbody>
                <tfoot>
                    <tr style='border-top: 2px solid #eee;'>
                        <td colspan='3' style='padding: 15px 10px; font-weight: bold;'>Gesamtbetrag</td>
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

$success = sendEmail(
    $customerEmail,
    "Bestellbestätigung #{$orderNumber} — Thumbnail Test",
    $html
);

echo "Test email sent: " . ($success ? "true" : "false");
