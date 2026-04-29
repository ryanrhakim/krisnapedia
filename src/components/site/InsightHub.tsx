import { ArrowUpRight, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { insightsQueryOptions } from "@/lib/sanity-queries";
import { viewsQueryOptions } from "@/lib/views-queries";
import { imageUrl } from "@/lib/sanity";
import { formatDate } from "@/lib/format";
import { ViewCount } from "@/components/site/ViewCount";
import insightFallback from "@/assets/insight-strategy.jpg";

export function InsightHub() {
  const { data: all = [] } = useQuery(insightsQueryOptions());
  const { data: viewsMap = {} } = useQuery(viewsQueryOptions("insight"));
  const insights = [...all]
    .sort((a, b) => {
      const va = viewsMap[a.slug] ?? 0;
      const vb = viewsMap[b.slug] ?? 0;
      if (vb !== va) return vb - va;
      return +new Date(b.date) - +new Date(a.date);
    })
    .slice(0, 3);

  return (
    <section id="insights" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Insight Hub
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Berbagi wawasan dan pembelajaran
              <br />
              pemanfaatan KRISNA.
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Kumpulan materi bimbingan teknis, sosialisasi, kajian, evaluasi,
              dan berbagai informasi pendukung untuk memperluas pemahaman pengguna
              terhadap Sistem Informasi KRISNA.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((item) => {
            const cover = imageUrl(item.coverImage, 800) || insightFallback;
            return (
              <Link
                key={item._id}
                to="/insight-hub/$slug"
                params={{ slug: item.slug }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img src={cover} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                    <div className="inline-flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {item.fileType ?? item.viewer.toUpperCase()}
                      </span>
                      <ViewCount count={viewsMap[item.slug]} />
                    </div>
                    <time>{formatDate(item.date)}</time>
                  </div>
                </div>
              </Link>
            );
          })}

          <Link
            to="/insight-hub"
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-[var(--primary-soft)]/40 p-6 text-center transition-all hover:-translate-y-1 hover:border-primary hover:bg-[var(--primary-soft)] hover:shadow-[var(--shadow-soft)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">Jelajahi Seluruh Insight</h3>
            <p className="mt-2 text-sm text-muted-foreground">Telusuri seluruh materi pembelajaran dan informasi pendukung KRISNA.</p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">Lihat Semua →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
