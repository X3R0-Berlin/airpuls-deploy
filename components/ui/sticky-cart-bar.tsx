"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency-context";

interface StickyCartBarProps {
  productName: string;
  price: number;
  priceChf?: number;
  priceDisplay: string;
  slug: string;
  image: string;
  inStock: boolean;
  comingSoon?: boolean;
}

export function StickyCartBar({
  productName,
  price,
  priceChf,
  priceDisplay,
  slug,
  image,
  inStock,
  comingSoon,
}: StickyCartBarProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();
  const { currencyCode, getPriceForCurrency, formatPrice } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 600px (past the hero/gallery area)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!inStock && !comingSoon) return null;

  const currentPrice = getPriceForCurrency(price, priceChf);
  const monthlyPrice = Math.ceil(currentPrice / 100 / 12);

  // Use formatPrice to get the correct display string depending on locale, 
  // falling back to priceDisplay prop if EUR but without manually handling everything.
  // Actually, formatPrice does exactly what we need.
  const displayString = formatPrice(price, priceChf);

  const handleAdd = () => {
    addItem({
      slug,
      name: productName,
      price,
      priceChf,
      quantity: 1,
      image,
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[var(--brand-border-light)]"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Product info */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {image && (
                <div className="relative w-10 h-10 shrink-0 rounded bg-white border border-[var(--brand-border-light)] overflow-hidden">
                  <img
                    src={image}
                    alt={productName}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              )}
              <span className="font-serif text-brand-text-dark text-lg font-light truncate">
                {productName}
              </span>
              <div className="hidden sm:flex flex-col">
                <span className="text-brand-text-dark font-serif text-lg leading-tight">
                  {displayString}
                </span>
                <span className="text-brand-text-muted text-[0.65rem] leading-none">
                  {t("sticky.orFrom")} {monthlyPrice} {t("sticky.perMonth")}
                </span>
              </div>
            </div>

            {/* CTA */}
            {comingSoon ? (
              <button
                disabled
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-400 rounded-full font-semibold text-sm cursor-not-allowed shrink-0 border border-gray-200"
              >
                <span className="whitespace-nowrap">{t("product.comingSoon")}</span>
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--brand-accent)] text-white rounded-full font-semibold text-sm hover:bg-[var(--brand-accent-glow)] transition-colors shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{t("sticky.addToCart")}</span>
                <span className="sm:hidden">{t("sticky.buy")}</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
