"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface HotspotPoint {
  x: number;
  y: number;
  title: string;
  description: string;
}

interface HotspotData {
  image: string;
  points: HotspotPoint[];
}

export function ProductHotspots({
  hotspots,
  basePath,
  productName,
}: {
  hotspots: HotspotData;
  basePath: string;
  productName: string;
}) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--brand-bg-light)] py-[clamp(4rem,8vw,8rem)] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium">
            {t("hotspots.tag")}
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-brand-text-dark mt-3">
            {t("hotspots.heading")}
          </h2>
          <p className="text-brand-text-muted mt-2 text-[0.95rem]">
            {t("hotspots.description")}
          </p>
        </motion.div>

        {/* Image with Hotspots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-[600px] mx-auto"
        >
          {/* Product Image */}
          <div className="relative aspect-[3/4]">
            <Image
              src={`${basePath}/${hotspots.image}`}
              alt={`${productName} Detailansicht`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 600px"
            />

            {/* Hotspot Dots */}
            {hotspots.points.map((point, index) => (
              <div
                key={index}
                className="absolute z-10"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Pulse ring */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="relative"
                >
                  <span className="absolute inset-0 w-10 h-10 -ml-5 -mt-5 rounded-full bg-brand-accent/20 animate-ping" />
                  <button
                    onClick={() => handleToggle(index)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 ${
                      activeIndex === index
                        ? "bg-brand-accent border-brand-accent scale-110"
                        : "bg-white/80 border-brand-accent/80 hover:border-brand-accent hover:scale-110"
                    }`}
                    aria-label={`Detail: ${point.title}`}
                  >
                    <span className="w-2 h-2 bg-brand-text-light rounded-full" />
                  </button>
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute z-20 w-[240px] sm:w-[280px] p-4 rounded-xl bg-white border border-[var(--brand-border-light)] shadow-2xl ${
                        point.x > 60
                          ? "right-full mr-4"
                          : point.x < 40
                          ? "left-full ml-4"
                          : "left-1/2 -translate-x-1/2 mt-4 top-full"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-brand-text-dark font-semibold text-[0.9rem]">
                          {point.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(null);
                          }}
                          className="text-brand-text-muted hover:text-brand-text-dark transition-colors flex-shrink-0 cursor-pointer bg-transparent border-none p-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-brand-text-muted text-[0.8rem] leading-[1.6] mt-1.5">
                        {point.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
