import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | AIRIMPULSE",
  description: "Informationen zum Datenschutz gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" lastUpdated="25. Februar 2026">
      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
        Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den
        Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
        Website entnehmen.
      </p>
      <p>
        <strong>Wie erfassen wir Ihre Daten?</strong><br />
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
        mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein
        Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer
        Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das
        sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem
        oder Uhrzeit des Seitenaufrufs).
      </p>

      <h2>2. Verantwortliche Stelle</h2>
      <p>
        <strong><mark>[PLATZHALTER]</mark> Firmenname</strong><br />
        AIRIMPULSE by Jörg Klemm<br />
        <mark>[PLATZHALTER]</mark> Straße Nr.<br />
        <mark>[PLATZHALTER]</mark> PLZ Ort<br />
        E-Mail: {brand.social.email}
  </p>

      <h2>3. Datenerfassung auf dieser Website</h2>

      <h3>Cookies</h3>
      <p>
        Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr
        Webbrowser auf Ihrem Endgerät speichert. Wir nutzen ausschließlich
        technisch notwendige Cookies, die für den Betrieb der Website
        erforderlich sind (z.B. Warenkorb, Cookie-Einstellungen).
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse). Sie können Ihren Browser so einstellen, dass Sie über das
        Setzen von Cookies informiert werden und Cookies nur im Einzelfall
        erlauben.
      </p>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in
        sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns
        übermittelt. Dies sind:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
        vorgenommen. Grundlage ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h3>Kontaktformular</h3>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
        Angaben aus dem Formular inklusive der von Ihnen dort angegebenen
        Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
        Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
        Ihre Einwilligung weiter.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw.
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
      </p>

      <h3>Newsletter</h3>
      <p>
        Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten,
        benötigen wir von Ihnen eine E-Mail-Adresse. Diese wird ausschließlich
        für den Versand des Newsletters verwendet. Eine Weitergabe an Dritte
        erfolgt nicht.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie
        können den Newsletter jederzeit über den in jeder E-Mail enthaltenen
        Abmelde-Link abbestellen.
      </p>

      <h2>4. Zahlungsdienstleister</h2>

      <h3>Stripe</h3>
      <p>
        Wir nutzen den Zahlungsdienstleister Stripe (Stripe Payments Europe,
        Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland). Bei
        der Bezahlung werden Ihre Zahlungsdaten direkt an Stripe übermittelt.
        Stripe verarbeitet Ihre Daten gemäß seiner eigenen Datenschutzerklärung:{" "}
        <a
          href="https://stripe.com/de/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          stripe.com/de/privacy
        </a>
        .
      </p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>

      <h2>5. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
        <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
        <li>Erteilte Einwilligungen zu widerrufen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Wenden Sie sich dazu an: <strong>{brand.social.email}</strong>
      </p>

      <h2>6. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
        die Verarbeitung Ihrer personenbezogenen Daten zu beschweren (Art. 77
        DSGVO).
      </p>
    </LegalPage>
  );
}
