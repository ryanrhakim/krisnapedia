import { createFileRoute } from "@tanstack/react-router";
import { FileText, Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/ketentuan-penggunaan")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Ketentuan Penggunaan — KRISNApedia" },
      {
        name: "description",
        content:
          "Ketentuan penggunaan KRISNApedia sebagai portal informasi publik Sistem Informasi KRISNA — Kementerian PPN/Bappenas.",
      },
      { property: "og:title", content: "Ketentuan Penggunaan — KRISNApedia" },
      {
        property: "og:description",
        content:
          "Syarat dan ketentuan penggunaan portal pengetahuan KRISNApedia untuk publik.",
      },
      { property: "og:url", content: "https://krisnapedia.lovable.app/ketentuan-penggunaan" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://krisnapedia.lovable.app/ketentuan-penggunaan" }],
  }),
});

const COPY = {
  id: {
    badge: "Ketentuan Penggunaan",
    updated: "Terakhir diperbarui: 22 Juli 2026",
    title: "Ketentuan penggunaan KRISNApedia.",
    lead:
      "Dengan mengakses dan memanfaatkan KRISNApedia, Anda dianggap telah membaca, memahami, dan menyetujui ketentuan berikut. Silakan hentikan penggunaan jika Anda tidak menyetujuinya.",
    sections: [
      {
        heading: "1. Sifat layanan",
        body: [
          "KRISNApedia merupakan portal manajemen pengetahuan yang dikelola oleh Kementerian PPN/Bappenas untuk mendukung pengguna Sistem Informasi KRISNA.",
          "Konten yang ditampilkan bersifat rujukan dan informatif. Untuk kepentingan formal (hukum, administrasi, keuangan), pengguna wajib merujuk pada dokumen asli yang diterbitkan oleh instansi berwenang.",
        ],
      },
      {
        heading: "2. Hak kekayaan intelektual",
        body: [
          "Seluruh konten (teks, dokumen, gambar, logo) yang dipublikasikan pada KRISNApedia adalah milik Kementerian PPN/Bappenas atau pihak ketiga yang memberikan izin penggunaannya.",
          "Logo dan identitas visual KRISNA/Bappenas dilindungi dan tidak boleh digunakan tanpa izin tertulis.",
        ],
      },
      {
        heading: "3. Penggunaan yang diizinkan",
        body: [
          "Anda diperkenankan mengakses, membaca, mengunduh, dan menggunakan konten KRISNApedia untuk keperluan non-komersial seperti pembelajaran, kajian, dan penelitian.",
          "Setiap penggunaan wajib mencantumkan sumber secara jelas (KRISNApedia — Kementerian PPN/Bappenas) dan tidak diperkenankan mengubah substansi dokumen resmi.",
        ],
      },
      {
        heading: "4. Penggunaan yang tidak diizinkan",
        body: [
          "Anda dilarang menggunakan KRISNApedia untuk tujuan komersial tanpa izin tertulis, menyebarkan konten yang telah dimodifikasi secara menyesatkan, melakukan scraping otomatis dalam skala besar yang mengganggu layanan, atau upaya lain yang merugikan integritas sistem.",
        ],
      },
      {
        heading: "5. Ketersediaan layanan",
        body: [
          "KRISNApedia berupaya memastikan ketersediaan layanan yang optimal, namun tidak menjamin akses tanpa gangguan. Pemeliharaan, pembaruan, atau kendala teknis dapat menyebabkan layanan tidak tersedia sementara.",
        ],
      },
      {
        heading: "6. Batasan tanggung jawab",
        body: [
          "Kementerian PPN/Bappenas berupaya menjaga akurasi konten, namun tidak menjamin bahwa seluruh konten selalu bebas dari kekeliruan atau tetap mutakhir sepanjang waktu.",
          "Segala kerugian yang timbul akibat penggunaan atau ketidakmampuan menggunakan KRISNApedia bukan menjadi tanggung jawab pengelola, sepanjang diizinkan oleh peraturan perundang-undangan yang berlaku.",
        ],
      },
      {
        heading: "7. Perubahan ketentuan",
        body: [
          "Kami dapat memperbarui ketentuan ini sewaktu-waktu. Perubahan berlaku efektif sejak dipublikasikan pada halaman ini. Anda disarankan meninjau kembali secara berkala.",
        ],
      },
    ],
    contactTitle: "Ada pertanyaan tentang ketentuan ini?",
    contactBody:
      "Silakan hubungi tim KRISNA untuk klarifikasi atau permohonan izin penggunaan konten di luar cakupan non-komersial.",
    contactEmail: "krisna@bappenas.go.id",
  },
  en: {
    badge: "Terms of Use",
    updated: "Last updated: 22 July 2026",
    title: "Terms of use for KRISNApedia.",
    lead:
      "By accessing and using KRISNApedia, you are deemed to have read, understood, and agreed to the following terms. Please discontinue use if you do not agree.",
    sections: [
      {
        heading: "1. Nature of service",
        body: [
          "KRISNApedia is a knowledge-management portal operated by the Ministry of National Development Planning/Bappenas to support users of the KRISNA Information System.",
          "Content is provided as reference and informational material. For formal purposes (legal, administrative, financial), users must refer to the original documents issued by the authorized agency.",
        ],
      },
      {
        heading: "2. Intellectual property",
        body: [
          "All content (text, documents, images, logos) published on KRISNApedia belongs to the Ministry of National Development Planning/Bappenas or to third parties that have granted usage permission.",
          "The KRISNA/Bappenas logo and visual identity are protected and may not be used without written permission.",
        ],
      },
      {
        heading: "3. Permitted use",
        body: [
          "You may access, read, download, and use KRISNApedia content for non-commercial purposes such as learning, study, and research.",
          "Every use must clearly attribute the source (KRISNApedia — Ministry of National Development Planning/Bappenas) and must not alter the substance of official documents.",
        ],
      },
      {
        heading: "4. Prohibited use",
        body: [
          "You may not use KRISNApedia for commercial purposes without written permission, distribute misleadingly modified content, perform large-scale automated scraping that disrupts the service, or take any other action that harms system integrity.",
        ],
      },
      {
        heading: "5. Service availability",
        body: [
          "KRISNApedia strives for optimal service availability but does not guarantee uninterrupted access. Maintenance, updates, or technical issues may cause temporary unavailability.",
        ],
      },
      {
        heading: "6. Limitation of liability",
        body: [
          "The Ministry of National Development Planning/Bappenas strives to maintain content accuracy but does not guarantee that all content is always error-free or up-to-date.",
          "Any losses arising from the use of or inability to use KRISNApedia are not the responsibility of the operator, to the extent permitted by applicable laws.",
        ],
      },
      {
        heading: "7. Changes to terms",
        body: [
          "We may update these terms at any time. Changes take effect once published on this page. You are advised to review the page periodically.",
        ],
      },
    ],
    contactTitle: "Questions about these terms?",
    contactBody:
      "Please contact the KRISNA team for clarifications or requests to use content beyond non-commercial scope.",
    contactEmail: "krisna@bappenas.go.id",
  },
} as const;

function TermsPage() {
  const { lang } = useT();
  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-4 py-1.5">
            <FileText className="h-4 w-4 text-primary" />
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
