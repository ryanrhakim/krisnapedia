# Perbaiki error "Gagal memuat Studio" pada CMS Sanity

## Diagnosis (terverifikasi)

Saat membuka `/studio/...`, halaman menampilkan **"Gagal memuat Studio"** dengan pesan:

> The requested module '/node_modules/react/compiler-runtime.js?...' does not provide an export named 'c'

Ini adalah error Vite pre-bundle: `react-easy-crop` (dipakai `CoverImageInput`) dikompilasi dengan React Compiler dan meng-import `react/compiler-runtime`. Saat Vite melakukan dep-optimize untuk Studio, modul `react/compiler-runtime` tidak ikut di-prebundle sehingga interop ESM-nya gagal.

Fix ini sudah pernah diterapkan sebelumnya tapi entri di `vite.config.ts` tidak lengkap — `optimizeDeps.include` sekarang hanya berisi `react-is` dan `use-sync-external-store/shim/with-selector`, tanpa `react/compiler-runtime` dan `react-easy-crop`.

## Perubahan

**`vite.config.ts`** — tambahkan dua entri ke `optimizeDeps.include` agar Vite pre-bundle `react/compiler-runtime` sebagai ESM yang benar, dan `react-easy-crop` konsisten resolve ke runtime yang sama:

```ts
optimizeDeps: {
  exclude: ["sanity", "@sanity/vision", "styled-components"],
  include: [
    "react-is",
    "use-sync-external-store/shim/with-selector",
    "react/compiler-runtime",
    "react-easy-crop",
  ],
},
```

Tidak ada perubahan lain (schema/komponen `CoverImageInput` sudah benar; error murni di layer bundling).

## Verifikasi

1. Restart dev server (auto oleh Vite setelah config berubah).
2. Buka `/studio` — Studio harus render normal, tanpa layar "Gagal memuat Studio".
3. Buka satu dokumen Insight/Manual/Regulation → field **coverImage** menampilkan cropper 4:3 dengan pan & zoom bekerja.
