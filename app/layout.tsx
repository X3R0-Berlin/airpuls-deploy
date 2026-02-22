import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartPanel } from "@/components/layout/cart-panel";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: brand.seo.titleTemplate.replace("%s", brand.tagline),
  description: brand.seo.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={brand.language}>
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <CartProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartPanel />
        </CartProvider>
      </body>
    </html>
  );
}
