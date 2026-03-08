"use client";

import { useLanguage } from "@/lib/i18n/context";
import { brand } from "@/lib/brand";

export function WiderrufContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <>
        <h2>Right of Withdrawal</h2>
        <p>
          You have the right to withdraw from this contract within{" "}
          <strong>fourteen days</strong> without giving any reason. The
          withdrawal period is fourteen days from the day on which you, or a
          third party named by you who is not the carrier, have taken possession
          of the goods.
        </p>
        <p>
          To exercise your right of withdrawal, you must notify us:
        </p>
        <p>
          <strong>AIRIMPULS by Jörg Klemm</strong><br />
          <mark>[PLATZHALTER]</mark> Street No.<br />
          <mark>[PLATZHALTER]</mark> Postal code City<br />
          Email: {brand.social.email}<br />
          Phone: <mark>[PLATZHALTER]</mark>
        </p>
        <p>
          by means of a clear declaration (e.g., a letter sent by post or an
          email) of your decision to withdraw from this contract. You may use
          the attached model withdrawal form for this purpose, but it is not
          mandatory.
        </p>
        <p>
          To meet the withdrawal deadline, it is sufficient for you to send your
          communication concerning the exercise of the right of withdrawal
          before the withdrawal period has expired.
        </p>

        <h2>Consequences of Withdrawal</h2>
        <p>
          If you withdraw from this contract, we shall reimburse all payments
          received from you, including delivery costs (with the exception of any
          additional costs resulting from your choice of a type of delivery
          other than the least expensive standard delivery offered by us),
          without undue delay and no later than fourteen days from the day on
          which we are informed of your decision to withdraw from this contract.
        </p>
        <p>
          We will carry out such reimbursement using the same means of payment
          as you used for the initial transaction, unless expressly agreed
          otherwise with you; in no event will you be charged any fees as a
          result of such reimbursement.
        </p>
        <p>
          We may withhold reimbursement until we have received the goods back or
          until you have supplied evidence of having sent back the goods,
          whichever is the earliest.
        </p>
        <p>
          You shall send back the goods without undue delay and in any event not
          later than fourteen days from the day on which you communicate your
          withdrawal from this contract to us. The deadline is met if you send
          back the goods before the period of fourteen days has expired.
        </p>
        <p>
          <strong>You shall bear the direct cost of returning the goods.</strong>
        </p>
        <p>
          You are only liable for any diminished value of the goods resulting
          from handling other than what is necessary to establish the nature,
          characteristics, and functioning of the goods.
        </p>

        <h2>Model Withdrawal Form</h2>
        <p>
          <em>
            (If you wish to withdraw from the contract, please complete and
            return this form.)
          </em>
        </p>
        <div className="bg-white border border-[var(--brand-border-light)] rounded-xl p-6 my-6">
          <p>
            To:<br />
            AIRIMPULS by Jörg Klemm<br />
            <mark>[PLATZHALTER]</mark> Street No.<br />
            <mark>[PLATZHALTER]</mark> Postal code City<br />
            Email: {brand.social.email}
          </p>
          <p>
            I/We (*) hereby give notice that I/We (*) withdraw from my/our (*)
            contract of sale of the following goods (*)/for the provision of the
            following service (*):
          </p>
          <p>_________________________________________________</p>
          <p>Ordered on (*)/received on (*):</p>
          <p>_________________________________________________</p>
          <p>Name of consumer(s):</p>
          <p>_________________________________________________</p>
          <p>Address of consumer(s):</p>
          <p>_________________________________________________</p>
          <p>Date:</p>
          <p>_________________________________________________</p>
          <p>Signature (only if this form is submitted on paper):</p>
          <p>_________________________________________________</p>
          <p className="text-[0.8rem] mt-4">(*) Delete as applicable.</p>
        </div>
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
