import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getTestimonials } from "@/lib/products";
import { brand } from "@/lib/brand";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { DetailSection } from "@/components/sections/detail-section";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const product = getProductBySlug(slug);
    if (!product) return { title: "Produkt nicht gefunden" };
    return {
      title: `${product.name} | ${brand.name}`,
      description: product.description,
    };
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const testimonials = getTestimonials(product.slug);
  const allTestimonials = testimonials.length > 0 ? testimonials : getTestimonials();

  return (
    <>
      {/* Coming Soon Banner */}
      {!product.inStock && (
        <section className="bg-[var(--brand-accent)] py-3 text-center">
          <p className="text-white text-sm font-sans font-medium">
            Demnächst verfügbar — Lassen Sie sich vormerken
          </p>
        </section>
      )}

      {/* Breadcrumb */}
      <section className="bg-[var(--brand-bg-dark)] pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0}>
            <nav className="flex items-center gap-2 text-brand-text-muted text-sm font-sans">
              <Link href="/" className="hover:text-brand-text-light transition-colors">
                {brand.name}
              </Link>
              <span>/</span>
              <span className="text-brand-text-light">{product.name}</span>
              {!product.inStock && (
                <Badge variant="outline" className="ml-2 border-[var(--brand-accent)] text-[var(--brand-accent)]">
                  Coming Soon
                </Badge>
              )}
            </nav>
          </BlurFade>
        </div>
      </section>

      <MarqueeBar items={product.marqueeItems} />
      <ProductShowcase product={product} />

      {product.details.map((detail, i) => (
        <DetailSection
          key={i}
          detail={detail}
          basePath={product.images.basePath}
        />
      ))}

      <Testimonials testimonials={allTestimonials} />
      <Newsletter />
    </>
  );
}
