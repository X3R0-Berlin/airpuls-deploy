import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";
import { getAllProducts } from "@/lib/products";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Suspense } from "react";
import { AffiliateTracker } from "@/components/affiliate-tracker";
import { CartPanel } from "@/components/layout/cart-panel";
import { CookieBanner } from "@/components/ui/cookie-banner";

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

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://airimpuls.de";

export const metadata: Metadata = {
  title: {
    default: brand.seo.titleTemplate.replace("%s", brand.tagline),
    template: brand.seo.titleTemplate,
  },
  description: brand.seo.defaultDescription,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/images/Airimpuls_Logo_Icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: brand.name,
    title: brand.seo.titleTemplate.replace("%s", brand.tagline),
    description: brand.seo.defaultDescription,
    url: siteUrl,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${brand.name} — ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.titleTemplate.replace("%s", brand.tagline),
    description: brand.seo.defaultDescription,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization Schema.org JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  legalName: brand.companyLegal,
  url: siteUrl,
  logo: `${siteUrl}/images/Airimpuls_Logo.svg`,
  email: brand.social.email,
  description: brand.seo.defaultDescription,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProducts = getAllProducts();
  const navProducts = allProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    heroImage: `${p.images.basePath}/${p.images.hero}`,
    comingSoon: p.comingSoon ?? false,
  }));

  return (
    <html lang={brand.language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <CartProvider>
          <ScrollProgress />
          <Navbar products={navProducts} />
          <main>{children}</main>
          <Footer />
          <CartPanel />
          <CookieBanner />
          <Suspense fallback={null}>
            <AffiliateTracker />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
