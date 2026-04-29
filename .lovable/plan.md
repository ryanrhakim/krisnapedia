## Pasang Logo SVG (Light, Dark, Favicon)

Mengganti logo berbasis ikon Lucide + teks dengan file SVG yang sudah kamu upload (sudah berisi tulisan "KRISNApedia").

### 1. Salin file SVG ke project
- `user-uploads://Light_Mode_Logo.svg` → `src/assets/logo-light.svg`
- `user-uploads://Dark_Mode_Logo.svg` → `src/assets/logo-dark.svg`
- `user-uploads://Favicon.svg` → `public/favicon.svg`

### 2. Update Navbar (`src/components/site/Navbar.tsx`)
- Hapus import `BookOpen` (lucide).
- Import kedua logo: `import logoLight from "@/assets/logo-light.svg"` dan `import logoDark from "@/assets/logo-dark.svg"`.
- Ganti blok `<Link to="/">…</Link>` di header: tampilkan dua `<img>` — versi light dengan kelas `block dark:hidden`, versi dark dengan `hidden dark:block`. Tinggi ~36px (`h-9 w-auto`), `alt="KRISNApedia"`.
- Hapus `<span>` teks "KRISNApedia" karena logo sudah memuat teks.

### 3. Update Footer (`src/components/site/Footer.tsx`)
- Hapus import `BookOpen`.
- Import logo yang sama.
- Ganti blok logo + teks dengan dua `<img>` (light/dark) berukuran `h-10 w-auto`.

### 4. Update favicon di `src/routes/__root.tsx`
- Tambahkan ke array `links`:
  ```
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }
  ```

### Catatan teknis
- Tema gelap pakai class `dark` di `<html>` (lihat `ThemeProvider`), jadi pola `dark:hidden` / `hidden dark:block` aman untuk swap logo.
- File SVG asli punya `viewBox="0 0 708.79 217.35"` (rasio ~3.26:1) — pakai `h-9 w-auto` agar lebar mengikuti otomatis tanpa distorsi.
- Tidak perlu mengubah halaman lain — Navbar & Footer dipakai di seluruh route.