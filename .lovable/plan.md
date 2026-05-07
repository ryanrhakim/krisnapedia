
# Plan: Halaman Tentang KRISNApedia & Panduan Penggunaan

## Tujuan
1. Membuat dua halaman baru: `/tentang` dan `/panduan`.
2. Mengaktifkan tombol "Tentang" dan "Panduan" di Footer (saat ini `href="#"`).
3. Konsisten dengan design system (token semantik, font display, gradien hero), responsive, dan mendukung i18n ID/EN.

---

## 1. Halaman Tentang KRISNApedia — `/tentang`
Pendekatan: **Produk & Ekosistem**

Struktur section (top → bottom):

1. **Hero**
   - Badge "Tentang KRISNApedia" + headline besar + subjudul singkat.
   - Background `var(--gradient-hero)` (sama seperti FAQ) agar konsisten.

2. **Apa itu KRISNApedia**
   - 2 kolom: paragraf naratif + ilustrasi/logo besar.
   - Menjelaskan KRISNApedia sebagai pusat pengetahuan KRISNA (Kolaborasi Perencanaan dan Informasi Kinerja Anggaran).

3. **Ekosistem & Fitur Utama**
   - Grid 4 kartu: Pustaka Regulasi, Insight Hub, Manual Hub, Klinik KRISNA.
   - Tiap kartu: ikon (lucide), judul, deskripsi 1–2 kalimat, link ke halaman terkait.

4. **Statistik / Dampak**
   - Reuse pola `HeroStats` (jumlah dokumen, kategori, dsb.) — strip 3–4 angka.

5. **Untuk Siapa**
   - 3 kartu persona singkat: Perencana K/L, Pemerintah Daerah, Publik/Akademisi.

6. **CTA Penutup**
   - Banner "Mulai jelajahi KRISNApedia" → tombol ke `/insight-hub` & `/faq`.

7. **Footer** (reuse).

Route file: `src/routes/tentang.tsx` dengan `head()` berisi title & meta deskripsi unik.

---

## 2. Halaman Panduan Penggunaan — `/panduan`
Pendekatan: **Quickstart + Modul**

Struktur section:

1. **Hero**
   - Badge "Panduan Penggunaan" + headline + subjudul singkat.

2. **Quickstart 1-2-3**
   - 3 kartu langkah berurutan dengan nomor besar:
     1. Cari konten lewat search/kategori
     2. Buka & baca/unduh dokumen
     3. Tanya ke Klinik KRISNA jika perlu

3. **Panduan per Modul** (kategori per modul)
   - 4 blok (Pustaka Regulasi, Insight Hub, Manual Hub, Klinik KRISNA).
   - Tiap blok: ikon + judul + 3–5 langkah singkat (numbered list) + tombol "Buka modul".
   - Layout zigzag (alternating left/right) di desktop, stacked di mobile.

4. **Tips & Trik**
   - Grid 3 kartu kecil: shortcut search (⌘K), filter & sort, language switcher.

5. **Butuh bantuan lebih?**
   - CTA banner ke `/faq` (Klinik KRISNA) + email `krisna@bappenas.go.id`.

6. **Footer** (reuse).

Route file: `src/routes/panduan.tsx` dengan `head()` unik.

---

## 3. Aktifkan link Footer
Edit `src/components/site/Footer.tsx`:
- Ubah item "about" dan "guide" dari `href: "#"` menjadi `to: "/tentang"` dan `to: "/panduan"` agar dirender sebagai `<Link>` TanStack Router (sudah ada cabang `l.to` di JSX).

Tambahkan juga link "Tentang" & "Panduan" pada Navbar? **Tidak** — menjaga navbar tetap ringkas; akses via Footer sesuai permintaan.

---

## 4. Internationalization (ID/EN)
Tambahkan key baru di `src/i18n/translations.ts` untuk semua teks halaman Tentang & Panduan (judul section, deskripsi, label tombol, langkah quickstart, dll). Komponen memakai `useT()`.

Contoh prefix key: `about.*` dan `guide.*`.

---

## 5. Detail Teknis
- **Routing**: TanStack Start file-based routing → `src/routes/tentang.tsx` & `src/routes/panduan.tsx` (plugin akan auto-generate `routeTree.gen.ts`).
- **SEO**: `head()` per route dengan title, description, og:title, og:description unik.
- **Komponen**: gunakan kembali `Navbar`, `Footer`, pola Card dari shadcn, ikon `lucide-react`, token warna dari `src/styles.css` (`--primary`, `--primary-soft`, `--gradient-hero`, `--shadow-soft`).
- **Responsif**: grid `md:grid-cols-2` / `lg:grid-cols-4`, container `max-w-7xl px-6`.
- **Konten**: hardcoded di komponen (mudah diedit nanti, bisa dimigrasi ke Sanity di iterasi berikutnya).

---

## File yang akan diubah/dibuat
- create `src/routes/tentang.tsx`
- create `src/routes/panduan.tsx`
- edit `src/components/site/Footer.tsx` (aktifkan link)
- edit `src/i18n/translations.ts` (tambah key ID/EN)
