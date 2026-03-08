import { getAllProducts, getComparison } from "@/lib/products";
import { Newsletter } from "@/components/sections/newsletter";
import { VergleichBreadcrumb } from "./vergleich-breadcrumb";
import { VergleichContent } from "./vergleich-content";

export const metadata = {
  title: "Produktvergleich",
  description:
    "Vergleichen Sie Vitair, Solitair und Preventair — finden Sie das richtige Gerät für Ihre Bedürfnisse.",
};

export default function VergleichPage() {
  const products = getAllProducts();
  const comparison = getComparison();

  return (
    <>
      <VergleichBreadcrumb />
      <VergleichContent products={products} comparison={comparison} />
      <Newsletter />
    </>
  );
}
