import { getFeaturedProduct, getFeatures, getTestimonials } from "@/lib/products";
import { Hero } from "@/components/sections/hero";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { Features } from "@/components/sections/features";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { DetailSection } from "@/components/sections/detail-section";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  const product = getFeaturedProduct();
  const features = getFeatures();
  const testimonials = getTestimonials();

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
      <ProductShowcase product={product} />
      {product.details.map((detail, i) => (
        <DetailSection
          key={i}
          detail={detail}
          basePath={product.images.basePath}
        />
      ))}
      <Testimonials testimonials={testimonials} />
      <Newsletter />
    </>
  );
}
