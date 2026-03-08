"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || t("newsletter.success"));
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setMessage(data.error || t("newsletter.error"));
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setMessage(t("newsletter.connectionError"));
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-[clamp(4rem,8vw,6rem)] bg-[var(--brand-bg-light)] border-t border-[var(--brand-border-light)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
        <BlurFade delay={0} inView>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-light text-brand-text-dark mb-2">
                {t("newsletter.heading")}
              </h3>
              <p className="text-brand-text-muted text-[0.9rem]">
                {t("newsletter.description")}
              </p>
            </div>

            <div className="w-full md:w-auto">
              {status === "success" ? (
                <div className="flex items-center gap-2.5 text-brand-accent text-[0.88rem] py-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{message}</span>
                </div>
              ) : status === "error" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-[var(--brand-waldrot)] text-[0.85rem]">
                    <AlertCircle className="w-4 h-4" />
                    <span>{message}</span>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
                >
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder={t("newsletter.placeholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "loading"}
                      className="w-full sm:w-[280px] bg-transparent border-[var(--brand-border-light)] text-brand-text-dark placeholder:text-brand-text-muted rounded-full px-6 py-3 text-[0.85rem] h-auto disabled:opacity-50"
                    />
                    <BorderBeam
                      size={60}
                      duration={4}
                      colorFrom="var(--brand-accent)"
                      colorTo="var(--brand-accent-glow)"
                      className="rounded-full"
                    />
                  </div>
                  <ShimmerButton
                    shimmerColor="rgba(0,0,0,0.06)"
                    background="var(--brand-accent)"
                    className="rounded-full px-8 py-3"
                    disabled={status === "loading"}
                  >
                    <span className="text-white text-[0.85rem] font-semibold flex items-center gap-2">
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("newsletter.sending")}
                        </>
                      ) : (
                        t("newsletter.submit")
                      )}
                    </span>
                  </ShimmerButton>
                </form>
              )}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
