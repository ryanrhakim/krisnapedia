## 🐛 Diagnosis

Section **Manual Hub** di homepage memakai background **hardcoded** dengan inline style:

```tsx
// src/components/site/ManualHub.tsx (line 17)
style={{ backgroundColor: "oklch(0.97 0.025 75)" }}
```

Warna ini adalah krem terang fixed yang **tidak bereaksi terhadap class `.dark`**, sehingga di dark mode:
- Background tetap krem terang.
- `text-foreground` (otomatis menjadi putih di dark mode) → kontras hancur, teks tak terbaca.
- Section lain (`InsightHub`, `Faq`, `Footer`) memakai token semantic `bg-background` sehingga adaptif — hanya ManualHub yang inkonsisten.

## 🛠️ Solusi

Buat token semantic baru `--surface-warm` di `src/styles.css` agar Manual Hub tetap punya nuansa "warm tinted" yang membedakannya dari section lain (sesuai desain awal), tapi sekarang **adaptif terhadap tema**.

### 1. Edit `src/styles.css`

Tambahkan token baru di `:root` dan `.dark`, lalu daftarkan di `@theme inline`:

```css
@theme inline {
  /* … existing tokens … */
  --color-surface-warm: var(--surface-warm);
}

:root {
  /* … existing … */
  --surface-warm: oklch(0.97 0.025 75); /* nilai krem terang yang sekarang */
}

.dark {
  /* … existing … */
  --surface-warm: oklch(0.2 0.02 55);   /* warm-tinted dark surface, sedikit lebih terang dari --background */
}
```

Token ini memberi ManualHub "warm card surface" yang konsisten dengan brand orange di kedua tema.

### 2. Edit `src/components/site/ManualHub.tsx`

- **Hapus** inline `style={{ backgroundColor: "oklch(0.97 0.025 75)" }}` di line 17.
- **Ganti** dengan utility class `bg-surface-warm` (otomatis tersedia karena registrasi di `@theme inline`).
- Pastikan dot-pattern overlay tetap memakai `var(--primary-deep)` — di dark mode token ini sudah berbentuk warm orange, jadi pattern tetap terlihat tapi halus.
- Naikkan opacity overlay sedikit di dark mode bila perlu via class `opacity-[0.06] dark:opacity-[0.08]`.

Hasil baris 14–17 menjadi:

```tsx
<section
  id="manuals"
  className="relative overflow-hidden border-t border-border bg-surface-warm py-24 text-foreground"
>
```

## ✅ Verifikasi

- `bunx tsc --noEmit`.
- Manual: toggle Light → Dark via ThemeToggle, pastikan section ManualHub:
  - Light mode: tetap krem hangat seperti semula (tidak ada regression).
  - Dark mode: background gelap warm-tinted, judul/deskripsi/kartu jelas terbaca.
- Pastikan kartu (`bg-card`), border, dan dot-pattern tetap kontras di kedua tema.

## 🎁 Hasil

- ✅ ManualHub tidak lagi "stuck" di tema terang.
- ✅ Tetap memiliki karakter warm-tinted yang membedakannya dari InsightHub & Faq.
- ✅ Token `--surface-warm` reusable bila nanti ada section lain yang butuh nuansa hangat.
