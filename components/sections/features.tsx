"use client";

import { Sun, Moon, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import type { Feature } from "@/lib/products";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  sun: Sun,
  moon: Moon,
  sparkles: Sparkles,
};

export function Features({ features }: { features: Feature[] }) {
  return (
    <section
      id="features"
      className="py-[clamp(5rem,10vw,10rem)] bg-[var(--brand-bg-light)] text-[var(--brand-text-dark)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="text-center mb-[clamp(3rem,6vw,5rem)]">
            <span className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent mb-4 font-medium">
              Vorteile
            </span>
            <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.2] max-w-[600px] mx-auto">
              Das Wirkprinzip ist einfach und komplex zugleich
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <BlurFade key={feature.id} delay={i * 0.1} inView>
                <MagicCard
                  className="bg-white p-[clamp(2rem,3vw,3rem)] h-full cursor-default"
                  gradientColor="rgba(200,80,79,0.05)"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--brand-bg-cream)] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-normal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[0.9rem] leading-[1.7] text-[var(--brand-text-muted)]">
                    {feature.description}
                  </p>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
