"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { useLanguage } from "@/lib/i18n/context";

export function VergleichBreadcrumb() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--brand-bg-light)] pt-24 pb-4 px-4">
      <div className="max-w-7xl mx-auto">
        <BlurFade delay={0}>
          <nav className="flex items-center gap-2 text-brand-text-muted text-sm font-sans">
            <Link
              href="/"
              className="hover:text-brand-text-dark transition-colors"
            >
              AIRIMPULS
            </Link>
            <span>/</span>
            <span className="text-brand-text-dark">{t("page.comparison")}</span>
          </nav>
        </BlurFade>
      </div>
    </section>
  );
}
