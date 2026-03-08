"use client";

import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedProduct } from "@/lib/i18n/products";
import { getLocalizedComparison } from "@/lib/i18n/data";
import type { Product } from "@/lib/products";
import { ProductComparison } from "@/components/sections/product-comparison";

interface ComparisonFeature {
  label: string;
  values?: Record<string, string>;
  check?: Record<string, boolean>;
}

interface ComparisonData {
  heading: string;
  subheading: string;
  products: string[];
  features: ComparisonFeature[];
}

interface VergleichContentProps {
  products: Product[];
  comparison: ComparisonData;
}

export function VergleichContent({ products }: VergleichContentProps) {
  const { locale } = useLanguage();

  const localizedProducts = products.map((p) => getLocalizedProduct(p, locale));
  const localizedComparison = getLocalizedComparison(locale) as ComparisonData;

  return <ProductComparison data={localizedComparison} products={localizedProducts} />;
}
