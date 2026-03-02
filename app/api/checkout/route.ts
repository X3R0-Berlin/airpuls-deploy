import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { items, affiliateRef } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Warenkorb ist leer" },
        { status: 400 }
      );
    }

    // Validate items against product data
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = getProductBySlug(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Produkt "${item.slug}" nicht gefunden` },
          { status: 400 }
        );
      }
      if (item.price !== product.price) {
        return NextResponse.json(
          { error: `Preis für "${product.name}" stimmt nicht überein` },
          { status: 400 }
        );
      }

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${product.name} ${product.subtitle}`,
            description: product.description.slice(0, 200),
            images: [
              `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${product.images.basePath}/${product.images.gallery[0].file}`,
            ],
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ["DE", "AT", "CH"],
      },
      locale: "de",
    };

    // Attach affiliate ref code as metadata for commission tracking
    if (affiliateRef && typeof affiliateRef === "string" && affiliateRef.length <= 50) {
      sessionParams.metadata = { affiliate_ref: affiliateRef };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Checkout fehlgeschlagen" },
      { status: 500 }
    );
  }
}
