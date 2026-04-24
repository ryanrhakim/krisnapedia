import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-foreground/60 px-4 py-1.5 text-xs font-medium text-[var(--primary-deep)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Integrated Knowledge Management
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            One repository for
            <br />
            <span className="text-primary">every answer.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            KRISNApedia centralizes documents, manuals, and insights — so your
            team finds what they need in seconds, not hours.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles, manuals, SOPs..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-[var(--primary-deep)]">
              Search
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>Trending:</span>
            {["Onboarding", "API Reference", "Security Policy", "Q3 Insights"].map(
              (t) => (
                <a
                  key={t}
                  href="#"
                  className="rounded-full border border-border bg-card px-3 py-1 transition-colors hover:border-primary hover:text-foreground"
                >
                  {t}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
