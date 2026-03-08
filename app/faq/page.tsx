import type { Metadata } from "next";
import faqData from "@/data/faq.json";
import { FAQContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ | AIRIMPULS",
  description: "Häufig gestellte Fragen zu Produkten, Bestellung, Versand und Rückgabe.",
};

export default function FAQPage() {
  return <FAQContent faqData={faqData} />;
}
