"use client";

import Link from "next/link";
import { brand } from "@/lib/brand";
import { useLanguage } from "@/lib/i18n/context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[var(--brand-bg-light)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-6xl md:text-8xl text-brand-text-dark mb-4">
          404
        </h1>
        <p className="text-brand-text-muted text-lg mb-8">
          {t("notFound.text")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-[var(--brand-accent)] text-white rounded-full font-sans text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t("notFound.backTo")} {brand.name}
        </Link>
      </div>
    </main>
  );
}
