import { BlurFade } from "@/components/ui/blur-fade";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import type { Product } from "@/lib/products";

export function ProductShowcase({ product }: { product: Product }) {
  return (
    <section
      id="product"
      className="py-[clamp(5rem,10vw,10rem)] bg-[var(--brand-bg-light)] text-[var(--brand-text-dark)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,5vw,5rem)]">
          <BlurFade delay={0} inView>
            <ProductGallery
              images={product.images.gallery}
              basePath={product.images.basePath}
            />
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <ProductInfo product={product} />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
