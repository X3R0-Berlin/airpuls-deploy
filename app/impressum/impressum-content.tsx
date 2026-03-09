"use client";

import { useLanguage } from "@/lib/i18n/context";
import { brand } from "@/lib/brand";

export function ImpressumContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <>
        <h2>Information according to Section 5 TMG</h2>
        <p>
          <strong><mark>[PLATZHALTER]</mark> Company name</strong><br />
          AIRIMPULS by Jörg Klemm<br />
          <mark>[PLATZHALTER]</mark> Street No.<br />
          <mark>[PLATZHALTER]</mark> Postal code City<br />
          Germany
        </p>

        <h2>Contact</h2>
        <p>
          Phone: <mark>[PLATZHALTER]</mark><br />
          Email: {brand.social.email}
        </p>

        <h2>Represented by</h2>
        <p>Jörg Klemm (Owner)</p>

        <h2>Commercial Register</h2>
        <p>
          Registry court: <mark>[PLATZHALTER]</mark> Local court<br />
          Registration number: <mark>[PLATZHALTER]</mark>
        </p>

        <h2>VAT ID</h2>
        <p>
          VAT identification number according to Section 27a of the German VAT Act (UStG):<br />
          <mark>[PLATZHALTER]</mark>
        </p>

        <h2>WEEE Registration Number</h2>
        <p>
          WEEE-Reg.-Nr. DE <mark>[PLATZHALTER]</mark>
        </p>

        <h2>Responsible for content according to Section 55(2) RStV</h2>
        <p>
          Jörg Klemm<br />
          <mark>[PLATZHALTER]</mark> Street No.<br />
          <mark>[PLATZHALTER]</mark> Postal code City
        </p>

        <h2>EU Dispute Resolution</h2>
        <p>
          The European Commission provides a platform for online dispute
          resolution (ODR):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          . You can find our email address in the legal notice above.
        </p>

        <h2>Consumer Dispute Resolution</h2>
        <p>
          We are not willing or obliged to participate in dispute resolution
          proceedings before a consumer arbitration board.
        </p>

        <h2>Liability for Content</h2>
        <p>
          As a service provider, we are responsible for our own content on these
          pages in accordance with general legislation pursuant to Section 7(1)
          TMG. However, according to Sections 8 to 10 TMG, we are not obliged as
          a service provider to monitor transmitted or stored third-party
          information or to investigate circumstances that indicate illegal
          activity.
        </p>
        <p>
          Obligations to remove or block the use of information under general law
          remain unaffected. However, liability in this regard is only possible
          from the point in time at which a concrete infringement of the law
          becomes known. If we become aware of any such infringements, we will
          remove the content in question immediately.
        </p>

        <h2>Liability for Links</h2>
        <p>
          Our website contains links to external third-party websites over whose
          content we have no influence. Therefore, we cannot accept any liability
          for this third-party content. The respective provider or operator of
          the linked pages is always responsible for their content.
        </p>

        <h2>Copyright</h2>
        <p>
          The content and works created by the site operators on these pages are
          subject to German copyright law. Duplication, processing, distribution,
          and any kind of exploitation beyond the limits of copyright law require
          the written consent of the respective author or creator.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong><mark>[PLATZHALTER]</mark> Firmenname</strong><br />
        AIRIMPULS by Jörg Klemm<br />
        <mark>[PLATZHALTER]</mark> Straße Nr.<br />
        <mark>[PLATZHALTER]</mark> PLZ Ort<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <mark>[PLATZHALTER]</mark><br />
        E-Mail: {brand.social.email}
      </p>

      <h2>Vertreten durch</h2>
      <p>Jörg Klemm (Inhaber)</p>

      <h2>Registereintrag</h2>
      <p>
        Registergericht: <mark>[PLATZHALTER]</mark> Amtsgericht<br />
        Registernummer: <mark>[PLATZHALTER]</mark>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
        <mark>[PLATZHALTER]</mark>
      </p>

      <h2>WEEE-Registrierungsnummer</h2>
      <p>
        WEEE-Reg.-Nr. DE <mark>[PLATZHALTER]</mark>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Jörg Klemm<br />
        <mark>[PLATZHALTER]</mark> Straße Nr.<br />
        <mark>[PLATZHALTER]</mark> PLZ Ort
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§
        8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
    </>
  );
}
