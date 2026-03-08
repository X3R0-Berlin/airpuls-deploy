"use client";

import { useLanguage } from "@/lib/i18n/context";
import { brand } from "@/lib/brand";
import { Package, Truck, RotateCcw, Clock } from "lucide-react";

const infoCardsDe = [
  {
    icon: Truck,
    title: "Kostenloser Versand",
    text: "Ab 50 € Bestellwert liefern wir innerhalb Deutschlands versandkostenfrei.",
  },
  {
    icon: Clock,
    title: "Schnelle Lieferung",
    text: "3–5 Werktage in DE, 5–8 Werktage in AT & CH.",
  },
  {
    icon: Package,
    title: "Sichere Verpackung",
    text: "Jedes Produkt wird sorgfältig und nachhaltig verpackt.",
  },
  {
    icon: RotateCcw,
    title: "14 Tage Rückgabe",
    text: "Einfache Rückgabe innerhalb von 14 Tagen nach Erhalt.",
  },
];

const infoCardsEn = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "Free shipping within Germany on orders of 50 EUR or more.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    text: "3–5 business days in DE, 5–8 business days in AT & CH.",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    text: "Every product is carefully and sustainably packaged.",
  },
  {
    icon: RotateCcw,
    title: "14-Day Returns",
    text: "Easy returns within 14 days of receipt.",
  },
];

