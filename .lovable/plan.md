## Tujuan
Membuat tag status **"Terbaru"** terlihat berbeda dari tag **kategori** pada content card dan halaman detail. Warna tag "Terbaru" akan beralih dari oranye ke palet hijau (konsep "toggle on") yang tetap selaras dengan warna brand KRISNApedia.

## Analisis singkat
Saat ini:
- **Tag kategori**: `bg-background/90 text-primary` → latar terang, teks oranye.
- **Tag "Terbaru"**: `bg-primary/15 text-[var(--primary-deep)]` → latar oranye muda, teks oranye tua.

Keduanya masih dalam keluarga oranye, sehingga sulit dibedakan. Kategori tetap menggunakan warna brand oranye, sementara status "Terbaru" akan dialihkan ke hijau.

## Rencana implementasi

### 1. Tambahkan token warna hijau ke design system
File: `src/styles.css`

- Tambahkan variabel `--status-new` (hijau) dan `--status-new-foreground` di dalam blok `:root` dan `.dark` menggunakan format `oklch`.
- Pilih nuansa hijau yang harmonis dengan oranye brand — arahnya ke **emerald-teal** yang segar namun tidak bertabrakan dengan oranye.
- Daftarkan token di `@theme inline` agar bisa dipakai sebagai utility Tailwind, misalnya `bg-status-new`, `text-status-new`.

### 2. Update komponen `StatusBadge.tsx`

- Ganti styling status `"Terbaru"` dari oranye menjadi hijau menggunakan token baru.
- Sesuaikan juga warna dot indicator di sebelah label.
- Status "Aktif" dan "Arsip" tetap seperti sekarang.

### 3. Pastikan kontras di kedua mode tema

- Verifikasi warna hijau memiliki kontras yang cukup baik di latar terang (light) maupun gelap (dark).
- Jika diperlukan, tambahkan varian dark yang sedikit lebih terang agar badge tetap terbaca.

### 4. Validasi visual

- Cek tampilan tag "Terbaru" di content card homepage (`InsightHub`, `ManualHub`) dan halaman listing (`insight-hub`, `manual-hub`, `pustaka-regulasi`).
- Cek juga di halaman detail masing-masing konten.
- Pastikan tag kategori tetap oranye dan tag "Terbaru" sekarang hijau, sehingga perbedaannya jelas.

## Catatan
- Tidak mengubah struktur data atau schema Sanity.
- Tidak mengubah warna tag kategori, hanya membedakan warna status "Terbaru".
- Perubahan terbatas pada design token CSS dan komponen `StatusBadge`.