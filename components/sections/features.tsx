"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Sun, Moon, Heart } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";
import type { Feature } from "@/lib/products";
import { useLanguage } from "@/lib/i18n/context";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  sun: Sun,
  moon: Moon,
  sparkles: Sparkles,
  heart: Heart,
};

/* ── Video/Poster Background ──────────────────────────── */
function FeatureMedia({ video, poster, isHero }: { video?: string; poster?: string; isHero?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set initial state after hydration to match client constraints
    setCanPlayVideo(mql.matches && motionOk);

    const handler = (e: MediaQueryListEvent) => setCanPlayVideo(e.matches && motionOk);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (!poster && !video) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Poster — always visible as base layer */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Video — overlays poster on desktop when playing */}
      {canPlayVideo && video && (
        <video
          ref={videoRef}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onPlaying={() => setShowVideo(true)}
          onError={() => setShowVideo(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showVideo ? "opacity-100" : "opacity-0"
            }`}
        />
      )}
      {/* Gradient overlay — hero card gets lighter overlay so image is fully visible */}
      <div className={cn(
        "absolute inset-0",
        isHero
          ? "bg-gradient-to-b from-transparent via-white/20 to-white/60"
          : "bg-gradient-to-b from-white/30 via-white/50 to-white/75"
      )} />
    </div>
  );
}

export function Features({ features }: { features: Feature[] }) {
  const { t } = useLanguage();
  return (
    <section
      id="features"
      className="py-[clamp(5rem,10vw,10rem)] bg-[var(--brand-bg-light)] text-[var(--brand-text-dark)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="text-center mb-[clamp(3rem,6vw,5rem)]">
            <span className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent mb-4 font-medium">
              {t("features.tag")}
            </span>
            <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.2] max-w-[600px] mx-auto">
              {t("features.heading")}
            </h2>
          </div>
        </BlurFade>

        <div className="grid gap-6 bento-grid">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Sparkles;

            return (
              <BlurFade
                key={feature.id}
                delay={i * 0.15}
                className={cn("w-full h-auto flex flex-col", `bento-item-${i}`)}
                inView
              >
                <MagicCard
                  className="w-full flex-1 flex flex-col justify-end bg-white border border-[var(--brand-border-light)] overflow-hidden rounded-2xl"
                  gradientColor="rgba(53,120,104,0.08)"
                >
                  {/* Video or poster fallback — fills entire card */}
                  {(feature.video || feature.poster) && (
                    <FeatureMedia video={feature.video} poster={feature.poster} isHero={i === 0} />
                  )}

                  {/* Content */}
                  <div className={cn(
                    "relative z-10 p-[clamp(2rem,3vw,3rem)] mt-auto",
                    i === 0
                      ? "bg-gradient-to-t from-white/80 via-white/50 to-transparent"
                      : "bg-gradient-to-t from-white via-white/90 to-transparent"
                  )}>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--brand-bg-cream)] flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-5 h-5 text-brand-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl font-normal mb-3 text-[var(--brand-text-dark)]">
                      {feature.title}
                    </h3>
                    <p className="text-[1rem] leading-[1.6] text-[var(--brand-text-muted)] max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
