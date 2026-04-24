import { FileText, Settings, Shield, ArrowUpRight } from "lucide-react";

const manuals = [
  { icon: FileText, title: "Getting Started Guide", count: 24, color: "Onboarding" },
  { icon: Settings, title: "Platform Configuration", count: 38, color: "Setup" },
  { icon: Shield, title: "Security & Compliance", count: 17, color: "Policy" },
];

export function ManualHub() {
  return (
    <section
      id="manuals"
      className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--primary-foreground) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Manual Hub
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Documentation, organized.
            </h2>
            <p className="mt-3 max-w-lg text-secondary-foreground/70">
              Standard operating procedures, technical guides, and reference
              manuals — all in one place.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-primary hover:text-[var(--primary-soft)]"
          >
            Open library →
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {manuals.map((m, i) => {
            const Icon = m.icon;
            return (
              <a
                href="#"
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-primary/60 hover:bg-white/[0.08]"
              >
                {/* corner glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all group-hover:bg-primary/30" />

                <div className="relative flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {m.color}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary-foreground/60">
                      {m.count} documents
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-secondary-foreground/50">
                    Updated weekly
                  </span>
                  <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            );
          })}

          {/* View all card-button */}
          <a
            href="#"
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/50 bg-primary/[0.06] p-6 text-center transition-all hover:border-primary hover:bg-primary/[0.12]"
          >
            <div className="pointer-events-none absolute inset-0 bg-primary/0 blur-2xl transition-all group-hover:bg-primary/20" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-6 w-6" />
            </span>
            <h3 className="relative mt-5 font-display text-lg font-semibold">
              View all manuals
            </h3>
            <p className="relative mt-2 text-sm text-secondary-foreground/60">
              Open the complete documentation library.
            </p>
            <span className="relative mt-5 inline-flex items-center text-sm font-semibold text-primary">
              Explore library →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
