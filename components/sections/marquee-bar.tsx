import { Marquee } from "@/components/ui/marquee";

export function MarqueeBar({ items }: { items: string[] }) {
  return (
    <section className="border-y border-[var(--brand-border-light)] py-5 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap text-[0.78rem] tracking-[0.2em] uppercase text-brand-text-muted"
          >
            <span className="text-[0.5rem] text-brand-accent">&#9670;</span>
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
