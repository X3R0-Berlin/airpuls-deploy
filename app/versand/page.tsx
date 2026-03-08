import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { VersandContent } from "./versand-content";

export const metadata: Metadata = {
  title: "Versand & Rückgabe | AIRIMPULS",
  description: "Informationen zu Versandkosten, Lieferzeiten und Rückgabe.",
};

export default function VersandPage() {
  return (
    <LegalPage
      titleKey="legal.versand.title"
      lastUpdatedKey="legal.versand.lastUpdated"
    >
      <VersandContent />
    </LegalPage>
  );
}
