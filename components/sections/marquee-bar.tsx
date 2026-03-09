import { VelocityScroll } from "@/components/ui/velocity-scroll";

export function MarqueeBar({ items }: { items: string[] }) {
  const combinedText = items.join("    ◆    ");

  return (
    <section className="border-y border-[var(--brand-border-light)] py-5 overflow-hidden">
      <VelocityScroll
        text={combinedText}
        defaultVelocity={2}
        className="text-[0.78rem] tracking-[0.2em] uppercase text-brand-text-muted"
      />
    </section>
  );
}
