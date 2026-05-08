import { useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, MessageCircleQuestion, Send, Mail, User, Tag, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { faqsQueryOptions } from "@/lib/sanity-queries";
import { PortableText } from "@/components/site/PortableText";
import { blocksToPlainText } from "@/lib/sanity";

export const Route = createFileRoute("/faq")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(faqsQueryOptions());
  },
  pendingComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </main>
  ),
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "Klinik KRISNA — FAQ KRISNApedia" },
      {
        name: "description",
        content: "Klinik KRISNA adalah pusat tanya jawab KRISNApedia.",
      },
    ],
  }),
});

const inquirySchema = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
  subjek: z.string().trim().min(3, "Subjek minimal 3 karakter").max(150),
  pertanyaan: z.string().trim().min(10, "Pertanyaan minimal 10 karakter").max(1000),
});

function FaqPage() {
  const { data: faqs } = useSuspenseQuery(faqsQueryOptions());
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pertanyaan: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof form | null>(null);
  const namaInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        blocksToPlainText(f.answer).toLowerCase().includes(q),
    );
  }, [faqs, query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Form tidak valid");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmittedData(form);
      setSuccessOpen(true);
      setForm({ nama: "", email: "", subjek: "", pertanyaan: "" });
      setSubmitting(false);
    }, 600);
  };

  const handleSendAnother = () => {
    setSuccessOpen(false);
    setTimeout(() => namaInputRef.current?.focus(), 100);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-4 py-1.5">
            <MessageCircleQuestion className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Klinik KRISNA
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Punya pertanyaan? <span className="text-primary">Klinik KRISNA</span> siap membantu.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Pusat tanya jawab resmi KRISNApedia. Temukan jawaban atas pertanyaan
            yang sering diajukan, atau kirim pertanyaan baru langsung kepada tim kami.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <Label htmlFor="faq-search" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Cari Pertanyaan
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="faq-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik kata kunci…"
                className="h-12 pl-9"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Menampilkan <strong className="text-foreground">{filtered.length}</strong> dari {faqs.length} pertanyaan
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Pertanyaan yang sering diajukan
          </h2>
          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <p className="font-display text-lg font-semibold text-foreground">
                  Tidak ada pertanyaan yang cocok.
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filtered.map((f, i) => (
                  <AccordionItem key={f._id} value={`item-${i}`} className="border-b border-border">
                    <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:text-primary hover:no-underline md:text-lg">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      <PortableText value={f.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

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
              Kirim pertanyaan Anda langsung kepada tim Klinik KRISNA.
            </p>
            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:krisna@bappenas.go.id"
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    krisna@bappenas.go.id
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label htmlFor="nama" className="text-sm font-semibold">Nama Lengkap</Label>
                <div className="relative mt-2">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input ref={namaInputRef} id="nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama Anda" className="h-11 pl-9" maxLength={100} required />
                </div>
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@email.com" className="h-11 pl-9" maxLength={255} required />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="subjek" className="text-sm font-semibold">Subjek</Label>
                <div className="relative mt-2">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="subjek" value={form.subjek} onChange={(e) => setForm({ ...form, subjek: e.target.value })} placeholder="Ringkas topik pertanyaan Anda" className="h-11 pl-9" maxLength={150} required />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="pertanyaan" className="text-sm font-semibold">Pertanyaan</Label>
                <Textarea id="pertanyaan" value={form.pertanyaan} onChange={(e) => setForm({ ...form, pertanyaan: e.target.value })} placeholder="Tulis pertanyaan Anda secara detail…" className="mt-2 min-h-[140px] resize-none" maxLength={1000} required />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="mt-6 h-11 w-full gap-2 md:w-auto md:px-8">
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
