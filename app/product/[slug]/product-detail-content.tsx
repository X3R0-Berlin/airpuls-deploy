"use client";

import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedProduct } from "@/lib/i18n/products";
import { getLocalizedTestimonials, getLocalizedBundles } from "@/lib/i18n/data";
import type { Product, Testimonial } from "@/lib/products";

import { MarqueeBar } from "@/components/sections/marquee-bar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { UpsellDrawer } from "@/components/sections/upsell-drawer";
import { DetailSection } from "@/components/sections/detail-section";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { ProductHotspots } from "@/components/sections/product-hotspots";
import { StickyCartBar } from "@/components/ui/sticky-cart-bar";

interface BundleItem {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  icon: string;
  image: string | null;
  forProducts: string[];
}

interface BundleData {
  heading: string;
  items: BundleItem[];
}

interface ProductDetailContentProps {
  product: Product;
  testimonials: Testimonial[];
  bundles: BundleData;
}

export function ProductDetailContent({
  product,
}: ProductDetailContentProps) {
  const { locale } = useLanguage();

  // Localize product, testimonials, and bundles
  const localizedProduct = getLocalizedProduct(product, locale);
  const localizedTestimonials = getLocalizedTestimonials(locale) as Testimonial[];
  const localizedBundles = getLocalizedBundles(locale) as BundleData;

  // Filter testimonials for this product, fall back to all
  const productTestimonials = localizedTestimonials.filter(
    (t) => t.product === product.slug
  );
  const displayTestimonials =
    productTestimonials.length > 0 ? productTestimonials : localizedTestimonials;

  return (
    <>
      <MarqueeBar items={localizedProduct.marqueeItems} />
      <ProductShowcase product={localizedProduct} />

      {/* Upsell / Bundle Section */}
      {!localizedProduct.comingSoon && (
        <section className="bg-[var(--brand-bg-light)] pb-12 px-[clamp(1.5rem,4vw,4rem)]">
          <div className="max-w-[600px] mx-auto lg:ml-[calc(50%+clamp(1rem,2.5vw,2.5rem))]">
            <UpsellDrawer bundles={localizedBundles} currentProduct={localizedProduct.slug} />
          </div>
        </section>
      )}

      {/* Product Hotspots */}
      {localizedProduct.hotspots && (
        <ProductHotspots
          hotspots={localizedProduct.hotspots}
          basePath={localizedProduct.images.basePath}
          productName={localizedProduct.name}
        />
      )}

      {localizedProduct.details.map((detail, i) => (
        <DetailSection
          key={i}
          detail={detail}
          basePath={localizedProduct.images.basePath}
          index={i}
        />
      ))}

      <Testimonials testimonials={displayTestimonials} />
      <Newsletter />

      {/* Sticky Add-to-Cart Bar */}
      <StickyCartBar
        productName={localizedProduct.name}
        price={localizedProduct.price}
        priceChf={localizedProduct.priceChf}
        priceDisplay={localizedProduct.priceDisplay}
        slug={localizedProduct.slug}
        image={`${localizedProduct.images.basePath}/${localizedProduct.images.gallery[0].file}`}
        inStock={localizedProduct.inStock}
        comingSoon={localizedProduct.comingSoon}
      />
    </>
  );
}
