"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { useLanguage } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency-context";

const trustIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  shield: ShieldCheck,
  truck: Truck,
  refresh: RefreshCw,
};

export function ProductInfo({ product }: { product: Product }) {
  const { t } = useLanguage();
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { currencyCode, getPriceForCurrency } = useCurrency();

  const currentPrice = getPriceForCurrency(product.price, product.priceChf);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: `${product.name} ${product.subtitle}`,
      price: product.price,
      priceChf: product.priceChf,
      quantity: qty,
      image: `${product.images.basePath}/${product.images.gallery[0].file}`,
    });
    setQty(1);
  };

  return (
    <div>
      <span className="text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent font-medium">
        {product.collection}
      </span>
      <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light mt-2 text-[var(--brand-text-dark)]">
        {product.name}
      </h2>
      <p className="text-brand-text-muted text-sm mt-1">
        by {product.designer}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-4 mt-6">
        {product.comingSoon ? (
          <span className="text-brand-accent text-2xl font-semibold font-sans tracking-wide">
            {t("product.comingSoon")}
          </span>
        ) : (
          <>
            <span className="text-[var(--brand-text-dark)] text-3xl font-light font-serif flex items-baseline gap-1">
              <NumberTicker
                value={currentPrice / 100}
                className="text-[var(--brand-text-dark)] text-3xl font-light font-serif"
              />
              <span>{currencyCode === "CHF" ? ".00 CHF" : ",00 €"}</span>
            </span>
            {product.freeShipping && (
              <span className="text-brand-accent text-xs font-medium">
                {t("product.freeShipping")}
              </span>
            )}
          </>
        )}
      </div>
      {(product.taxNote || product.taxNoteChf) && (
        <p className="text-brand-text-muted text-xs mt-1">
          {currencyCode === "CHF" && product.taxNoteChf ? product.taxNoteChf : product.taxNote}
        </p>
      )}
      {/* Ratenzahlung-Anzeige */}
      {!product.comingSoon && currentPrice > 50000 && (
        <p className="text-brand-text-muted text-[0.8rem] mt-2">
          {t("product.orFrom")}{" "}
          <span className="text-[var(--brand-text-dark)] font-medium">
            {Math.ceil(currentPrice / 100 / 12)} {t("product.perMonth")}
          </span>
          {" "}· {t("product.installments")}
        </p>
      )}

      <div className="h-px bg-[var(--brand-border-dark)] my-6" />

      {/* Description */}
      <p className="text-[0.9rem] leading-[1.7] text-brand-text-muted">
        {product.description}
      </p>

      {/* Specs */}
      <div className="mt-6 space-y-0">
        {product.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between py-3 border-b border-[var(--brand-border-dark)] text-[0.85rem]"
          >
            <span className="text-brand-text-muted">{spec.label}</span>
            <span className="text-[var(--brand-text-dark)] font-medium">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Quantity & Add to Cart — only for purchasable products */}
      {product.comingSoon ? (
        <div className="mt-8 space-y-4">
          <div className="border border-[var(--brand-border-dark)] rounded-2xl px-6 py-5 text-center">
            <p className="text-[var(--brand-text-dark)] font-semibold text-[0.95rem]">
              {t("product.comingSoonTitle")}
            </p>
            <p className="text-brand-text-muted text-[0.8rem] mt-1">
              {t("product.comingSoonDesc")}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mt-8">
            <span className="text-[0.85rem] text-brand-text-muted">{t("product.quantity")}</span>
            <div className="flex items-center border border-[var(--brand-border-dark)] rounded-full">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-10 h-10 flex items-center justify-center text-brand-text-muted hover:text-[var(--brand-text-dark)] transition-colors bg-transparent border-none cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-[var(--brand-text-dark)] font-medium">
                {qty}
              </span>
              <button
                onClick={() => qty < product.maxQuantity && setQty(qty + 1)}
                className="w-10 h-10 flex items-center justify-center text-brand-text-muted hover:text-[var(--brand-text-dark)] transition-colors bg-transparent border-none cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <MagneticButton strength={10} radius={120}>
              <ShimmerButton
                onClick={handleAddToCart}
                className="w-full py-4"
                shimmerColor="rgba(0,0,0,0.06)"
                background="var(--brand-accent)"
              >
                <span className="flex items-center justify-center gap-2 text-white font-semibold text-[0.9rem]">
                  {t("product.addToCart")}
                </span>
              </ShimmerButton>
            </MagneticButton>
          </div>
        </>
      )}

      {/* Trust Badges */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {product.trustBadges.map((badge) => {
          const Icon = trustIcons[badge.icon] || ShieldCheck;
          return (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-brand-text-muted text-[0.8rem]"
            >
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
              {badge.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
