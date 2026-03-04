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
                $items[] = [
                    'name' => $item->description ?? 'Produkt',
                    'quantity' => $item->quantity ?? 1,
                    'price' => formatEuro($item->amount_total ?? 0),
                ];
            }

            $total = formatEuro($expanded->amount_total ?? 0);
            $orderNumber = strtoupper(substr($session->id, -8));

            if ($customerEmail) {
                $shippingHtml = '';
                if ($shipping) {
                    $country = match ($shipping->country ?? '') {
                        'DE' => 'Deutschland',
                        'AT' => 'Österreich',
                        'CH' => 'Schweiz',
                        default => $shipping->country ?? '',
                    };
                    $shippingHtml = "
                        <p><strong>Lieferadresse:</strong></p>
                        <p>{$shipping->line1}<br>"
                        . ($shipping->line2 ? "{$shipping->line2}<br>" : '')
                        . "{$shipping->postal_code} {$shipping->city}<br>
                        {$country}</p>
                    ";
                }

                $itemsHtml = '';
                foreach ($items as $it) {
                    $itemsHtml .= "<tr><td>{$it['name']}</td><td>{$it['quantity']}x</td><td>{$it['price']}</td></tr>";
                }

                $html = "
                    <h1>Bestellbestätigung #{$orderNumber}</h1>
                    <p>Hallo {$customerName},</p>
                    <p>vielen Dank für deine Bestellung bei AIRIMPULS!</p>
                    <table border='1' cellpadding='8' cellspacing='0'>
                        <tr><th>Produkt</th><th>Menge</th><th>Preis</th></tr>
                        {$itemsHtml}
                        <tr><td colspan='2'><strong>Gesamt</strong></td><td><strong>{$total}</strong></td></tr>
                    </table>
                    {$shippingHtml}
                    <p>Wir bearbeiten deine Bestellung schnellstmöglich.</p>
                    <p>Dein AIRIMPULS Team</p>
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

    default:
        error_log('Unhandled event type: ' . $event->type);
}

jsonResponse(['received' => true]);

function formatEuro(int $cents): string {
    return number_format($cents / 100, 2, ',', '.') . ' €';
}
