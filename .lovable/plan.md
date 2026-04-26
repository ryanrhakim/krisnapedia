## Tujuan

Menambahkan pagination ke 3 halaman listing (`/pustaka-regulasi`, `/insight-hub`, `/manual-hub`) dengan **9 card per halaman** (3×3 grid di desktop). Ini akan:

- Mengurangi scroll panjang
- Mempercepat render saat koleksi konten bertambah
- Memberi struktur visual yang konsisten antar 3 halaman

## Pendekatan: Client-side pagination via URL search params

Saya akan pakai **TanStack Router search params** (`?page=2`) ketimbang `useState` lokal, karena:

1. **Shareable URL** — user bisa bookmark/share `/insight-hub?page=3`
2. **Browser back/forward** bekerja natural
3. **SEO-friendly** — tiap halaman pagination punya URL unik
4. **Konsisten dengan TanStack pattern** (data sudah di-cache via `useSuspenseQuery`, tidak perlu refetch)

Filter (query, fileType, category) saat ini masih `useState` lokal — saya **tidak akan migrasi** semua filter ke search params di plan ini supaya scope tetap fokus. Hanya `page` yang masuk ke URL. Tapi: saat user mengubah filter, page otomatis di-reset ke 1.

## Perubahan File

### 1. Komponen pagination baru (DRY)
**Buat**: `src/components/site/PaginationBar.tsx`

Wrapper tipis di atas `src/components/ui/pagination.tsx` yang:
- Menerima `currentPage`, `totalPages`, `onPageChange`
- Render Previous / nomor halaman (dengan ellipsis jika >7 halaman) / Next
- Disabled state untuk Prev di page 1, Next di last page
- Smart ellipsis: tampilkan max 7 tombol nomor (mis: `1 … 4 5 6 … 10`)

Alasan di-extract: 3 halaman pakai logic identik, hindari duplikasi.

### 2. Update 3 halaman listing

Untuk masing-masing dari `src/routes/pustaka-regulasi.tsx`, `src/routes/insight-hub.tsx`, `src/routes/manual-hub.tsx`:

**a. Tambah `validateSearch`** di route definition:
```ts
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/pustaka-regulasi")({
  validateSearch: zodValidator(searchSchema),
  // ... loader, component, head tetap sama
});
```

**b. Di komponen:**
- Ganti `const { page } = Route.useSearch()` untuk baca current page
- `const navigate = useNavigate({ from: Route.fullPath })` untuk update page
- Setelah `filtered`, slice 9 item:
  ```ts
  const PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  ```
- Render `paginated` di grid (bukan `filtered`)
- Tambah `<PaginationBar>` di bawah grid

**c. Auto-reset page ke 1 saat filter berubah** via `useEffect`:
```ts
useEffect(() => {
  if (page !== 1) {
    navigate({ search: { page: 1 } });
  }
}, [query, fileType, category]);
```
(Hanya jalankan jika halaman saat ini bukan 1, untuk menghindari loop)

**d. Update label counter**:
- Ganti "Menampilkan **X** dari Y" jadi "Menampilkan **X-Y** dari Z" (rentang halaman aktif)

**e. Reset filter (`reset()` function)** juga reset `page` ke 1.

**f. Auto-scroll ke top filter section** saat ganti page (smooth scroll), supaya UX lebih baik daripada user harus scroll manual.

### 3. Bonus: empty state tetap berfungsi

Jika `filtered.length === 0`, tampilkan empty state (sudah ada). Pagination disembunyikan dalam kondisi ini.

## Edge Cases yang Ditangani

| Kasus | Behavior |
|---|---|
| User akses `?page=99` tapi cuma 3 halaman | Auto-clamp ke page terakhir (`safePage`) |
| User akses `?page=0` atau negatif | Zod `.min(1)` + `fallback(1)` → fallback ke 1 |
| User akses `?page=abc` | Zod fallback → page 1 |
| Filter aktif sehingga `filtered` < 9 | Tidak render pagination bar |
| Total ≤ 9 item | Pagination disembunyikan (cuma 1 halaman) |
| Ganti filter saat di page 5 | Auto-reset ke page 1 |

## Yang TIDAK Berubah

- Loader, query, schema Sanity (data tetap fetch sekali, pagination murni di client)
- Filter behavior (search, file type, category)
- Card design & layout
- Detail page route (`/pustaka-regulasi/$slug` dll)

## Verifikasi

Setelah implementasi, saya akan:
1. Jalankan `tsc --noEmit` untuk pastikan type-safe
2. Cek 3 halaman: `/pustaka-regulasi`, `/insight-hub`, `/manual-hub` di preview
3. Test: navigate ke `?page=2`, ganti filter, reset filter

## Dependencies

`@tanstack/zod-adapter` dan `zod` — perlu cek apakah sudah terinstall. Kalau belum, saya `bun add` keduanya sebelum edit route files.

---

**Pertimbangan alternatif (untuk transparansi):**
- *"Load more" button* — tidak dipilih karena URL tidak shareable & sulit deep-link
- *Infinite scroll* — overkill untuk konten yang relatif sedikit, dan jelek untuk SEO
- *Server-side pagination via Sanity GROQ* — tidak perlu sekarang karena dataset kecil (puluhan item), client-side jauh lebih responsif
