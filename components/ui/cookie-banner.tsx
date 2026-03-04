"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "airimpuls_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't flash on page load
    const timer = setTimeout(() => {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function accept(level: "all" | "essential") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ level, date: new Date().toISOString() })
    );
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-[800px] mx-auto backdrop-blur-[40px] backdrop-saturate-150 bg-white/92 border border-[var(--brand-border-light)] rounded-2xl p-5 md:p-6 shadow-[0_-8px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-start gap-4">
              <Cookie className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[0.88rem] leading-[1.7] text-brand-text-muted mb-4">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu
                  bieten. Technisch notwendige Cookies sind für den Betrieb des
                  Shops erforderlich.{" "}
                  <Link
                    href="/datenschutz"
                    className="text-brand-accent underline underline-offset-2 hover:text-brand-accent-glow transition-colors"
                  >
                    Mehr erfahren
                  </Link>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => accept("all")}
                    className="px-6 py-2.5 bg-brand-accent text-white text-[0.82rem] font-semibold rounded-full hover:bg-brand-accent-glow transition-colors cursor-pointer border-none"
                  >
                    Alle akzeptieren
                  </button>
                  <button
                    onClick={() => accept("essential")}
                    className="px-6 py-2.5 bg-transparent text-brand-text-muted text-[0.82rem] font-medium rounded-full border border-[var(--brand-border-light)] hover:text-brand-text-dark hover:border-black/10 transition-all cursor-pointer"
                  >
                    Nur Notwendige
                  </button>
                </div>
              </div>
              <button
                onClick={() => accept("essential")}
                className="text-brand-text-muted hover:text-brand-text-dark transition-colors cursor-pointer bg-transparent border-none p-1"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
