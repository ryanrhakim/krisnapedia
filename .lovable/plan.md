## Plan: Optimasi Headline Hero — Satu Baris Responsif

**File:** `src/components/site/Hero.tsx` (baris 39-42)

### Masalah
Pada viewport ~1000px, "Seluruh Pengetahuan KRISNA" pecah jadi dua baris karena `lg:text-6xl` (60px) terlalu besar untuk container `max-w-3xl` (768px).

### Solusi
Gunakan `clamp()` via arbitrary Tailwind value agar font-size menyesuaikan viewport secara mulus, plus `whitespace-nowrap` pada baris pertama untuk menjamin tetap satu baris. Container hero diperluas agar muat di desktop besar.

### Perubahan

**1. Headline `<h1>`:**
```tsx
<h1 className="mt-6 font-display font-bold leading-[1.15] tracking-tight text-foreground text-center text-[clamp(1.5rem,5.2vw,3.75rem)]">
  <span className="block whitespace-nowrap">Seluruh Pengetahuan KRISNA</span>
  <span className="mt-2 block text-primary whitespace-nowrap">dalam Satu Portal</span>
</h1>
```

**2. Container teks** (baris 36): ubah `max-w-3xl` → `max-w-5xl` agar headline punya ruang horizontal cukup di layar besar.

### Detail teknis
- `clamp(1.5rem, 5.2vw, 3.75rem)` = min 24px (mobile), scale 5.2vw, max 60px (desktop ≥1152px).
- `whitespace-nowrap` mencegah word-wrap pada kedua baris di semua breakpoint.
- Pada 320px viewport: ~24px → "Seluruh Pengetahuan KRISNA" (~250px) muat.
- Pada 1000px viewport: ~52px → muat dalam satu baris di max-w-5xl.
- `text-center` eksplisit (sebelumnya diwarisi dari parent, dipertahankan untuk kejelasan).
- Warna baris 1 hitam (`text-foreground`), baris 2 orange (`text-primary`) tetap.