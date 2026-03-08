"use client";

import { useLanguage } from "@/lib/i18n/context";
import { brand } from "@/lib/brand";

export function DatenschutzContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <>
        <h2>1. Privacy at a Glance</h2>
        <h3>General Information</h3>
        <p>
          The following notices provide a simple overview of what happens to your
          personal data when you visit this website. Personal data is any data
          that can be used to personally identify you.
        </p>

        <h3>Data Collection on This Website</h3>
        <p>
          <strong>Who is responsible for data collection on this website?</strong><br />
          Data processing on this website is carried out by the website operator.
          You can find the operator&apos;s contact details in the legal notice of
          this website.
        </p>
        <p>
          <strong>How do we collect your data?</strong><br />
          Your data is collected in part by you providing it to us. This may be
          data that you enter in a contact form, for example. Other data is
          collected automatically or with your consent when you visit the website
          by our IT systems. This is primarily technical data (e.g., internet
          browser, operating system, or time of page access).
        </p>

        <h2>2. Responsible Party</h2>
        <p>
          <strong><mark>[PLATZHALTER]</mark> Company name</strong><br />
          AIRIMPULS by Jörg Klemm<br />
          <mark>[PLATZHALTER]</mark> Street No.<br />
          <mark>[PLATZHALTER]</mark> Postal code City<br />
          Email: {brand.social.email}
        </p>

        <h2>3. Data Collection on This Website</h2>

        <h3>Cookies</h3>
        <p>
          Our website uses cookies. These are small text files that your web
          browser stores on your device. We only use technically necessary
          cookies that are required for the operation of the website (e.g.,
          shopping cart, cookie settings).
        </p>
        <p>
          The legal basis is Art. 6(1)(f) GDPR (legitimate interest). You can
          configure your browser to inform you about the setting of cookies and
          to allow cookies only on a case-by-case basis.
        </p>

        <h3>Server Log Files</h3>
        <p>
          The provider of the pages automatically collects and stores information
          in so-called server log files, which your browser automatically
          transmits to us. These are:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system used</li>
          <li>Referrer URL</li>
          <li>Hostname of the accessing computer</li>
          <li>Time of the server request</li>
          <li>IP address</li>
        </ul>
        <p>
          This data is not merged with other data sources. The basis is Art.
          6(1)(f) GDPR.
        </p>

        <h3>Contact Form</h3>
        <p>
          If you send us inquiries via the contact form, your details from the
          form, including the contact data you provide there, will be stored by
          us for the purpose of processing the inquiry and in case of follow-up
          questions. We do not share this data without your consent.
        </p>
        <p>
          The legal basis is Art. 6(1)(b) GDPR (contract performance) or Art.
          6(1)(f) GDPR (legitimate interest).
        </p>

        <h3>Newsletter</h3>
        <p>
          If you would like to receive the newsletter offered on the website, we
          require an email address from you. This is used exclusively for
          sending the newsletter. We do not share it with third parties.
        </p>
        <p>
          The legal basis is Art. 6(1)(a) GDPR (consent). You can unsubscribe
          from the newsletter at any time via the unsubscribe link included in
          every email.
        </p>

        <h2>4. Payment Service Provider</h2>

        <h3>Stripe</h3>
        <p>
          We use the payment service provider Stripe (Stripe Payments Europe,
          Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Ireland).
          When you make a payment, your payment data is transmitted directly to
          Stripe. Stripe processes your data in accordance with its own privacy
          policy:{" "}
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            stripe.com/privacy
          </a>
          .
        </p>
        <p>The legal basis is Art. 6(1)(b) GDPR (contract performance).</p>

        <h2>5. Your Rights</h2>
        <p>You have the right at any time to:</p>
        <ul>
          <li>Obtain information about your stored data (Art. 15 GDPR)</li>
          <li>Request rectification of inaccurate data (Art. 16 GDPR)</li>
          <li>Request deletion of your data (Art. 17 GDPR)</li>
          <li>Request restriction of processing (Art. 18 GDPR)</li>
          <li>Request data portability (Art. 20 GDPR)</li>
          <li>Object to processing (Art. 21 GDPR)</li>
          <li>Withdraw given consent (Art. 7(3) GDPR)</li>
        </ul>
        <p>
          Please contact: <strong>{brand.social.email}</strong>
        </p>

        <h2>6. Right to Complain</h2>
        <p>
          You have the right to lodge a complaint with a data protection
          supervisory authority regarding the processing of your personal data
          (Art. 77 GDPR).
        </p>
      </>
    );
  }

  return (
    <>
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
        AIRIMPULS by Jörg Klemm<br />
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
    </>
  );
}
