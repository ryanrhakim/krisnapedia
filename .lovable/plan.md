## Masalah

Studio Sanity gagal load: `react-is` (CJS) di-import oleh Studio sebagai default export, tapi Vite tidak pre-bundle-nya jadi ESM interop hilang → `does not provide an export named 'default'`.

Root cause: di `vite.config.ts` kita `optimizeDeps.exclude: ["sanity", ...]`. Karena `react-is` cuma sampai lewat `sanity`, ikut tidak di-prebundle.

## Perbaikan

Tambahkan `react-is` (dan `use-sync-external-store` yang biasanya kena masalah interop CJS serupa di Studio) ke `optimizeDeps.include` di `vite.config.ts`:

```ts
optimizeDeps: {
  exclude: ["sanity", "@sanity/vision", "styled-components"],
  include: ["react-is", "use-sync-external-store/shim/with-selector"],
},
```

Hanya satu file yang berubah: `vite.config.ts`. Setelah restart dev server, error hilang.
