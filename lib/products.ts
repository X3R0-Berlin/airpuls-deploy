import fs from "fs";
import path from "path";
// products data layer

export interface ProductImage {
  file: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  tag: string;
  heading: string;
  text: string;
  image: string;
  bullets: string[];
  reverse: boolean;
  lottie?: string;
}

export interface TrustBadge {
  icon: string;
  text: string;
}

export interface HotspotPoint {
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface ProductHotspots {
  image: string;
  points: HotspotPoint[];
}

export interface Product {
  slug: string;
  name: string;
  collection: string;
  subtitle: string;
  designer: string;
  price: number;
  priceDisplay: string;
  currency: string;
  taxNote: string;
  freeShipping: boolean;
  inStock: boolean;
  comingSoon?: boolean;
  maxQuantity: number;
  featured: boolean;
  description: string;
  heroTagline: string;
  heroHeading: string;
  heroDescription: string;
  heroVideo?: string;
  images: {
    hero: string;
    gallery: ProductImage[];
    basePath: string;
  };
  specs: ProductSpec[];
  details: ProductDetail[];
  marqueeItems: string[];
  trustBadges: TrustBadge[];
  hotspots?: ProductHotspots;
}

const productsDir = path.join(process.cwd(), "data", "products");

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(productsDir, file), "utf-8");
    return JSON.parse(content) as Product;
  });
}

export function getProductBySlug(slug: string): Product | null {
  const filePath = path.join(productsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Product;
}

export function getFeaturedProduct(): Product | null {
  const products = getAllProducts();
  return products.find((p) => p.featured) || products[0] || null;
}

export interface Testimonial {
  id: number;
  product: string;
  stars: number;
  text: string;
  author: string;
  location: string;
  avatar?: string | null;
  verified?: boolean;
  purchaseDate?: string | null;
}

export function getTestimonials(productSlug?: string): Testimonial[] {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "testimonials.json"),
    "utf-8"
  );
  const all: Testimonial[] = JSON.parse(content);
  if (productSlug) return all.filter((t) => t.product === productSlug);
  return all;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  video?: string;
  poster?: string;
}

export function getFeatures(): Feature[] {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "features.json"),
    "utf-8"
  );
  return JSON.parse(content);
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export function getStats(): Stat[] {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "stats.json"),
    "utf-8"
  );
  return JSON.parse(content);
}

export function getComparison() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "comparison.json"),
    "utf-8"
  );
  return JSON.parse(content);
}

export function getBundles() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "bundles.json"),
    "utf-8"
  );
  return JSON.parse(content);
}
