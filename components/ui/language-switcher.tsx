"use client";

import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center border border-[var(--brand-border-light)] rounded-full overflow-hidden text-[0.72rem] font-medium tracking-[0.06em]",
        className
      )}
    >
      <button
        onClick={() => setLocale("de")}
        className={cn(
          "px-2.5 py-1 transition-colors cursor-pointer border-none",
          locale === "de"
            ? "bg-brand-accent text-white"
            : "bg-transparent text-brand-text-muted hover:text-brand-text-dark"
        )}
      >
        DE
      </button>
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "px-2.5 py-1 transition-colors cursor-pointer border-none",
          locale === "en"
            ? "bg-brand-accent text-white"
            : "bg-transparent text-brand-text-muted hover:text-brand-text-dark"
        )}
      >
        EN
      </button>
    </div>
  );
}
