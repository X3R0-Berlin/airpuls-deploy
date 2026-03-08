"use client";

import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedProduct } from "@/lib/i18n/products";
import {
  getLocalizedFeatures,
  getLocalizedStats,
  getLocalizedTestimonials,
  getLocalizedComparison,
} from "@/lib/i18n/data";
import type { Product, Feature, Testimonial, Stat } from "@/lib/products";

import { Hero } from "@/components/sections/hero";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { Features } from "@/components/sections/features";
import { StatsBar } from "@/components/sections/stats-bar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { ProductComparison } from "@/components/sections/product-comparison";
import { ProductFinder } from "@/components/sections/product-finder";
import { DetailSection } from "@/components/sections/detail-section";
import { Testimonials } from "@/components/sections/testimonials";
import { LifestyleGallery } from "@/components/sections/lifestyle-gallery";
import { AffiliateCTA } from "@/components/sections/affiliate-cta";
import { Newsletter } from "@/components/sections/newsletter";

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

interface HomeContentProps {
  product: Product;
  allProducts: Product[];
  features: Feature[];
  testimonials: Testimonial[];
  stats: Stat[];
  comparison: ComparisonData;
}

export function HomeContent({
  product,
  allProducts,
  features,
  testimonials,
  stats,
  comparison,
}: HomeContentProps) {
  const { locale } = useLanguage();

  // Localize data based on current locale
  const localizedProduct = getLocalizedProduct(product, locale);
  const localizedAllProducts = allProducts.map((p) =>
    getLocalizedProduct(p, locale)
  );
  const localizedFeatures = getLocalizedFeatures(locale) as Feature[];
  const localizedStats = getLocalizedStats(locale) as Stat[];
  const localizedTestimonials = getLocalizedTestimonials(locale) as Testimonial[];
  const localizedComparison = getLocalizedComparison(locale) as ComparisonData;

  return (
    <>
      <Hero product={localizedProduct} />
      <MarqueeBar items={localizedProduct.marqueeItems} />
      <Features features={localizedFeatures} />
      <StatsBar stats={localizedStats} />
      <ProductShowcase product={localizedProduct} />
      {localizedProduct.details.map((detail, i) => (
        <DetailSection
          key={i}
          detail={detail}
          basePath={localizedProduct.images.basePath}
          index={i}
        />
      ))}
      <LifestyleGallery />
      <ProductComparison data={localizedComparison} products={localizedAllProducts} />
      <ProductFinder />
      <Testimonials testimonials={localizedTestimonials} />
      <AffiliateCTA />
      <Newsletter />
    </>
  );
}
