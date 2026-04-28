## Goal
Mengubah label "Urutkan: Terbaru" yang saat ini statis menjadi **dropdown sort yang fungsional** di tiga halaman: Pustaka Regulasi, Insight Hub, dan Manual Hub. State sort disimpan di URL search param agar shareable, persistent saat refresh, dan kompatibel dengan paginasi yang sudah ada.

## Pilihan Urutan
Dropdown akan berisi 4 opsi yang konsisten di tiga halaman:
- **Terbaru** (default) — `date` desc
- **Terlama** — `date` asc
- **Judul A–Z** — `title` asc
- **Judul Z–A** — `title` desc

## Perubahan per File

### 1. `src/routes/pustaka-regulasi.tsx`, `src/routes/insight-hub.tsx`, `src/routes/manual-hub.tsx`
Pola perubahan identik untuk ketiganya:

**a. Search schema** — tambah param `sort`:
```ts
const SORT_VALUES = ["newest", "oldest", "title-asc", "title-desc"] as const;
const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
  sort: fallback(z.enum(SORT_VALUES), "newest").default("newest"),
});
```

**b. Baca & tulis sort via URL**:
- `const { page, sort } = Route.useSearch();`
- Helper `setSort(next)` yang memanggil `navigate({ search: (prev) => ({ ...prev, sort: next, page: 1 }) })` (reset ke page 1 saat sort berubah).
- Update `goToPage` & efek reset agar memakai bentuk fungsional `search: (prev) => ({ ...prev, page: next })` supaya `sort` tidak hilang.
- Update tombol Reset agar juga mengembalikan `sort` ke `"newest"`.

**c. Terapkan sort pada `filtered`** — ganti `useMemo` jadi:
```ts
const sorted = useMemo(() => {
  const arr = [...filtered];
  switch (sort) {
    case "oldest": return arr.sort((a,b) => +new Date(a.date) - +new Date(b.date));
    case "title-asc": return arr.sort((a,b) => a.title.localeCompare(b.title, "id"));
    case "title-desc": return arr.sort((a,b) => b.title.localeCompare(a.title, "id"));
    default: return arr.sort((a,b) => +new Date(b.date) - +new Date(a.date));
  }
}, [filtered, sort]);
```
Lalu `paginated` & `totalPages` dihitung dari `sorted`.

**d. Ganti label statis menjadi dropdown** — di blok `<span className="hidden md:inline">Urutkan: …</span>`, gunakan komponen `Select` shadcn yang sudah di-import:
```tsx
<div className="hidden items-center gap-2 md:flex">
  <span>Urutkan</span>
  <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
    <SelectTrigger className="h-8 w-[150px] text-xs">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="newest">Terbaru</SelectItem>
      <SelectItem value="oldest">Terlama</SelectItem>
      <SelectItem value="title-asc">Judul A–Z</SelectItem>
      <SelectItem value="title-desc">Judul Z–A</SelectItem>
    </SelectContent>
  </Select>
</div>
```
Hapus import `ChevronDown` jika tidak terpakai lagi.

### 2. (Opsional, kecil) Konsistensi mobile
Karena label sebelumnya `hidden md:inline`, dropdown juga akan `hidden md:flex`. Mobile tidak menampilkan kontrol urut — sama seperti perilaku saat ini. (Bisa ditambah di iterasi berikutnya jika diminta.)

## Catatan Teknis
- `localeCompare(_, "id")` memberi urutan alfabet yang benar untuk teks Indonesia.
- Memakai `fallback()` dari `@tanstack/zod-adapter` (bukan `.catch()`) agar typing `sort` tetap union literal, sesuai aturan TanStack search params.
- Semua `navigate({ search: ... })` memakai bentuk fungsional `(prev) => ({ ...prev, ... })` agar `page` dan `sort` saling tidak menimpa.
- Tidak ada perubahan pada query Sanity / GROQ — sort dilakukan client-side karena dataset per halaman kecil dan sudah di-cache via React Query.
- Tidak ada file baru, tidak ada dependency baru.