"use client";

import { Plus, Disc, Wind, ShieldPlus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BlurFade } from "@/components/ui/blur-fade";
import { useCurrency } from "@/lib/currency-context";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  disc: Disc,
  wind: Wind,
  "shield-plus": ShieldPlus,
};

interface BundleItem {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceChf?: number;
  priceDisplay: string;
  icon: string;
  image: string | null;
  forProducts: string[];
}

interface BundleData {
  heading: string;
  items: BundleItem[];
}

export function UpsellDrawer({
  bundles,
  currentProduct,
}: {
  bundles: BundleData;
  currentProduct: string;
}) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const relevantItems = bundles.items.filter((item) =>
    item.forProducts.includes(currentProduct)
  );

  if (relevantItems.length === 0) return null;

  const handleAdd = (item: BundleItem) => {
    addItem({
      slug: item.slug,
      name: item.name,
      price: item.price,
      priceChf: item.priceChf,
      quantity: 1,
      image: "",
    });
  };

  return (
    <BlurFade delay={0.3} inView>
      <div className="mt-8 border border-[var(--brand-border-dark)] rounded-2xl p-5">
        <p className="text-[0.8rem] tracking-[0.1em] uppercase text-brand-text-muted font-medium mb-4">
          {bundles.heading}
        </p>
        <div className="space-y-3">
          {relevantItems.map((item) => {
            const Icon = iconMap[item.icon] || Disc;
            return (
              <div
                key={item.slug}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--brand-bg-cream)]/50 transition-colors group"
              >
                {/* Icon placeholder (will be replaced by image when available) */}
                <div className="w-12 h-12 rounded-lg bg-[var(--brand-bg-cream)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-accent" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.85rem] text-[var(--brand-text-dark)] font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-[0.75rem] text-brand-text-muted truncate">
                    {item.description}
                  </p>
                </div>

                {/* Price + Add */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[var(--brand-text-dark)] text-sm font-medium">
                    {formatPrice(item.price, item.priceChf)}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="w-8 h-8 rounded-full bg-[var(--brand-accent)] text-white flex items-center justify-center hover:bg-[var(--brand-accent)] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BlurFade>
  );
}
