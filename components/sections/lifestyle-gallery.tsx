"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

interface LifestyleImage {
  src: string;
  alt: string;
  caption: string;
}

function LifestyleCard({ image, index }: { image: LifestyleImage; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-2xl"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-white/90 text-xs uppercase tracking-[0.15em]">
            {image.caption}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function LifestyleGallery() {
  const { t } = useLanguage();
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  const lifestyleImages: LifestyleImage[] = [
    {
      src: "/images/lifestyle/schlafzimmer.webp",
      alt: t("lifestyle.bedroomAlt"),
      caption: t("lifestyle.bedroom"),
    },
    {
      src: "/images/lifestyle/buero.webp",
      alt: t("lifestyle.officeAlt"),
      caption: t("lifestyle.office"),
    },
    {
      src: "/images/lifestyle/wohnzimmer.webp",
      alt: t("lifestyle.livingRoomAlt"),
      caption: t("lifestyle.livingRoom"),
    },
  ];

  return (
    <section className="py-24 px-[clamp(1.5rem,5vw,6rem)]">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-brand-accent text-xs uppercase tracking-[0.2em] font-medium">
          {t("lifestyle.tag")}
        </span>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light mt-3 leading-tight">
          {t("lifestyle.heading")}<br />
          <em>{t("lifestyle.headingEm")}</em> {t("lifestyle.headingSuffix")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {lifestyleImages.map((image, i) => (
          <LifestyleCard key={image.src} image={image} index={i} />
        ))}
      </div>
    </section>
  );
}
