"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import type { Product } from "@/lib/products";

export function Hero({ product }: { product: Product }) {
  return (
    <section className="relative min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center pt-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-[-40%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(200,80,79,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Particles - hidden on mobile for performance */}
      <div className="hidden md:block">
        <Particles
          className="absolute inset-0"
          quantity={30}
          color="var(--brand-accent)"
          staticity={80}
          ease={60}
          size={0.4}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-[clamp(2rem,6vw,8rem)] py-[clamp(2rem,5vw,6rem)] text-center lg:text-left">
        <BlurFade delay={0} inView>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[var(--brand-border-light)] rounded-full text-[0.7rem] tracking-[0.15em] uppercase text-brand-text-muted mb-8">
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
            {product.heroTagline}
          </div>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <h1 className="font-serif font-light text-[clamp(2.8rem,5vw,4.5rem)] leading-[1.1] tracking-tight mb-6">
            <TextAnimate animation="blurInUp" by="word" delay={0.3}>
              Die natürliche Energie der Natur für dein Zuhause
            </TextAnimate>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="text-[1.05rem] leading-[1.7] text-brand-text-muted max-w-[420px] mb-10 mx-auto lg:mx-0">
            {product.heroDescription}
          </p>
        </BlurFade>

        <BlurFade delay={0.45} inView>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <ShimmerButton
              className="px-8 py-4"
              shimmerColor="rgba(255,255,255,0.2)"
              background="var(--brand-text-light)"
            >
              <a
                href="#product"
                className="flex items-center gap-2.5 text-brand-text-dark font-semibold text-[0.85rem] tracking-[0.04em] no-underline"
              >
                Jetzt entdecken
                <ArrowRight className="w-4 h-4" />
              </a>
            </ShimmerButton>
            <a
              href="#details"
              className="inline-flex items-center gap-2 px-6 py-4 bg-transparent text-brand-text-muted border border-[var(--brand-border-light)] rounded-full text-[0.85rem] no-underline hover:text-brand-text-light hover:border-white/20 transition-all duration-300"
            >
              Mehr erfahren
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Hero Image */}
      <BlurFade delay={0.2} inView className="relative flex items-center justify-center h-[60vh] lg:h-screen">
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(200,80,79,0.12)_0%,transparent_70%)] pointer-events-none blur-[40px]" />
        <Image
          src={`${product.images.basePath}/${product.images.hero}`}
          alt={`${product.name} ${product.subtitle}`}
          width={600}
          height={800}
          className="max-h-[70vh] w-auto max-w-[90%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:-translate-y-2 transition-transform duration-600"
          priority
        />
      </BlurFade>
    </section>
  );
}
