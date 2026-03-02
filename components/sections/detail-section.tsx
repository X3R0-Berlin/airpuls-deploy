"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Check } from "lucide-react";
import type { ProductDetail } from "@/lib/products";

const LottieAnimation = dynamic(() => import("@/components/ui/lottie-animation"), {
  ssr: false,
});

function AnimatedBullet({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex items-start gap-3 text-brand-text-muted text-[0.9rem] leading-[1.6]"
    >
      <Check className="w-4 h-4 text-brand-accent mt-1 flex-shrink-0" strokeWidth={2} />
      {text}
    </motion.li>
  );
}

export function DetailSection({
  detail,
  basePath,
  index = 0,
}: {
  detail: ProductDetail;
  basePath: string;
  index?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.2 });

  // Parallax scroll for image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  return (
    <section
      ref={sectionRef}
      id={index === 0 ? "details" : undefined}
      className="py-[clamp(4rem,8vw,8rem)] bg-[var(--brand-bg-light)] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,5vw,5rem)] items-center ${
            detail.reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Parallax Image */}
          <div className={`detail-sticky-image ${detail.reverse ? "lg:[direction:ltr]" : ""}`}>
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--brand-bg-cream)]"
            >
              <Image
                src={`${basePath}/${detail.image}`}
                alt={detail.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--brand-bg-dark)]/30 to-transparent pointer-events-none" />
              {/* Lottie animation overlay */}
              {detail.lottie && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                  <LottieAnimation
                    src={detail.lottie}
                    className="w-3/4 h-3/4 max-w-[320px] max-h-[320px]"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Animated Text */}
          <div ref={textRef} className={detail.reverse ? "lg:[direction:ltr]" : ""}>
            {/* Tag */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0 }}
              className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent mb-4 font-medium"
            >
              {detail.tag}
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-light text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.2] mb-6 text-brand-text-dark"
            >
              {detail.heading}
            </motion.h2>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[0.95rem] leading-[1.8] text-brand-text-muted mb-8"
            >
              {detail.text}
            </motion.p>

            {/* Bullets — fade in sequentially */}
            <ul className="space-y-3">
              {detail.bullets.map((bullet, i) => (
                <AnimatedBullet key={i} text={bullet} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
