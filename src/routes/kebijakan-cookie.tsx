import { createFileRoute } from "@tanstack/react-router";
import { Cookie, Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/kebijakan-cookie")({
  component: CookiePage,
  head: () => ({
    meta: [
      { title: "Kebijakan Cookie — KRISNApedia" },
      {
        name: "description",
        content:
          "Penjelasan penggunaan cookie dan penyimpanan lokal di KRISNApedia. Kami hanya menggunakan penyimpanan esensial tanpa tracking pihak ketiga.",
      },
      { property: "og:title", content: "Kebijakan Cookie — KRISNApedia" },
      {
        property: "og:description",
        content:
          "KRISNApedia hanya menggunakan penyimpanan esensial untuk preferensi tema dan bahasa. Tanpa tracking pihak ketiga.",
      },
      { property: "og:url", content: "https://krisnapedia.lovable.app/kebijakan-cookie" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://krisnapedia.lovable.app/kebijakan-cookie" }],
  }),
});

const COPY = {
  id: {
    badge: "Kebijakan Cookie",
    updated: "Terakhir diperbarui: 22 Juli 2026",
    title: "Bagaimana KRISNApedia menggunakan cookie.",
    lead:
      "KRISNApedia menerapkan pendekatan minimal terhadap cookie: hanya penyimpanan esensial untuk kenyamanan pengguna, tanpa pelacakan pihak ketiga untuk iklan atau profiling.",
    sections: [
      {
        heading: "1. Apa itu cookie",
        body: [
          "Cookie adalah berkas kecil yang disimpan di perangkat Anda oleh browser untuk mengingat informasi tertentu antar-kunjungan. Selain cookie, situs modern juga menggunakan penyimpanan lokal (localStorage) yang bekerja secara serupa.",
        ],
      },
      {
        heading: "2. Cookie & penyimpanan yang kami gunakan",
        body: [
          "Saat ini KRISNApedia hanya menyimpan preferensi pengguna secara lokal di browser Anda melalui localStorage — bukan cookie yang dikirim ke server. Data yang disimpan hanya:",
          "• Preferensi tema tampilan (terang atau gelap).",
          "• Preferensi bahasa (Bahasa Indonesia atau English).",
          "Data ini tidak dikirim ke server manapun, tidak dapat mengidentifikasi Anda, dan tetap berada di perangkat Anda sendiri.",
        ],
      },
      {
        heading: "3. Yang tidak kami gunakan",
        body: [
          "Kami tidak menggunakan cookie atau layanan pelacakan pihak ketiga (seperti pixel iklan, cookie marketing, atau analytics tersinkron identitas).",
          "Kami tidak menjalankan profiling perilaku, remarketing, atau berbagi data dengan platform periklanan.",
        ],
      },
      {
        heading: "4. Cara mengelola cookie & penyimpanan",
        body: [
          "Anda dapat menghapus preferensi yang tersimpan dengan menghapus data situs (cookies & storage) melalui pengaturan browser Anda. Pada sebagian besar browser, fitur ini tersedia di menu Pengaturan → Privasi & Keamanan.",
          "Setelah dihapus, tampilan KRISNApedia akan kembali ke pengaturan bawaan (tema dan bahasa default).",
        ],
      },
      {
        heading: "5. Perubahan kebijakan",
        body: [
          "Jika kami menambahkan analytics atau layanan pihak ketiga di masa depan, kebijakan ini akan diperbarui sebelum perubahan aktif, disertai penjelasan tentang jenis data yang diproses.",
        ],
      },
    ],
    contactTitle: "Ingin tahu lebih lanjut?",
    contactBody:
      "Hubungi tim KRISNA untuk pertanyaan seputar penggunaan cookie dan penyimpanan pada situs ini.",
    contactEmail: "krisna@bappenas.go.id",
  },
  en: {
    badge: "Cookie Policy",
    updated: "Last updated: 22 July 2026",
    title: "How KRISNApedia uses cookies.",
    lead:
      "KRISNApedia takes a minimal approach to cookies: only essential storage for user convenience, with no third-party tracking for advertising or profiling.",
    sections: [
      {
        heading: "1. What cookies are",
        body: [
          "Cookies are small files stored on your device by the browser to remember information across visits. Modern sites also use local storage (localStorage), which works similarly.",
        ],
      },
      {
        heading: "2. Cookies & storage we use",
        body: [
          "KRISNApedia currently stores user preferences only locally in your browser via localStorage — not as cookies sent to the server. The data stored is only:",
          "• Theme preference (light or dark).",
          "• Language preference (Bahasa Indonesia or English).",
          "This data is never sent to any server, cannot identify you, and remains on your own device.",
        ],
      },
      {
        heading: "3. What we do NOT use",
        body: [
          "We do not use third-party tracking cookies or services (such as ad pixels, marketing cookies, or identity-linked analytics).",
          "We do not run behavioral profiling, remarketing, or share data with advertising platforms.",
        ],
      },
      {
        heading: "4. Managing cookies & storage",
        body: [
          "You can remove stored preferences by clearing site data (cookies & storage) in your browser settings. In most browsers, this is found under Settings → Privacy & Security.",
          "Once cleared, KRISNApedia will revert to default appearance (default theme and language).",
        ],
      },
      {
        heading: "5. Policy changes",
        body: [
          "If we add analytics or third-party services in the future, this policy will be updated before the changes take effect, with an explanation of the data processed.",
        ],
      },
    ],
    contactTitle: "Want to learn more?",
    contactBody:
      "Contact the KRISNA team for questions about cookie and storage usage on this site.",
    contactEmail: "krisna@bappenas.go.id",
  },
} as const;

function CookiePage() {
  const { lang } = useT();
  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-4 py-1.5">
            <Cookie className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {c.badge}
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{c.lead}</p>
          <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
            {c.updated}
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-6">
            {c.sections.map((s) => (
              <article
                key={s.heading}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-[var(--primary-soft)] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {c.contactTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.contactBody}</p>
                <a
                  href={`mailto:${c.contactEmail}`}
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  {c.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
