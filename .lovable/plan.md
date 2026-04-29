## Pembaruan Copywriting Home Page

Perubahan teks dan struktur kecil pada empat komponen. Tidak ada perubahan logika, query, atau styling lain.

---

### 1. `src/components/site/Hero.tsx`

**Headline** — 2 baris dengan warna berbeda:
- Baris 1: `Satu portal untuk semua hal` (warna foreground/hitam)
- Baris 2: `tentang KRISNA` (warna primary, dibungkus `<span className="text-primary">`)

**Deskripsi** — diganti menjadi singkat (akan natural wrap ke 2 baris pada `max-w-xl`):
> "Temukan seluruh pengetahuan tentang KRISNA lebih cepat, terstruktur, dan terpusat."

---

### 2. `src/components/site/InsightHub.tsx`

**Headline** — pecah menjadi 2 baris eksplisit dengan `<br />`:
> "Berbagi wawasan dan pembelajaran" / "pemanfaatan KRISNA."

**Hapus** link "Lihat seluruh insight →" di kanan atas section header. CTA card terakhir ("Jelajahi Seluruh Insight") tetap.

---

### 3. `src/components/site/ManualHub.tsx`

**Headline** — pecah menjadi 2 baris eksplisit:
> "Seluruh manual KRISNA, terdokumentasi" / "dalam satu portal."

**Deskripsi** — diperpendek menjadi maksimal 3 baris:
> "Kumpulan panduan operasional dan prosedur teknis berbagai subsistem KRISNA untuk mendukung perencanaan pembangunan."

**Hapus** link "Buka pustaka manual →" di kanan atas section header. CTA card terakhir ("Lihat Seluruh Manual") tetap.

---

### 4. `src/components/site/Footer.tsx`

Kolom **Dukungan** — ubah label (href tidak berubah):
- `About` → `Tentang KRISNApedia`
- `User Guide` → `Panduan Penggunaan`
- `Contact Us` → `Hubungi Kami` (mailto tetap ke `krisna@bappenas.go.id`)

`FAQ` tidak berubah.

---

### Catatan
- Semua perubahan murni di JSX text + penghapusan satu elemen `<Link>` per section (Insight & Manual).
- Tidak ada perubahan ke Sanity schema, routing, data fetching, atau Tailwind classes.
- Import `Link` di Insight/Manual Hub tetap dipakai untuk card item & CTA card, jadi tidak perlu dihapus.
