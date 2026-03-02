import { getFeaturedProduct, getAllProducts, getFeatures, getTestimonials, getStats, getComparison } from "@/lib/products";
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

export default function HomePage() {
  const product = getFeaturedProduct();
  const allProducts = getAllProducts();
  const features = getFeatures();
  const testimonials = getTestimonials();
  const stats = getStats();
  const comparison = getComparison();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Kein Produkt gefunden.
      </div>
    );
  }

  return (
    <>
      <Hero product={product} />
      <MarqueeBar items={product.marqueeItems} />
      <Features features={features} />
      <StatsBar stats={stats} />
      <ProductShowcase product={product} />
      {product.details.map((detail, i) => (
        <DetailSection
          key={i}
          detail={detail}
          basePath={product.images.basePath}
          index={i}
        />
      ))}
      <LifestyleGallery />
      <ProductComparison data={comparison} products={allProducts} />
      <ProductFinder />
      <Testimonials testimonials={testimonials} />
      <AffiliateCTA />
      <Newsletter />
    </>
  );
}
