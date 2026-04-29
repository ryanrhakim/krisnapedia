## Reposisi ViewCount pada Content Card

Pindahkan `ViewCount` dari posisi tengah ke sebelah ikon jenis dokumen. Tanggal tetap di kanan.

### Perubahan layout meta footer kartu

Sebelum:
```text
[FileType]      [Eye+count]      [date]
```

Sesudah:
```text
[FileType]  [Eye+count]                [date]
```

### Implementasi

Bungkus `FileText + typeLabel` dan `ViewCount` ke dalam satu `div` dengan `inline-flex gap-3`, lalu biarkan `justify-between` parent memisahkannya dari `<time>`.

```tsx
<div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
  <div className="inline-flex items-center gap-3">
    <span className="inline-flex items-center gap-1.5">
      <FileText className="h-3.5 w-3.5" />
      {typeLabel}
    </span>
    <ViewCount count={viewsMap[slug]} />
  </div>
  <time>{formatDate(date)}</time>
</div>
```

### File yang diubah

- `src/components/site/InsightHub.tsx`
- `src/components/site/ManualHub.tsx`
- `src/routes/insight-hub.tsx`
- `src/routes/manual-hub.tsx`
- `src/routes/pustaka-regulasi.tsx`

Tidak ada perubahan pada database, server function, query, atau logic sorting. Murni penyesuaian markup/styling.
