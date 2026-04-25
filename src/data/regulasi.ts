import uuCover from "@/assets/regulasi-uu.jpg";
import perpresCover from "@/assets/regulasi-perpres.jpg";
import sopCover from "@/assets/regulasi-sop.jpg";

export type RegulasiFileType = "PDF" | "DOCX" | "Web";
export type RegulasiViewer = "pdf" | "slides" | "image" | "video" | "web";

export type Regulasi = {
  slug: string;
  cover: string;
  category: string;
  title: string;
  desc: string;
  type: string;
  fileType: RegulasiFileType;
  date: string;
  // Detail-page fields
  longDesc: string;
  author: string;
  readTime: string;
  pages?: number;
  fileSize: string;
  language: string;
  jurisdiction: string;
  effectiveDate: string;
  status: string;
  tags: string[];
  viewer: RegulasiViewer;
  videoSrc?: string;
};

export const regulations: Regulasi[] = [
  {
    slug: "uu-11-2020-cipta-kerja",
    cover: uuCover,
    category: "Undang-Undang",
    title: "UU No. 11 Tahun 2020 tentang Cipta Kerja",
    desc: "Dasar hukum penyederhanaan regulasi untuk peningkatan investasi dan ketenagakerjaan.",
    type: "Undang-Undang · PDF",
    fileType: "PDF",
    date: "02 Nov 2020",
    longDesc:
      "Undang-Undang Cipta Kerja merupakan kebijakan omnibus law yang menyederhanakan regulasi lintas sektor untuk mendorong investasi, menciptakan lapangan kerja, dan meningkatkan daya saing nasional. Dokumen ini menjadi rujukan utama bagi kementerian/lembaga dalam menyelaraskan peraturan turunan.",
    author: "Pemerintah Republik Indonesia",
    readTime: "45 menit baca",
    pages: 1187,
    fileSize: "12.4 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Nasional",
    effectiveDate: "02 November 2020",
    status: "Berlaku",
    tags: ["Cipta Kerja", "Investasi", "Ketenagakerjaan"],
    viewer: "pdf",
  },
  {
    slug: "perpres-39-2019-satu-data",
    cover: perpresCover,
    category: "Peraturan Presiden",
    title: "Perpres No. 39 Tahun 2019 tentang Satu Data Indonesia",
    desc: "Tata kelola data pemerintah agar akurat, mutakhir, terpadu, dan dapat dipertanggungjawabkan.",
    type: "Peraturan Presiden · PDF",
    fileType: "PDF",
    date: "17 Jun 2019",
    longDesc:
      "Perpres Satu Data Indonesia mengatur penyelenggaraan tata kelola data pemerintah yang akurat, mutakhir, terpadu, dapat dibagipakaikan, serta dapat dipertanggungjawabkan. Mendorong interoperabilitas data antar instansi melalui standar dan metadata yang seragam.",
    author: "Sekretariat Kabinet RI",
    readTime: "20 menit baca",
    pages: 38,
    fileSize: "1.8 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Nasional",
    effectiveDate: "17 Juni 2019",
    status: "Berlaku",
    tags: ["Satu Data", "Tata Kelola", "Interoperabilitas"],
    viewer: "pdf",
  },
  {
    slug: "sop-pengelolaan-dokumen-regulasi",
    cover: sopCover,
    category: "SOP Internal",
    title: "SOP Pengelolaan Dokumen Regulasi",
    desc: "Prosedur baku pencatatan, peninjauan, dan distribusi dokumen regulasi internal.",
    type: "Standar Prosedur · DOCX",
    fileType: "DOCX",
    date: "12 Mar 2026",
    longDesc:
      "Standar Operasional Prosedur ini menetapkan alur baku pencatatan, peninjauan berkala, dan distribusi dokumen regulasi internal. Dilengkapi peran-tanggung jawab unit, formulir kendali versi, serta checklist verifikasi mutu dokumen.",
    author: "Biro Hukum & Tata Kelola",
    readTime: "12 menit baca",
    pages: 22,
    fileSize: "2.1 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Internal",
    effectiveDate: "12 Maret 2026",
    status: "Aktif",
    tags: ["SOP", "Dokumen", "Tata Kelola"],
    viewer: "pdf",
  },
  {
    slug: "uu-14-2008-keterbukaan-informasi",
    cover: uuCover,
    category: "Undang-Undang",
    title: "UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik",
    desc: "Jaminan hak warga negara untuk memperoleh informasi publik secara cepat dan tepat waktu.",
    type: "Undang-Undang · PDF",
    fileType: "PDF",
    date: "30 Apr 2008",
    longDesc:
      "Undang-Undang Keterbukaan Informasi Publik menjamin hak warga negara untuk memperoleh informasi publik dengan cepat, tepat waktu, biaya ringan, dan cara sederhana. Mengatur kewajiban badan publik dalam menyediakan dan mengumumkan informasi.",
    author: "Pemerintah Republik Indonesia",
    readTime: "25 menit baca",
    pages: 64,
    fileSize: "2.6 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Nasional",
    effectiveDate: "30 April 2010",
    status: "Berlaku",
    tags: ["KIP", "Transparansi", "Hak Publik"],
    viewer: "pdf",
  },
  {
    slug: "permenkeu-62-2023-tata-kelola-anggaran",
    cover: perpresCover,
    category: "Peraturan Menteri",
    title: "Permenkeu No. 62/PMK.01/2023 Tata Kelola Anggaran",
    desc: "Pedoman tata kelola perencanaan dan pelaksanaan anggaran kementerian/lembaga.",
    type: "Peraturan Menteri · PDF",
    fileType: "PDF",
    date: "21 Jun 2023",
    longDesc:
      "Permenkeu ini menjadi pedoman tata kelola perencanaan, pelaksanaan, dan pertanggungjawaban anggaran kementerian/lembaga. Mencakup prinsip akuntabilitas, kontrol internal, dan pelaporan kinerja keuangan.",
    author: "Kementerian Keuangan RI",
    readTime: "30 menit baca",
    pages: 86,
    fileSize: "4.3 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Nasional",
    effectiveDate: "21 Juni 2023",
    status: "Berlaku",
    tags: ["Anggaran", "Keuangan", "Pedoman"],
    viewer: "pdf",
  },
  {
    slug: "sop-pengarsipan-digital",
    cover: sopCover,
    category: "SOP Internal",
    title: "SOP Pengarsipan Digital KRISNApedia",
    desc: "Alur pengarsipan dokumen digital lintas unit dengan standar keamanan dan retensi.",
    type: "Standar Prosedur · DOCX",
    fileType: "DOCX",
    date: "08 Feb 2026",
    longDesc:
      "SOP Pengarsipan Digital KRISNApedia menjelaskan alur penyimpanan, klasifikasi, dan retensi dokumen digital antar unit. Memuat standar penamaan file, struktur folder, level akses, dan jadwal pemusnahan dokumen.",
    author: "Unit Manajemen Arsip",
    readTime: "10 menit baca",
    pages: 18,
    fileSize: "1.6 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Internal",
    effectiveDate: "08 Februari 2026",
    status: "Aktif",
    tags: ["Arsip", "Digital", "Retensi"],
    viewer: "pdf",
  },
  {
    slug: "perpres-95-2018-spbe",
    cover: perpresCover,
    category: "Peraturan Presiden",
    title: "Perpres No. 95 Tahun 2018 Sistem Pemerintahan Berbasis Elektronik",
    desc: "Kerangka kerja SPBE nasional untuk mewujudkan birokrasi yang efektif dan transparan.",
    type: "Peraturan Presiden · PDF",
    fileType: "PDF",
    date: "05 Okt 2018",
    longDesc:
      "Perpres SPBE menetapkan kerangka kerja sistem pemerintahan berbasis elektronik nasional yang terintegrasi dan aman. Mendorong layanan publik digital, manajemen data terpadu, dan tata kelola TIK pemerintah.",
    author: "Sekretariat Kabinet RI",
    readTime: "28 menit baca",
    pages: 72,
    fileSize: "3.5 MB",
    language: "Bahasa Indonesia",
    jurisdiction: "Nasional",
    effectiveDate: "05 Oktober 2018",
    status: "Berlaku",
    tags: ["SPBE", "Digitalisasi", "Birokrasi"],
    viewer: "pdf",
  },
  {
    slug: "permendagri-70-2019-sipd",
    cover: uuCover,
    category: "Peraturan Menteri",
    title: "Permendagri No. 70 Tahun 2019 Sistem Informasi Pemerintahan Daerah",
    desc: "Pedoman penyelenggaraan SIPD untuk mendukung tata kelola pemerintahan daerah.",
    type: "Peraturan Menteri · Web",
    fileType: "Web",
    date: "30 Sep 2019",
    longDesc:
      "Permendagri ini mengatur penyelenggaraan Sistem Informasi Pemerintahan Daerah (SIPD) sebagai platform terintegrasi untuk perencanaan, keuangan, dan pelaporan kinerja pemerintah daerah.",
    author: "Kementerian Dalam Negeri RI",
    readTime: "22 menit baca",
    fileSize: "—",
    language: "Bahasa Indonesia",
    jurisdiction: "Nasional",
    effectiveDate: "30 September 2019",
    status: "Berlaku",
    tags: ["SIPD", "Daerah", "Sistem Informasi"],
    viewer: "web",
  },
  {
    slug: "sop-tinjauan-berkala-regulasi",
    cover: sopCover,
    category: "SOP Internal",
    title: "SOP Tinjauan Berkala Regulasi Internal",
    desc: "Mekanisme review tahunan untuk memastikan regulasi internal tetap relevan.",
    type: "Standar Prosedur · Web",
    fileType: "Web",
    date: "15 Jan 2026",
    longDesc:
      "SOP ini menjelaskan mekanisme review berkala atas regulasi internal: pembentukan tim peninjau, kriteria evaluasi relevansi, alur revisi, hingga publikasi versi terbaru. Memastikan setiap regulasi tetap selaras dengan kebijakan terkini.",
    author: "Biro Hukum & Tata Kelola",
    readTime: "8 menit baca",
    fileSize: "—",
    language: "Bahasa Indonesia",
    jurisdiction: "Internal",
    effectiveDate: "15 Januari 2026",
    status: "Aktif",
    tags: ["Review", "Regulasi", "Tata Kelola"],
    viewer: "web",
  },
];

export function getRegulasiBySlug(slug: string): Regulasi | undefined {
  return regulations.find((r) => r.slug === slug);
}
