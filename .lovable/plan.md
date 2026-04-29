## Update Hero Text — Insight Hub & Manual Hub Pages

Replace the hero headline and description copy on both hub listing pages.

### 1. `src/routes/insight-hub.tsx` (lines 152–162)

Change `<h1>` and `<p>` inside the hero section:

- **Headline** → "Beragam wawasan dan bahan penguatan pemahaman KRISNA, dalam satu ruang."
- **Description** → "Akses materi bimbingan teknis, bahan sosialisasi, laporan evaluasi, hasil survei, serta berbagai konten pengetahuan yang mendukung peningkatan pemahaman dan pemanfaatan Sistem Informasi KRISNA."

The eyebrow label "Insight Hub", classes, layout, and surrounding markup stay unchanged.

### 2. `src/routes/manual-hub.tsx` (lines 171–178)

Change `<h1>` and `<p>` inside the hero section:

- **Headline** → "Koleksi panduan penggunaan subsistem KRISNA, dalam satu pusat dokumentasi."
- **Description** → "Akses panduan penggunaan, prosedur teknis, dan dokumentasi operasional berbagai subsistem KRISNA yang disusun sistematis agar setiap proses lebih mudah dipelajari, ditelusuri, dan diterapkan."

The eyebrow label "Manual Hub", classes, layout, and surrounding markup stay unchanged.

### Out of scope
- No changes to the homepage `InsightHub` / `ManualHub` section components.
- No changes to `head()` meta titles/descriptions (can be a follow-up if desired).
- No styling, font-size, or layout changes — text-only swap.
