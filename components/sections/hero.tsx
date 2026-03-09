"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Particles } from "@/components/ui/particles";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import type { Product } from "@/lib/products";
import { useLanguage } from "@/lib/i18n/context";

export function Hero({ product }: { product: Product }) {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center pt-24 pb-12 overflow-hidden film-grain">
      {/* Subtle background glow */}
      <div className="absolute top-[-40%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(53,120,104,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Particles - hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[var(--brand-border-light)] rounded-full text-[0.7rem] tracking-[0.15em] uppercase text-brand-text-muted mb-8 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
            <AnimatedShinyText className="inline-flex items-center justify-center">
              <span>✨ {product.heroTagline}</span>
            </AnimatedShinyText>
          </div>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <h1 className="font-serif font-light text-[clamp(2.8rem,5vw,4.5rem)] leading-[1.1] tracking-tight mb-6">
            <TextAnimate animation="blurInUp" by="word" delay={0.3}>
              {t("hero.heading")}
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
            <MagneticButton strength={12} radius={100}>
              <ShimmerButton
                className="px-8 py-4"
                shimmerColor="rgba(0,0,0,0.06)"
                background="var(--brand-accent)"
                onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="flex items-center gap-2.5 text-white font-semibold text-[0.85rem] tracking-[0.04em]">
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </ShimmerButton>
            </MagneticButton>
            <a
              href="#details"
              className="inline-flex items-center gap-2 px-6 py-4 bg-transparent text-brand-text-muted border border-[var(--brand-border-light)] rounded-full text-[0.85rem] no-underline hover:text-brand-text-dark hover:border-black/10 transition-all duration-300"
            >
              {t("hero.learnMore")}
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Hero Media — Video if available, otherwise Image with Ken Burns */}
      <BlurFade delay={0.2} inView className="relative flex items-center justify-center">
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(226,90,67,0.12)_0%,transparent_70%)] pointer-events-none blur-[40px]" />
        {product.heroVideo ? (
          <div className="relative w-[90%] max-w-[600px] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={`${product.images.basePath}/${product.images.hero}`}
              className="w-full h-auto max-h-[70vh] object-cover"
            >
              <source
                src={`${product.images.basePath}/${product.heroVideo}`}
                type="video/webm"
              />
              <source
                src={`${product.images.basePath}/${product.heroVideo.replace('.webm', '.mp4')}`}
                type="video/mp4"
              />
            </video>
          </div>
        ) : (
          <div className="relative ken-burns-container">
            <Image
              src={`${product.images.basePath}/${product.images.hero}`}
              alt={`${product.name} ${product.subtitle}`}
              width={600}
              height={800}
              className="max-h-[70vh] w-auto max-w-[90%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] ken-burns"
              priority
            />
          </div>
        )}
      </BlurFade>
    </section>
  );
}
