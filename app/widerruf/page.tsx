import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { WiderrufContent } from "./widerruf-content";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | AIRIMPULS",
  description: "Widerrufsbelehrung und Muster-Widerrufsformular.",
};

export default function WiderrufPage() {
  return (
    <LegalPage
      titleKey="legal.widerruf.title"
      lastUpdatedKey="legal.widerruf.lastUpdated"
    >
      <WiderrufContent />
    </LegalPage>
  );
}
