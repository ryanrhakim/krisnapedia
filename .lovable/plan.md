## Masalah

Tombol **"Layar penuh"** di section "Pratinjau" (halaman detail Insight, Manual, Regulasi) tidak berfungsi:
- Elemen `<button>` tidak punya `onClick`.
- Class `hidden ... sm:inline-flex` menyembunyikan di mobile — tapi meski tampil di desktop, klik tidak melakukan apa-apa karena tidak ada handler.
- Tidak ada ref/target ke ContentViewer, jadi Fullscreen API belum pernah dipanggil.

## Solusi

Pindahkan tombol "Layar penuh" menjadi bagian dari `ContentViewer` sendiri (satu tempat) dan pakai **Fullscreen API browser** pada wrapper viewer.

### Perubahan

1. **`src/components/site/ContentViewer.tsx`**
   - Bungkus seluruh output viewer dengan `<div ref={containerRef} className="relative group">`.
   - Tambah tombol overlay pojok kanan atas: ikon `Maximize2` / `Minimize2` (lucide-react) dengan `aria-label="Layar penuh"`.
   - Handler: `containerRef.current?.requestFullscreen()` bila tidak fullscreen; jika sudah, `document.exitFullscreen()`.
   - Sinkronkan state dengan listener `fullscreenchange` supaya ikon berganti dan tombol tetap muncul saat fullscreen.
   - Dalam mode fullscreen tambah class `data-[fullscreen=true]:bg-background data-[fullscreen=true]:p-6` supaya iframe/preview mengisi layar dengan rapi (iframe PDF/Slides diberi `h-full` saat fullscreen; default tetap `h-[720px]`).
   - Guard SSR: cek `typeof document !== "undefined"` dan fitur `document.fullscreenEnabled` sebelum render tombol.

2. **`src/routes/insight-hub_.$slug.tsx`, `src/routes/manual-hub_.$slug.tsx`, `src/routes/pustaka-regulasi_.$slug.tsx`**
   - Hapus tombol "Layar penuh" duplikat di header section "Pratinjau" (yang sekarang tidak berfungsi). Fungsinya kini sudah ada di dalam ContentViewer.

3. **`src/i18n/translations.ts`** — tambah key `viewer.fullscreen` = "Layar penuh" / "Fullscreen" untuk aria-label (opsional, tapi konsisten dengan sistem i18n).

### Detail teknis

- Fullscreen API tersedia di Chromium, Firefox, Safari (butuh prefix `webkitRequestFullscreen` untuk Safari lama — sertakan fallback).
- Iframe pihak ketiga (YouTube, Office Online) sudah punya kontrol fullscreen sendiri, tapi tombol wrapper tetap berguna untuk memperbesar seluruh frame termasuk header.
- Ini murni frontend, tidak menyentuh Sanity/Supabase.

### File yang berubah

- `src/components/site/ContentViewer.tsx` (utama)
- `src/routes/insight-hub_.$slug.tsx` (hapus tombol lama)
- `src/routes/manual-hub_.$slug.tsx` (hapus tombol lama)
- `src/routes/pustaka-regulasi_.$slug.tsx` (hapus tombol lama)
- `src/i18n/translations.ts` (opsional, label i18n)