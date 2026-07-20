import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Globe,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Presentation,
  Youtube,
} from "lucide-react";
import type { ContentBase } from "@/lib/sanity-types";
import { fileExtension, fileUrl, imageUrl, youtubeEmbedUrl } from "@/lib/sanity";
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
  return (
    <FullscreenShell>
      <ContentViewerInner item={item} fallbackCover={fallbackCover} cover={cover} />
    </FullscreenShell>
  );
}

function FullscreenShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(
      typeof document !== "undefined" &&
        (document.fullscreenEnabled ||
          // @ts-expect-error webkit
          document.webkitFullscreenEnabled),
    );
    const onChange = () => {
      const el =
        document.fullscreenElement ||
        // @ts-expect-error webkit
        document.webkitFullscreenElement;
      setIsFs(el === ref.current);
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const toggle = async () => {
    const el = ref.current;
    if (!el) return;
    const inFs =
      document.fullscreenElement ||
      // @ts-expect-error webkit
      document.webkitFullscreenElement;
    try {
      if (!inFs) {
        if (el.requestFullscreen) await el.requestFullscreen();
        // @ts-expect-error webkit
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        // @ts-expect-error webkit
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
      }
    } catch {
      /* noop */
    }
  };

  return (
    <div
      ref={ref}
      data-fullscreen={isFs}
      className="relative group data-[fullscreen=true]:flex data-[fullscreen=true]:h-screen data-[fullscreen=true]:w-screen data-[fullscreen=true]:items-center data-[fullscreen=true]:justify-center data-[fullscreen=true]:bg-background data-[fullscreen=true]:p-4 md:data-[fullscreen=true]:p-8"
    >
      <div className="w-full data-[fullscreen=true]:max-w-6xl">{children}</div>
      {supported && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isFs ? "Keluar layar penuh" : "Layar penuh"}
          title={isFs ? "Keluar layar penuh" : "Layar penuh"}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md bg-background/90 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur hover:bg-background"
        >
          {isFs ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isFs ? "Keluar" : "Layar penuh"}</span>
        </button>
      )}
    </div>
  );
}

function ContentViewerInner({
  item,
  fallbackCover,
  cover,
}: {
  item: ContentBase;
  fallbackCover: string;
  cover: string;
}) {
  void fallbackCover;


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

  // PDF — embed actual file when available
  const fileUrlStr = fileUrl(item.file);
  const ext = fileExtension(item.file);

  if (item.viewer === "pdf" && fileUrlStr) {
    return <PdfFrame url={fileUrlStr} title={item.title} label="PDF" />;
  }

  // Slides — Office Online for PPTX/PPT, PDF iframe for PDF, mockup as fallback
  if (item.viewer === "slides" && fileUrlStr) {
    if (ext === "pdf") {
      return <PdfFrame url={fileUrlStr} title={item.title} label="SLIDES" />;
    }
    if (ext === "pptx" || ext === "ppt") {
      const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        fileUrlStr,
      )}`;
      return (
        <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 border-b border-background/10 bg-foreground px-4 py-3 text-xs text-background/80">
            <Presentation className="h-4 w-4 text-primary" />
            <span className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">
              SLIDES
            </span>
            <span className="truncate">{item.title}</span>
          </div>
          <iframe
            src={officeUrl}
            title={item.title}
            allowFullScreen
            className="h-[720px] w-full bg-card"
          />
        </div>
      );
    }
  }

  // No file uploaded yet → cover-based mockup so the page never looks empty
  return <DocumentPreview item={item} cover={cover} />;
}

function PdfFrame({
  url,
  title,
  label,
}: {
  url: string;
  title: string;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2 border-b border-background/10 bg-foreground px-4 py-3 text-xs text-background/80">
        <span className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">
          {label}
        </span>
        <span className="truncate">{title}</span>
      </div>
      <iframe
        src={`${url}#view=FitH`}
        title={title}
        className="h-[720px] w-full bg-card"
      />
    </div>
  );
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
