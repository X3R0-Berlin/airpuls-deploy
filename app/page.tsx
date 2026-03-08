import { getFeaturedProduct, getAllProducts, getFeatures, getTestimonials, getStats, getComparison } from "@/lib/products";
import { HomeContent } from "./home-content";

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
    <HomeContent
      product={product}
      allProducts={allProducts}
      features={features}
      testimonials={testimonials}
      stats={stats}
      comparison={comparison}
    />
  );
}
