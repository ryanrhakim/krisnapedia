## Goal
Integrasikan link sosial media asli pada ikon di `src/components/site/Footer.tsx`, tetap pertahankan ikon Telegram.

## Perubahan
File: `src/components/site/Footer.tsx`

1. Ganti array ikon `[Instagram, Youtube, Send]` (semua `href="#"`) menjadi list objek bernama `{ icon, href, label }`:
   - Instagram → `https://www.instagram.com/krisna_systems/`
   - YouTube → `https://www.youtube.com/@SistemInformasiKRISNA`
   - Telegram (`Send`) → tetap dipertahankan dengan `href="#"` sebagai placeholder sampai link disediakan.
2. Tambahkan atribut pada tiap `<a>`:
   - `target="_blank"` dan `rel="noopener noreferrer"` (hanya untuk yang punya URL nyata)
   - `aria-label={label}` dan `title={label}` (contoh: "Instagram", "YouTube", "Telegram")

## Tidak berubah
- Styling tombol (h-9 w-9, border, hover primary) tetap sama.
- Bagian lain dari footer tidak disentuh.

## Catatan
Saat link Telegram tersedia, tinggal isi `href` pada entry Telegram.