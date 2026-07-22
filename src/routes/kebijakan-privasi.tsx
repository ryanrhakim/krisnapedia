import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/kebijakan-privasi")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Kebijakan Privasi — KRISNApedia" },
      {
        name: "description",
        content:
          "Kebijakan privasi KRISNApedia: bagaimana data pengguna diperlakukan sesuai UU Pelindungan Data Pribadi dan Permen PPN/Bappenas No. 7 Tahun 2025.",
      },
      { property: "og:title", content: "Kebijakan Privasi — KRISNApedia" },
      {
        property: "og:description",
        content:
          "Bagaimana KRISNApedia mengelola data pengguna, mengacu pada UU PDP dan kebijakan Kementerian PPN/Bappenas.",
      },
      { property: "og:url", content: "https://krisnapedia.lovable.app/kebijakan-privasi" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://krisnapedia.lovable.app/kebijakan-privasi" }],
  }),
});

const COPY = {
  id: {
    badge: "Kebijakan Privasi",
    updated: "Terakhir diperbarui: 22 Juli 2026",
    title: "Komitmen kami terhadap privasi Anda.",
    lead:
      "KRISNApedia adalah portal informasi publik yang dikelola oleh tim Sistem Informasi KRISNA — Kementerian PPN/Bappenas. Kebijakan ini menjelaskan bagaimana data pengguna diperlakukan saat mengakses layanan ini.",
    sections: [
      {
        heading: "1. Ringkasan singkat",
        body: [
          "KRISNApedia tidak mewajibkan registrasi, login, atau pengisian data pribadi untuk menelusuri konten.",
          "Kami tidak menjalankan pelacakan (tracking) pihak ketiga untuk periklanan maupun profiling perilaku pengguna.",
        ],
      },
      {
        heading: "2. Data yang kami kumpulkan",
        body: [
          "Kami hanya memproses data yang secara sukarela Anda kirimkan melalui layanan Klinik KRISNA, yaitu alamat email dan isi pertanyaan.",
          "Data teknis dasar (misalnya log server yang bersifat anonim) dapat direkam untuk kebutuhan pemeliharaan dan keamanan sistem, sesuai standar operasional pengelolaan situs pemerintah.",
        ],
      },
      {
        heading: "3. Tujuan penggunaan data",
        body: [
          "Data yang Anda kirimkan hanya digunakan untuk merespons pertanyaan, memperbaiki layanan, dan menyusun materi FAQ (dalam bentuk yang telah dianonimkan).",
          "Kami tidak menjual, menyewakan, atau memperjualbelikan data pengguna kepada pihak mana pun.",
        ],
      },
      {
        heading: "4. Dasar hukum",
        body: [
          "Pengelolaan data pribadi di KRISNApedia berpedoman pada Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).",
          "Sebagai bagian dari sistem elektronik Kementerian PPN/Bappenas, KRISNApedia juga merujuk pada Peraturan Menteri PPN/Bappenas Nomor 7 Tahun 2025 dalam menjaga kerahasiaan data pengguna.",
        ],
      },
      {
        heading: "5. Keamanan sistem",
        body: [
          "Aspek keamanan siber KRISNApedia mengikuti standar operasional yang berlaku di lingkungan Bappenas, termasuk pedoman Kebijakan RFC 2350 CSIRT Bappenas untuk penanganan insiden keamanan informasi.",
          "Meski demikian, tidak ada sistem daring yang sepenuhnya bebas risiko; kami mendorong pengguna untuk tidak mengirim data sensitif yang tidak diperlukan.",
        ],
      },
      {
        heading: "6. Hak pengguna",
        body: [
          "Sesuai UU PDP, Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi yang pernah dikirimkan ke KRISNApedia.",
          "Permintaan dapat disampaikan melalui email resmi di bawah ini dengan menyertakan identitas yang dapat diverifikasi.",
        ],
      },
      {
        heading: "7. Perubahan kebijakan",
        body: [
          "Kebijakan ini dapat diperbarui sewaktu-waktu mengikuti perkembangan regulasi atau perubahan pada layanan KRISNApedia. Tanggal pembaruan terakhir tercantum di bagian atas halaman ini.",
        ],
      },
    ],
    contactTitle: "Butuh menghubungi kami?",
    contactBody:
      "Kirim pertanyaan atau permintaan terkait data pribadi Anda ke alamat berikut. Kami berupaya merespons dalam waktu wajar sesuai standar layanan Bappenas.",
    contactEmail: "krisna@bappenas.go.id",
  },
  en: {
    badge: "Privacy Policy",
    updated: "Last updated: 22 July 2026",
    title: "Our commitment to your privacy.",
    lead:
      "KRISNApedia is a public information portal operated by the KRISNA Information System team — Ministry of National Development Planning/Bappenas. This policy describes how user data is handled when using the service.",
    sections: [
      {
        heading: "1. Quick summary",
        body: [
          "KRISNApedia does not require registration, login, or personal data submission to browse content.",
          "We do not run third-party tracking for advertising or behavioral profiling.",
        ],
      },
      {
        heading: "2. Data we collect",
        body: [
          "We only process data you voluntarily submit through the Klinik KRISNA service — namely your email address and the content of your question.",
          "Basic technical data (such as anonymized server logs) may be recorded for maintenance and security purposes, in line with standard operating practices for government sites.",
        ],
      },
      {
        heading: "3. Purpose of data use",
        body: [
          "Data you submit is only used to respond to your questions, improve the service, and prepare FAQ material (in anonymized form).",
          "We do not sell, rent, or trade user data to any party.",
        ],
      },
      {
        heading: "4. Legal basis",
        body: [
          "Management of personal data in KRISNApedia refers to Law No. 27 of 2022 on Personal Data Protection (UU PDP).",
          "As part of Bappenas' electronic systems, KRISNApedia also refers to Ministerial Regulation No. 7 of 2025 to safeguard the confidentiality of user data.",
        ],
      },
      {
        heading: "5. System security",
        body: [
          "Cyber security aspects follow the operational standards applicable within Bappenas, including the RFC 2350 CSIRT Bappenas policy for information-security incident handling.",
          "No online system is completely risk-free; we encourage users to avoid submitting sensitive data that is not necessary.",
        ],
      },
      {
        heading: "6. User rights",
        body: [
          "Under UU PDP, you may request access, correction, or deletion of personal data previously submitted to KRISNApedia.",
          "Requests can be sent via the official email below with verifiable identity information.",
        ],
      },
      {
        heading: "7. Policy changes",
        body: [
          "This policy may be updated as regulations evolve or as the KRISNApedia service changes. The last updated date is shown at the top of this page.",
        ],
      },
    ],
    contactTitle: "Need to reach us?",
    contactBody:
      "Send questions or requests regarding your personal data to the email below. We aim to respond within a reasonable time in line with Bappenas service standards.",
    contactEmail: "krisna@bappenas.go.id",
  },
} as const;

function PrivacyPage() {
  const { lang } = useT();
  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-4 py-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
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
