"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { brand } from "@/lib/brand";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        "backdrop-blur-[40px] backdrop-saturate-150",
        scrolled
          ? "py-3 bg-[var(--brand-bg-dark)]/92"
          : "py-5 bg-[var(--brand-bg-dark)]/60",
        "border-b border-[var(--brand-border-light)]"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)] flex items-center justify-between">
        <Link
          href="/"
          className="font-sans font-semibold text-[0.85rem] tracking-[0.35em] uppercase text-brand-text-light no-underline"
        >
          {brand.logoParts.main}
          <span className="text-brand-accent">{brand.logoParts.accent}</span>
        </Link>

        <ul className="hidden md:flex gap-10 items-center list-none">
          {[
            { href: "#features", label: "Vorteile" },
            { href: "#product", label: "Produkt" },
            { href: "#details", label: "Technologie" },
            { href: "#reviews", label: "Bewertungen" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-brand-text-muted no-underline text-[0.82rem] font-normal tracking-[0.06em] hover:text-brand-text-light transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 text-brand-text-light text-[0.82rem] font-medium tracking-[0.04em] cursor-pointer bg-transparent border-none"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-brand-accent rounded-full text-[0.6rem] flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
