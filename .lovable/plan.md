## 🎯 Tujuan
Memperbaiki theme switcher yang saat ini **tidak benar-benar berfungsi** (token `.dark` belum didefinisikan) dan mengupgrade-nya menjadi sistem tema modern setara Vercel/Linear: **Light · Dark · System**, tanpa flash, tersedia di semua viewport, dan terkelola lewat satu provider terpusat.

---

## 📋 Perubahan File

### 1. ✨ Baru: `src/components/site/ThemeProvider.tsx`
Context provider sebagai single source of truth untuk tema.

- **State**: `theme: "light" | "dark" | "system"` + `resolvedTheme: "light" | "dark"` (hasil aktualnya).
- **Persistence**: Simpan pilihan user di `localStorage` dengan key `krisnapedia-theme`.
- **System listener**: `window.matchMedia("(prefers-color-scheme: dark)")` dengan event `change` listener — tema otomatis ikut OS saat mode "system" aktif.
- **Hook**: `useTheme()` mengembalikan `{ theme, setTheme, resolvedTheme }`.
- **DOM sync**: `useEffect` yang `document.documentElement.classList.toggle("dark", resolvedTheme === "dark")`.

### 2. ✨ Baru: `src/components/site/ThemeToggle.tsx`
Komponen UI dropdown reusable untuk Navbar.

- **Trigger**: Tombol ikon `Sun` (light) / `Moon` (dark) / `Monitor` (system) — ikon adapt ke `resolvedTheme` dengan animasi rotate halus via Tailwind.
- **DropdownMenu** (shadcn) berisi 3 item: Light, Dark, System — tiap item ada ikon kiri & checkmark `Check` di kanan untuk mode aktif.
- Pakai `aria-label="Toggle theme"` untuk a11y.

### 3. 🔧 Edit: `src/routes/__root.tsx`
- **Inject inline script anti-FOUC** di `<head>` shellComponent — script ini baca `localStorage.krisnapedia-theme` (atau fallback ke `prefers-color-scheme`) dan langsung set `document.documentElement.classList.add("dark")` SEBELUM React hydrate. Ditulis sebagai `<script>` dengan string `dangerouslySetInnerHTML` agar tidak di-mangle bundler.
- Wrap `RootComponent` dengan `<ThemeProvider>` di luar `<SearchProvider>` agar tema diterapkan ke command palette juga.

### 4. 🔧 Edit: `src/components/site/Navbar.tsx`
- **Hapus** local `useTheme` hook (lines 18–37) — sudah dipindahkan ke `ThemeProvider`.
- **Hapus** kondisi `hidden md:inline-flex` dari tombol theme — sekarang **selalu tampil** termasuk di mobile.
- **Ganti** tombol toggle manual lama dengan `<ThemeToggle />` import dari komponen baru.
- Hapus import `Sun`, `Moon` yang tidak dipakai lagi di Navbar.

### 5. 🔧 Edit: `src/styles.css`
**Ini critical fix** — saat ini `.dark` belum didefinisikan sama sekali. Tambah blok `.dark { ... }` dengan palette gelap selaras brand KRISNA orange:

```css
.dark {
  --background: oklch(0.16 0.012 50);
  --foreground: oklch(0.96 0.008 80);

  --card: oklch(0.21 0.015 50);
  --card-foreground: oklch(0.96 0.008 80);

  --popover: oklch(0.21 0.015 50);
  --popover-foreground: oklch(0.96 0.008 80);

  --primary: oklch(0.72 0.18 50);              /* sedikit lebih terang utk kontras */
  --primary-foreground: oklch(0.16 0.012 50);
  --primary-soft: oklch(0.28 0.06 55);
  --primary-deep: oklch(0.62 0.19 42);

  --secondary: oklch(0.28 0.018 50);
  --secondary-foreground: oklch(0.96 0.008 80);

  --muted: oklch(0.24 0.014 50);
  --muted-foreground: oklch(0.7 0.018 60);

  --accent: oklch(0.28 0.06 55);
  --accent-foreground: oklch(0.85 0.12 60);

  --destructive: oklch(0.62 0.22 27);
  --destructive-foreground: oklch(0.99 0 0);

  --border: oklch(0.3 0.014 50);
  --input: oklch(0.3 0.014 50);
  --ring: oklch(0.72 0.18 50);

  /* charts, sidebar, gradients, shadows juga di-override dengan nilai dark */
}
```

Termasuk override untuk `--gradient-hero`, `--gradient-warm`, `--shadow-soft`, `--shadow-glow`, `--sidebar-*`, dan `--chart-*` agar visual konsisten.

---

## 🔄 Alur Eksekusi
1. **User refresh halaman** → script inline di `<head>` cek localStorage → set class `.dark` instant → CSS render warna gelap → React hydrate (no flash).
2. **User klik ThemeToggle → Dark** → `setTheme("dark")` → `localStorage` updated → `useEffect` toggle class `.dark` → semua warna transisi via CSS.
3. **User pilih System** → script listener `matchMedia` aktif → kalau OS user ganti dark/light, web ikut otomatis tanpa reload.

## ✅ Verifikasi
- `bunx tsc --noEmit` untuk type-check.
- Manual: refresh, ganti mode, ganti preferensi OS sambil mode "system" aktif.

## 🎁 Hasil
- ✅ Theme switcher **benar-benar mengubah tampilan** (sebelumnya silent no-op).
- ✅ Tidak ada flash/FOUC saat refresh.
- ✅ Tersedia di mobile.
- ✅ Mendukung preferensi OS via mode System.
- ✅ Logic terpusat di `ThemeProvider`, mudah diakses komponen lain via `useTheme()`.