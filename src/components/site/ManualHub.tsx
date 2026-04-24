import { FileText, Settings, Shield, Wrench, Server, Workflow } from "lucide-react";

const manuals = [
  { icon: FileText, title: "Getting Started Guide", count: 24, color: "Onboarding" },
  { icon: Settings, title: "Platform Configuration", count: 38, color: "Setup" },
  { icon: Shield, title: "Security & Compliance", count: 17, color: "Policy" },
  { icon: Wrench, title: "Maintenance & Operations", count: 29, color: "Ops" },
  { icon: Server, title: "API & Integrations", count: 52, color: "Developer" },
  { icon: Workflow, title: "Workflow Templates", count: 31, color: "Process" },
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>
    </section>
  );
}
