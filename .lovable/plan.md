## Masalah

Di Sanity Studio (`/studio`), list dokumen Insight / Manual / Regulation menampilkan error "Invalid preview config". Console log jelas:

```
The "subtitle" field should be a string, ... instead saw object with keys {_ref, _type}
```

Penyebab: setelah migrasi kategori dari string ke `reference`, `preview.select.subtitle` di tiga schema masih menunjuk ke field `category` — yang sekarang berupa objek reference, bukan string.

## Perbaikan

Ubah blok `preview` di tiga file schema agar dereference judul kategori pakai sintaks `category.title` (Sanity preview select mendukung dot-path pada reference):

- `src/sanity/schemas/insight.ts`
- `src/sanity/schemas/manual.ts`
- `src/sanity/schemas/regulation.ts`

Dari:
```ts
preview: {
  select: { title: "title", subtitle: "category", media: "coverImage" },
}
```
Menjadi:
```ts
preview: {
  select: { title: "title", subtitle: "category.title", media: "coverImage" },
}
```

Tidak ada perubahan lain — hanya konfigurasi preview Studio, tidak menyentuh query frontend atau data.
