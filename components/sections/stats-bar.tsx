"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative bg-[var(--brand-bg-light)] border-y border-[var(--brand-border-light)] py-16 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,120,104,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={i * 0.1} inView>
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <NumberTicker
                    value={stat.value}
                    className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-light text-brand-text-dark tabular-nums"
                  />
                  <span className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-brand-accent">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-brand-text-muted text-[0.8rem] tracking-[0.1em] uppercase mt-2 font-sans">
                  {stat.label}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
