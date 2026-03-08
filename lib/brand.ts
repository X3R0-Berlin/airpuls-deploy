import brandData from "@/data/brand.json";

export interface BrandConfig {
  name: string;
  logoParts: { main: string; accent: string };
  logoImage: string;
  logoInverse: string;
  logoIcon: string;
  tagline: string;
  companyLegal: string;
  language: string;
  currency: { code: string; symbol: string; locale: string };
  colors: {
    bgDark: string;
    bgLight: string;
    bgCream: string;
    textDark: string;
    textLight: string;
    textMuted: string;
    accent: string;
    accentGlow: string;
    gold: string;
  };
  fonts: { serif: string; sans: string };
  social: { email: string };
  seo: { titleTemplate: string; defaultDescription: string };
}

export const brand: BrandConfig = brandData as BrandConfig;

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat(brand.currency.locale, {
    style: "currency",
    currency: brand.currency.code,
  }).format(cents / 100);
}
