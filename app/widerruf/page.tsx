import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | AIRIMPULS",
  description: "Widerrufsbelehrung und Muster-Widerrufsformular.",
};

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung" lastUpdated="25. Februar 2026">
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen <strong>vierzehn Tagen</strong> ohne Angabe
        von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt
        vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter
        Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen
        haben bzw. hat.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
      </p>
      <p>
        <strong>AIRIMPULS by Jörg Klemm</strong><br />
        <mark>[PLATZHALTER]</mark> Straße Nr.<br />
        <mark>[PLATZHALTER]</mark> PLZ Ort<br />
        E-Mail: {brand.social.email}<br />
        Telefon: <mark>[PLATZHALTER]</mark>
      </p>
      <p>
        mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter
        Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
        informieren. Sie können dafür das beigefügte Muster-Widerrufsformular
        verwenden, das jedoch nicht vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die
        wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit
        Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
        andere Art der Lieferung als die von uns angebotene, günstigste
        Standardlieferung gewählt haben), unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
      </p>
      <p>
        Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei
        der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
        wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen
        wegen dieser Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Wir können die Rückzahlung verweigern, bis wir die Waren wieder
        zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie
        die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt
        ist.
      </p>
      <p>
        Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen
        vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses
        Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist
        ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen
        absenden.
      </p>
      <p>
        <strong>Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</strong>
      </p>
      <p>
        Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn
        dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
        Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit
        ihnen zurückzuführen ist.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        <em>
          (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses
          Formular aus und senden Sie es zurück.)
        </em>
      </p>
      <div className="bg-white border border-[var(--brand-border-light)] rounded-xl p-6 my-6">
        <p>
          An:<br />
          AIRIMPULS by Jörg Klemm<br />
          <mark>[PLATZHALTER]</mark> Straße Nr.<br />
          <mark>[PLATZHALTER]</mark> PLZ Ort<br />
          E-Mail: {brand.social.email}
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der
          folgenden Dienstleistung (*):
        </p>
        <p>_________________________________________________</p>
        <p>Bestellt am (*)/erhalten am (*):</p>
        <p>_________________________________________________</p>
        <p>Name des/der Verbraucher(s):</p>
        <p>_________________________________________________</p>
        <p>Anschrift des/der Verbraucher(s):</p>
        <p>_________________________________________________</p>
        <p>Datum:</p>
        <p>_________________________________________________</p>
        <p>Unterschrift (nur bei Mitteilung auf Papier):</p>
        <p>_________________________________________________</p>
        <p className="text-[0.8rem] mt-4">(*) Unzutreffendes streichen.</p>
      </div>
    </LegalPage>
  );
}
