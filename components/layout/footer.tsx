"use client";

import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";
import { useLanguage } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="pt-[clamp(3rem,5vw,5rem)] pb-8 bg-[var(--brand-bg-dark)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/15">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Image
                src={brand.logoInverse}
                alt={brand.name}
                width={640}
                height={650}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-[0.85rem] leading-[1.7] text-brand-text-muted mt-4 max-w-[280px]">
              {t("footer.description")}
            </p>
          </div>

          <FooterCol
            title={t("footer.shop")}
            links={[
              { label: t("footer.allProducts"), href: "/produkte" },
              { label: t("footer.vitair"), href: "/product/vitair" },
              { label: t("footer.preventair"), href: "/product/preventair" },
            ]}
          />
          <FooterCol
            title={t("footer.support")}
            links={[
              { label: t("footer.contact"), href: "/kontakt" },
              { label: t("footer.faq"), href: "/faq" },
              { label: t("footer.shipping"), href: "/versand" },
            ]}
          />
          <FooterCol
            title={t("footer.legal")}
            links={[
              { label: t("footer.impressum"), href: "/impressum" },
              { label: t("footer.datenschutz"), href: "/datenschutz" },
              { label: t("footer.agb"), href: "/agb" },
              { label: t("footer.widerruf"), href: "/widerruf" },
              { label: t("footer.entsorgung"), href: "/entsorgung" },
            ]}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-[0.75rem] text-brand-text-muted">
          <div className="flex items-center gap-4">
            <span>
              &copy; {new Date().getFullYear()} {brand.companyLegal}. {t("footer.allRights")}
            </span>
            <CurrencySwitcher />
          </div>
          <div className="flex gap-3 items-center">
            {[
              { name: "Visa", src: "/images/payment/visa.svg" },
              { name: "Mastercard", src: "/images/payment/mastercard.svg" },
              { name: "PayPal", src: "/images/payment/paypal.svg" },
              { name: "Klarna", src: "/images/payment/klarna.svg" },
            ].map((p) => (
              <Image
                key={p.name}
                src={p.src}
                alt={p.name}
                width={48}
                height={32}
                className="rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-[0.72rem] tracking-[0.25em] uppercase text-brand-text-muted mb-5 font-medium">
        {title}
      </h4>
      <ul className="list-none space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-brand-text-muted no-underline text-[0.85rem] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CurrencySwitcher() {
  const { currencyCode, setCurrencyCode } = useCurrency();

  return (
    <div className="flex items-center gap-2 border border-white/10 rounded-full px-2 py-1 bg-white/5">
      <button
        onClick={() => setCurrencyCode("EUR")}
        className={`px-2 py-0.5 rounded-full transition-colors ${currencyCode === "EUR" ? "bg-white text-[var(--brand-bg-dark)] font-medium" : "text-brand-text-muted hover:text-white"
          }`}
      >
        EUR
      </button>
      <button
        onClick={() => setCurrencyCode("CHF")}
        className={`px-2 py-0.5 rounded-full transition-colors ${currencyCode === "CHF" ? "bg-white text-[var(--brand-bg-dark)] font-medium" : "text-brand-text-muted hover:text-white"
          }`}
      >
        CHF
      </button>
    </div>
  );
}
