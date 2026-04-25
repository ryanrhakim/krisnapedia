import onboardingCover from "@/assets/manual-onboarding.jpg";
import setupCover from "@/assets/manual-setup.jpg";
import securityCover from "@/assets/manual-security.jpg";

export type ManualFileType = "PDF" | "DOCX" | "Slides" | "Video" | "Image";
export type ManualViewer = "pdf" | "slides" | "image" | "video" | "web";

export type Manual = {
  slug: string;
  cover: string;
  category: string;
  title: string;
  desc: string;
  type: string;
  fileType: ManualFileType;
  date: string;
  // Detail-page fields
  longDesc: string;
  author: string;
  readTime: string;
  pages?: number;
  fileSize: string;
  language: string;
  version: string;
  tags: string[];
  viewer: ManualViewer;
  videoSrc?: string;
};

export const manuals: Manual[] = [
  {
    slug: "getting-started-guide",
    cover: onboardingCover,
    category: "Onboarding",
    title: "Getting Started Guide",
    desc: "Step-by-step walkthrough for new team members joining the platform.",
    type: "Manual · PDF",
    fileType: "PDF",
    date: "Apr 20, 2026",
    longDesc:
      "Panduan lengkap untuk anggota tim baru yang akan menggunakan KRISNApedia. Mencakup proses sign-up, navigasi dasar, manajemen profil, hingga praktik kolaborasi harian. Disusun agar dapat diselesaikan dalam satu sesi onboarding.",
    author: "People Operations",
    readTime: "15 menit baca",
    pages: 24,
    fileSize: "3.6 MB",
    language: "Bahasa Indonesia",
    version: "v2.4",
    tags: ["Onboarding", "Getting Started", "Tutorial"],
    viewer: "pdf",
  },
  {
    slug: "platform-configuration",
    cover: setupCover,
    category: "Setup",
    title: "Platform Configuration",
    desc: "Admin reference for environments, integrations, and access policies.",
    type: "SOP · DOCX",
    fileType: "DOCX",
    date: "Apr 14, 2026",
    longDesc:
      "Referensi administrator untuk mengonfigurasi environment, integrasi pihak ketiga, dan kebijakan akses. Dokumen ini ditujukan untuk platform admin dan IT operations yang bertanggung jawab atas tata kelola sistem.",
    author: "Platform Engineering",
    readTime: "25 menit baca",
    pages: 38,
    fileSize: "5.1 MB",
    language: "Bahasa Indonesia",
    version: "v1.8",
    tags: ["Admin", "Configuration", "SOP"],
    viewer: "pdf",
  },
  {
    slug: "security-and-compliance",
    cover: securityCover,
    category: "Policy",
    title: "Security & Compliance",
    desc: "Guidelines covering data handling, audits, and incident response.",
    type: "Policy · PDF",
    fileType: "PDF",
    date: "Apr 09, 2026",
    longDesc:
      "Pedoman keamanan dan kepatuhan yang mencakup penanganan data, prosedur audit, serta protokol respons insiden. Wajib dibaca oleh seluruh karyawan dan kontraktor sebelum mengakses data produksi.",
    author: "Security Office",
    readTime: "20 menit baca",
    pages: 30,
    fileSize: "4.2 MB",
    language: "Bahasa Indonesia",
    version: "v3.0",
    tags: ["Security", "Compliance", "Policy"],
    viewer: "pdf",
  },
  {
    slug: "team-roles-and-permissions",
    cover: onboardingCover,
    category: "Onboarding",
    title: "Team roles & permissions",
    desc: "Best practices for assigning roles, approvals, and review chains.",
    type: "Manual · DOCX",
    fileType: "DOCX",
    date: "Apr 02, 2026",
    longDesc:
      "Panduan praktik terbaik untuk merancang struktur peran, alur persetujuan, dan rantai review di dalam workspace. Cocok untuk team lead dan ops manager.",
    author: "People Operations",
    readTime: "12 menit baca",
    pages: 18,
    fileSize: "2.4 MB",
    language: "Bahasa Indonesia",
    version: "v1.3",
    tags: ["Roles", "Permissions", "Governance"],
    viewer: "pdf",
  },
  {
    slug: "integration-setup-playbook",
    cover: setupCover,
    category: "Setup",
    title: "Integration setup playbook",
    desc: "Connect KRISNApedia to your stack — SSO, storage, and search.",
    type: "Playbook · Slides",
    fileType: "Slides",
    date: "Mar 25, 2026",
    longDesc:
      "Playbook visual untuk menghubungkan KRISNApedia dengan SSO, storage provider, dan mesin pencari enterprise. Setiap modul disertai checklist verifikasi.",
    author: "Solutions Engineering",
    readTime: "30 menit baca",
    pages: 46,
    fileSize: "7.8 MB",
    language: "Bahasa Indonesia",
    version: "v2.1",
    tags: ["Integration", "SSO", "Playbook"],
    viewer: "slides",
  },
  {
    slug: "data-retention-guidelines",
    cover: securityCover,
    category: "Policy",
    title: "Data retention guidelines",
    desc: "How long to keep records, where to archive, and when to purge.",
    type: "Policy · PDF",
    fileType: "PDF",
    date: "Mar 18, 2026",
    longDesc:
      "Panduan retensi data yang menjelaskan periode penyimpanan, prosedur arsip, dan kriteria penghapusan untuk berbagai kelas dokumen.",
    author: "Security Office",
    readTime: "10 menit baca",
    pages: 16,
    fileSize: "2.1 MB",
    language: "Bahasa Indonesia",
    version: "v1.5",
    tags: ["Data", "Retention", "Policy"],
    viewer: "pdf",
  },
  {
    slug: "editor-and-contributor-handbook",
    cover: onboardingCover,
    category: "Onboarding",
    title: "Editor & contributor handbook",
    desc: "Style, tone, and workflow guidance for content contributors.",
    type: "Manual · PDF",
    fileType: "PDF",
    date: "Mar 11, 2026",
    longDesc:
      "Handbook untuk editor dan kontributor: gaya bahasa, struktur konten, alur kerja review, hingga panduan publikasi. Disertai contoh sebelum dan sesudah penyuntingan.",
    author: "Editorial Team",
    readTime: "18 menit baca",
    pages: 28,
    fileSize: "3.9 MB",
    language: "Bahasa Indonesia",
    version: "v2.0",
    tags: ["Editorial", "Style", "Workflow"],
    viewer: "pdf",
  },
  {
    slug: "workspace-customization",
    cover: setupCover,
    category: "Setup",
    title: "Workspace customization",
    desc: "Theming, navigation, and layout settings for your workspace.",
    type: "SOP · DOCX",
    fileType: "DOCX",
    date: "Mar 04, 2026",
    longDesc:
      "Petunjuk operasional untuk menyesuaikan tema, navigasi, dan tata letak workspace agar selaras dengan brand internal organisasi.",
    author: "Platform Engineering",
    readTime: "8 menit baca",
    pages: 14,
    fileSize: "1.8 MB",
    language: "Bahasa Indonesia",
    version: "v1.2",
    tags: ["Customization", "Theming", "SOP"],
    viewer: "pdf",
  },
  {
    slug: "incident-response-runbook",
    cover: securityCover,
    category: "Policy",
    title: "Incident response runbook",
    desc: "Step-by-step actions for security and availability incidents.",
    type: "Runbook · Slides",
    fileType: "Slides",
    date: "Feb 24, 2026",
    longDesc:
      "Runbook langkah demi langkah untuk merespons insiden keamanan dan ketersediaan layanan. Dilengkapi diagram eskalasi dan template komunikasi.",
    author: "Security Office",
    readTime: "22 menit baca",
    pages: 34,
    fileSize: "5.6 MB",
    language: "Bahasa Indonesia",
    version: "v2.2",
    tags: ["Incident", "Runbook", "Security"],
    viewer: "slides",
  },
];

export function getManualBySlug(slug: string): Manual | undefined {
  return manuals.find((m) => m.slug === slug);
}
