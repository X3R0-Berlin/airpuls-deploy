"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export default function CheckoutCancel() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg-light)]">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-brand-accent" />
        </div>
        <h1 className="font-serif text-3xl font-light text-brand-text-dark mb-4">
          {t("checkout.cancelTitle")}
        </h1>
        <p className="text-brand-text-muted mb-8">
          {t("checkout.cancelMessage")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand-accent)] text-white rounded-full font-semibold text-[0.85rem] no-underline hover:opacity-90 transition-opacity"
        >
          {t("checkout.backToShop")}
        </Link>
      </div>
    </div>
  );
}
