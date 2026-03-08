import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { ImpressumContent } from "./impressum-content";

export const metadata: Metadata = {
  title: "Impressum | AIRIMPULS",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <LegalPage
      titleKey="legal.impressum.title"
      lastUpdatedKey="legal.impressum.lastUpdated"
    >
      <ImpressumContent />
    </LegalPage>
  );
}
