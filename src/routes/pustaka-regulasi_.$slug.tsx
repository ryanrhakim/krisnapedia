import { useEffect, useRef } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { incrementView } from "@/lib/views.functions";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Gavel,
  Languages,
  Loader2,
  MapPin,
  Maximize2,
  Share2,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ContentViewer } from "@/components/site/ContentViewer";
import {
  regulationBySlugQueryOptions,
  regulationsQueryOptions,
} from "@/lib/sanity-queries";
import { fileUrl, imageUrl } from "@/lib/sanity";
import { formatDate, formatDateLong } from "@/lib/format";
import { StatusBadge } from "@/components/site/StatusBadge";
import regulasiFallback from "@/assets/regulasi-uu.jpg";

export const Route = createFileRoute("/pustaka-regulasi_/$slug")({
  loader: async ({ params, context: { queryClient } }) => {
    const regulasi = await queryClient.ensureQueryData(
      regulationBySlugQueryOptions(params.slug),
    );
    if (!regulasi) throw notFound();
    queryClient.ensureQueryData(regulationsQueryOptions());
    return { slug: params.slug, regulasi };
  },
  head: ({ params, loaderData }) => {
    const url = `https://krisnapedia.lovable.app/pustaka-regulasi/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [
          { title: "Regulasi tidak ditemukan — KRISNApedia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { regulasi } = loaderData;
    const cover = regulasi.coverImage ? imageUrl(regulasi.coverImage, 1200) : undefined;
    const title = `${regulasi.title} — Pustaka Regulasi KRISNApedia`.slice(0, 65);
    const description = regulasi.description.slice(0, 160);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: regulasi.title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(cover ? [{ property: "og:image", content: cover } as const] : []),
        ...(cover ? [{ name: "twitter:image", content: cover } as const] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: regulasi.title,
            description,
            datePublished: regulasi.date,
            author: regulasi.author
              ? { "@type": "Person", name: regulasi.author }
              : { "@type": "Organization", name: "KRISNApedia" },
            image: cover ? [cover] : undefined,
            mainEntityOfPage: url,
            publisher: { "@type": "Organization", name: "KRISNApedia" },
          }),
        },
      ],
    };
  },
  pendingComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </main>
  ),
  notFoundComponent: () => (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          404
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
          Regulasi tidak ditemukan
        </h1>
        <p className="mt-3 text-muted-foreground">
          Dokumen regulasi yang Anda cari mungkin sudah dipindahkan atau dihapus.
        </p>
        <Link
          to="/pustaka-regulasi"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[var(--primary-deep)]"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Pustaka Regulasi
        </Link>
      </section>
      <Footer />
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Terjadi kesalahan
        </h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </section>
      <Footer />
    </main>
  ),
  component: RegulasiDetailPage,
});

function RegulasiDetailPage() {
  const { slug } = Route.useLoaderData();
  const { data: regulasi } = useSuspenseQuery(regulationBySlugQueryOptions(slug));
  const { data: all } = useSuspenseQuery(regulationsQueryOptions());

  const incrementedRef = useRef(false);
  useEffect(() => {
    if (incrementedRef.current || !regulasi) return;
    incrementedRef.current = true;
    incrementView({
      data: { type: "regulation", slug: regulasi.slug, contentId: regulasi._id },
    }).catch(() => {});
  }, [regulasi]);

  if (!regulasi) return null;

  const related = all
    .filter((r) => r.slug !== regulasi.slug && r.category === regulasi.category)
    .slice(0, 3);

  const downloadUrl = fileUrl(regulasi.file);
  const typeLabel = regulasi.fileType
    ? `${regulasi.category} · ${regulasi.fileType}`
    : regulasi.category;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border bg-[var(--primary-soft)]/30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/pustaka-regulasi" className="hover:text-foreground">
            Pustaka Regulasi
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{regulasi.category}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate font-medium text-foreground">{regulasi.title}</span>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            to="/pustaka-regulasi"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-[var(--primary-deep)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Pustaka Regulasi
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--primary-deep)]">
              {regulasi.category}
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {typeLabel}
            </span>
            {regulasi.regulasiStatus && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <ShieldCheck className="h-3 w-3" /> {regulasi.regulasiStatus}
              </span>
            )}
            <StatusBadge status={regulasi.status} />
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {regulasi.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {regulasi.description}
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:grid-cols-2 md:grid-cols-4">
            <MetaItem icon={<User className="h-4 w-4" />} label="Diterbitkan oleh" value={regulasi.author ?? "—"} />
            <MetaItem icon={<Calendar className="h-4 w-4" />} label="Berlaku sejak" value={formatDateLong(regulasi.effectiveDate) || "—"} />
            <MetaItem icon={<MapPin className="h-4 w-4" />} label="Yurisdiksi" value={regulasi.jurisdiction ?? "—"} />
            <MetaItem icon={<Languages className="h-4 w-4" />} label="Bahasa" value={regulasi.language ?? "—"} />
            <MetaItem icon={<Clock className="h-4 w-4" />} label="Estimasi baca" value={regulasi.readTime ?? "—"} />
            <MetaItem icon={<Gavel className="h-4 w-4" />} label="Status" value={regulasi.regulasiStatus ?? "—"} />
            <MetaItem icon={<FileText className="h-4 w-4" />} label="Format" value={regulasi.fileType ?? "—"} />
            <MetaItem icon={<Calendar className="h-4 w-4" />} label="Tanggal dokumen" value={formatDate(regulasi.date)} />
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-foreground p-5 text-background sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold">{regulasi.title}</p>
                <p className="text-background/60">
                  {regulasi.fileType ?? regulasi.viewer.toUpperCase()}
                  {regulasi.pages ? ` · ${regulasi.pages} halaman` : ""} ·{" "}
                  {regulasi.fileSize ?? "—"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Share2 className="h-4 w-4" /> Bagikan
              </Button>
              <Button
                size="sm"
                asChild
                disabled={!downloadUrl}
                className="bg-primary text-primary-foreground hover:bg-[var(--primary-deep)] disabled:opacity-50"
              >
                {downloadUrl ? (
                  <a href={downloadUrl} download target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" /> Download file
                  </a>
                ) : (
                  <span>
                    <Download className="h-4 w-4" /> File belum tersedia
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary-soft)]/20 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Pratinjau dokumen
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">
                Content viewer
              </h2>
            </div>
            <button className="hidden items-center gap-1.5 text-xs font-semibold text-primary hover:text-[var(--primary-deep)] sm:inline-flex">
              <Maximize2 className="h-3.5 w-3.5" /> Layar penuh
            </button>
          </div>

          <ContentViewer item={regulasi} fallbackCover={regulasiFallback} />

          {regulasi.tags && regulasi.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Tag className="h-3.5 w-3.5" /> Tag
              </span>
              {regulasi.tags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                Regulasi terkait
              </h2>
              <Link
                to="/pustaka-regulasi"
                className="text-sm font-semibold text-primary hover:text-[var(--primary-deep)]"
              >
                Lihat semua →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => {
                const cover = imageUrl(item.coverImage, 800) || regulasiFallback;
                return (
                  <Link
                    key={item._id}
                    to="/pustaka-regulasi/$slug"
                    params={{ slug: item.slug }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={cover}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                        {item.category}
                      </span>
                      <StatusBadge status={item.status} hideActive className="absolute right-3 top-3 bg-background/90" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />{" "}
                          {item.fileType ?? item.viewer.toUpperCase()}
                        </span>
                        <time>{formatDate(item.date)}</time>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-primary">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