export function VersandContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <>
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
          {infoCardsEn.map((card) => (
            <div
              key={card.title}
              className="flex gap-4 p-5 rounded-xl border border-[var(--brand-border-light)] bg-white"
            >
              <card.icon className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[0.9rem] font-semibold text-brand-text-dark mb-1">
                  {card.title}
                </h4>
                <p className="text-[0.82rem] text-brand-text-muted leading-[1.6]">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2>Shipping Costs</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[var(--brand-border-light)]">
                <th className="text-left py-3 text-brand-text-dark font-medium">Country</th>
                <th className="text-left py-3 text-brand-text-dark font-medium">Standard Shipping</th>
                <th className="text-left py-3 text-brand-text-dark font-medium">Delivery Time</th>
              </tr>
            </thead>
            <tbody className="text-brand-text-muted">
              <tr className="border-b border-[var(--brand-border-light)]/50">
                <td className="py-3">Germany</td>
                <td className="py-3">4.90 EUR (free from 50 EUR)</td>
                <td className="py-3">3–5 business days</td>
              </tr>
              <tr className="border-b border-[var(--brand-border-light)]/50">
                <td className="py-3">Austria</td>
                <td className="py-3">6.90 EUR</td>
                <td className="py-3">5–8 business days</td>
              </tr>
              <tr>
                <td className="py-3">Switzerland</td>
                <td className="py-3">9.90 EUR</td>
                <td className="py-3">5–8 business days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[0.8rem] text-brand-text-muted mb-8 italic">
          Please note: For deliveries to non-EU countries (such as Switzerland), additional customs duties, taxes, and fees may apply, which are the responsibility of the customer.
        </p>

        <h2>Shipping Partner</h2>
        <p>
          Shipping is handled by DHL. After dispatch, you will receive a
          tracking number via email so you can track your shipment at any time.
        </p>

        <h2>Return Process</h2>
        <p>
          You can return your order within <strong>14 days</strong> of receipt
          without giving any reason. Details about the right of withdrawal can
          be found in our{" "}
          <a href="/widerruf">cancellation policy</a>.
        </p>
        <p><strong>How the return works:</strong></p>
        <ol>
          <li>
            Send us a brief notification via email to{" "}
            <strong>{brand.social.email}</strong> with your order number.
          </li>
          <li>
            Pack the goods securely and send them to our return address.
          </li>
          <li>
            After receiving and inspecting the return, we will refund the
            purchase price within 14 days using the original payment method.
          </li>
        </ol>

        <h2>Return Address</h2>
        <p>
          AIRIMPULS by Jörg Klemm<br />
          <mark>[PLATZHALTER]</mark> Street No.<br />
          <mark>[PLATZHALTER]</mark> Postal code City<br />
          Germany
        </p>

        <h2>Damaged Goods</h2>
        <p>
          If your order arrives damaged, please contact us immediately at{" "}
          <strong>{brand.social.email}</strong>. Please include photos of the
          damage — we will find a solution as quickly as possible.
        </p>
      </>
    );
  }

  return (
    <>
      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
        {infoCardsDe.map((card) => (
          <div
            key={card.title}
            className="flex gap-4 p-5 rounded-xl border border-[var(--brand-border-light)] bg-white"
          >
            <card.icon className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[0.9rem] font-semibold text-brand-text-dark mb-1">
                {card.title}
              </h4>
              <p className="text-[0.82rem] text-brand-text-muted leading-[1.6]">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2>Versandkosten</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-[0.85rem] border-collapse">
          <thead>
            <tr className="border-b border-[var(--brand-border-light)]">
              <th className="text-left py-3 text-brand-text-dark font-medium">Land</th>
              <th className="text-left py-3 text-brand-text-dark font-medium">Standardversand</th>
              <th className="text-left py-3 text-brand-text-dark font-medium">Lieferzeit</th>
            </tr>
          </thead>
          <tbody className="text-brand-text-muted">
            <tr className="border-b border-[var(--brand-border-light)]/50">
              <td className="py-3">Deutschland</td>
              <td className="py-3">4,90 € (ab 50 € kostenlos)</td>
              <td className="py-3">3–5 Werktage</td>
            </tr>
            <tr className="border-b border-[var(--brand-border-light)]/50">
              <td className="py-3">Österreich</td>
              <td className="py-3">6,90 €</td>
              <td className="py-3">5–8 Werktage</td>
            </tr>
            <tr>
              <td className="py-3">Schweiz</td>
              <td className="py-3">9,90 €</td>
              <td className="py-3">5–8 Werktage</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-[0.8rem] text-brand-text-muted mb-8 italic">
        Hinweis: Bei Lieferungen in Nicht-EU-Länder (z. B. Schweiz) können zusätzliche Zölle, Steuern und Gebühren anfallen, die vom Kunden zu tragen sind.
      </p>

      <h2>Versandpartner</h2>
      <p>
        Der Versand erfolgt über DHL. Nach dem Versand erhalten Sie eine
        Tracking-Nummer per E-Mail, mit der Sie Ihre Sendung jederzeit
        verfolgen können.
      </p>

      <h2>Rückgabeprozess</h2>
      <p>
        Sie können Ihre Bestellung innerhalb von <strong>14 Tagen</strong> nach
        Erhalt ohne Angabe von Gründen zurücksenden. Details zum Widerrufsrecht
        finden Sie in unserer{" "}
        <a href="/widerruf">Widerrufsbelehrung</a>.
      </p>
      <p><strong>So funktioniert die Rückgabe:</strong></p>
      <ol>
        <li>
          Senden Sie uns eine kurze Mitteilung per E-Mail an{" "}
          <strong>{brand.social.email}</strong> mit Ihrer Bestellnummer.
        </li>
        <li>
          Verpacken Sie die Ware sicher und senden Sie diese an unsere
          Retouradresse.
        </li>
        <li>
          Nach Erhalt und Prüfung der Rücksendung erstatten wir den Kaufpreis
          innerhalb von 14 Tagen über das ursprüngliche Zahlungsmittel.
        </li>
      </ol>

      <h2>Retouradresse</h2>
      <p>
        AIRIMPULS by Jörg Klemm<br />
        <mark>[PLATZHALTER]</mark> Straße Nr.<br />
        <mark>[PLATZHALTER]</mark> PLZ Ort<br />
        Deutschland
      </p>

      <h2>Beschädigte Ware</h2>
      <p>
        Sollte Ihre Bestellung beschädigt ankommen, kontaktieren Sie uns bitte
        umgehend unter <strong>{brand.social.email}</strong>. Bitte fügen Sie Fotos
        der Beschädigung bei — wir finden schnellstmöglich eine Lösung.
      </p>
    </>
  );
}
