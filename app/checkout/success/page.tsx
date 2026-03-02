import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { brand } from "@/lib/brand";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg-light)]">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="font-serif text-3xl font-light text-brand-text-dark mb-4">
          Vielen Dank!
        </h1>
        <p className="text-brand-text-muted mb-8">
          Deine Bestellung wurde erfolgreich aufgegeben. Du erhältst in Kürze
          eine Bestätigungsmail von {brand.companyLegal}.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand-accent)] text-white rounded-full font-semibold text-[0.85rem] no-underline hover:opacity-90 transition-opacity"
        >
          Zurück zum Shop
        </Link>
      </div>
    </div>
  );
}
