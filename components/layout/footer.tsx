import Link from "next/link";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="pt-[clamp(3rem,5vw,5rem)] pb-8 bg-[var(--brand-bg-dark)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-[var(--brand-border-light)]">
          <div>
            <Link
              href="/"
              className="font-sans font-semibold text-[0.85rem] tracking-[0.35em] uppercase text-brand-text-light no-underline"
            >
              {brand.logoParts.main}
              <span className="text-brand-accent">{brand.logoParts.accent}</span>
            </Link>
            <p className="text-[0.85rem] leading-[1.7] text-brand-text-muted mt-4 max-w-[280px]">
              Wir bringen die natürliche Energie der Natur in dein Zuhause.
              Handgefertigt in Deutschland mit Leidenschaft für Qualität.
            </p>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: "BREEZI Luftenergizer", href: "/product/breezy-original" },
              { label: "Zubehör", href: "#" },
              { label: "Ersatzfilter", href: "#" },
              { label: "Geschenkgutschein", href: "#" },
            ]}
          />
          <FooterCol
            title="Unternehmen"
            links={[
              { label: "Über uns", href: "#" },
              { label: "Technologie", href: "#" },
              { label: "Nachhaltigkeit", href: "#" },
              { label: "Presse", href: "#" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: "Kontakt", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Versand & Rückgabe", href: "#" },
              { label: "Datenschutz", href: "#" },
            ]}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-[0.75rem] text-brand-text-muted">
          <span>
            &copy; {new Date().getFullYear()} {brand.companyLegal}. Alle Rechte
            vorbehalten.
          </span>
          <div className="flex gap-4 items-center">
            {["Visa", "Mastercard", "PayPal", "Klarna"].map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 border border-[var(--brand-border-light)] rounded text-[0.7rem] font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-[0.72rem] tracking-[0.25em] uppercase text-brand-text-muted mb-5 font-medium">
        {title}
      </h4>
      <ul className="list-none space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-brand-text-muted no-underline text-[0.85rem] hover:text-brand-text-light transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
