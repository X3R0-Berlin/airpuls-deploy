"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { brand } from "@/lib/brand";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export type NavProduct = {
  slug: string;
  name: string;
  subtitle: string;
  heroImage: string;
  comingSoon: boolean;
};

const navLinks = [
  { href: "/produkte", label: "Produkte", isMega: true },
  { href: "#features", label: "Vorteile", isMega: false },
  { href: "#details", label: "Technologie", isMega: false },
  { href: "#reviews", label: "Bewertungen", isMega: false },
];

export function Navbar({ products = [] }: { products?: NavProduct[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { totalItems, setOpen } = useCart();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mega menu on scroll
  useEffect(() => {
    if (!megaOpen) return;
    const onScroll = () => setMegaOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaOpen]);

  const closeMobile = () => setMobileOpen(false);

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const closeMegaDelayed = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          "backdrop-blur-[40px] backdrop-saturate-150",
          scrolled || mobileOpen
            ? "py-3 bg-white/90"
            : "py-5 bg-white/60",
          "border-b border-[var(--brand-border-light)]"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline" onClick={closeMobile}>
            <Image
              src={brand.logoImage}
              alt={brand.name}
              width={640}
              height={650}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-10 items-center list-none">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={link.isMega ? openMega : undefined}
                onMouseLeave={link.isMega ? closeMegaDelayed : undefined}
              >
                {link.isMega ? (
                  <button
                    className={cn(
                      "text-[0.82rem] font-normal tracking-[0.06em] transition-colors duration-300 cursor-pointer bg-transparent border-none p-0",
                      megaOpen
                        ? "text-brand-text-dark"
                        : "text-brand-text-muted hover:text-brand-text-dark"
                    )}
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                  </button>
                ) : link.href.startsWith("/") ? (
                  <Link
                    href={link.href}
                    className="text-brand-text-muted no-underline text-[0.82rem] font-normal tracking-[0.06em] hover:text-brand-text-dark transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-brand-text-muted no-underline text-[0.82rem] font-normal tracking-[0.06em] hover:text-brand-text-dark transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Right: Cart + Hamburger */}
          <div className="flex items-center gap-5">
            {/* Cart button */}
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 text-brand-text-dark text-[0.82rem] font-medium tracking-[0.04em] cursor-pointer bg-transparent border-none"
              aria-label="Warenkorb öffnen"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-brand-accent rounded-full text-white text-[0.6rem] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center text-brand-text-dark cursor-pointer bg-transparent border-none p-1"
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mega Menu Dropdown (Desktop) ───────────────────── */}
      <AnimatePresence>
        {megaOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mega-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 hidden md:block"
              onClick={() => setMegaOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="mega-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-0 right-0 z-40 hidden md:block"
              style={{ top: scrolled ? "56px" : "72px" }}
              onMouseEnter={cancelClose}
              onMouseLeave={closeMegaDelayed}
            >
              <div className="bg-white/98 backdrop-blur-[60px] backdrop-saturate-150 border-b border-[var(--brand-border-light)]">
                <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)] py-10">
                  {/* Product Grid */}
                  <div className="grid grid-cols-4 gap-6">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/product/${product.slug}`}
                        className="group block no-underline rounded-2xl p-4 transition-colors duration-300 hover:bg-black/[0.03]"
                        onClick={() => setMegaOpen(false)}
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--brand-bg-cream)] mb-4">
                          <Image
                            src={product.heroImage}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1280px) 25vw, 280px"
                          />
                          {/* Coming Soon Overlay */}
                          {product.comingSoon && (
                            <div className="absolute top-3 right-3 px-2.5 py-1 bg-[var(--brand-waldrot)] text-white text-[0.65rem] font-semibold rounded-full tracking-[0.06em]">
                              Coming Soon
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <h3 className="font-serif font-light text-[1.1rem] text-brand-text-dark mb-0.5 group-hover:text-brand-accent transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[0.78rem] text-brand-text-muted">
                          {product.subtitle}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Footer: All Products Link */}
                  <div className="mt-8 pt-6 border-t border-[var(--brand-border-light)] flex justify-center">
                    <Link
                      href="/produkte"
                      className="inline-flex items-center gap-2 text-[0.82rem] text-brand-text-muted no-underline hover:text-brand-accent transition-colors duration-300 tracking-[0.04em]"
                      onClick={() => setMegaOpen(false)}
                    >
                      Alle Produkte ansehen
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile menu overlay ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[300px] md:hidden flex flex-col bg-white border-l border-[var(--brand-border-light)]"
            >
              {/* Drawer top spacer (matches navbar height) */}
              <div className="h-[72px] shrink-0 border-b border-[var(--brand-border-light)]" />

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-6 px-6">
                {/* Products section with thumbnails */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 }}
                >
                  <p className="text-[0.68rem] tracking-[0.2em] uppercase text-brand-text-muted mb-3">
                    Produkte
                  </p>
                  <div className="space-y-1 mb-6">
                    {products.map((product, i) => (
                      <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeMobile}
                          className="flex items-center gap-3 py-2.5 no-underline group rounded-lg px-2 -mx-2 hover:bg-black/[0.03] transition-colors"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[var(--brand-bg-cream)] shrink-0">
                            <Image
                              src={product.heroImage}
                              alt={product.name}
                              fill
                              className="object-contain"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[0.9rem] text-brand-text-dark group-hover:text-brand-accent transition-colors truncate">
                              {product.name}
                            </p>
                            <p className="text-[0.72rem] text-brand-text-muted truncate">
                              {product.comingSoon ? "Coming Soon" : product.subtitle}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-brand-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* All products link */}
                  <Link
                    href="/produkte"
                    onClick={closeMobile}
                    className="block text-[0.8rem] text-brand-accent no-underline mb-6 px-2 hover:text-brand-accent-glow transition-colors"
                  >
                    Alle Produkte ansehen →
                  </Link>
                </motion.div>

                {/* Divider */}
                <div className="border-t border-[var(--brand-border-light)] my-2" />

                {/* Other nav links */}
                <ul className="list-none space-y-1 mt-4">
                  {navLinks.filter((l) => !l.isMega).map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      {link.href.startsWith("/") ? (
                        <Link
                          href={link.href}
                          onClick={closeMobile}
                          className="block py-3 text-[1.05rem] font-light text-brand-text-muted no-underline hover:text-brand-text-dark transition-colors duration-200 border-b border-[var(--brand-border-light)]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={closeMobile}
                          className="block py-3 text-[1.05rem] font-light text-brand-text-muted no-underline hover:text-brand-text-dark transition-colors duration-200 border-b border-[var(--brand-border-light)]"
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>

                {/* Footer links in mobile menu */}
                <div className="mt-10 space-y-3">
                  <p className="text-[0.68rem] tracking-[0.2em] uppercase text-brand-text-muted">
                    Rechtliches
                  </p>
                  {[
                    { href: "/impressum", label: "Impressum" },
                    { href: "/datenschutz", label: "Datenschutz" },
                    { href: "/agb", label: "AGB" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="block text-[0.8rem] text-brand-text-muted no-underline hover:text-brand-text-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Contact CTA at bottom */}
              <div className="p-6 border-t border-[var(--brand-border-light)]">
                <Link
                  href="/kontakt"
                  onClick={closeMobile}
                  className="block w-full text-center py-3 rounded-full bg-brand-accent text-white text-[0.85rem] font-semibold no-underline hover:bg-brand-accent-glow transition-colors"
                >
                  Kontakt
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
