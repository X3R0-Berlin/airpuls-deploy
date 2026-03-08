"use client";

import { useLanguage } from "@/lib/i18n/context";

export function AGBContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <>
        <h2>Section 1 -- Scope</h2>
        <p>
          These General Terms and Conditions (GTC) apply to all orders placed by
          consumers and businesses through the online shop of AIRIMPULS by Jörg
          Klemm (<mark>[PLATZHALTER]</mark> address).
        </p>
        <p>
          The version of the GTC valid at the time of the order shall apply.
          Deviating conditions of the customer will not be recognized unless we
          expressly agree to their validity in writing.
        </p>

        <h2>Section 2 -- Conclusion of Contract</h2>
        <p>
          The presentation of products in the online shop does not constitute a
          legally binding offer, but rather a non-binding invitation to place an
          order.
        </p>
        <ol>
          <li>The customer places the desired products in the shopping cart.</li>
          <li>
            By clicking &quot;Place binding order&quot;, the customer submits a
            binding purchase offer.
          </li>
          <li>
            We confirm receipt of the order via email (order confirmation). This
            email constitutes acceptance of the offer and establishes the
            purchase contract.
          </li>
        </ol>

        <h2>Section 3 -- Prices and Shipping Costs</h2>
        <p>
          all stated prices are final prices in euros and include the statutory
          value-added tax. Shipping costs are clearly displayed before the order
          is completed. For deliveries to non-EU countries, additional customs duties, taxes, and fees may apply. For orders of 50.00 EUR or more, we ship free of charge
          within Germany.
        </p>

        <h2>Section 4 -- Payment</h2>
        <p>We offer the following payment methods:</p>
        <ul>
          <li>Credit card (Visa, Mastercard)</li>
          <li>PayPal</li>
          <li>Klarna</li>
        </ul>
        <p>
          Payment is processed through our payment service provider Stripe. The
          charge occurs at the time of the order.
        </p>

        <h2>Section 5 -- Delivery</h2>
        <p>
          Delivery is made to the delivery address provided by the customer. The
          delivery time is generally 3--5 business days within Germany. For
          deliveries to Austria and Switzerland, the delivery time is 5--8
          business days.
        </p>

        <h2>Section 6 -- Retention of Title</h2>
        <p>
          The delivered goods remain our property until full payment has been
          made.
        </p>

        <h2>Section 7 -- Right of Withdrawal</h2>
        <p>
          Consumers have a 14-day right of withdrawal. Please refer to our{" "}
          <a href="/widerruf">cancellation policy</a> for details.
        </p>

        <h2>Section 8 -- Warranty</h2>
        <p>
          The statutory warranty rights apply. The warranty period is two years
          from receipt of the goods.
        </p>

        <h2>Section 9 -- Liability</h2>
        <p>
          We are liable without limitation for intent and gross negligence. In
          cases of slight negligence, we are only liable for the breach of
          essential contractual obligations (cardinal obligations), and the
          amount is limited to the foreseeable, contract-typical damage.
        </p>

        <h2>Section 10 -- Data Protection</h2>
        <p>
          For information on how we handle your personal data, please refer to
          our{" "}
          <a href="/datenschutz">privacy policy</a>.
        </p>

        <h2>Section 11 -- Final Provisions</h2>
        <p>
          The law of the Federal Republic of Germany applies, excluding the UN
          Convention on Contracts for the International Sale of Goods. With
          respect to consumers, this choice of law applies only insofar as the
          protection afforded by mandatory provisions of the law of the state in
          which the consumer has their habitual residence is not withdrawn.
        </p>
        <p>
          Should individual provisions of these GTC be or become invalid, the
          validity of the remaining provisions shall not be affected.
        </p>
      </>
    );
  }

  return (
    <>
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
        Bestellung deutlich ausgewiesen. Bei Lieferungen in das Nicht-EU-Ausland fallen
        zusätzliche Zölle, Steuern und Gebühren an. Ab einem Bestellwert von 50,00 €
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
    </>
  );
}
