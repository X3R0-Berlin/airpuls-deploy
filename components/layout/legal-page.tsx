"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { useLanguage } from "@/lib/i18n/context";

interface LegalPageProps {
  title?: string;
  titleKey?: string;
  lastUpdated?: string;
  lastUpdatedKey?: string;
  children: React.ReactNode;
}

export function LegalPage({
  title,
  titleKey,
  lastUpdated,
  lastUpdatedKey,
  children,
}: LegalPageProps) {
  const { t } = useLanguage();

  const resolvedTitle = titleKey ? t(titleKey) : title ?? "";
  const resolvedLastUpdated = lastUpdatedKey
    ? t(lastUpdatedKey)
    : lastUpdated ?? "";

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[var(--brand-bg-light)]">
      <div className="max-w-[800px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        {/* Breadcrumb */}
        <BlurFade delay={0} inView>
          <nav className="flex items-center gap-1.5 text-[0.75rem] text-brand-text-muted mb-10">
            <Link
              href="/"
              className="hover:text-brand-text-dark transition-colors no-underline text-brand-text-muted"
            >
              {t("legal.home")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-text-dark">{resolvedTitle}</span>
          </nav>
        </BlurFade>

        {/* Heading */}
        <BlurFade delay={0.1} inView>
          <h1 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-brand-text-dark mb-3">
            {resolvedTitle}
          </h1>
          <p className="text-[0.8rem] text-brand-text-muted mb-12">
            {t("legal.lastUpdated")} {resolvedLastUpdated}
          </p>
        </BlurFade>

        {/* Content */}
        <BlurFade delay={0.2} inView>
          <div className="legal-prose space-y-8 text-[0.92rem] leading-[1.8] text-brand-text-muted [&_h2]:font-serif [&_h2]:text-[1.4rem] [&_h2]:font-light [&_h2]:text-brand-text-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[1rem] [&_h3]:font-semibold [&_h3]:text-brand-text-dark [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-brand-accent [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-brand-accent-glow [&_strong]:text-brand-text-dark [&_mark]:bg-transparent [&_mark]:text-[var(--brand-waldrot)] [&_mark]:font-semibold">
            {children}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
