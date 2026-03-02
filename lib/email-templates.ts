import { brand } from "@/lib/brand";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderConfirmationData {
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  total: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export function orderConfirmationHtml(data: OrderConfirmationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.08); color: #222222; font-size: 14px;">
          ${item.name}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.08); color: #6b7280; font-size: 14px; text-align: center;">
          ${item.quantity}x
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.08); color: #222222; font-size: 14px; text-align: right;">
          ${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  const addressHtml = data.shippingAddress
    ? `
      <div style="margin-top: 24px; padding: 20px; background-color: #EEF0F2; border-radius: 12px;">
        <h3 style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px 0;">
          Lieferadresse
        </h3>
        <p style="color: #222222; font-size: 14px; line-height: 1.6; margin: 0;">
          ${data.customerName}<br/>
          ${data.shippingAddress.line1}<br/>
          ${data.shippingAddress.line2 ? data.shippingAddress.line2 + "<br/>" : ""}
          ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br/>
          ${data.shippingAddress.country}
        </p>
      </div>
    `
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #357868; font-size: 24px; font-weight: 300; letter-spacing: 3px; margin: 0;">
        AIRIMPULSE
      </h1>
    </div>

    <!-- Main Content -->
    <div style="background-color: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 32px;">

      <h2 style="color: #222222; font-size: 22px; font-weight: 300; margin: 0 0 8px 0;">
        Bestellbestätigung
      </h2>
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px 0;">
        Bestellung ${data.orderNumber}
      </p>

      <p style="color: #222222; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
        Hallo ${data.customerName},<br/><br/>
        vielen Dank für deine Bestellung! Wir haben deine Zahlung erhalten und
        bereiten den Versand vor. Du erhältst eine weitere E-Mail mit der
        Sendungsverfolgung, sobald dein Paket unterwegs ist.
      </p>

      <!-- Order Items -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.08); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; text-align: left; font-weight: 500;">
              Produkt
            </th>
            <th style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.08); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; text-align: center; font-weight: 500;">
              Menge
            </th>
            <th style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.08); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; text-align: right; font-weight: 500;">
              Preis
            </th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Total -->
      <div style="text-align: right; padding-top: 12px;">
        <span style="color: #6b7280; font-size: 13px;">Gesamt: </span>
        <span style="color: #222222; font-size: 18px; font-weight: 600;">${data.total}</span>
      </div>

      ${addressHtml}
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.06);">
      <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0;">
        Bei Fragen erreichst du uns unter ${brand.social.email}
      </p>
      <p style="color: #6b7280; font-size: 11px; margin: 0;">
        AIRIMPULSE by Jörg Klemm &bull; Handgefertigt in Deutschland
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function orderConfirmationText(data: OrderConfirmationData): string {
  const items = data.items
    .map((item) => `  ${item.name} (${item.quantity}x) — ${item.price}`)
    .join("\n");

  return `
AIRIMPULSE — Bestellbestätigung

Bestellung ${data.orderNumber}

Hallo ${data.customerName},

vielen Dank für deine Bestellung! Wir haben deine Zahlung erhalten und bereiten den Versand vor.

Bestellübersicht:
${items}

Gesamt: ${data.total}

Bei Fragen erreichst du uns unter ${brand.social.email}

AIRIMPULSE by Jörg Klemm
Handgefertigt in Deutschland
  `.trim();
}
