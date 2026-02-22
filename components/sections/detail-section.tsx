import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Check } from "lucide-react";
import type { ProductDetail } from "@/lib/products";

export function DetailSection({
  detail,
  basePath,
}: {
  detail: ProductDetail;
  basePath: string;
}) {
  return (
    <section
      id="details"
      className="py-[clamp(4rem,8vw,8rem)] bg-[var(--brand-bg-dark)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,5vw,5rem)] items-center ${
            detail.reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          <BlurFade delay={0} inView className={detail.reverse ? "lg:[direction:ltr]" : ""}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111]">
              <Image
                src={`${basePath}/${detail.image}`}
                alt={detail.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView className={detail.reverse ? "lg:[direction:ltr]" : ""}>
            <div>
              <span className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-brand-accent mb-4 font-medium">
                {detail.tag}
              </span>
              <h2 className="font-serif font-light text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.2] mb-6 text-brand-text-light">
                {detail.heading}
              </h2>
              <p className="text-[0.95rem] leading-[1.8] text-brand-text-muted mb-8">
                {detail.text}
              </p>
              <ul className="space-y-3">
                {detail.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-brand-text-muted text-[0.9rem] leading-[1.6]"
                  >
                    <Check className="w-4 h-4 text-brand-accent mt-1 flex-shrink-0" strokeWidth={2} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
