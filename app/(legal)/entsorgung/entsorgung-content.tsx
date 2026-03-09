"use client";

import { useLanguage } from "@/lib/i18n/context";

export function EntsorgungContent() {
    const { locale } = useLanguage();

    if (locale === "en") {
        return (
            <>
                <h1>Disposal Information</h1>
                <p>
                    Information specifically for private households regarding the disposal of electrical and electronic equipment (WEEE).
                </p>

                <h2>1. Separate Collection of Old Appliances</h2>
                <p>
                    Electrical and electronic equipment that has become waste is referred to as WEEE. Owners of WEEE must dispose of it separately from unsorted municipal waste. In particular, WEEE does not belong in household waste, but in special collection and return systems.
                </p>

                <h2>2. Meaning of the Symbol "Crossed-out Wheeled Bin"</h2>
                <p>
                    The symbol of a crossed-out wheeled bin, regularly depicted on electrical and electronic equipment, indicates that the respective device must be collected separately from unsorted municipal waste at the end of its service life.
                </p>

                <h2>3. Batteries and Rechargeable Batteries</h2>
                <p>
                    As a rule, owners of WEEE must separate used batteries and accumulators that are not enclosed by the WEEE, as well as lamps that can be removed non-destructively, from the WEEE before handing them over to a collection point. This does not apply if WEEE is prepared for re-use with the involvement of a public waste management authority.
                </p>

                <h2>4. Options for Returning Old Appliances</h2>
                <p>
                    Owners of WEEE from private households can drop it off free of charge at the collection points of public waste management authorities or at the return points established by manufacturers or distributors within the meaning of the ElektroG.
                </p>

                <h2>5. Privacy Notice</h2>
                <p>
                    WEEE often contains sensitive personal data. This applies in particular to information and telecommunications technology devices such as computers and smartphones. In your own interest, please note that each end user is responsible for deleting the data on the end devices to be disposed of.
                </p>
            </>
        );
    }

    return (
        <>
            <h1>Entsorgungshinweise (ElektroG / BatterieG)</h1>
            <p>
                Informationspflichten gemäß § 18 Abs. 2 Elektro- und Elektronikgerätegesetz (ElektroG) sowie Hinweise zur Batterieentsorgung.
            </p>

            <h2>1. Getrennte Erfassung von Altgeräten</h2>
            <p>
                Elektro- und Elektronikgeräte, die zu Abfall geworden sind, werden als Altgeräte bezeichnet. Besitzer von Altgeräten haben diese einer vom unsortierten Siedlungsabfall getrennten Erfassung zuzuführen. Altgeräte gehören insbesondere nicht in den Hausmüll, sondern in spezielle Sammel- und Rückgabesysteme.
            </p>

            <h2>2. Bedeutung des Symbols „durchgestrichene Mülltonne“</h2>
            <p>
                Das auf den Elektro- und Elektronikgeräten regelmäßig abgebildete Symbol einer durchgestrichenen Mülltonne weist darauf hin, dass das jeweilige Gerät am Ende seiner Lebensdauer getrennt vom unsortierten Siedlungsabfall zu erfassen ist.
            </p>
            <div className="my-8 flex justify-center opacity-80">
                <svg width="60" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><line x1="5" y1="5" x2="19" y2="19" /></svg>
            </div>

            <h2>3. Batterien und Akkumulatoren</h2>
            <p>
                Besitzer von Altgeräten haben Altbatterien und Altakkumulatoren, die nicht vom Altgerät umschlossen sind, sowie Lampen, die zerstörungsfrei aus dem Altgerät entnommen werden können, im Regelfall vor der Abgabe an einer Erfassungsstelle vom Altgerät zerstörungsfrei zu trennen. Dies gilt nicht, soweit Altgeräte einer Vorbereitung zur Wiederverwendung unter Beteiligung eines öffentlich-rechtlichen Entsorgungsträgers zugeführt werden.
            </p>

            <h2>4. Möglichkeiten der Rückgabe von Altgeräten</h2>
            <p>
                Besitzer von Altgeräten aus privaten Haushalten können diese bei den Sammelstellen der öffentlich-rechtlichen Entsorgungsträger oder bei den von Herstellern oder Vertreibern im Sinne des ElektroG eingerichteten Rücknahmestellen unentgeltlich abgeben.
            </p>

            <h2>5. Rücknahmeverpflichtung des Handels</h2>
            <p>
                Wir sind als Vertreiber nach dem ElektroG unter bestimmten Voraussetzungen zur unentgeltlichen Rücknahme von Elektro- und Elektronikaltgeräten verpflichtet. Bei Kauf eines neuen Elektro- oder Elektronikgerätes können Sie ein Altgerät der gleichen Geräteart unentgeltlich an uns zurückgeben (1:1-Rücknahme). Bitte kontaktieren Sie in diesem Fall unseren Kundenservice, bevor Sie uns das Altgerät zusenden.
            </p>

            <h2>6. Datenschutz-Hinweis</h2>
            <p>
                Altgeräte enthalten häufig sensible personenbezogene Daten. Bitte beachten Sie in Ihrem eigenen Interesse, dass für die Löschung der Daten auf den zu entsorgenden Altgeräten jeder Endnutzer selbst verantwortlich ist.
            </p>
        </>
    );
}
