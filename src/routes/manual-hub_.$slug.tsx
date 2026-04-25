import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Globe,
  Languages,
  Maximize2,
  Pause,
  Play,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { getManualBySlug, manuals } from "@/data/manuals";

export const Route = createFileRoute("/manual-hub_/$slug")({
  loader: ({ params }) => {
    const manual = getManualBySlug(params.slug);
    if (!manual) throw notFound();
    return { manual };
  },
  head: ({ loaderData }) => {
    const manual = loaderData?.manual;
    if (!manual) {
      return { meta: [{ title: "Manual tidak ditemukan — KRISNApedia" }] };
    }
    return {
      meta: [
        { title: `${manual.title} — Manual Hub | KRISNApedia` },
        { name: "description", content: manual.desc },
        { property: "og:title", content: manual.title },
        { property: "og:description", content: manual.desc },
        { property: "og:image", content: manual.cover },
        { name: "twitter:image", content: manual.cover },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          404
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
          Manual tidak ditemukan
        </h1>
        <p className="mt-3 text-muted-foreground">
          Dokumen yang Anda cari mungkin sudah dipindahkan atau dihapus.
        </p>
        <Link
          to="/manual-hub"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[var(--primary-deep)]"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Manual Hub
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
  component: ManualDetailPage,
});

function ManualDetailPage() {
  const { manual } = Route.useLoaderData();
  const related = manuals
    .filter((m) => m.slug !== manual.slug && m.category === manual.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="border-b border-border bg-[var(--primary-soft)]/30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/manual-hub" className="hover:text-foreground">
            Manual Hub
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{manual.category}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate font-medium text-foreground">
            {manual.title}
          </span>
        </div>
      </section>

      {/* Header / Judul + Deskripsi */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            to="/manual-hub"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-[var(--primary-deep)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Manual Hub
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--primary-deep)]">
              {manual.category}
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {manual.type}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <BookOpen className="h-3 w-3" /> {manual.version}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {manual.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {manual.longDesc}
          </p>

          {/* Metadata strip */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:grid-cols-2 md:grid-cols-4">
            <MetaItem
              icon={<User className="h-4 w-4" />}
              label="Penulis"
              value={manual.author}
            />
            <MetaItem
              icon={<Calendar className="h-4 w-4" />}
              label="Diperbarui"
              value={manual.date}
            />
            <MetaItem
              icon={<Clock className="h-4 w-4" />}
              label="Estimasi"
              value={manual.readTime}
            />
            <MetaItem
              icon={<Languages className="h-4 w-4" />}
              label="Bahasa"
              value={manual.language}
            />
          </div>

          {/* Download / actions */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-foreground p-5 text-background sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold">{manual.title}</p>
                <p className="text-background/60">
                  {manual.fileType}
                  {manual.pages ? ` · ${manual.pages} halaman` : ""} ·{" "}
                  {manual.fileSize}
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
                className="bg-primary text-primary-foreground hover:bg-[var(--primary-deep)]"
              >
                <Download className="h-4 w-4" /> Download file
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Viewer */}
      <section className="bg-[var(--primary-soft)]/20 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Pratinjau
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">
                Content viewer
              </h2>
            </div>
            <button className="hidden items-center gap-1.5 text-xs font-semibold text-primary hover:text-[var(--primary-deep)] sm:inline-flex">
              <Maximize2 className="h-3.5 w-3.5" /> Layar penuh
            </button>
          </div>

          <ContentViewer manual={manual} />

          {/* Tags */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Tag className="h-3.5 w-3.5" /> Tag
            </span>
            {manual.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                Manual terkait
              </h2>
              <Link
                to="/manual-hub"
                className="text-sm font-semibold text-primary hover:text-[var(--primary-deep)]"
              >
                Lihat semua →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/manual-hub/$slug"
                  params={{ slug: item.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" /> {item.type}
                      </span>
                      <time>{item.date}</time>
                    </div>
                  </div>
                </Link>
              ))}
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

function ContentViewer({
  manual,
}: {
  manual: ReturnType<typeof getManualBySlug> & {};
}) {
  if (!manual) return null;

  if (manual.viewer === "video") {
    return <VideoViewer src={manual.videoSrc ?? ""} poster={manual.cover} />;
  }

  if (manual.viewer === "web") {
    return (
      <article className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary-deep)]">
          <Globe className="h-3.5 w-3.5" /> Web Article
        </div>
        <div className="prose prose-neutral max-w-none">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Ringkasan
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {manual.longDesc}
          </p>
        </div>
      </article>
    );
  }

  if (manual.viewer === "image") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <img src={manual.cover} alt={manual.title} className="w-full" />
      </div>
    );
  }

  return <DocumentViewer manual={manual} />;
}

function DocumentViewer({
  manual,
}: {
  manual: NonNullable<ReturnType<typeof getManualBySlug>>;
}) {
  const totalPages = manual.pages ?? 12;
  const [page, setPage] = useState(1);
  const isPdf = manual.viewer === "pdf";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-background/10 bg-foreground px-4 py-3 text-background">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">
            {isPdf ? "PDF" : "SLIDES"}
          </span>
          <span className="text-background/70">{manual.title}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-background/20 px-2.5 py-1 hover:bg-background/10 disabled:opacity-40"
            disabled={page === 1}
          >
            ‹
          </button>
          <span className="tabular-nums">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-background/20 px-2.5 py-1 hover:bg-background/10 disabled:opacity-40"
            disabled={page === totalPages}
          >
            ›
          </button>
        </div>
      </div>

      {/* Page */}
      <div className="flex items-center justify-center bg-[oklch(0.22_0.012_50)] p-6 md:p-10">
        <div className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-md bg-card shadow-2xl md:aspect-[4/3]">
          <img
            src={manual.cover}
            alt={`${manual.title} preview`}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/90" />
          <div className="absolute inset-0 flex flex-col p-8 md:p-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {manual.category} · Halaman {page}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              {page === 1 ? manual.title : `Bagian ${page}`}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {manual.longDesc.slice(0, 220)}…
            </p>
            <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{manual.author}</span>
              <span>KRISNApedia · {manual.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoViewer({ src, poster }: { src: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
      <div className="relative aspect-video w-full">
        <img src={poster} alt="Video poster" className="h-full w-full object-cover" />
        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 flex items-center justify-center bg-foreground/40 transition hover:bg-foreground/30"
          aria-label={playing ? "Pause" : "Play"}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-105">
            {playing ? <Pause className="h-8 w-8" /> : <Play className="ml-1 h-8 w-8" />}
          </span>
        </button>
      </div>
      <div className="px-4 py-3 text-xs text-background/70">
        {src ? "Sumber video tersedia." : "Pratinjau video — sumber akan dimuat saat tersedia."}
      </div>
    </div>
  );
}
