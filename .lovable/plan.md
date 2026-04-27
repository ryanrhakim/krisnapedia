
# Hilangkan ⌘K hint + ganti Trending dengan Statistik Live

## Bagian 1 — Hapus hint `⌘K`

Shortcut keyboard tetap berfungsi (handler di `SearchProvider` tidak diubah), hanya badge visualnya yang dihapus supaya tampilan lebih bersih.

**`src/components/site/Hero.tsx`**
- Hapus elemen `<kbd>⌘K</kbd>` di dalam form search bar.

**`src/components/site/Navbar.tsx`**
- Hapus `<kbd>⌘K</kbd>` di tombol search desktop.
- Sederhanakan: cukup satu tombol `Button variant="ghost" size="icon"` dengan `<Search />` icon untuk semua viewport (hapus duplikasi desktop/mobile yang sekarang ada). `aria-label="Search"` tetap dipertahankan untuk accessibility.

## Bagian 2 — Rekomendasi statistik untuk menggantikan Trending chips

Berdasarkan struktur konten KRISNApedia (Insight + Manual + Regulasi + FAQ, dengan field `category`, `subCategory`, `date`, `tags`, `fileType`), berikut **3 metrik paling relevan** yang saya rekomendasikan untuk ditampilkan di posisi trending chips:

| Metrik | Formula | Mengapa berguna |
|---|---|---|
| **Total Dokumen** | `insights.length + manuals.length + regulations.length` | Menunjukkan kekayaan repository — sinyal "ada banyak yang bisa dieksplor". Angka tunggal yang mudah dibaca. |
| **Kategori Aktif** | jumlah unique `category` lintas 3 dataset | Menunjukkan luasnya cakupan topik (Manual Teknis Pusat, Manual Teknis Daerah, dll). Membantu user memahami breadth. |
| **Update Terbaru** | "Diperbarui {X hari lalu}" dari dokumen dengan `date` paling baru | Menunjukkan repository hidup & aktif dirawat. Sinyal kepercayaan tinggi. |

**Alternatif yang saya pertimbangkan tapi TIDAK saya rekomendasikan:**
- ❌ "Total views/downloads" — belum ada tracking analytics di skema, butuh infrastruktur baru.
- ❌ "User aktif" — tidak ada sistem auth user-facing.
- ❌ "FAQ terjawab" — angka FAQ kecil (~puluhan), tidak impresif.
- ❌ "Tags terpopuler" — mirip trending lama, tidak benar-benar "statistik".

### Layout

Ganti baris trending chips dengan **3 stat pills** sejajar di posisi yang sama (di bawah search bar):

```
                ┌──────────┐  ┌──────────┐  ┌──────────────────┐
                │   142    │  │    12    │  │  Updated 2d ago  │
                │ Dokumen  │  │ Kategori │  │   Last refresh   │
                └──────────┘  └──────────┘  └──────────────────┘
```

- Setiap pill: angka besar (font-display, primary color) + label kecil (muted-foreground).
- Border + bg `card`, rounded-full atau rounded-lg, padding sedang.
- **Bukan clickable** (statistik = informasi, bukan navigasi). Cursor default, tidak ada hover state.
- Saat data loading: skeleton 3 pills dengan placeholder dimensi sama.
- Saat error/data kosong: tampilkan fallback "—" tapi container tetap render (jangan layout shift).

## Bagian 3 — Implementasi statistik

**File baru: `src/components/site/HeroStats.tsx`**

```tsx
// Pseudocode struktur
function HeroStats() {
  const insights = useQuery(insightsQueryOptions());
  const manuals = useQuery(manualsQueryOptions());
  const regulations = useQuery(regulationsQueryOptions());

  const isLoading = insights.isLoading || manuals.isLoading || regulations.isLoading;

  const totalDocs = (insights.data?.length ?? 0) + (manuals.data?.length ?? 0) + (regulations.data?.length ?? 0);

  const allCategories = new Set([
    ...(insights.data ?? []).map(i => i.category),
    ...(manuals.data ?? []).map(m => m.category),
    ...(regulations.data ?? []).map(r => r.category),
  ].filter(Boolean));
  const totalCategories = allCategories.size;

  const latestDate = [
    ...(insights.data ?? []),
    ...(manuals.data ?? []),
    ...(regulations.data ?? []),
  ]
    .map(d => d.date)
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a))[0];

  const updatedLabel = latestDate ? formatRelative(latestDate) : "—";

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <StatPill value={totalDocs} label="Dokumen" loading={isLoading} />
      <StatPill value={totalCategories} label="Kategori" loading={isLoading} />
      <StatPill value={updatedLabel} label="Terakhir diperbarui" loading={isLoading} />
    </div>
  );
}
```

- `formatRelative(iso)` — helper kecil di `src/lib/format.ts` (file sudah ada, tinggal tambah fungsi). Output: "hari ini", "kemarin", "3 hari lalu", "2 minggu lalu", dst (Bahasa Indonesia, sesuai bahasa UI lainnya).
- `StatPill` — komponen lokal di file yang sama, render angka + label, dengan variant skeleton saat `loading`.

**`src/components/site/Hero.tsx`**
- Hapus konstanta `TRENDING` dan blok `<div>` trending chips.
- Render `<HeroStats />` di posisi yang sama.
- Hapus import `useSearchPalette` jika sudah tidak dipakai untuk trigger trending (cek: masih dipakai untuk `onClick`/`onFocus`/`submit` search bar — tetap dibutuhkan).

## Verifikasi

1. `tsc --noEmit` lulus.
2. Hero menampilkan 3 stat pills, bukan trending chips.
3. Angka stat sesuai jumlah dokumen di Sanity (cek manual via studio).
4. Search bar Hero & Navbar tidak lagi menampilkan badge `⌘K`, tapi keyboard shortcut tetap bekerja (tekan ⌘K → palette terbuka).
5. Saat hard reload tanpa cache → skeleton muncul sebentar, lalu angka muncul (no layout shift).
6. Mobile (375px) → 3 pills wrap rapi, tidak overflow.

## Yang TIDAK dikerjakan

- ❌ Real-time view/download tracking (butuh analytics backend baru).
- ❌ Stat pills clickable ke filter (tidak ada use case yang jelas — user bisa eksplor lewat hub pages atau search palette).
- ❌ Animasi count-up (nice-to-have, bisa ditambahkan nanti).
