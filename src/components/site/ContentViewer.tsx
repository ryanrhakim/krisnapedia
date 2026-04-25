import { useState } from "react";
import { FileText, Globe, Pause, Play, Youtube } from "lucide-react";
import type { ContentBase } from "@/lib/sanity-types";
import { fileUrl, imageUrl, youtubeEmbedUrl } from "@/lib/sanity";
import { PortableText } from "@/components/site/PortableText";
import { blocksToPlainText } from "@/lib/sanity";
import { formatDate } from "@/lib/format";

/**
 * Content viewer that auto-switches between PDF iframe, slides preview,
 * image, video (mp4 or YouTube embed), and rich-text web article.
 */
export function ContentViewer({
  item,
  fallbackCover,
}: {
  item: ContentBase;
  fallbackCover: string;
}) {
  const cover = imageUrl(item.coverImage, 1200) || fallbackCover;

  // Video — prefer YouTube embed when set, otherwise mp4 placeholder
  if (item.viewer === "video") {
    const embed = youtubeEmbedUrl(item.youtubeUrl);
    if (embed) {
      return (
        <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 border-b border-background/10 bg-foreground px-4 py-3 text-xs text-background/80">
            <Youtube className="h-4 w-4 text-primary" />
            YouTube
          </div>
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={embed}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      );
    }
    return <VideoPlaceholder poster={cover} />;
  }

  // Web article — rich text rendered
  if (item.viewer === "web") {
    return (
      <article className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary-deep)]">
          <Globe className="h-3.5 w-3.5" /> Web Article
        </div>
        <div className="prose prose-neutral max-w-none">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Ringkasan
          </h3>
          {item.longDescription?.length ? (
            <PortableText value={item.longDescription} />
          ) : (
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      </article>
    );
  }

  // Image — full image preview
  if (item.viewer === "image") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <img src={cover} alt={item.title} className="w-full" />
      </div>
    );
  }

  // PDF — embed actual file when available, otherwise fall back to cover preview
  const pdfUrl = fileUrl(item.file);
  if (item.viewer === "pdf" && pdfUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-2 border-b border-background/10 bg-foreground px-4 py-3 text-xs text-background/80">
          <span className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">
            PDF
          </span>
          <span className="truncate">{item.title}</span>
        </div>
        <iframe
          src={`${pdfUrl}#view=FitH`}
          title={item.title}
          className="h-[720px] w-full bg-card"
        />
      </div>
    );
  }

  // Slides / fallback — use cover-based preview frame
  return <DocumentPreview item={item} cover={cover} />;
}

function DocumentPreview({
  item,
  cover,
}: {
  item: ContentBase;
  cover: string;
}) {
  const totalPages = item.pages ?? 12;
  const [page, setPage] = useState(1);
  const isPdf = item.viewer === "pdf";
  const summary = blocksToPlainText(item.longDescription) || item.description;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-background/10 bg-foreground px-4 py-3 text-background">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">
            {isPdf ? "PDF" : "SLIDES"}
          </span>
          <span className="text-background/70">{item.title}</span>
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

      <div className="flex items-center justify-center bg-[oklch(0.22_0.012_50)] p-6 md:p-10">
        <div className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-md bg-card shadow-2xl md:aspect-[4/3]">
          <img
            src={cover}
            alt={`${item.title} preview`}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/90" />
          <div className="absolute inset-0 flex flex-col p-8 md:p-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {item.category} · Halaman {page}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              {page === 1 ? item.title : `Bagian ${page}`}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {summary.slice(0, 220)}…
            </p>
            <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{item.author ?? "—"}</span>
              <span>KRISNApedia · {formatDate(item.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoPlaceholder({ poster }: { poster: string }) {
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
      <div className="flex items-center gap-2 px-4 py-3 text-xs text-background/70">
        <FileText className="h-3.5 w-3.5" /> Pratinjau video — sumber YouTube belum diatur.
      </div>
    </div>
  );
}
