## Goal
Memperbarui seluruh copywriting Home Page (Hero, Insight Hub, Manual Hub, FAQ, Footer) ke Bahasa Indonesia sesuai teks baru yang diberikan. Tidak ada perubahan struktur, layout, atau logika — hanya teks.

## Perubahan per file

### 1. `src/components/site/Hero.tsx`
- Hero badge: `Know` → `Sistem Manajemen Pengetahuan`
- Headline: `One repository for / every answer.` → `Satu portal pengetahuan untuk / seluruh kebutuhan KRISNA.` (kata "seluruh kebutuhan KRISNA." tetap dibungkus `<span className="text-primary">` agar styling biru terjaga)
- Subheadline: ganti dengan teks baru tentang KRISNApedia menghimpun regulasi, manual teknis, dst.
- Placeholder input: `Search articles, manuals, SOPs...` → `Cari regulasi, manual, atau topik KRISNA lainnya…`
- Tombol search: `Search` → `Telusuri`

### 2. `src/components/site/InsightHub.tsx`
- Headline (h2): `Ideas worth sharing.` → `Berbagi wawasan dan pembelajaran pemanfaatan KRISNA.`
- Deskripsi: ganti dengan teks baru tentang materi bimtek, sosialisasi, kajian, evaluasi.
- Link kanan atas: `Browse all insights →` → `Lihat seluruh insight →`
- CTA card terakhir:
  - Judul: `Explore All Insight` → `Jelajahi Seluruh Insight`
  - Deskripsi: `Browse the full library.` → `Telusuri seluruh materi pembelajaran dan informasi pendukung KRISNA.`
  - Link: `View all →` → `Lihat Semua →`

### 3. `src/components/site/ManualHub.tsx`
- Headline (h2): `Documentation, organized.` → `Seluruh manual KRISNA, terdokumentasi dalam satu portal.`
- Deskripsi: ganti dengan teks baru tentang panduan operasional, prosedur teknis, manual subsistem KRISNA.
- Link kanan atas: `Open library →` → `Buka pustaka manual →`
- CTA card terakhir:
  - Judul: `View All Manual` → `Lihat Seluruh Manual`
  - Deskripsi: `Open the complete library.` → `Akses seluruh panduan teknis dan dokumentasi penggunaan KRISNA.`
  - Link: `Explore library →` → `Telusuri Manual →`

### 4. `src/components/site/Faq.tsx`
- Headline (h2): `Questions, answered.` → `Butuh bantuan? Temukan jawabannya di sini.`
- Deskripsi: ganti dengan teks baru tentang penggunaan KRISNApedia, akses dokumen, pertanyaan umum.
- Tombol: `More FAQ →` → `Lihat FAQ Lainnya →`

### 5. `src/components/site/Footer.tsx`
- Deskripsi di bawah logo: ganti dengan teks baru tentang platform manajemen pengetahuan terintegrasi.
- Kolom pertama `Product` → `MENU UTAMA` (sudah uppercase via CSS, tapi label tetap konsisten)
- Kolom kedua `Support` → `DUKUNGAN`
- Footer bawah kanan:
  - `Privacy` → `Privasi`
  - `Terms` → `Ketentuan`
  - `Cookies` → `Kebijakan Cookie`

## Catatan
- Tidak ada perubahan ke schema Sanity, route, atau logika query.
- Item label di kolom Support (`FAQ`, `About`, `User Guide`, `Contact Us`) tidak diubah karena tidak diminta.
- Copyright dan ikon sosial (Instagram, YouTube, Telegram) tetap.
