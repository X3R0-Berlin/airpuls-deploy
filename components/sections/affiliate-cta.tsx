"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Users, TrendingUp, Heart } from "lucide-react";

export function AffiliateCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="bg-[var(--brand-bg-light)] py-[clamp(4rem,8vw,6rem)] px-[clamp(1.5rem,4vw,4rem)] border-t border-[var(--brand-border-light)]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium">
            Partnerprogramm
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-brand-text-dark mt-3">
            Empfehlen und profitieren
          </h2>
          <p className="text-brand-text-muted mt-3 max-w-lg mx-auto text-[0.95rem] leading-[1.7]">
            Werden Sie Teil des AIRIMPULS Partnerprogramms und verdienen Sie bis zu 10% Provision
            auf jeden vermittelten Verkauf.
          </p>
        </motion.div>

        {/* Benefits mini-grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 mb-10"
        >
          {[
            {
              icon: Heart,
              title: "Bis zu 10%",
              desc: "Provision pro Verkauf",
            },
            {
              icon: Users,
              title: "30 Tage",
              desc: "Cookie-Laufzeit",
            },
            {
              icon: TrendingUp,
              title: "3 Stufen",
              desc: "Kunde · Therapeut · Creator",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--brand-border-light)] bg-white"
            >
              <item.icon className="w-5 h-5 text-brand-accent" strokeWidth={1.5} />
              <p className="text-brand-text-dark font-semibold text-[0.9rem]">
                {item.title}
              </p>
              <p className="text-brand-text-muted text-[0.8rem]">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--brand-accent)] text-white rounded-full font-semibold text-[0.9rem] hover:bg-[var(--brand-accent-glow)] transition-colors no-underline"
          >
            Jetzt Partner werden
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
