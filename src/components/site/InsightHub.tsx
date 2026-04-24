import { TrendingUp, Lightbulb, BarChart3, ArrowUpRight } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    tag: "Market",
    title: "Q1 2026 industry outlook",
    desc: "Key trends shaping enterprise knowledge platforms this quarter.",
    time: "8 min read",
  },
  {
    icon: Lightbulb,
    tag: "Strategy",
    title: "Building a single source of truth",
    desc: "How leading teams consolidate scattered documentation.",
    time: "12 min read",
  },
  {
    icon: BarChart3,
    tag: "Analytics",
    title: "Measuring documentation ROI",
    desc: "Frameworks and metrics that prove knowledge value.",
    time: "6 min read",
  },
];

export function InsightHub() {
  return (
    <section id="insights" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Insight Hub
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Ideas worth sharing.
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Curated thinking, research, and analysis from across the
              KRISNApedia network.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-primary hover:text-[var(--primary-deep)]"
          >
            Browse all insights →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>{item.time}</span>
                  <span className="font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read article →
                  </span>
                </div>
              </article>
            );
          })}

          {/* Explore all card-button */}
          <a
            href="#"
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-[var(--primary-soft)]/40 p-6 text-center transition-all hover:-translate-y-1 hover:border-primary hover:bg-[var(--primary-soft)] hover:shadow-[var(--shadow-soft)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              Explore all insights
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse the full library of articles, research, and analysis.
            </p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
              View all →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
