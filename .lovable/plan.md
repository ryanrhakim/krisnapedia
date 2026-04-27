# Filter Tab Dua Tingkat untuk Manual Hub

Tujuan: mempercepat navigasi dengan tab kategori utama + sub-kategori, mirror struktur di Sanity Studio. Tab dan dropdown tetap saling sinkron, dan otomatis update kalau ada sub-category baru di CMS.

## Struktur tab (sesuai data aktual)

**Baris 1 — Category utama:**
`Semua` · `Manual Teknis Pusat` · `Manual Teknis Daerah`

**Baris 2 — Sub-category** (muncul saat category utama dipilih, kosong saat "Semua"):
- Manual Teknis Pusat → `Semua` · `RPJMN` · `Renstra K/L` · `RKP` · `Renja K/L` · `Pagu JM` · `Tagging`
- Manual Teknis Daerah → `Semua` · `DAK Fisik` · `DAK Nonfisik`

Daftar sub-category dihitung otomatis dari hasil `useSuspenseQuery(manualsQueryOptions())` — kalau Anda tambah/hapus sub-category di Sanity, tab langsung mengikuti tanpa deploy ulang.

## Perubahan file

### 1. `src/routes/manual-hub.tsx` (utama)

**Schema search params** — tambahkan dua param baru sehingga URL bisa dibagikan dan back/forward browser bekerja:
```ts
const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
  cat: fallback(z.string(), "All").default("All"),     // category utama
  sub: fallback(z.string(), "All").default("All"),     // sub-category
});
```

**State & sinkronisasi:**
- Hapus `useState` untuk `category`. Baca dari `Route.useSearch()` → `cat` & `sub`.
- Dropdown "Kategori" yang sudah ada **tetap dipertahankan** dan terhubung ke `cat` yang sama → tab dan dropdown saling sinkron otomatis.
- Search query (`query`) & file type (`fileType`) tetap pakai `useState` lokal seperti sekarang (tidak perlu di URL).

**Logika derivasi:**
- `categories` = `["All", ...unique(manuals.map(m => m.category))]`
- `subCategories` = `cat === "All" ? [] : ["All", ...unique(manuals.filter(m => m.category === cat).map(m => m.subCategory).filter(Boolean))]`
- Filter list: tambah `matchSub = sub === "All" ? true : it.subCategory === sub`

**Reset behavior:**
- Saat user ganti `cat` → otomatis set `sub = "All"` dan `page = 1`.
- Saat user ganti `sub` → set `page = 1`.
- Tombol "Reset" yang ada → reset `cat`, `sub`, `query`, `fileType`, `page` ke default.
- Update `useEffect` reset-page agar memperhatikan `cat` & `sub` juga (atau dipindah ke handler navigate, lebih bersih).

### 2. `src/components/site/CategoryTabs.tsx` (baru)

Komponen presentational kecil yang dipakai 2x (untuk baris category & sub-category):
```tsx
type Props = {
  items: string[];                    // ["All", "Manual Teknis Pusat", ...]
  active: string;
  onChange: (next: string) => void;
  ariaLabel: string;
};
```
- Render sebagai pill buttons horizontal scrollable (`overflow-x-auto`, `snap-x`) supaya rapi di viewport sempit (mobile).
- Active state pakai token brand (`bg-primary text-primary-foreground`), inactive `bg-muted text-muted-foreground hover:bg-muted/70`.
- Label "All" ditampilkan sebagai "Semua" (Indonesia, konsisten dengan UI yang sudah ada).
- Aksesibilitas: `role="tablist"`, tiap tab `role="tab"` + `aria-selected`.

### 3. UI placement di `manual-hub.tsx`

Letakkan **di antara hero section dan filter bar putih** — terpisah secara visual sebagai navigasi utama, sebelum filter sekunder (search/dropdown). Section baru dengan latar `bg-background` dan padding seperti section filter sekarang.

```
[Hero]
[Tab Category]                       ← baru, baris 1
  [Tab Sub-category]                 ← baru, baris 2 (conditional)
[Filter bar: Search + Tipe + Kategori dropdown + Reset]   ← existing
[Grid 9 cards + Pagination]          ← existing
```

Sub-category tab hanya muncul kalau `cat !== "All"` DAN ada minimal 1 sub-category di category itu.

### 4. Counter & range text

Update label "Menampilkan X–Y dari Z manual" supaya tetap akurat berdasarkan filter gabungan (cat + sub + query + fileType). Logika sudah memakai `filtered.length`, jadi otomatis benar — tinggal pastikan teks di "(difilter dari N)" tetap menampilkan total `manuals.length`.

## Yang TIDAK berubah

- Skema Sanity (`subCategory` field sudah ada).
- Query GROQ (`subCategory` sudah ikut di-fetch di `BASE_PROJECTION`).
- Halaman Insight Hub & Pustaka Regulasi (sesuai permintaan, hanya Manual Hub).
- Komponen `PaginationBar` (paginasi tetap bekerja di atas hasil yang sudah difilter).
- Card layout & styling existing.

## Edge cases yang ditangani

1. **Sub-category kosong** — kalau ada manual dengan `subCategory` undefined/null, di-filter pakai `.filter(Boolean)` → tidak muncul tab kosong.
2. **Sub-category baru di CMS** — otomatis terdeteksi karena daftar dihitung runtime dari data.
3. **URL share** — `?cat=Manual%20Teknis%20Pusat&sub=RKP&page=2` valid, di-validate via zod, fallback aman ke "All" kalau value tidak cocok.
4. **Mobile (viewport 998×736 ke bawah)** — tab horizontal scrollable, tidak wrap awkward.

## Verifikasi setelah implementasi

- `tsc --noEmit` lulus.
- Klik tab category → grid update + URL berubah + dropdown ikut update.
- Klik tab sub-category → grid filter lebih sempit, page reset ke 1.
- Reset button → semua filter (termasuk tab) kembali ke "Semua".
- Buka langsung URL `/manual-hub?cat=Manual%20Teknis%20Pusat&sub=RKP` → tab & filter sudah aktif sesuai param.
