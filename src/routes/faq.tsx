import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, MessageCircleQuestion, Send, Mail, User, Tag } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "Klinik KRISNA — FAQ KRISNApedia" },
      {
        name: "description",
        content:
          "Klinik KRISNA adalah pusat tanya jawab KRISNApedia. Cari jawaban cepat atau ajukan pertanyaan langsung kepada tim kami.",
      },
      { property: "og:title", content: "Klinik KRISNA — FAQ KRISNApedia" },
      {
        property: "og:description",
        content:
          "Pusat tanya jawab KRISNApedia. Temukan jawaban dan ajukan pertanyaan baru.",
      },
    ],
  }),
});

const faqs = [
  {
    q: "Apa itu KRISNApedia?",
    a: "KRISNApedia adalah platform manajemen pengetahuan terintegrasi yang menyatukan manual, insight, dan dokumen operasional dalam satu repositori yang mudah dicari.",
  },
  {
    q: "Siapa yang dapat mengakses Pustaka Regulasi?",
    a: "Pustaka Regulasi terbuka untuk seluruh pengguna terdaftar KRISNApedia. Beberapa dokumen dengan klasifikasi internal hanya dapat diakses sesuai peran pengguna.",
  },
  {
    q: "Bagaimana cara mengunggah dokumen baru ke Manual Hub?",
    a: "Anda dapat mengunggah dokumen melalui menu Manual Hub → Tambah Dokumen. Pastikan dokumen mengikuti format dan metadata yang ditentukan oleh tim kurator.",
  },
  {
    q: "Apakah konten di Insight Hub diperbarui secara berkala?",
    a: "Ya. Tim Insight KRISNA memperbarui artikel, whitepaper, dan riset setiap bulan. Anda dapat berlangganan untuk mendapatkan notifikasi.",
  },
  {
    q: "Bagaimana cara melaporkan dokumen yang tidak relevan?",
    a: "Klik tombol 'Laporkan' pada halaman dokumen. Tim moderator akan meninjau dan menindaklanjuti dalam waktu 1×24 jam kerja.",
  },
  {
    q: "Apakah KRISNApedia menyediakan API?",
    a: "Ya, kami menyediakan REST API dan webhook untuk integrasi dengan sistem internal Anda. Dokumentasi lengkap dapat diakses di portal developer.",
  },
  {
    q: "Bagaimana sistem keamanan data di KRISNApedia?",
    a: "Seluruh data dienkripsi saat transit maupun saat disimpan. Kami menerapkan kontrol akses berbasis peran (RBAC), SSO, dan audit log untuk setiap aktivitas.",
  },
  {
    q: "Apakah saya bisa mengakses KRISNApedia dari perangkat mobile?",
    a: "Tentu. KRISNApedia responsif di seluruh perangkat dan tersedia versi PWA agar dapat diakses layaknya aplikasi native.",
  },
];

const inquirySchema = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
  subjek: z.string().trim().min(3, "Subjek minimal 3 karakter").max(150),
  pertanyaan: z
    .string()
    .trim()
    .min(10, "Pertanyaan minimal 10 karakter")
    .max(1000),
});

function FaqPage() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    nama: "",
    email: "",
    subjek: "",
    pertanyaan: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Form tidak valid");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Pertanyaan terkirim! Tim Klinik KRISNA akan membalas via email.");
      setForm({ nama: "", email: "", subjek: "", pertanyaan: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Headline */}
      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-4 py-1.5">
            <MessageCircleQuestion className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Klinik KRISNA
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Punya pertanyaan? <span className="text-primary">Klinik KRISNA</span>{" "}
            siap membantu.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Pusat tanya jawab resmi KRISNApedia. Temukan jawaban atas pertanyaan
            yang sering diajukan, atau kirim pertanyaan baru langsung kepada tim
            kami.
          </p>
        </div>
      </section>

      {/* Search Tab */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <Label
              htmlFor="faq-search"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Cari Pertanyaan
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="faq-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik kata kunci, mis. ‘unggah dokumen’…"
                className="h-12 pl-9"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Menampilkan{" "}
              <strong className="text-foreground">{filtered.length}</strong> dari{" "}
              {faqs.length} pertanyaan
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Q&A */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Jawaban singkat untuk pertanyaan paling umum dari pengguna KRISNApedia.
          </p>

          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <p className="font-display text-lg font-semibold text-foreground">
                  Tidak ada pertanyaan yang cocok.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coba kata kunci lain atau kirim pertanyaan baru di formulir di
                  bawah.
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filtered.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:text-primary hover:no-underline md:text-lg">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Ajukan Pertanyaan
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Belum menemukan jawaban?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Kirim pertanyaan Anda langsung kepada tim Klinik KRISNA. Kami akan
              membalas melalui email dalam 1×24 jam kerja.
            </p>
            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">
                    klinik@krisnapedia.id
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-primary">
                  <MessageCircleQuestion className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Respons cepat
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Senin – Jumat, 09.00 – 17.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label htmlFor="nama" className="text-sm font-semibold">
                  Nama Lengkap
                </Label>
                <div className="relative mt-2">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="nama"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    placeholder="Nama Anda"
                    className="h-11 pl-9"
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="h-11 pl-9"
                    maxLength={255}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="subjek" className="text-sm font-semibold">
                  Subjek
                </Label>
                <div className="relative mt-2">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="subjek"
                    value={form.subjek}
                    onChange={(e) =>
                      setForm({ ...form, subjek: e.target.value })
                    }
                    placeholder="Ringkas topik pertanyaan Anda"
                    className="h-11 pl-9"
                    maxLength={150}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="pertanyaan" className="text-sm font-semibold">
                  Pertanyaan
                </Label>
                <Textarea
                  id="pertanyaan"
                  value={form.pertanyaan}
                  onChange={(e) =>
                    setForm({ ...form, pertanyaan: e.target.value })
                  }
                  placeholder="Tulis pertanyaan Anda secara detail…"
                  className="mt-2 min-h-[140px] resize-none"
                  maxLength={1000}
                  required
                />
                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {form.pertanyaan.length}/1000
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 h-11 w-full gap-2 md:w-auto md:px-8"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Mengirim…" : "Kirim Pertanyaan"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
