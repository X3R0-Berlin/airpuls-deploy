import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getTestimonials, getBundles } from "@/lib/products";
import { brand } from "@/lib/brand";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ComingSoonBanner } from "./product-page-client";
import { ProductDetailContent } from "./product-detail-content";

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

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://airimpuls.de";

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
      {!product.inStock && <ComingSoonBanner />}

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

      <ProductDetailContent
        product={product}
        testimonials={allTestimonials}
        bundles={bundles}
      />
    </>
  );
}
