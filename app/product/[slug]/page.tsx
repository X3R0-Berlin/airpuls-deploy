import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getTestimonials, getBundles } from "@/lib/products";
import { brand, formatCurrency } from "@/lib/brand";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { UpsellDrawer } from "@/components/sections/upsell-drawer";
import { DetailSection } from "@/components/sections/detail-section";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { ProductHotspots } from "@/components/sections/product-hotspots";
import { StickyCartBar } from "@/components/ui/sticky-cart-bar";
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
  const bundles = getBundles();

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://airimpulse.de";

  // Product Schema.org JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.subtitle}`,
    description: product.description,
    image: `${siteUrl}${product.images.basePath}/${product.images.hero}`,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: brand.companyLegal,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {/* Coming Soon Banner */}
      {!product.inStock && (
        <section className="bg-[var(--brand-accent)] py-3 text-center">
          <p className="text-white text-sm font-sans font-medium">
            Demnächst verfügbar — Lassen Sie sich vormerken
          </p>
        </section>
      )}

      {/* Breadcrumb */}
      <section className="bg-[var(--brand-bg-light)] pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0}>
            <nav className="flex items-center gap-2 text-brand-text-muted text-sm font-sans">
              <Link href="/" className="hover:text-brand-text-dark transition-colors">
                {brand.name}
              </Link>
              <span>/</span>
              <span className="text-brand-text-dark">{product.name}</span>
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

      {/* Upsell / Bundle Section */}
      {!product.comingSoon && (
        <section className="bg-[var(--brand-bg-light)] pb-12 px-[clamp(1.5rem,4vw,4rem)]">
          <div className="max-w-[600px] mx-auto lg:ml-[calc(50%+clamp(1rem,2.5vw,2.5rem))]">
            <UpsellDrawer bundles={bundles} currentProduct={product.slug} />
          </div>
        </section>
      )}

      {/* Product Hotspots — interactive detail exploration */}
      {product.hotspots && (
        <ProductHotspots
          hotspots={product.hotspots}
          basePath={product.images.basePath}
          productName={product.name}
        />
      )}

      {product.details.map((detail, i) => (
        <DetailSection
          key={i}
          detail={detail}
          basePath={product.images.basePath}
          index={i}
        />
      ))}

      <Testimonials testimonials={allTestimonials} />
      <Newsletter />

      {/* Sticky Add-to-Cart Bar */}
      <StickyCartBar
        productName={product.name}
        price={product.price}
        priceDisplay={product.priceDisplay}
        slug={product.slug}
        image={`${product.images.basePath}/${product.images.gallery[0].file}`}
        inStock={product.inStock}
        comingSoon={product.comingSoon}
      />
    </>
  );
}
