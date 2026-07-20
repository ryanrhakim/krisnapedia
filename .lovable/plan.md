# Menampilkan Status Dokumen di Front-End

## Tujuan
Menampilkan field `status` (Aktif, Aktif Terbaru, Arsip) yang sudah ada di schema Sanity (`insight`, `manual`, `regulation`) ke UI, sehingga pengguna langsung tahu kondisi setiap dokumen.

## Rekomendasi visual

Gunakan **badge kecil berwarna semantik** — konsisten dengan bahasa desain yang sudah ada (rounded-full, uppercase tracking, warna dari design token):

- **Aktif Terbaru** → badge primary (oranye KRISNA) — menonjol, menandai konten baru/segar.
- **Aktif** → badge netral hijau lembut (emerald soft) — status "sehat", tidak berteriak.
- **Arsip** → badge muted abu-abu — meredup, memberi sinyal bahwa dokumen sudah tidak aktif.

Regulation punya field terpisah `regulasiStatus` (Berlaku / Dicabut / Direvisi) — biarkan itu tetap ada sebagai info hukum, sementara badge `status` universal ditampilkan sejajar dengan kategori.

## Lokasi penempatan

1. **Content card (homepage + halaman listing Insight / Manual / Pustaka Regulasi)**
   - Tambahkan badge status di pojok kanan-atas cover, berdampingan dengan pill kategori yang sudah ada di pojok kiri-atas. Pola yang sudah dipakai `<span className="absolute left-3 top-3 ...">` tinggal dikembar di sisi kanan.
   - Sembunyikan badge saat status = "Aktif" (opsional) supaya tidak terlalu ramai — hanya tampilkan "Aktif Terbaru" dan "Arsip". Bisa dikonfirmasi (lihat pertanyaan di bawah).

2. **Halaman detail konten (`insight-hub_.$slug.tsx`, `manual-hub_.$slug.tsx`, `pustaka-regulasi_.$slug.tsx`)**
   - Tempatkan badge di header dokumen, sebaris dengan kategori / tanggal / author, agar pengguna langsung melihat status saat membuka halaman.

3. **Filter tambahan (opsional, tidak termasuk scope awal)**
   - Nanti bisa ditambah filter "Sembunyikan arsip" di halaman listing.

## Implementasi teknis

- **Komponen baru** `src/components/site/StatusBadge.tsx`
  - Props: `status?: "Aktif" | "Aktif Terbaru" | "Arsip"`.
  - Peta warna via class Tailwind + design token: `bg-primary/10 text-primary` untuk "Aktif Terbaru"; `bg-emerald-500/10 text-emerald-600 dark:text-emerald-400` untuk "Aktif"; `bg-muted text-muted-foreground` untuk "Arsip".
  - Label i18n via `useT()` (tambah key `status.aktif`, `status.baru`, `status.arsip` di `src/i18n/translations.ts`).
- **Query**: field `status` sudah termasuk di `BASE_PROJECTION` `src/lib/sanity-queries.ts` — tidak perlu ubah query.
- **Integrasi UI**:
  - `src/components/site/InsightHub.tsx`, `ManualHub.tsx` (homepage) → badge di kanan-atas cover.
  - `src/routes/insight-hub.tsx`, `manual-hub.tsx`, `pustaka-regulasi.tsx` (listing) → badge di kanan-atas cover.
  - `src/routes/insight-hub_.$slug.tsx`, `manual-hub_.$slug.tsx`, `pustaka-regulasi_.$slug.tsx` (detail) → badge di header.
- Tidak ada perubahan schema Sanity atau backend.

## Pertanyaan sebelum lanjut

1. Untuk card, apakah badge "Aktif" juga ditampilkan, atau hanya "Aktif Terbaru" dan "Arsip" (mayoritas dokumen berstatus "Aktif" — menampilkan semua bisa terasa ramai)?
2. Setuju dengan warna: **oranye primer** untuk "Aktif Terbaru", **hijau lembut** untuk "Aktif", **abu-abu muted** untuk "Arsip"? Atau ingin skema lain?
