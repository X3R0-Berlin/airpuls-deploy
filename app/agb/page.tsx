import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { AGBContent } from "./agb-content";

export const metadata: Metadata = {
  title: "AGB | AIRIMPULS",
  description: "Allgemeine Geschäftsbedingungen der AIRIMPULS by Jörg Klemm.",
};

export default function AGBPage() {
  return (
    <LegalPage
      titleKey="legal.agb.title"
      lastUpdatedKey="legal.agb.lastUpdated"
    >
      <AGBContent />
    </LegalPage>
  );
}
