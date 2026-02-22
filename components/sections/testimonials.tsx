"use client";

import { Star } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { MagicCard } from "@/components/ui/magic-card";
import type { Testimonial } from "@/lib/products";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section
      id="reviews"
      className="py-[clamp(5rem,10vw,10rem)] bg-[var(--brand-bg-dark)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="text-center mb-[clamp(3rem,6vw,5rem)]">
            <span className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent mb-4 font-medium">
              Kundenstimmen
            </span>
            <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.2] max-w-[600px] mx-auto text-brand-text-light">
              Das sagen Menschen, die BREEZI bereits nutzen
            </h2>
          </div>
        </BlurFade>

        <Marquee pauseOnHover className="[--duration:40s] [--gap:1.5rem]">
          {testimonials.map((t) => (
            <MagicCard
              key={t.id}
              className="w-[350px] bg-[#111] p-8 flex-shrink-0 cursor-default"
              gradientColor="rgba(200,80,79,0.08)"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-brand-accent text-brand-accent"
                  />
                ))}
              </div>
              <p className="text-brand-text-light text-[0.9rem] leading-[1.7] mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-brand-text-muted text-[0.85rem]">
                <strong className="text-brand-text-light font-medium">
                  {t.author}
                </strong>{" "}
                — {t.location}
              </p>
            </MagicCard>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
