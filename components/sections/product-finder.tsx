"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { useLanguage } from "@/lib/i18n/context";

type Step = "start" | "result";

interface Answer {
  usage: "raumluft" | "atemtherapie" | "profi" | null;
}

const recommendations: Record<string, { slug: string; name: string; subtitle: string; reasonKey: string }> = {
  raumluft: { slug: "vitair", name: "Vitair", subtitle: "Luftenergizer", reasonKey: "finder.reasonRoomAir" },
  atemtherapie: { slug: "solitair", name: "Solitair", subtitle: "Atemluft-Energizer", reasonKey: "finder.reasonBreathing" },
  profi: { slug: "preventair", name: "Preventair", subtitle: "Professionelles Therapiegerät", reasonKey: "finder.reasonProfessional" },
};

export function ProductFinder() {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>("start");
  const [answer, setAnswer] = useState<Answer>({ usage: null });

  const handleSelect = (usage: Answer["usage"]) => {
    setAnswer({ usage });
    setStep("result");
  };

  const reset = () => {
    setStep("start");
    setAnswer({ usage: null });
  };

  const result = answer.usage ? recommendations[answer.usage] : null;

  return (
    <section className="py-[clamp(5rem,10vw,8rem)] bg-[var(--brand-bg-light)]">
      <div className="max-w-3xl mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="text-center mb-10">
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium">
              {t("finder.tag")}
            </span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-brand-text-dark mt-3">
              {t("finder.heading")}
            </h2>
          </div>
        </BlurFade>

        {step === "start" && (
          <BlurFade delay={0.1} inView>
            <p className="text-center text-brand-text-muted mb-8">
              {t("finder.question")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: "raumluft" as const, label: t("finder.roomAir"), desc: t("finder.roomAirDesc") },
                { key: "atemtherapie" as const, label: t("finder.breathing"), desc: t("finder.breathingDesc") },
                { key: "profi" as const, label: t("finder.professional"), desc: t("finder.professionalDesc") },
              ].map((option) => (
                <MagicCard
                  key={option.key}
                  className="bg-white p-6 cursor-pointer hover:bg-[var(--brand-bg-cream)] transition-colors"
                  gradientColor="rgba(53,120,104,0.12)"
                  onClick={() => handleSelect(option.key)}
                >
                  <p className="font-serif text-xl text-brand-text-dark font-light mb-1">
                    {option.label}
                  </p>
                  <p className="text-brand-text-muted text-sm">
                    {option.desc}
                  </p>
                </MagicCard>
              ))}
            </div>
          </BlurFade>
        )}

        {step === "result" && result && (
          <BlurFade delay={0} inView>
            <div className="border border-[var(--brand-border-light)] rounded-2xl p-8 text-center">
              <p className="text-brand-accent text-sm font-medium mb-2">
                {t("finder.recommendation")}
              </p>
              <h3 className="font-serif text-3xl text-brand-text-dark font-light mb-1">
                {result.name}
              </h3>
              <p className="text-brand-text-muted text-sm mb-4">
                {result.subtitle}
              </p>
              <p className="text-brand-text-muted text-[0.9rem] leading-relaxed mb-8 max-w-md mx-auto">
                {t(result.reasonKey)}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href={`/product/${result.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-bg-light)] text-[var(--brand-text-dark)] rounded-full font-semibold text-sm hover:bg-white transition-colors no-underline"
                >
                  {t("finder.discover")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-4 py-3 border border-[var(--brand-border-light)] text-brand-text-muted rounded-full text-sm hover:text-brand-text-dark transition-colors cursor-pointer bg-transparent"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t("finder.reset")}
                </button>
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
