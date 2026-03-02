import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { getAllProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Produkte | AIRIMPULSE",
  description: "Entdecke alle AIRIMPULSE Produkte — natürliche Energie für dein Zuhause.",
};

export default function ProduktePage() {
  const products = getAllProducts();

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[var(--brand-bg-light)]">
      <div className="max-w-[1100px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        {/* Breadcrumb */}
        <BlurFade delay={0} inView>
          <nav className="flex items-center gap-1.5 text-[0.75rem] text-brand-text-muted mb-10">
            <Link
              href="/"
              className="hover:text-brand-text-dark transition-colors no-underline text-brand-text-muted"
            >
              Startseite
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-text-dark">Produkte</span>
          </nav>
        </BlurFade>

        {/* Heading */}
        <BlurFade delay={0.1} inView>
          <h1 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-brand-text-dark mb-4">
            Unsere Produkte
          </h1>
          <p className="text-[1rem] text-brand-text-muted mb-14 max-w-[540px]">
            Entdecke die Kraft der Natur — handgefertigt in Deutschland mit
            Leidenschaft für Qualität.
          </p>
        </BlurFade>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <BlurFade key={product.slug} delay={0.15 + idx * 0.08} inView>
              <Link
                href={`/product/${product.slug}`}
                className="block no-underline rounded-2xl"
              >
                <MagicCard
                  className="rounded-2xl"
                  gradientColor="rgba(74, 94, 60, 0.15)"
                  gradientFrom="var(--brand-accent)"
                  gradientTo="var(--brand-accent-glow)"
                  gradientOpacity={0.6}
                >
                  <div className="p-5">
                    {/* Image */}
                    <div className="relative aspect-square flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-white">
                      <Image
                        src={`${product.images.basePath}/${product.images.hero}`}
                        alt={`${product.name} ${product.subtitle}`}
                        width={400}
                        height={400}
                        className="object-contain w-[80%] h-[80%] hover:scale-105 transition-transform duration-500"
                      />
                      {/* Coming Soon Badge */}
                      {product.comingSoon && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-[var(--brand-waldrot)] text-white text-[0.7rem] font-semibold rounded-full tracking-[0.06em]">
                          Coming Soon
                        </div>
                      )}
                      {/* Featured Badge */}
                      {product.featured && !product.comingSoon && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-brand-accent text-white text-[0.7rem] font-semibold rounded-full tracking-[0.06em]">
                          Bestseller
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <p className="text-[0.7rem] text-brand-text-muted tracking-[0.12em] uppercase mb-1">
                        {product.collection}
                      </p>
                      <h3 className="text-[1rem] font-medium text-brand-text-dark mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[0.82rem] text-brand-text-muted mb-3 line-clamp-2">
                        {product.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        {product.comingSoon ? (
                          <span className="text-[0.85rem] text-brand-text-muted italic">
                            Demnächst verfügbar
                          </span>
                        ) : (
                          <span className="text-[0.95rem] font-semibold text-brand-text-dark">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                        {product.freeShipping && !product.comingSoon && (
                          <span className="text-[0.7rem] text-brand-accent tracking-[0.04em]">
                            Kostenloser Versand
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
