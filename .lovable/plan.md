## Tujuan

Membuat cover image untuk **8 dokumen regulasi** di Pustaka Regulasi yang saat ini belum memiliki `coverImage`, sehingga tampilan kartu regulasi konsisten dan tidak lagi menggunakan fallback `regulasi-uu.jpg` yang sama untuk semua item.

## Daftar Regulasi yang Akan Diberi Cover

| # | Kategori | Judul Singkat |
|---|---|---|
| 1 | Undang-Undang | UU 25/2004 — Sistem Perencanaan Pembangunan Nasional |
| 2 | Undang-Undang | UU 59/2024 — RPJPN 2025–2045 |
| 3 | Peraturan Pemerintah | PP 17/2017 — Sinkronisasi Perencanaan & Penganggaran |
| 4 | Peraturan Menteri | Permen PPN 1/2021 — Tata Cara Renja K/L |
| 5 | Peraturan Menteri | Permen PPN 10/2023 — Renstra K/L 2025–2029 |
| 6 | Surat Edaran Bersama | SEB 4/2024 — KRO/RO Perencanaan & Penganggaran |
| 7 | Keputusan Menteri | KepmenPANRB 356/2024 — Aplikasi Umum Perencanaan |
| 8 | Surat Edaran Bersama | SEB 2/2025 — Daftar Program K/L |

## Arah Visual (Design Direction)

Cover akan dibuat dengan **gaya editorial-minimalist** yang konsisten dengan desain situs KRISNApedia (warna primer hangat/amber, font display), bukan foto dokumen literal. Tiap kategori mendapat **palet & motif khas** agar mudah dibedakan secara visual:

- **Undang-Undang** — Komposisi arsitektural monumental (pilar/gedung negara), palet hangat amber-cream, simbol Garuda/keadilan tersamar.
- **Peraturan Pemerintah** — Pola geometris simetris, tone biru navy lembut + amber accent, kesan formal-institusional.
- **Peraturan Menteri** — Elemen grid & dokumen abstrak, tone hangat krem dengan aksen oranye, terasa modern-birokrasi.
- **Keputusan Menteri** — Komposisi seal/stempel abstrak, tone gelap deep-blue + emas.
- **Surat Edaran Bersama** — Dua pita/elemen kolaboratif yang berpotongan, tone soft-teal + amber.

Semua cover:
- Aspect ratio **4:3** (sesuai kartu di `pustaka-regulasi.tsx`)
- Tanpa teks di atas gambar (judul sudah ditampilkan via UI)
- Ada ruang kosong di pojok kiri atas untuk badge kategori
- Style: **flat illustration / editorial graphic**, bukan foto stok

## Implementasi Teknis

1. **Skrip generator** (`/tmp/gen_regulasi_covers.py`)
   - Pakai skill `lovable_ai` dengan model `google/gemini-3-pro-image-preview` (kualitas tinggi untuk cover hero).
   - Prompt builder yang menerima `{kategori, judul}` → menghasilkan prompt sesuai mapping di atas.
   - Output PNG ke `/tmp/regulasi-covers/{slug-id}.png`.

2. **Upload ke Sanity** (`/tmp/upload_regulasi_covers.ts`)
   - Pakai `@sanity/client` dengan token tulis untuk upload asset.
   - Untuk tiap dokumen: upload PNG sebagai image asset → patch field `coverImage` pada draft → publish.
   - Jika token tidak tersedia di env, fallback: gunakan MCP Sanity (`patch_document_from_json` + `publish_documents`) per dokumen dengan asset reference yang dihasilkan.

3. **QA visual**
   - Setelah generate, tampilkan thumbnail tiap cover untuk verifikasi konsistensi palet & komposisi.
   - Jika ada cover yang melenceng dari arah visual, regenerasi item tersebut saja.

4. **Verifikasi di app**
   - Buka `/pustaka-regulasi` di preview, pastikan setiap kartu menampilkan cover unik dan badge kategori tetap terbaca.

## Yang Tidak Berubah

- Schema `regulation` di Sanity tetap sama.
- Komponen `pustaka-regulasi.tsx` tidak diubah (sudah memakai `imageUrl(item.coverImage, 800) || regulasiFallback`).
- Fallback `regulasi-uu.jpg` tetap dipertahankan untuk regulasi baru di masa depan yang belum punya cover.

## Catatan

Generasi 8 gambar berkualitas tinggi memakan waktu beberapa menit dan akan menggunakan kredit Lovable AI. Setelah persetujuan, saya akan menjalankan generate → upload → publish secara berurutan dan melaporkan hasilnya.
