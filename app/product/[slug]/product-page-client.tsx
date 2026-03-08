"use client";

import { useLanguage } from "@/lib/i18n/context";

export function ComingSoonBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--brand-accent)] py-3 text-center">
      <p className="text-white text-sm font-sans font-medium">
        {t("page.comingSoonBanner")}
      </p>
    </section>
  );
}
