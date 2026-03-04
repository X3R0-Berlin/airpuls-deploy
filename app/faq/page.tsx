import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "@/data/faq.json";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "FAQ | AIRIMPULS",
  description: "Häufig gestellte Fragen zu Produkten, Bestellung, Versand und Rückgabe.",
};

const categoryIcons: Record<string, string> = {
  Produkt: "🌿",
  Bestellung: "📦",
  Versand: "🚚",
  "Rückgabe": "↩️",
};

export default function FAQPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-[var(--brand-bg-light)]">
      <div className="max-w-[800px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        {/* Breadcrumb */}
        <BlurFade delay={0} inView>
          <nav className="flex items-center gap-1.5 text-[0.75rem] text-brand-text-muted mb-10">
            <Link
              href="/"
              className="hover:text-brand-text-dark transition-colors no-underline text-brand-text-muted"
            >
              Startseite
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-text-dark">FAQ</span>
          </nav>
        </BlurFade>

        {/* Heading */}
        <BlurFade delay={0.1} inView>
          <h1 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-brand-text-dark mb-4">
            Häufig gestellte Fragen
          </h1>
          <p className="text-[1rem] text-brand-text-muted mb-14 max-w-[540px]">
            Hier findest du Antworten auf die häufigsten Fragen rund um unsere
            Produkte, Bestellungen und den Versand.
          </p>
        </BlurFade>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqData.map((category, catIdx) => (
            <BlurFade key={category.category} delay={0.15 + catIdx * 0.08} inView>
              <div>
                <h2 className="flex items-center gap-2.5 font-serif text-[1.3rem] font-light text-brand-text-dark mb-4">
                  <span>{categoryIcons[category.category] || "❓"}</span>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${category.category}-${idx}`}
                      className="border-[var(--brand-border-light)]"
                    >
                      <AccordionTrigger className="text-brand-text-dark text-[0.9rem] font-medium hover:no-underline hover:text-brand-accent py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-brand-text-muted text-[0.88rem] leading-[1.7]">
                        {item.answer.replace(/\{\{email\}\}/g, brand.social.email)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Contact CTA */}
        <BlurFade delay={0.5} inView>
          <div className="mt-16 p-8 rounded-2xl border border-[var(--brand-border-light)] bg-white text-center">
            <h3 className="font-serif text-xl font-light text-brand-text-dark mb-2">
              Keine Antwort gefunden?
            </h3>
            <p className="text-brand-text-muted text-[0.9rem] mb-5">
              Kontaktiere uns direkt — wir helfen dir gerne weiter.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white text-[0.85rem] font-semibold rounded-full no-underline hover:bg-brand-accent-glow transition-colors"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
