import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import onboardingCover from "@/assets/manual-onboarding.jpg";
import setupCover from "@/assets/manual-setup.jpg";
import securityCover from "@/assets/manual-security.jpg";

const manuals = [
  {
    cover: onboardingCover,
    category: "Onboarding",
    title: "Getting Started Guide",
    desc: "Step-by-step walkthrough for new team members joining the platform.",
    type: "Manual · PDF",
    date: "Apr 20, 2026",
  },
  {
    cover: setupCover,
    category: "Setup",
    title: "Platform Configuration",
    desc: "Admin reference for environments, integrations, and access policies.",
    type: "SOP · DOCX",
    date: "Apr 14, 2026",
  },
  {
    cover: securityCover,
    category: "Policy",
    title: "Security & Compliance",
    desc: "Guidelines covering data handling, audits, and incident response.",
    type: "Policy · PDF",
    date: "Apr 09, 2026",
  },
];

export function ManualHub() {
  return (
    <section
      id="manuals"
      className="relative overflow-hidden border-t border-border py-24 text-foreground"
      style={{
        backgroundColor: "oklch(0.97 0.025 75)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--primary-deep) 1px, transparent 0)",
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
            <p className="mt-3 max-w-lg text-foreground/70">
              Standard operating procedures, technical guides, and reference
              manuals — all in one place.
            </p>
          </div>
          <Link
            to="/manual-hub"
            className="text-sm font-semibold text-primary hover:text-[var(--primary-deep)]"
          >
            Open library →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {manuals.map((m, i) => (
            <article
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-soft)]"
            >
              {/* Cover */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={m.cover}
                  alt={m.title}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                  {m.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {m.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {m.desc}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {m.type}
                  </span>
                  <time>{m.date}</time>
                </div>
              </div>
            </article>
          ))}

          {/* View all card-button */}
          <Link
            to="/manual-hub"
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/50 bg-primary/[0.06] p-6 text-center transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/[0.12] hover:shadow-[var(--shadow-soft)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-primary/0 blur-2xl transition-all group-hover:bg-primary/20" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-6 w-6" />
            </span>
            <h3 className="relative mt-5 font-display text-lg font-semibold">
              View All Manual
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              Open the complete documentation library.
            </p>
            <span className="relative mt-5 inline-flex items-center text-sm font-semibold text-primary">
              Explore library →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
