import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PaginationBar } from "@/components/site/PaginationBar";

const PER_PAGE = 9;
const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
});
import {
  Search,
  FileText,
  ChevronDown,
  SlidersHorizontal,
  ScrollText,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regulationsQueryOptions } from "@/lib/sanity-queries";
import { imageUrl } from "@/lib/sanity";
import { formatDate } from "@/lib/format";
import regulasiFallback from "@/assets/regulasi-uu.jpg";

export const Route = createFileRoute("/pustaka-regulasi")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(regulationsQueryOptions());
  },
  pendingComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </main>
  ),
  component: PustakaRegulasiPage,
  head: () => ({
    meta: [
      { title: "Pustaka Regulasi — KRISNApedia" },
      {
        name: "description",
        content:
          "Koleksi regulasi dan dasar kebijakan resmi. Telusuri Undang-Undang, Peraturan Presiden, Peraturan Menteri, dan SOP internal.",
      },
      { property: "og:title", content: "Pustaka Regulasi — KRISNApedia" },
      {
        property: "og:description",
        content:
          "Koleksi regulasi dan dasar kebijakan dalam satu pustaka. Cari berdasarkan judul, tipe file, dan kategori.",
      },
    ],
  }),
});

function PustakaRegulasiPage() {
  const { data: regulations } = useSuspenseQuery(regulationsQueryOptions());
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("All");
  const [category, setCategory] = useState("All");

  const goToPage = (next: number) => {
    navigate({ search: { page: next } });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(regulations.map((r) => r.category).filter(Boolean)))],
    [regulations],
  );
  const fileTypes = useMemo(
    () => [
      "All",
      ...Array.from(new Set(regulations.map((r) => r.fileType).filter(Boolean) as string[])),
    ],
    [regulations],
  );

  const filtered = useMemo(() => {
    return regulations.filter((it) => {
      const matchQ = query
        ? it.title.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchT = fileType === "All" ? true : it.fileType === fileType;
      const matchC = category === "All" ? true : it.category === category;
      return matchQ && matchT && matchC;
    });
  }, [regulations, query, fileType, category]);

  const reset = () => {
    setQuery("");
    setFileType("All");
    setCategory("All");
    if (page !== 1) navigate({ search: { page: 1 } });
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
  const rangeEnd = (safePage - 1) * PER_PAGE + paginated.length;

  // Reset to page 1 when filters change
  useEffect(() => {
    if (page !== 1) navigate({ search: { page: 1 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, fileType, category]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <ScrollText className="h-3.5 w-3.5" />
            Pustaka Regulasi
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Koleksi regulasi dan dasar kebijakan, dalam satu pustaka.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Akses Undang-Undang, Peraturan Presiden, Peraturan Menteri, hingga
            SOP internal yang menjadi rujukan resmi. Dirancang agar setiap dokumen
            mudah dicari, ditelusuri, dan dirujuk kapan pun dibutuhkan.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Filter regulasi
            </div>
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari judul regulasi…"
                  className="h-11 pl-9"
                />
              </div>

              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Tipe File" />
                </SelectTrigger>
                <SelectContent>
                  {fileTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t === "All" ? "Semua tipe file" : t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "All" ? "Semua kategori" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={reset}
                className="h-11 border-border"
              >
                Reset
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Menampilkan{" "}
                <strong className="text-foreground">
                  {rangeStart}–{rangeEnd}
                </strong>{" "}
                dari {filtered.length} regulasi
                {filtered.length !== regulations.length && (
                  <> (difilter dari {regulations.length})</>
                )}
              </span>
              <span className="hidden md:inline">
                Urutkan: <strong className="text-foreground">Terbaru</strong>{" "}
                <ChevronDown className="ml-0.5 inline h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-16 text-center">
              <p className="font-display text-xl font-semibold text-foreground">
                Tidak ada regulasi yang cocok.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Coba ubah kata kunci atau filter Anda.
              </p>
              <Button onClick={reset} className="mt-5">
                Reset filter
              </Button>
            </div>
          ) : (
            <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((item) => {
                const cover = imageUrl(item.coverImage, 800) || regulasiFallback;
                const typeLabel = item.fileType
                  ? `${item.category} · ${item.fileType}`
                  : item.category;
                return (
                  <Link
                    key={item._id}
                    to="/pustaka-regulasi/$slug"
                    params={{ slug: item.slug }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <img
                        src={cover}
                        alt={item.title}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
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

                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          {typeLabel}
                        </span>
                        <time>{formatDate(item.date)}</time>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <PaginationBar
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
