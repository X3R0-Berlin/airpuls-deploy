import type { Locale } from "../types";
import type { Product } from "@/lib/products";
import { vitairEN } from "./vitair.en";
import { solitairEN } from "./solitair.en";
import { preventairEN } from "./preventair.en";

type ProductTextOverride = {
  subtitle?: string;
  description?: string;
  taxNote?: string;
  heroTagline?: string;
  heroHeading?: string;
  heroDescription?: string;
  specs?: { label: string; value: string }[];
  details?: { tag: string; heading: string; text: string; bullets: string[] }[];
  trustBadges?: { icon: string; text: string }[];
  marqueeItems?: string[];
  hotspots?: { points: { title: string; description: string }[] };
};

const overrides: Record<string, ProductTextOverride> = {
  vitair: vitairEN,
  solitair: solitairEN,
  preventair: preventairEN,
};

export function getLocalizedProduct(product: Product, locale: Locale): Product {
  if (locale === "de") return product;

  const override = overrides[product.slug];
  if (!override) return product;

  return {
    ...product,
    ...(override.subtitle && { subtitle: override.subtitle }),
    ...(override.description && { description: override.description }),
    ...(override.taxNote && { taxNote: override.taxNote }),
    ...(override.heroTagline && { heroTagline: override.heroTagline }),
    ...(override.heroHeading && { heroHeading: override.heroHeading }),
    ...(override.heroDescription && {
      heroDescription: override.heroDescription,
    }),
    ...(override.specs && { specs: override.specs }),
    ...(override.marqueeItems && { marqueeItems: override.marqueeItems }),
    ...(override.trustBadges && { trustBadges: override.trustBadges }),
    ...(override.details && {
      details: product.details.map((d, i) => ({
        ...d,
        ...(override.details?.[i] || {}),
      })),
    }),
    ...(override.hotspots &&
      product.hotspots && {
        hotspots: {
          ...product.hotspots,
          points: product.hotspots.points.map((p, i) => ({
            ...p,
            ...(override.hotspots?.points?.[i] || {}),
          })),
        },
      }),
  };
}
