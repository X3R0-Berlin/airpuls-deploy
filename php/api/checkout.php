<?php
/**
 * Stripe Checkout Session endpoint.
 * POST /api/checkout.php
 * Body: { "items": [{ "slug": "vitair", "quantity": 1, "price": 69900 }], "affiliateRef": "..." }
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../../vendor/autoload.php';

handlePreflight();
setCorsHeaders();
requirePost();

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $items = $input['items'] ?? [];
    $affiliateRef = $input['affiliateRef'] ?? null;
    $currencyCode = strtoupper($input['currency'] ?? 'EUR');

    if (!in_array($currencyCode, ['EUR', 'CHF'])) {
        $currencyCode = 'EUR';
    }

    if (empty($items) || !is_array($items)) {
        jsonError('Warenkorb ist leer');
    }

    $stripe = new \Stripe\StripeClient(getenv('STRIPE_SECRET_KEY'));
    $baseUrl = getenv('NEXT_PUBLIC_BASE_URL') ?: 'https://airimpuls.de';

    $lineItems = [];

    foreach ($items as $item) {
        $product = getProductBySlug($item['slug'] ?? '');
        if (!$product) {
            jsonError('Produkt "' . ($item['slug'] ?? '') . '" nicht gefunden');
        }

        $targetPrice = ($currencyCode === 'CHF' && isset($product['priceChf'])) ? $product['priceChf'] : $product['price'];

        $imagePath = $product['images']['basePath'] . '/' . $product['images']['gallery'][0]['file'];

        $lineItems[] = [
            'price_data' => [
                'currency' => strtolower($currencyCode),
                'product_data' => [
                    'name' => $product['name'] . ' ' . ($product['subtitle'] ?? ''),
                    'description' => mb_substr($product['description'] ?? '', 0, 200),
                    'images' => [$baseUrl . $imagePath],
                ],
                'unit_amount' => $targetPrice,
            ],
            'quantity' => (int) ($item['quantity'] ?? 1),
        ];
    }

    $sessionParams = [
        'payment_method_types' => ['card'],
        'line_items' => $lineItems,
        'mode' => 'payment',
        'success_url' => $baseUrl . '/checkout/success/?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => $baseUrl . '/checkout/cancel/',
        'shipping_address_collection' => [
            'allowed_countries' => ['DE', 'AT', 'CH'],
        ],
        'locale' => 'de',
    ];

    if ($affiliateRef && is_string($affiliateRef) && strlen($affiliateRef) <= 50) {
        $sessionParams['metadata'] = ['affiliate_ref' => $affiliateRef];
    }

    $session = $stripe->checkout->sessions->create($sessionParams);

    jsonResponse(['url' => $session->url]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    error_log('Stripe checkout error: ' . $e->getMessage());
    jsonError('Checkout fehlgeschlagen', 500);
} catch (\Exception $e) {
    error_log('Checkout error: ' . $e->getMessage());
    jsonError('Checkout fehlgeschlagen', 500);
}
