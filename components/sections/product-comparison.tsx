"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import type { Product } from "@/lib/products";

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

export function ProductComparison({
  data,
  products,
}: {
  data: ComparisonData;
  products: Product[];
}) {
  const orderedProducts = data.products
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  return (
    <section className="bg-[var(--brand-bg-light)] py-20 px-[clamp(1rem,4vw,4rem)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <BlurFade delay={0} inView>
          <div className="text-center mb-14">
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium">
              Produktvergleich
            </span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-brand-text-dark mt-3">
              {data.heading}
            </h2>
            <p className="text-brand-text-muted mt-2">{data.subheading}</p>
          </div>
        </BlurFade>

        {/* Comparison Table */}
        <BlurFade delay={0.15} inView>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Product Header Row */}
              <thead>
                <tr>
                  <th className="p-4 text-left w-[25%]" />
                  {orderedProducts.map((product) => (
                    <th key={product.slug} className="p-4 text-center w-[25%]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-28 h-36 relative">
                          <Image
                            src={`${product.images.basePath}/${product.images.hero}`}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-xl text-brand-text-dark font-light">
                            {product.name}
                          </p>
                          <p className="text-brand-text-muted text-xs mt-0.5">
                            {product.subtitle}
                          </p>
                        </div>
                        <p className="font-serif text-lg text-brand-text-dark">
                          {product.comingSoon ? (
                            <span className="text-brand-accent text-sm font-sans">
                              Coming Soon
                            </span>
                          ) : (
                            <>{product.priceDisplay} €</>
                          )}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature Rows */}
              <tbody>
                {data.features.map((feature, i) => (
                  <tr
                    key={feature.label}
                    className={
                      i % 2 === 0
                        ? "bg-[var(--brand-bg-cream)]"
                        : ""
                    }
                  >
                    <td className="p-4 text-brand-text-muted text-sm font-medium border-t border-[var(--brand-border-light)]">
                      {feature.label}
                    </td>
                    {orderedProducts.map((product) => (
                      <td
                        key={product.slug}
                        className="p-4 text-center border-t border-[var(--brand-border-light)]"
                      >
                        {feature.check !== undefined ? (
                          feature.check[product.slug] ? (
                            <Check className="w-5 h-5 text-brand-accent mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-brand-text-muted/70 mx-auto" />
                          )
                        ) : (
                          <span className="text-brand-text-dark text-sm">
                            {feature.values?.[product.slug] || "—"}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* CTA Row */}
                <tr>
                  <td className="p-6 border-t border-[var(--brand-border-light)]" />
                  {orderedProducts.map((product) => (
                    <td
                      key={product.slug}
                      className="p-6 text-center border-t border-[var(--brand-border-light)]"
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className={`inline-block px-6 py-2.5 rounded-full text-sm font-medium transition-all no-underline ${
                          product.featured
                            ? "bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-glow)]"
                            : "border border-[var(--brand-border-light)] text-brand-text-dark hover:bg-black/5"
                        }`}
                      >
                        {product.comingSoon ? "Mehr erfahren" : "Jetzt kaufen"}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
