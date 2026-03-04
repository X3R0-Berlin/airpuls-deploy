import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "AGB | AIRIMPULS",
  description: "Allgemeine Geschäftsbedingungen der AIRIMPULS by Jörg Klemm.",
};

export default function AGBPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" lastUpdated="25. Februar 2026">
      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
        Bestellungen, die Verbraucher und Unternehmer über den Online-Shop
        von AIRIMPULS by Jörg Klemm (<mark>[PLATZHALTER]</mark> Anschrift) abschließen.
      </p>
      <p>
        Maßgeblich ist die zum Zeitpunkt der Bestellung gültige Fassung der AGB.
        Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn,
        wir stimmen ihrer Geltung ausdrücklich schriftlich zu.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte im Online-Shop stellt kein rechtlich
        bindendes Angebot, sondern eine unverbindliche Aufforderung zur
        Bestellung dar.
      </p>
      <ol>
        <li>Der Kunde legt die gewünschten Produkte in den Warenkorb.</li>
        <li>
          Durch Klicken auf &quot;Zahlungspflichtig bestellen&quot; gibt der Kunde ein
          verbindliches Kaufangebot ab.
        </li>
        <li>
          Wir bestätigen den Eingang der Bestellung per E-Mail
          (Bestellbestätigung). Diese E-Mail stellt die Annahme des Angebots dar
          und begründet den Kaufvertrag.
        </li>
      </ol>

      <h2>§ 3 Preise und Versandkosten</h2>
      <p>
        Alle angegebenen Preise sind Endpreise in Euro und enthalten die
        gesetzliche Mehrwertsteuer. Versandkosten werden vor Abschluss der
        Bestellung deutlich ausgewiesen. Ab einem Bestellwert von 50,00 €
        liefern wir versandkostenfrei innerhalb Deutschlands.
      </p>

      <h2>§ 4 Zahlung</h2>
      <p>Wir bieten folgende Zahlungsarten an:</p>
      <ul>
        <li>Kreditkarte (Visa, Mastercard)</li>
        <li>PayPal</li>
        <li>Klarna</li>
      </ul>
      <p>
        Die Zahlung wird über unseren Zahlungsdienstleister Stripe abgewickelt.
        Die Belastung erfolgt zum Zeitpunkt der Bestellung.
      </p>

      <h2>§ 5 Lieferung</h2>
      <p>
        Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse.
        Die Lieferzeit beträgt in der Regel 3–5 Werktage innerhalb Deutschlands.
        Für Lieferungen nach Österreich und in die Schweiz beträgt die
        Lieferzeit 5–8 Werktage.
      </p>

      <h2>§ 6 Eigentumsvorbehalt</h2>
      <p>
        Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser
        Eigentum.
      </p>

      <h2>§ 7 Widerrufsrecht</h2>
      <p>
        Verbraucher haben ein 14-tägiges Widerrufsrecht. Die Details entnehmen
        Sie bitte unserer{" "}
        <a href="/widerruf">Widerrufsbelehrung</a>.
      </p>

      <h2>§ 8 Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Gewährleistungsrechte. Die Gewährleistungsfrist
        beträgt zwei Jahre ab Erhalt der Ware.
      </p>

      <h2>§ 9 Haftung</h2>
      <p>
        Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Bei
        leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher
        Vertragspflichten (Kardinalpflichten) und der Höhe nach begrenzt auf den
        vorhersehbaren, vertragstypischen Schaden.
      </p>

      <h2>§ 10 Datenschutz</h2>
      <p>
        Informationen zum Umgang mit Ihren personenbezogenen Daten entnehmen
        Sie bitte unserer{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>§ 11 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur insoweit,
        als nicht der gewährte Schutz durch zwingende Bestimmungen des Rechts des
        Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat,
        entzogen wird.
      </p>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so
        wird die Wirksamkeit der übrigen Bestimmungen hiervon nicht berührt.
      </p>
    </LegalPage>
  );
}
