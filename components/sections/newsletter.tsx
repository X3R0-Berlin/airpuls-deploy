"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-[clamp(4rem,8vw,6rem)] bg-[var(--brand-bg-dark)] border-t border-[var(--brand-border-light)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-light text-brand-text-light mb-2">
                Bleib informiert
              </h3>
              <p className="text-brand-text-muted text-[0.9rem]">
                Erhalte exklusive Angebote und Neuigkeiten direkt in dein
                Postfach.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            >
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full sm:w-[280px] bg-transparent border-[var(--brand-border-light)] text-brand-text-light placeholder:text-brand-text-muted rounded-full px-6 py-3 text-[0.85rem] h-auto"
                />
                <BorderBeam
                  size={60}
                  duration={4}
                  colorFrom="var(--brand-accent)"
                  colorTo="var(--brand-accent-glow)"
                  className="rounded-full"
                />
              </div>
              <ShimmerButton
                shimmerColor="rgba(255,255,255,0.15)"
                background="var(--brand-accent)"
                className="rounded-full px-8 py-3"
              >
                <span className="text-white text-[0.85rem] font-semibold">
                  {submitted ? "Danke!" : "Anmelden"}
                </span>
              </ShimmerButton>
            </form>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
