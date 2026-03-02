"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "motion/react";

interface StickyCartBarProps {
  productName: string;
  price: number;
  priceDisplay: string;
  slug: string;
  image: string;
  inStock: boolean;
  comingSoon?: boolean;
}

export function StickyCartBar({
  productName,
  price,
  priceDisplay,
  slug,
  image,
  inStock,
  comingSoon,
}: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 600px (past the hero/gallery area)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (comingSoon || !inStock) return null;

  const monthlyPrice = Math.ceil(price / 100 / 12);

  const handleAdd = () => {
    addItem({
      slug,
      name: productName,
      price,
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
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-serif text-brand-text-dark text-lg font-light truncate">
                {productName}
              </span>
              <div className="hidden sm:flex flex-col">
                <span className="text-brand-text-dark font-serif text-lg">
                  {priceDisplay} €
                </span>
                <span className="text-brand-text-muted text-[0.65rem]">
                  oder ab {monthlyPrice} €/Monat
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--brand-accent)] text-white rounded-full font-semibold text-sm hover:bg-[var(--brand-accent-glow)] transition-colors shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">In den Warenkorb</span>
              <span className="sm:hidden">Kaufen</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
