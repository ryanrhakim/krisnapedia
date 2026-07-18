import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PaginationBar } from "@/components/site/PaginationBar";

const PER_PAGE = 9;
const SORT_VALUES = ["newest", "oldest", "title-asc", "title-desc"] as const;
type SortValue = (typeof SORT_VALUES)[number];
const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
  cat: fallback(z.string(), "All").default("All"),
  sub: fallback(z.string(), "All").default("All"),
  sort: fallback(z.enum(SORT_VALUES), "newest").default("newest"),
});
import {
  Search,
  FileText,
  SlidersHorizontal,
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
import { manualsQueryOptions, categoriesQueryOptions } from "@/lib/sanity-queries";
import { viewsQueryOptions } from "@/lib/views-queries";
import { imageUrl } from "@/lib/sanity";
import { formatDate } from "@/lib/format";
import { CategoryTabs } from "@/components/site/CategoryTabs";
import { ViewCount } from "@/components/site/ViewCount";
import manualFallback from "@/assets/manual-onboarding.jpg";
import { useT } from "@/i18n/LanguageProvider";

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/manual-hub")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(manualsQueryOptions());
  },
  pendingComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </main>
  ),
  component: ManualHubPage,
  head: () => ({
    meta: [
      { title: "Manual Hub — KRISNApedia" },
      {
        name: "description",
        content:
          "Browse standard operating procedures, technical guides, and reference manuals from the KRISNApedia Manual Hub.",
      },
      { property: "og:title", content: "Manual Hub — KRISNApedia" },
      {
        property: "og:description",
        content:
          "Standard operating procedures, technical guides, and reference manuals — all in one place.",
      },
    ],
  }),
});

function ManualHubPage() {
  const { t } = useT();
  const { data: manuals } = useSuspenseQuery(manualsQueryOptions());
  const { data: viewsMap = {} } = useQuery(viewsQueryOptions("manual"));
  const { page, cat, sub, sort } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("All");

  const goToPage = (next: number) => {
    navigate({ search: (prev: SearchParams) => ({ ...prev, page: next }) });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const setCat = (next: string) => {
    navigate({ search: (prev: SearchParams) => ({ ...prev, cat: next, sub: "All", page: 1 }) });
  };

  const setSub = (next: string) => {
    navigate({ search: (prev: SearchParams) => ({ ...prev, sub: next, page: 1 }) });
  };

  const setSort = (next: SortValue) => {
    navigate({ search: (prev: SearchParams) => ({ ...prev, sort: next, page: 1 }) });
  };

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(manuals.map((m) => m.category).filter(Boolean)))],
    [manuals],
  );
  const subCategories = useMemo(() => {
    if (cat === "All") return [];
    const subs = Array.from(
      new Set(
        manuals
          .filter((m) => m.category === cat)
          .map((m) => m.subCategory)
          .filter((s): s is string => Boolean(s)),
      ),
    );
    return subs.length > 0 ? ["All", ...subs] : [];
  }, [manuals, cat]);
  const fileTypes = useMemo(
    () => [
      "All",
      ...Array.from(new Set(manuals.map((m) => m.fileType).filter(Boolean) as string[])),
    ],
    [manuals],
  );

  const filtered = useMemo(() => {
    return manuals.filter((it) => {
      const matchQ = query
        ? it.title.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchT = fileType === "All" ? true : it.fileType === fileType;
      const matchC = cat === "All" ? true : it.category === cat;
      const matchS = sub === "All" ? true : it.subCategory === sub;
      return matchQ && matchT && matchC && matchS;
    });
  }, [manuals, query, fileType, cat, sub]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "oldest":
        return arr.sort((a, b) => +new Date(a.date) - +new Date(b.date));
      case "title-asc":
        return arr.sort((a, b) => a.title.localeCompare(b.title, "id"));
      case "title-desc":
        return arr.sort((a, b) => b.title.localeCompare(a.title, "id"));
      default:
        return arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
  }, [filtered, sort]);

  const reset = () => {
    setQuery("");
    setFileType("All");
    navigate({ search: { page: 1, cat: "All", sub: "All", sort: "newest" } });
  };

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginated = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const rangeStart = sorted.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
  const rangeEnd = (safePage - 1) * PER_PAGE + paginated.length;

  useEffect(() => {
    if (page !== 1) navigate({ search: (prev: SearchParams) => ({ ...prev, page: 1 }) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, fileType]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("page.manual.eyebrow")}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Koleksi panduan penggunaan KRISNA, dalam satu pusat dokumentasi.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Akses panduan penggunaan, prosedur teknis, dan dokumentasi operasional berbagai subsistem KRISNA yang disusun sistematis agar setiap proses lebih mudah dipelajari, ditelusuri, dan diterapkan.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl space-y-3 px-6 py-6">
          <CategoryTabs
            items={categories}
            active={cat}
            onChange={setCat}
            ariaLabel="Filter berdasarkan kategori utama"
          />
          {subCategories.length > 0 && (
            <div className="flex items-start gap-3 border-l-2 border-primary/30 pl-3">
              <CategoryTabs
                items={subCategories}
                active={sub}
                onChange={setSub}
                ariaLabel="Filter berdasarkan sub-kategori"
                variant="secondary"
              />
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              {t("filter.manuals")}
            </div>
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("filter.searchManual")}
                  className="h-11 pl-9"
                />
              </div>

              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t("filter.fileType")} />
                </SelectTrigger>
                <SelectContent>
                  {fileTypes.map((t2) => (
                    <SelectItem key={t2} value={t2}>
                      {t2 === "All" ? t("filter.allFileTypes") : t2}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={cat} onValueChange={setCat}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t("filter.category")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "All" ? t("filter.allCategories") : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={reset}
                className="h-11 border-border"
              >
                {t("filter.reset")}
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("filter.showing")}{" "}
                <strong className="text-foreground">
                  {rangeStart}–{rangeEnd}
                </strong>{" "}
                {t("filter.of")} {filtered.length} {t("unit.manual")}
                {filtered.length !== manuals.length && (
                  <> ({t("filter.filteredFrom")} {manuals.length})</>
                )}
              </span>
              <div className="hidden items-center gap-2 md:flex">
                <span>{t("filter.sortBy")}</span>
                <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
                  <SelectTrigger className="h-8 w-[150px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t("filter.sort.newest")}</SelectItem>
                    <SelectItem value="oldest">{t("filter.sort.oldest")}</SelectItem>
                    <SelectItem value="title-asc">{t("filter.sort.titleAsc")}</SelectItem>
                    <SelectItem value="title-desc">{t("filter.sort.titleDesc")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-16 text-center">
              <p className="font-display text-xl font-semibold text-foreground">
                {t("filter.empty.manual")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("filter.emptyHint")}
              </p>
              <Button onClick={reset} className="mt-5">
                {t("filter.resetFilter")}
              </Button>
            </div>
          ) : (
            <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((item) => {
                const cover = imageUrl(item.coverImage, 800) || manualFallback;
                const typeLabel = item.fileType
                  ? `Manual · ${item.fileType}`
                  : item.viewer.toUpperCase();
                return (
                  <Link
                    key={item._id}
                    to="/manual-hub/$slug"
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

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                        <div className="inline-flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5" />
                            {typeLabel}
                          </span>
                          <ViewCount count={viewsMap[item.slug]} />
                        </div>
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
