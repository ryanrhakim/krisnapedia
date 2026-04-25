import marketCover from "@/assets/insight-market.jpg";
import strategyCover from "@/assets/insight-strategy.jpg";
import analyticsCover from "@/assets/insight-analytics.jpg";

export type InsightFileType = "PDF" | "Web" | "Slides" | "Video" | "Image";
export type InsightViewer = "pdf" | "slides" | "image" | "video" | "web";

export type Insight = {
  slug: string;
  cover: string;
  category: string;
  title: string;
  desc: string;
  type: string;
  fileType: InsightFileType;
  date: string;
  // Detail-page fields
  longDesc: string;
  author: string;
  readTime: string;
  pages?: number;
  fileSize: string;
  language: string;
  tags: string[];
  viewer: InsightViewer;
  // For pdf/slides we use the cover image as a stand-in preview.
  // For video we use a sample mp4.
  videoSrc?: string;
};

export const insights: Insight[] = [
  {
    slug: "q1-2026-industry-outlook",
    cover: marketCover,
    category: "Market",
    title: "Q1 2026 industry outlook",
    desc: "Key trends shaping enterprise knowledge platforms this quarter.",
    type: "Whitepaper · PDF",
    fileType: "PDF",
    date: "Apr 18, 2026",
    longDesc:
      "Laporan Q1 2026 ini merangkum pergeseran terbesar dalam pasar enterprise knowledge platform — mulai dari adopsi AI assistant, konsolidasi vendor, hingga perubahan ekspektasi pengguna terhadap pengalaman pencarian. Kami menganalisis lebih dari 200 survei enterprise, 40 wawancara mendalam, dan data publik dari penyedia utama untuk menyusun outlook yang tajam dan dapat ditindaklanjuti oleh pemimpin teknologi.",
    author: "KRISNApedia Research",
    readTime: "18 menit baca",
    pages: 32,
    fileSize: "4.8 MB",
    language: "Bahasa Indonesia",
    tags: ["Outlook", "AI Adoption", "Enterprise", "2026"],
    viewer: "pdf",
  },
  {
    slug: "building-a-single-source-of-truth",
    cover: strategyCover,
    category: "Strategy",
    title: "Building a single source of truth",
    desc: "How leading teams consolidate scattered documentation.",
    type: "Article · Web",
    fileType: "Web",
    date: "Apr 11, 2026",
    longDesc:
      "Artikel ini membedah pola yang digunakan tim engineering & operations terbaik untuk menyatukan dokumentasi yang tersebar di puluhan tools.",
    author: "Tim Editorial KRISNApedia",
    readTime: "9 menit baca",
    fileSize: "—",
    language: "Bahasa Indonesia",
    tags: ["Knowledge Management", "Strategy", "Documentation"],
    viewer: "web",
  },
  {
    slug: "measuring-documentation-roi",
    cover: analyticsCover,
    category: "Analytics",
    title: "Measuring documentation ROI",
    desc: "Frameworks and metrics that prove knowledge value.",
    type: "Report · PDF",
    fileType: "PDF",
    date: "Apr 03, 2026",
    longDesc:
      "Framework praktis untuk mengukur dampak finansial dari investasi dokumentasi internal — termasuk model perhitungan dan studi kasus nyata.",
    author: "KRISNApedia Research",
    readTime: "14 menit baca",
    pages: 24,
    fileSize: "3.2 MB",
    language: "Bahasa Indonesia",
    tags: ["ROI", "Metrics", "Analytics"],
    viewer: "pdf",
  },
  {
    slug: "knowledge-workflows-that-scale",
    cover: strategyCover,
    category: "Strategy",
    title: "Knowledge workflows that scale",
    desc: "Operating models for distributed and asynchronous teams.",
    type: "Playbook · Slides",
    fileType: "Slides",
    date: "Mar 27, 2026",
    longDesc:
      "Playbook berisi model operasional untuk tim distributed yang ingin menjaga kualitas dokumentasi seiring pertumbuhan headcount.",
    author: "Operations Guild",
    readTime: "20 menit baca",
    pages: 42,
    fileSize: "6.1 MB",
    language: "Bahasa Indonesia",
    tags: ["Playbook", "Operations", "Scale"],
    viewer: "slides",
  },
  {
    slug: "the-state-of-regulated-industries",
    cover: marketCover,
    category: "Market",
    title: "The state of regulated industries",
    desc: "Compliance-driven knowledge needs across finance and health.",
    type: "Report · PDF",
    fileType: "PDF",
    date: "Mar 20, 2026",
    longDesc:
      "Studi kebutuhan knowledge management di industri yang sangat teregulasi — finance, healthcare, dan energy.",
    author: "KRISNApedia Research",
    readTime: "16 menit baca",
    pages: 28,
    fileSize: "4.0 MB",
    language: "Bahasa Indonesia",
    tags: ["Compliance", "Finance", "Healthcare"],
    viewer: "pdf",
  },
  {
    slug: "search-relevance-benchmarks",
    cover: analyticsCover,
    category: "Analytics",
    title: "Search relevance benchmarks",
    desc: "How the top platforms rank for retrieval quality in 2026.",
    type: "Article · Web",
    fileType: "Web",
    date: "Mar 14, 2026",
    longDesc:
      "Benchmark kualitas retrieval dari 12 platform teratas, lengkap dengan metodologi dan dataset evaluasi.",
    author: "Search Quality Lab",
    readTime: "11 menit baca",
    fileSize: "—",
    language: "Bahasa Indonesia",
    tags: ["Search", "Benchmark", "Retrieval"],
    viewer: "web",
  },
  {
    slug: "ai-assistants-in-the-workplace",
    cover: marketCover,
    category: "Market",
    title: "AI assistants in the workplace",
    desc: "Adoption patterns and ROI signals from 200+ enterprises.",
    type: "Whitepaper · PDF",
    fileType: "PDF",
    date: "Mar 06, 2026",
    longDesc:
      "Analisis pola adopsi AI assistant pada lebih dari 200 enterprise, termasuk indikator ROI awal dan tantangan rollout.",
    author: "KRISNApedia Research",
    readTime: "22 menit baca",
    pages: 36,
    fileSize: "5.4 MB",
    language: "Bahasa Indonesia",
    tags: ["AI", "Adoption", "Enterprise"],
    viewer: "pdf",
  },
  {
    slug: "designing-your-knowledge-taxonomy",
    cover: strategyCover,
    category: "Strategy",
    title: "Designing your knowledge taxonomy",
    desc: "A practical guide to categories, tags, and metadata.",
    type: "Article · Web",
    fileType: "Web",
    date: "Feb 28, 2026",
    longDesc:
      "Panduan praktis menyusun taksonomi pengetahuan yang scalable: kategori, tag, dan metadata.",
    author: "Information Architecture Team",
    readTime: "10 menit baca",
    fileSize: "—",
    language: "Bahasa Indonesia",
    tags: ["Taxonomy", "Metadata", "IA"],
    viewer: "web",
  },
  {
    slug: "reducing-time-to-answer",
    cover: analyticsCover,
    category: "Analytics",
    title: "Reducing time-to-answer",
    desc: "Field-tested techniques to cut search friction in half.",
    type: "Playbook · Slides",
    fileType: "Slides",
    date: "Feb 19, 2026",
    longDesc:
      "Teknik teruji untuk mengurangi waktu yang dibutuhkan pengguna menemukan jawaban hingga 50%.",
    author: "Operations Guild",
    readTime: "15 menit baca",
    pages: 30,
    fileSize: "4.6 MB",
    language: "Bahasa Indonesia",
    tags: ["Search", "UX", "Playbook"],
    viewer: "slides",
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
