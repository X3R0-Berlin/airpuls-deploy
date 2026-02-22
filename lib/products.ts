import fs from "fs";
import path from "path";

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
}

export interface TrustBadge {
  icon: string;
  text: string;
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
  maxQuantity: number;
  featured: boolean;
  description: string;
  heroTagline: string;
  heroHeading: string;
  heroDescription: string;
  images: {
    hero: string;
    gallery: ProductImage[];
    basePath: string;
  };
  specs: ProductSpec[];
  details: ProductDetail[];
  marqueeItems: string[];
  trustBadges: TrustBadge[];
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
}

export function getFeatures(): Feature[] {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data", "features.json"),
    "utf-8"
  );
  return JSON.parse(content);
}
