import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="pt-[clamp(3rem,5vw,5rem)] pb-8 bg-[var(--brand-bg-dark)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/15">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Image
                src={brand.logoInverse}
                alt={brand.name}
                width={640}
                height={650}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-[0.85rem] leading-[1.7] text-[#8a9098] mt-4 max-w-[280px]">
              Wir bringen die natürliche Energie der Natur in dein Zuhause.
              Handgefertigt in Deutschland mit Leidenschaft für Qualität.
            </p>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: "Alle Produkte", href: "/produkte" },
              { label: "AIRIMPULS Luftenergizer", href: "/product/vitair" },
              { label: "Preventair", href: "/product/preventair" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: "Kontakt", href: "/kontakt" },
              { label: "FAQ", href: "/faq" },
              { label: "Versand & Rückgabe", href: "/versand" },
            ]}
          />
          <FooterCol
            title="Rechtliches"
            links={[
              { label: "Impressum", href: "/impressum" },
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "AGB", href: "/agb" },
              { label: "Widerruf", href: "/widerruf" },
            ]}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-[0.75rem] text-[#8a9098]">
          <span>
            &copy; {new Date().getFullYear()} {brand.companyLegal}. Alle Rechte
            vorbehalten.
          </span>
          <div className="flex gap-3 items-center">
            {[
              { name: "Visa", src: "/images/payment/visa.svg" },
              { name: "Mastercard", src: "/images/payment/mastercard.svg" },
              { name: "PayPal", src: "/images/payment/paypal.svg" },
              { name: "Klarna", src: "/images/payment/klarna.svg" },
            ].map((p) => (
              <Image
                key={p.name}
                src={p.src}
                alt={p.name}
                width={48}
                height={32}
                className="rounded"
              />
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
      <h4 className="text-[0.72rem] tracking-[0.25em] uppercase text-[#8a9098] mb-5 font-medium">
        {title}
      </h4>
      <ul className="list-none space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[#8a9098] no-underline text-[0.85rem] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
