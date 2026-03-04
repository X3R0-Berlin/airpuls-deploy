import { getAllProducts, getComparison } from "@/lib/products";
import { ProductComparison } from "@/components/sections/product-comparison";
import { Newsletter } from "@/components/sections/newsletter";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

export const metadata = {
  title: "Produktvergleich",
  description:
    "Vergleichen Sie Vitair, Solitair und Preventair — finden Sie das richtige Gerät für Ihre Bedürfnisse.",
};

export default function VergleichPage() {
  const products = getAllProducts();
  const comparison = getComparison();

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-[var(--brand-bg-light)] pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0}>
            <nav className="flex items-center gap-2 text-brand-text-muted text-sm font-sans">
              <Link
                href="/"
                className="hover:text-brand-text-dark transition-colors"
              >
                AIRIMPULS
              </Link>
              <span>/</span>
              <span className="text-brand-text-dark">Produktvergleich</span>
            </nav>
          </BlurFade>
        </div>
      </section>

      <ProductComparison data={comparison} products={products} />
      <Newsletter />
    </>
  );
}
