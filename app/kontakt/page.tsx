"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { brand } from "@/lib/brand";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export default function KontaktPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFeedback(data.message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(data.error);
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setFeedback("Verbindungsfehler. Bitte versuche es erneut.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "E-Mail",
      value: brand.social.email,
      href: `mailto:${brand.social.email}`,
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Deutschland",
      href: null,
    },
    {
      icon: Clock,
      label: "Antwortzeit",
      value: "Innerhalb von 24 Stunden",
      href: null,
    },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[var(--brand-bg-light)]">
      <div className="max-w-[1100px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        {/* Breadcrumb */}
        <BlurFade delay={0} inView>
          <nav className="flex items-center gap-1.5 text-[0.75rem] text-brand-text-muted mb-10">
            <Link
              href="/"
              className="hover:text-brand-text-dark transition-colors no-underline text-brand-text-muted"
            >
              Startseite
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-text-dark">Kontakt</span>
          </nav>
        </BlurFade>

        {/* Heading */}
        <BlurFade delay={0.1} inView>
          <h1 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-brand-text-dark mb-4">
            Kontakt aufnehmen
          </h1>
          <p className="text-[1rem] text-brand-text-muted mb-12 max-w-[540px]">
            Hast du Fragen zu unseren Produkten oder deiner Bestellung? Wir sind
            gerne für dich da.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16">
          {/* Form */}
          <BlurFade delay={0.2} inView>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="w-12 h-12 text-brand-accent mb-4" />
                <h3 className="font-serif text-xl text-brand-text-dark mb-2">
                  Nachricht gesendet
                </h3>
                <p className="text-brand-text-muted text-[0.9rem] max-w-[360px]">
                  {feedback}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.78rem] text-brand-text-muted mb-2 tracking-[0.04em]">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dein Name"
                      disabled={status === "loading"}
                      className="w-full bg-transparent border-black/15 text-brand-text-dark placeholder:text-brand-text-muted rounded-xl px-4 py-3 text-[0.88rem] h-auto focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.78rem] text-brand-text-muted mb-2 tracking-[0.04em]">
                      E-Mail
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="deine@email.de"
                      disabled={status === "loading"}
                      className="w-full bg-transparent border-black/15 text-brand-text-dark placeholder:text-brand-text-muted rounded-xl px-4 py-3 text-[0.88rem] h-auto focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.78rem] text-brand-text-muted mb-2 tracking-[0.04em]">
                    Betreff
                  </label>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Worum geht es?"
                    disabled={status === "loading"}
                    className="w-full bg-transparent border-black/15 text-brand-text-dark placeholder:text-brand-text-muted rounded-xl px-4 py-3 text-[0.88rem] h-auto focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-[0.78rem] text-brand-text-muted mb-2 tracking-[0.04em]">
                    Nachricht
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Deine Nachricht..."
                    disabled={status === "loading"}
                    rows={6}
                    className="w-full bg-transparent border border-black/15 text-brand-text-dark placeholder:text-brand-text-muted rounded-xl px-4 py-3 text-[0.88rem] resize-none focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-[var(--brand-waldrot)] text-[0.85rem]">
                    <AlertCircle className="w-4 h-4" />
                    <span>{feedback}</span>
                  </div>
                )}

                <ShimmerButton
                  shimmerColor="rgba(0,0,0,0.06)"
                  background="var(--brand-accent)"
                  className="rounded-full px-8 py-3.5"
                  disabled={status === "loading"}
                >
                  <span className="text-white text-[0.85rem] font-semibold flex items-center gap-2">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Senden...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Nachricht senden
                      </>
                    )}
                  </span>
                </ShimmerButton>
              </form>
            )}
          </BlurFade>

          {/* Contact Info */}
          <BlurFade delay={0.3} inView>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 p-5 rounded-xl border border-black/15 bg-white"
                >
                  <item.icon className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[0.78rem] text-brand-text-muted tracking-[0.04em] mb-1">
                      {item.label}
                    </h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[0.9rem] text-brand-text-dark no-underline hover:text-brand-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[0.9rem] text-brand-text-dark">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-8 p-5 rounded-xl border border-black/15 bg-white">
                <h4 className="text-[0.9rem] font-semibold text-brand-text-dark mb-2">
                  Häufige Fragen?
                </h4>
                <p className="text-[0.85rem] text-brand-text-muted leading-[1.6] mb-3">
                  Schau zuerst in unsere FAQ — vielleicht findest du dort
                  bereits die Antwort.
                </p>
                <Link
                  href="/faq"
                  className="text-brand-accent text-[0.85rem] underline underline-offset-2 hover:text-brand-accent-glow transition-colors"
                >
                  Zu den FAQ
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
