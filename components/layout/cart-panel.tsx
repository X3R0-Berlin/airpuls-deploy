"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/brand";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { getAffiliateRef } from "@/components/affiliate-tracker";

export function CartPanel() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, totalPrice } =
    useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, affiliateRef: getAffiliateRef() }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full max-w-[480px] sm:max-w-[480px] bg-white border-l border-[var(--brand-border-light)] flex flex-col gap-0 px-8 py-0">
        <SheetHeader className="p-0 pt-8 pb-6 pr-8 border-b border-[var(--brand-border-light)]">
          <SheetTitle className="text-brand-text-dark font-sans text-xl flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            Warenkorb
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-brand-text-muted text-sm">
            <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
            <p>Dein Warenkorb ist leer.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 pb-6 border-b border-[var(--brand-border-light)] last:border-b-0 last:pb-0"
                >
                  <div className="w-20 h-20 bg-[var(--brand-bg-cream)] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <p className="text-brand-text-dark text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-brand-text-dark text-sm font-medium whitespace-nowrap flex-shrink-0">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                    <p className="text-brand-text-muted text-xs mt-1.5">
                      {formatCurrency(item.price)} pro Stk.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-[var(--brand-border-light)] flex items-center justify-center text-brand-text-muted hover:text-brand-text-dark hover:border-brand-text-muted transition-colors bg-transparent cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-brand-text-dark text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-[var(--brand-border-light)] flex items-center justify-center text-brand-text-muted hover:text-brand-text-dark hover:border-brand-text-muted transition-colors bg-transparent cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="ml-auto text-brand-text-muted hover:text-brand-accent transition-colors bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--brand-border-light)] pt-6 pb-8 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-brand-text-muted text-sm">Zwischensumme</span>
                <span className="text-brand-text-dark font-semibold text-lg">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <p className="text-brand-text-muted text-xs">
                Kostenloser Versand innerhalb Deutschlands
              </p>
              <Separator className="bg-[var(--brand-border-light)]" />
              <ShimmerButton
                onClick={handleCheckout}
                className="w-full"
                shimmerColor="var(--brand-accent-glow)"
                background="var(--brand-accent)"
              >
                <span className="text-white font-semibold text-sm">
                  Zur Kasse
                </span>
              </ShimmerButton>
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="w-full text-brand-text-muted hover:text-brand-text-dark"
              >
                Weiter einkaufen
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
