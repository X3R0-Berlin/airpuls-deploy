"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { brand } from "@/lib/brand";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedFaq } from "@/lib/i18n/data";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const categoryIcons: Record<string, string> = {
  Produkt: "🌿",
  Product: "🌿",
  Bestellung: "📦",
  Orders: "📦",
  Versand: "🚚",
  Shipping: "🚚",
  "Rückgabe": "↩️",
  Returns: "↩️",
};

export function FAQContent({ faqData }: { faqData: FAQCategory[] }) {
  const { t, locale } = useLanguage();
  const localizedFaqData = getLocalizedFaq(locale) as FAQCategory[];

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
              {t("page.home")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-text-dark">{t("page.faq")}</span>
          </nav>
        </BlurFade>

        {/* Heading */}
        <BlurFade delay={0.1} inView>
          <h1 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-brand-text-dark mb-4">
            {t("faq.title")}
          </h1>
          <p className="text-[1rem] text-brand-text-muted mb-14 max-w-[540px]">
            {t("faq.description")}
          </p>
        </BlurFade>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {localizedFaqData.map((category, catIdx) => (
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
              {t("faq.noAnswer")}
            </h3>
            <p className="text-brand-text-muted text-[0.9rem] mb-5">
              {t("faq.noAnswerDesc")}
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white text-[0.85rem] font-semibold rounded-full no-underline hover:bg-brand-accent-glow transition-colors"
            >
              {t("faq.contactUs")}
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
