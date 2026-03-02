import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendMail } from "@/lib/email";
import {
  orderConfirmationHtml,
  orderConfirmationText,
} from "@/lib/email-templates";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Payment successful:", session.id);

      try {
        // Expand session to get line items and customer details
        const expandedSession = await stripe.checkout.sessions.retrieve(
          session.id,
          { expand: ["line_items", "line_items.data.price.product"] }
        );

        const customerEmail =
          expandedSession.customer_details?.email || session.customer_email;
        const customerName =
          expandedSession.customer_details?.name || "Kunde";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const shipping = (expandedSession as any).shipping_details?.address as
          | Record<string, string>
          | undefined;

        // Build order items from line items
        const lineItems = expandedSession.line_items?.data || [];
        const items = lineItems.map((item) => ({
          name: item.description || "Produkt",
          quantity: item.quantity || 1,
          price: formatEuro(item.amount_total || 0),
        }));

        const total = formatEuro(expandedSession.amount_total || 0);
        const orderNumber = session.id.slice(-8).toUpperCase();

        // Send confirmation email
        if (customerEmail) {
          const emailData = {
            customerName,
            orderNumber: `#${orderNumber}`,
            items,
            total,
            shippingAddress: shipping
              ? {
                  line1: shipping.line1 || "",
                  line2: shipping.line2 || undefined,
                  city: shipping.city || "",
                  postalCode: shipping.postal_code || "",
                  country: shipping.country === "DE" ? "Deutschland" : shipping.country === "AT" ? "Österreich" : shipping.country === "CH" ? "Schweiz" : (shipping.country || ""),
                }
              : undefined,
          };

          await sendMail({
            to: customerEmail,
            subject: `Bestellbestätigung #${orderNumber} — AIRIMPULSE`,
            html: orderConfirmationHtml(emailData),
            text: orderConfirmationText(emailData),
          });

          console.log(`Order confirmation sent to ${customerEmail}`);
        }
      } catch (emailError) {
        // Log but don't fail the webhook
        console.error("Failed to send confirmation email:", emailError);
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout session expired:", session.id);
      break;
    }
    default:
      console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
