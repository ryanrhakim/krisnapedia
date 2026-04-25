import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, FileText, ChevronDown, SlidersHorizontal } from "lucide-react";
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
import { manuals } from "@/data/manuals";

export const Route = createFileRoute("/manual-hub")({
  component: ManualHubPage,
  head: () => ({
    meta: [
      { title: "Manual Hub — KRISNApedia" },
      {
        name: "description",
        content:
          "Browse standard operating procedures, technical guides, and reference manuals from the KRISNApedia Manual Hub. Filter by title, file type, and category.",
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

const categories = ["All", "Onboarding", "Setup", "Policy"];
const fileTypes = ["All", "PDF", "DOCX", "Slides"];

function ManualHubPage() {
  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return manuals.filter((it) => {
      const matchQ = query
        ? it.title.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchT = fileType === "All" ? true : it.fileType === fileType;
      const matchC = category === "All" ? true : it.category === category;
      return matchQ && matchT && matchC;
    });
  }, [query, fileType, category]);

  const reset = () => {
    setQuery("");
    setFileType("All");
    setCategory("All");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Headline */}
      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Manual Hub
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Documentation, organized — every manual at your fingertips.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Browse standard operating procedures, technical guides, and
            reference manuals from across the KRISNApedia network. Find what
            you need with smart filters and clear categorization.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Filter manuals
            </div>
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
              {/* Judul */}
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari judul manual…"
                  className="h-11 pl-9"
                />
              </div>

              {/* Tipe File */}
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

              {/* Kategori */}
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
                <strong className="text-foreground">{filtered.length}</strong>{" "}
                dari {manuals.length} manual
              </span>
              <span className="hidden md:inline">
                Urutkan: <strong className="text-foreground">Terbaru</strong>{" "}
                <ChevronDown className="ml-0.5 inline h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Card Grid */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-16 text-center">
              <p className="font-display text-xl font-semibold text-foreground">
                Tidak ada manual yang cocok.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Coba ubah kata kunci atau filter Anda.
              </p>
              <Button onClick={reset} className="mt-5">
                Reset filter
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <Link
                  key={item.slug}
                  to="/manual-hub/$slug"
                  params={{ slug: item.slug }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={item.cover}
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
                      {item.desc}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {item.type}
                      </span>
                      <time>{item.date}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
