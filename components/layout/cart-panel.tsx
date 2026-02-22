"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/brand";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function CartPanel() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, totalPrice } =
    useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
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
      <SheetContent className="w-full sm:max-w-[420px] bg-[var(--brand-bg-dark)] border-l border-[var(--brand-border-light)] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-brand-text-light font-sans text-lg flex items-center gap-2">
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
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4">
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
                    <p className="text-brand-text-light text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-brand-text-muted text-xs mt-0.5">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full border border-[var(--brand-border-light)] flex items-center justify-center text-brand-text-muted hover:text-brand-text-light hover:border-brand-text-muted transition-colors bg-transparent cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-brand-text-light text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full border border-[var(--brand-border-light)] flex items-center justify-center text-brand-text-muted hover:text-brand-text-light hover:border-brand-text-muted transition-colors bg-transparent cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="ml-auto text-brand-text-muted hover:text-brand-accent transition-colors bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-brand-text-light text-sm font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--brand-border-light)] pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-brand-text-muted text-sm">Zwischensumme</span>
                <span className="text-brand-text-light font-semibold text-lg">
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
                className="w-full text-brand-text-muted hover:text-brand-text-light"
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
