/**
 * UI translations for KRISNApedia.
 * Only static UI chrome is translated. Dynamic content from Sanity
 * (titles, descriptions of insights/manuals/regulations) is shown as-is.
 */

export const id = {
  // Navbar
  "nav.regulasi": "Pustaka Regulasi",
  "nav.insight": "Insight Hub",
  "nav.manual": "Manual Hub",
  "nav.klinik": "Klinik KRISNA",
  "nav.search": "Cari",
  "nav.switchLang": "Ganti bahasa",
  "nav.lang.id": "Bahasa Indonesia",
  "nav.lang.en": "English",

  // Hero
  "hero.badge": "Sistem Manajemen Pengetahuan",
  "hero.title1": "Seluruh Pengetahuan KRISNA",
  "hero.title2": "dalam Satu Portal",
  "hero.subtitleA": "Temukan materi, manual, dan berbagai pengetahuan tentang KRISNA",
  "hero.subtitleB": "lebih cepat, terstruktur, dan terpusat.",
  "hero.searchPlaceholder": "Cari regulasi, manual, atau topik KRISNA lainnya…",
  "hero.searchAria": "Cari di KRISNApedia",
  "hero.searchCta": "Telusuri",

  // HeroStats
  "stats.docs": "Dokumen",
  "stats.categories": "Kategori",
  "stats.updated": "Terakhir diperbarui",

  // InsightHub section
  "insight.eyebrow": "Insight Hub",
  "insight.heading1": "Berbagi wawasan dan pembelajaran",
  "insight.heading2": "pemanfaatan KRISNA.",
  "insight.lead":
    "Kumpulan materi bimbingan teknis, sosialisasi, kajian, evaluasi, dan berbagai informasi pendukung untuk memperluas pemahaman pengguna terhadap Sistem Informasi KRISNA.",
  "insight.exploreTitle": "Jelajahi Seluruh Insight",
  "insight.exploreDesc": "Telusuri seluruh materi pembelajaran dan informasi pendukung KRISNA.",
  "insight.viewAll": "Lihat Semua →",

  // ManualHub section
  "manual.eyebrow": "Manual Hub",
  "manual.heading1": "Seluruh manual KRISNA, terdokumentasi",
  "manual.heading2": "dalam satu portal.",
  "manual.lead":
    "Kumpulan panduan operasional dan prosedur teknis berbagai subsistem KRISNA untuk mendukung perencanaan pembangunan.",
  "manual.exploreTitle": "Lihat Seluruh Manual",
  "manual.exploreDesc": "Akses seluruh panduan teknis dan dokumentasi penggunaan KRISNA.",
  "manual.viewAll": "Telusuri Manual →",

  // FAQ section
  "faq.eyebrow": "FAQ",
  "faq.heading": "Butuh bantuan? Temukan jawabannya di sini.",
  "faq.lead":
    "Informasi singkat mengenai penggunaan KRISNApedia, akses dokumen, serta pertanyaan umum terkait pemanfaatan Sistem Informasi KRISNA.",
  "faq.viewMore": "Lihat FAQ Lainnya",

  // Footer
  "footer.menuTitle": "Menu Utama",
  "footer.supportTitle": "Dukungan",
  "footer.faq": "FAQ",
  "footer.about": "Tentang KRISNApedia",
  "footer.guide": "Panduan Penggunaan",
  "footer.contact": "Hubungi Kami",
  "footer.tagline":
    "Platform manajemen pengetahuan terintegrasi yang menghimpun regulasi, panduan teknis, dan materi pembelajaran untuk mendukung pemanfaatan Sistem Informasi KRISNA.",
  "footer.rights": "© 2026 KRISNApedia. All rights reserved.",
  "footer.privacy": "Privasi",
  "footer.terms": "Ketentuan",
  "footer.cookies": "Kebijakan Cookie",

  // Search palette
  "search.placeholder": "Cari insight, manual, regulasi, atau FAQ...",
  "search.startTyping": "Mulai mengetik untuk mencari di seluruh KRISNApedia.",
  "search.escHint": "untuk menutup.",
  "search.pressEsc": "Tekan",
  "search.loading": "Memuat hasil...",
  "search.noResults": "Tidak ada hasil untuk",
  "search.group.insight": "Insight Hub",
  "search.group.manual": "Manual Hub",
  "search.group.regulasi": "Pustaka Regulasi",
  "search.group.faq": "FAQ",

  // Common filter labels (used across list pages)
  "filter.insights": "Filter insights",
  "filter.manuals": "Filter manuals",
  "filter.regulations": "Filter regulasi",
  "filter.searchInsight": "Cari judul insight…",
  "filter.searchManual": "Cari judul manual…",
  "filter.searchRegulation": "Cari judul regulasi…",
  "filter.fileType": "Tipe File",
  "filter.allFileTypes": "Semua tipe file",
  "filter.category": "Kategori",
  "filter.allCategories": "Semua kategori",
  "filter.reset": "Reset",
  "filter.resetFilter": "Reset filter",
  "filter.showing": "Menampilkan",
  "filter.of": "dari",
  "filter.filteredFrom": "difilter dari",
  "filter.sortBy": "Urutkan",
  "filter.sort.newest": "Terbaru",
  "filter.sort.oldest": "Terlama",
  "filter.sort.titleAsc": "Judul A–Z",
  "filter.sort.titleDesc": "Judul Z–A",
  "filter.empty.insight": "Tidak ada insight yang cocok.",
  "filter.empty.manual": "Tidak ada manual yang cocok.",
  "filter.empty.regulation": "Tidak ada regulasi yang cocok.",
  "filter.emptyHint": "Coba ubah kata kunci atau filter Anda.",

  // CategoryTabs
  "tabs.all": "Semua",

  // Insight/Manual/Regulasi list page hero
  "page.insight.eyebrow": "Insight Hub",
  "page.insight.title": "Beragam wawasan dan penguatan pemahaman KRISNA, dalam satu ruang.",
  "page.insight.lead":
    "Akses materi bimbingan teknis, bahan sosialisasi, laporan evaluasi, hasil survei, serta berbagai konten pengetahuan yang mendukung peningkatan pemahaman dan pemanfaatan Sistem Informasi KRISNA.",
  "page.manual.eyebrow": "Manual Hub",
  "page.regulasi.eyebrow": "Pustaka Regulasi",

  // Units
  "unit.insight": "insight",
  "unit.manual": "manual",
  "unit.regulasi": "regulasi",
} as const;

