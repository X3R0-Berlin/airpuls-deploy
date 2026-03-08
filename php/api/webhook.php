<?php
/**
 * Stripe Webhook handler.
 * POST /api/webhook.php
 * Receives Stripe events (checkout.session.completed, etc.)
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../../vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method Not Allowed', 405);
}

$webhookSecret = getenv('STRIPE_WEBHOOK_SECRET');
$body = file_get_contents('php://input');
$signature = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

if (!$signature) {
    jsonError('Missing signature', 400);
}

try {
    $event = \Stripe\Webhook::constructEvent($body, $signature, $webhookSecret);
} catch (\Stripe\Exception\SignatureVerificationException $e) {
    error_log('Webhook signature verification failed: ' . $e->getMessage());
    jsonError('Invalid signature', 400);
}

$stripe = new \Stripe\StripeClient(getenv('STRIPE_SECRET_KEY'));

switch ($event->type) {
    case 'checkout.session.completed':
        $session = $event->data->object;
        error_log('Payment successful: ' . $session->id);

        try {
            $expanded = $stripe->checkout->sessions->retrieve(
                $session->id,
                ['expand' => ['line_items', 'line_items.data.price.product']]
            );

            $customerEmail = $expanded->customer_details->email ?? $session->customer_email ?? null;
            $customerName = $expanded->customer_details->name ?? 'Kunde';
            $shipping = $expanded->shipping_details->address ?? null;

            $lineItems = $expanded->line_items->data ?? [];
            $items = [];
            foreach ($lineItems as $item) {
                $imageUrl = '';

                // 1. Try to get image from Stripe's product data
                if (isset($item->price->product->images) && is_array($item->price->product->images) && count($item->price->product->images) > 0) {
                    $imageUrl = $item->price->product->images[0];
                }
                // 2. Fallback to local catalog
                else {
                    $desc = strtolower($item->description ?? '');
                    if (str_contains($desc, 'vitair'))
                        $slug = 'vitair';
                    elseif (str_contains($desc, 'forma'))
                        $slug = 'forma';
                    elseif (str_contains($desc, 'preventair'))
                        $slug = 'preventair';
                    elseif (str_contains($desc, 'solitair'))
                        $slug = 'solitair';
                    else
                        $slug = '';

                    if ($slug) {
                        $localProduct = getProductBySlug($slug);
                        if ($localProduct && isset($localProduct['images']['basePath']) && isset($localProduct['images']['gallery'][0]['file'])) {
                            $imageUrl = 'https://airimpuls.com' . $localProduct['images']['basePath'] . '/' . $localProduct['images']['gallery'][0]['file'];
                        }
                    }
                }

                $items[] = [
                    'name' => $item->description ?? 'Produkt',
                    'quantity' => $item->quantity ?? 1,
                    'price' => formatEuro($item->amount_total ?? 0),
                    'image' => $imageUrl
                ];
            }

            $total = formatEuro($expanded->amount_total ?? 0);
            $orderNumber = strtoupper(substr($session->id, -8));

            if ($customerEmail) {
                $baseUrl = 'https://airimpuls.com';
                $shippingHtml = '';
                if ($shipping) {
                    $country = match ($shipping->country ?? '') {
                        'DE' => 'Deutschland',
                        'AT' => 'Österreich',
                        'CH' => 'Schweiz',
                        default => $shipping->country ?? '',
                    };
                    $shippingHtml = "
                        <h3 style='margin-top: 0; font-size: 16px; color: #000;'>Lieferadresse</h3>
                        <p style='margin-bottom: 0;'>{$shipping->line1}<br>"
                        . ($shipping->line2 ? "{$shipping->line2}<br>" : '')
                        . "{$shipping->postal_code} {$shipping->city}<br>
                        {$country}</p>
                    ";
                }

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

                sendEmail(
                    $customerEmail,
                    "Bestellbestätigung #{$orderNumber} — AIRIMPULS",
                    $html
                );

                error_log("Order confirmation sent to {$customerEmail}");
            }
        } catch (\Exception $e) {
            error_log('Failed to send confirmation email: ' . $e->getMessage());
        }
        break;

    case 'checkout.session.expired':
        error_log('Checkout session expired: ' . ($event->data->object->id ?? 'unknown'));
        break;

    case 'charge.updated':
        $charge = $event->data->object;
        $previousAttributes = $event->data->previous_attributes ?? null;

        $trackingNumber = $charge->shipping->tracking_number ?? null;
        $oldTracking = $previousAttributes['shipping']['tracking_number'] ?? null;

        if (is_object($previousAttributes) && isset($previousAttributes->shipping)) {
            $oldTracking = $previousAttributes->shipping->tracking_number ?? null;
        } elseif (is_array($previousAttributes) && isset($previousAttributes['shipping'])) {
            $oldTracking = $previousAttributes['shipping']['tracking_number'] ?? null;
        }

        if ($trackingNumber && $trackingNumber !== $oldTracking) {
            // Retrieve customer email from charge
            $customerEmail = $charge->billing_details->email ?? $charge->receipt_email ?? null;

            // Fallback: If no email on charge, try to get it from the PaymentIntent's Customer
            if (!$customerEmail && isset($charge->customer) && is_string($charge->customer)) {
                try {
                    $customer = $stripe->customers->retrieve($charge->customer);
                    $customerEmail = $customer->email;
                } catch (\Exception $e) {
                    error_log('Could not retrieve customer for charge: ' . $e->getMessage());
                }
            }

            if ($customerEmail) {
                $customerName = $charge->billing_details->name ?? $charge->shipping->name ?? 'Kunde';
                $baseUrl = 'https://airimpuls.com';

                // Wir nehmen den PaymentIntent als Referenz für die Bestellnummer,
                // um Konsistenz zur Bestellbestätigung zu wahren.
                $orderRef = $charge->payment_intent ?? $charge->id;
                $orderNumber = strtoupper(substr($orderRef, -8));

                $trackingUrl = "https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode=" . urlencode($trackingNumber);

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

                                <h1 style='color: #000; margin-top: 20px; font-size: 24px;'>Deine Bestellung ist unterwegs!</h1>
                            </div>
                            
                            <p>Hallo {$customerName},</p>
                            <p>gute Neuigkeiten: Deine AIRIMPULS Bestellung <strong>#{$orderNumber}</strong> wurde an unseren Versandpartner DHL übergeben und ist nun auf dem Weg zu dir.</p>
                            <p>Du kannst den Status deiner Sendung jederzeit hier verfolgen:</p>
                            <p style='margin: 30px 0;'>
                                <a href='{$trackingUrl}' style='display:inline-block; padding:12px 24px; background:#000; color:#fff; text-decoration:none; border-radius:4px; font-weight:bold;'>Sendung verfolgen (DHL)</a>
                            </p>
                            <p>Sendungsnummer: <strong>{$trackingNumber}</strong></p>
                            <br>
                            <p>Wir wünschen dir viel Freude mit deinem AIRIMPULS Produkt!</p>
                            <p>Viele Grüße,<br>Dein AIRIMPULS Team</p>
                        </div>
                    </body>
                    </html>
                ";

                sendEmail(
                    $customerEmail,
                    "Versandbestätigung zu deiner Bestellung #{$orderNumber}",
                    $html
                );

                error_log("Tracking email sent to {$customerEmail} for tracking {$trackingNumber}");
            } else {
                error_log("Could not send tracking email: No email address found for charge {$charge->id}");
            }
        }
        break;

    default:
        error_log('Unhandled event type: ' . $event->type);
}

jsonResponse(['received' => true]);

function formatEuro(int $cents): string
{
    return number_format($cents / 100, 2, ',', '.') . ' €';
}
