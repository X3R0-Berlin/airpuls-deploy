import { Container } from "@/components/layout/container";
import { EntsorgungContent } from "./entsorgung-content";

export const metadata = {
    title: "Entsorgungshinweise | AIRIMPULS",
    description: "Informationen zur Entsorgung von Elektroaltgeräten und Batterien nach dem ElektroG und BatterieG.",
};

export default function EntsorgungPage() {
    return (
        <div className="pt-32 pb-24 bg-[var(--brand-bg-cream)] min-h-screen">
            <Container>
                <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-serif prose-headings:font-light prose-h1:text-4xl prose-h2:text-2xl prose-a:text-[var(--brand-accent)] hover:prose-a:text-[var(--brand-text-dark)] prose-p:text-brand-text-muted">
                    <EntsorgungContent />
                </div>
            </Container>
        </div>
    );
}