export type TranslationKey = keyof typeof id;

export const en: Record<TranslationKey, string> = {
  // Navbar
  "nav.regulasi": "Regulation Library",
  "nav.insight": "Insight Hub",
  "nav.manual": "Manual Hub",
  "nav.klinik": "Klinik KRISNA",
  "nav.search": "Search",
  "nav.switchLang": "Switch language",
  "nav.lang.id": "Bahasa Indonesia",
  "nav.lang.en": "English",

  // Hero
  "hero.badge": "Knowledge Management System",
  "hero.title1": "All KRISNA Knowledge",
  "hero.title2": "in One Portal",
  "hero.subtitleA": "Discover materials, manuals, and knowledge about KRISNA",
  "hero.subtitleB": "faster, more structured, and centralized.",
  "hero.searchPlaceholder": "Search for regulations, manuals, or other KRISNA topics…",
  "hero.searchAria": "Search KRISNApedia",
  "hero.searchCta": "Search",

  // HeroStats
  "stats.docs": "Documents",
  "stats.categories": "Categories",
  "stats.updated": "Last updated",

  // InsightHub section
  "insight.eyebrow": "Insight Hub",
  "insight.heading1": "Sharing insights and learnings",
  "insight.heading2": "for using KRISNA.",
  "insight.lead":
    "A collection of technical guidance, dissemination, studies, evaluations, and supporting information to broaden user understanding of the KRISNA Information System.",
  "insight.exploreTitle": "Explore All Insights",
  "insight.exploreDesc": "Browse all learning materials and supporting information for KRISNA.",
  "insight.viewAll": "View All →",

  // ManualHub section
  "manual.eyebrow": "Manual Hub",
  "manual.heading1": "All KRISNA manuals, documented",
  "manual.heading2": "in one portal.",
  "manual.lead":
    "A collection of operational guides and technical procedures across KRISNA subsystems to support development planning.",
  "manual.exploreTitle": "View All Manuals",
  "manual.exploreDesc": "Access all technical guides and usage documentation for KRISNA.",
  "manual.viewAll": "Browse Manuals →",

  // FAQ section
  "faq.eyebrow": "FAQ",
  "faq.heading": "Need help? Find your answers here.",
  "faq.lead":
    "Quick information about using KRISNApedia, accessing documents, and common questions about the KRISNA Information System.",
  "faq.viewMore": "See More FAQs",

  // Footer
  "footer.menuTitle": "Main Menu",
  "footer.supportTitle": "Support",
  "footer.faq": "FAQ",
  "footer.about": "About KRISNApedia",
  "footer.guide": "User Guide",
  "footer.contact": "Contact Us",
  "footer.tagline":
    "An integrated knowledge management platform that brings together regulations, technical guides, and learning materials to support the use of the KRISNA Information System.",
  "footer.rights": "© 2026 KRISNApedia. All rights reserved.",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.cookies": "Cookie Policy",

  // Search palette
  "search.placeholder": "Search insights, manuals, regulations, or FAQ...",
  "search.startTyping": "Start typing to search across KRISNApedia.",
  "search.escHint": "to close.",
  "search.pressEsc": "Press",
  "search.loading": "Loading results...",
  "search.noResults": "No results for",
  "search.group.insight": "Insight Hub",
  "search.group.manual": "Manual Hub",
  "search.group.regulasi": "Regulation Library",
  "search.group.faq": "FAQ",

  // Filter labels
  "filter.insights": "Filter insights",
  "filter.manuals": "Filter manuals",
  "filter.regulations": "Filter regulations",
  "filter.searchInsight": "Search insight title…",
  "filter.searchManual": "Search manual title…",
  "filter.searchRegulation": "Search regulation title…",
  "filter.fileType": "File Type",
  "filter.allFileTypes": "All file types",
  "filter.category": "Category",
  "filter.allCategories": "All categories",
  "filter.reset": "Reset",
  "filter.resetFilter": "Reset filter",
  "filter.showing": "Showing",
  "filter.of": "of",
  "filter.filteredFrom": "filtered from",
  "filter.sortBy": "Sort",
  "filter.sort.newest": "Newest",
  "filter.sort.oldest": "Oldest",
  "filter.sort.titleAsc": "Title A–Z",
  "filter.sort.titleDesc": "Title Z–A",
  "filter.empty.insight": "No insights match your filters.",
  "filter.empty.manual": "No manuals match your filters.",
  "filter.empty.regulation": "No regulations match your filters.",
  "filter.emptyHint": "Try changing your keywords or filters.",

  // CategoryTabs
  "tabs.all": "All",

  // List page hero
  "page.insight.eyebrow": "Insight Hub",
  "page.insight.title": "A wide range of insights and deeper understanding of KRISNA, in one place.",
  "page.insight.lead":
    "Access technical guidance, dissemination materials, evaluation reports, survey results, and other knowledge content that supports better understanding and use of the KRISNA Information System.",
  "page.manual.eyebrow": "Manual Hub",
  "page.regulasi.eyebrow": "Regulation Library",

  // Units
  "unit.insight": "insights",
  "unit.manual": "manuals",
  "unit.regulasi": "regulations",
};

export const dictionaries = { id, en };
export type LangCode = keyof typeof dictionaries;
