import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProdukteContent } from "./produkte-content";

export const metadata: Metadata = {
  title: "Produkte | AIRIMPULS",
  description: "Entdecke alle AIRIMPULS Produkte — natürliche Energie für dein Zuhause.",
};

export default function ProduktePage() {
  const products = getAllProducts();
  return <ProdukteContent products={products} />;
}
