import fs from "fs";
import path from "path";
import { brand } from "@/lib/brand";
import { PartnerPageClient } from "./partner-client";

export const metadata = {
  title: `Partnerprogramm | ${brand.name}`,
  description:
    "Werden Sie AIRIMPULS Partner und verdienen Sie bis zu 10% Provision. Drei Stufen: Kunde, Therapeut, Creator.",
};

function getAffiliateData() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "affiliate.json"),
    "utf-8"
  );
  return JSON.parse(content);
}

export default function PartnerPage() {
  const affiliate = getAffiliateData();

  return <PartnerPageClient affiliate={affiliate} />;
}
