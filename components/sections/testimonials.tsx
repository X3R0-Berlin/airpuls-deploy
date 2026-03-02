"use client";

import Image from "next/image";
import { Star, UserCircle, BadgeCheck } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { MagicCard } from "@/components/ui/magic-card";
import type { Testimonial } from "@/lib/products";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section
      id="reviews"
      className="py-[clamp(5rem,10vw,10rem)] bg-[var(--brand-bg-light)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="text-center mb-[clamp(3rem,6vw,5rem)]">
            <span className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent mb-4 font-medium">
              Kundenstimmen
            </span>
            <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.2] max-w-[600px] mx-auto text-brand-text-dark">
              Das sagen unsere Kunden
            </h2>
          </div>
        </BlurFade>

        <Marquee pauseOnHover className="[--duration:50s] [--gap:1.5rem]">
          {testimonials.map((t) => (
            <MagicCard
              key={t.id}
              className="w-[380px] bg-white p-8 flex-shrink-0 cursor-default"
              gradientColor="rgba(53,120,104,0.1)"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.stars
                        ? "fill-brand-accent text-brand-accent"
                        : "fill-none text-brand-text-muted/60"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-brand-text-dark text-[0.9rem] leading-[1.7] mb-6 italic min-h-[80px]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author with avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--brand-border-light)]">
                <div className="w-10 h-10 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-6 h-6 text-brand-accent" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <strong className="text-brand-text-dark font-medium text-[0.85rem]">
                      {t.author}
                    </strong>
                    {t.verified && (
                      <BadgeCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    )}
                  </div>
                  <p className="text-brand-text-muted text-[0.75rem]">
                    {t.location}
                    {t.purchaseDate && (
                      <span> · Kauf {t.purchaseDate}</span>
                    )}
                  </p>
                </div>
              </div>
            </MagicCard>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
