## Tujuan
Saat `viewer === "slides"`, Content Viewer harus menampilkan **file PPTX/PDF asli** dari Sanity, bukan mockup berbasis cover image.

## Strategi
- **PPTX/PPT** → embed via `https://view.officeapps.live.com/op/embed.aspx?src=<encoded-file-url>` (Office Online — gratis, tanpa setup, render PPTX asli di iframe).
- **PDF** (kalau admin upload PDF tapi set viewer ke "slides") → pakai PDF iframe yang sudah jalan.
- **Tidak ada file** → tetap fallback ke `DocumentPreview` mockup lama (supaya konten lama tidak rusak).

## Perubahan kode

### 1. `src/lib/sanity.ts`
Tambah helper `fileExtension(file)` yang mengekstrak ekstensi (`pdf`, `pptx`, `ppt`, dll) dari `asset._ref` atau `asset.url`. Dipakai untuk auto-detect.

### 2. `src/components/site/ContentViewer.tsx`
Refactor branch `viewer === "slides"` (sekarang baris 99–100) jadi:

```tsx
if (item.viewer === "slides") {
  const slidesUrl = fileUrl(item.file);
  const ext = fileExtension(item.file).toLowerCase();

  if (slidesUrl && ext === "pdf") {
    // Reuse PDF iframe block (extract jadi helper <PdfFrame /> agar tidak duplikat)
    return <PdfFrame url={slidesUrl} title={item.title} label="SLIDES" />;
  }

  if (slidesUrl && (ext === "pptx" || ext === "ppt")) {
    const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(slidesUrl)}`;
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-2 border-b border-background/10 bg-foreground px-4 py-3 text-xs text-background/80">
          <span className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">SLIDES</span>
          <span className="truncate">{item.title}</span>
        </div>
        <iframe
          src={officeUrl}
          title={item.title}
          allowFullScreen
          className="h-[720px] w-full bg-card"
        />
      </div>
    );
  }

  // No file uploaded yet → keep existing mockup
  return <DocumentPreview item={item} cover={cover} />;
}
```

Sekaligus extract block PDF (baris 78–97) jadi komponen `PdfFrame` supaya bisa direuse oleh branch `pdf` & `slides`.

### 3. Sanity CORS — sudah aman
Office Online Viewer fetch file dari URL publik Sanity CDN (`cdn.sanity.io/files/...`) — tidak butuh CORS tambahan. File Sanity default sudah public-readable, jadi tidak perlu konfigurasi tambahan.

## Catatan untuk admin (akan saya tulis di pesan setelah implementasi)
- Office Online butuh file **bisa diakses publik via HTTPS** → file Sanity default sudah memenuhi.
- File besar (>10 MB) load agak lambat — normal.
- Kalau Office Online down (jarang, tapi pernah), iframe akan kosong; admin bisa fallback ke download tombol yang sudah ada.

## QA setelah implementasi
1. Buka 1 insight tipe slides yang sudah Anda upload PPTX-nya → cek slide ter-render di iframe.
2. Buka 1 insight tipe slides yang belum ada file → cek mockup lama tetap muncul (tidak crash).
3. Buka insight tipe pdf → pastikan tidak regresi.