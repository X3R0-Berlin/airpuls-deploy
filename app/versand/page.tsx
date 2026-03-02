import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { brand } from "@/lib/brand";
import { Package, Truck, RotateCcw, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Versand & Rückgabe | AIRIMPULSE",
  description: "Informationen zu Versandkosten, Lieferzeiten und Rückgabe.",
};

const infoCards = [
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

export default function VersandPage() {
  return (
    <LegalPage title="Versand & Rückgabe" lastUpdated="25. Februar 2026">
      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
        {infoCards.map((card) => (
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
        AIRIMPULSE by Jörg Klemm<br />
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
    </LegalPage>
  );
}
