"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  Check,
  Users,
  Stethoscope,
  Video,
  ArrowRight,
} from "lucide-react";

interface Tier {
  id: string;
  name: string;
  commission: number;
  description: string;
  benefits: string[];
  estimatedEarning: string;
}

interface AffiliateData {
  program: {
    name: string;
    cookieDurationDays: number;
    linkFormat: string;
    payoutMinimum: number;
    currency: string;
  };
  tiers: Tier[];
}

const tierIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  kunde: Users,
  therapeut: Stethoscope,
  creator: Video,
};

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = tierIcons[tier.id] || Users;
  const isHighlighted = tier.id === "therapeut";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative rounded-2xl p-6 sm:p-8 border transition-colors ${
        isHighlighted
          ? "border-brand-accent bg-brand-accent/5"
          : "border-[var(--brand-border-light)] bg-[var(--brand-bg-cream)]"
      }`}
    >
      {isHighlighted && (
        <span className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-accent text-white text-[0.7rem] font-medium rounded-full tracking-wide uppercase">
          Empfohlen
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand-accent" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-brand-text-dark font-semibold text-lg">{tier.name}</h3>
          <p className="text-brand-accent font-serif text-2xl font-light">
            {tier.commission}%
            <span className="text-brand-text-muted text-sm font-sans ml-1">Provision</span>
          </p>
        </div>
      </div>

      <p className="text-brand-text-muted text-[0.9rem] leading-[1.7] mb-6">
        {tier.description}
      </p>

      <ul className="space-y-2.5 mb-6">
        {tier.benefits.map((benefit, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-brand-text-muted text-[0.85rem]"
          >
            <Check className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-[var(--brand-border-light)]">
        <p className="text-brand-text-muted text-[0.8rem]">
          Geschätzter Verdienst:{" "}
          <span className="text-brand-text-dark font-medium">
            {tier.estimatedEarning}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export function PartnerPageClient({ affiliate }: { affiliate: AffiliateData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

  const steps = [
    {
      number: "01",
      title: "Registrieren",
      desc: "Füllen Sie das Kontaktformular aus und teilen Sie uns Ihre bevorzugte Stufe mit.",
    },
    {
      number: "02",
      title: "Link erhalten",
      desc: "Sie erhalten Ihren persönlichen Empfehlungslink und Promo-Material.",
    },
    {
      number: "03",
      title: "Empfehlen",
      desc: "Teilen Sie Ihren Link mit Ihrem Netzwerk — online und offline.",
    },
    {
      number: "04",
      title: "Verdienen",
      desc: "Bei jedem Verkauf über Ihren Link erhalten Sie Ihre Provision.",
    },
  ];

  return (
    <main className="bg-[var(--brand-bg-light)] min-h-screen">
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-brand-text-muted text-sm font-sans">
            <Link href="/" className="hover:text-brand-text-dark transition-colors">
              AIRIMPULS
            </Link>
            <span>/</span>
            <span className="text-brand-text-dark">Partnerprogramm</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
        <div ref={heroRef} className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium mb-4"
          >
            Partnerprogramm
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-brand-text-dark leading-[1.1]"
          >
            Gemeinsam für bessere Luft
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-text-muted text-[1.05rem] leading-[1.7] mt-4 max-w-xl mx-auto"
          >
            Werden Sie Teil unseres Partnerprogramms und verdienen Sie an jeder Empfehlung.
            Drei Stufen, faire Provisionen, transparente Abrechnung.
          </motion.p>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-[clamp(4rem,8vw,6rem)] px-[clamp(1.5rem,4vw,4rem)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliate.tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-[clamp(4rem,8vw,6rem)] px-[clamp(1.5rem,4vw,4rem)] border-t border-[var(--brand-border-light)]">
        <div ref={stepsRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium">
              So funktioniert&apos;s
            </span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-brand-text-dark mt-3">
              In vier Schritten zum Partner
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="text-center"
              >
                <span className="font-serif text-4xl font-light text-brand-accent/50">
                  {step.number}
                </span>
                <h3 className="text-brand-text-dark font-semibold text-[0.95rem] mt-2">
                  {step.title}
                </h3>
                <p className="text-brand-text-muted text-[0.85rem] leading-[1.6] mt-1.5">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[clamp(4rem,8vw,6rem)] px-[clamp(1.5rem,4vw,4rem)] border-t border-[var(--brand-border-light)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-light text-brand-text-dark">
            Bereit, Partner zu werden?
          </h2>
          <p className="text-brand-text-muted mt-3 text-[0.95rem]">
            Kontaktieren Sie uns und wir richten Ihr Partnerkonto ein.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--brand-accent)] text-white rounded-full font-semibold text-[0.9rem] hover:bg-[var(--brand-accent-glow)] transition-colors no-underline"
            >
              Jetzt bewerben
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--brand-border-light)] text-brand-text-muted rounded-full text-[0.9rem] hover:text-brand-text-dark hover:border-black/10 transition-all no-underline"
            >
              Häufige Fragen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
