import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { DatenschutzContent } from "./datenschutz-content";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | AIRIMPULS",
  description: "Informationen zum Datenschutz gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      titleKey="legal.datenschutz.title"
      lastUpdatedKey="legal.datenschutz.lastUpdated"
    >
      <DatenschutzContent />
    </LegalPage>
  );
}
