## Tujuan

Mengatasi error "sanity.studio domains must be created as 'internal'" dengan **menghosting Sanity Studio langsung di dalam aplikasi Lovable** pada route `/studio`. Tim admin Anda akan login di `krisnapedia.com/studio` (atau URL preview Lovable) — tidak perlu Sanity CLI, tidak perlu deploy terpisah.

## Yang akan saya lakukan

### 1. Install dependencies Sanity Studio
```
bun add sanity @sanity/vision styled-components
```
- `sanity` — engine Studio v3
- `@sanity/vision` — plugin GROQ playground (untuk debugging query)
- `styled-components` — peer dependency Sanity Studio

### 2. Buat schema files lokal di `src/sanity/schemas/`
Mirror schema yang sudah di-deploy via MCP, sehingga Studio embed tahu struktur dokumen yang sama:
- `src/sanity/schemas/insight.ts`
- `src/sanity/schemas/manual.ts`
- `src/sanity/schemas/regulation.ts`
- `src/sanity/schemas/faq.ts`
- `src/sanity/schemas/index.ts` — kumpulan ekspor semua schema

Field-fieldnya identik dengan yang sudah di Sanity Cloud (title, slug, category, file, coverImage, longDescription portable text, dll), supaya 33 dokumen yang sudah di-seed langsung muncul dan bisa diedit.

### 3. Buat konfigurasi Studio di `src/sanity/config.ts`
```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export const studioConfig = defineConfig({
  projectId: "l6d1o9wo",
  dataset: "production",
  basePath: "/studio",        // <- penting: cocok dengan route
  name: "krisnapedia",
  title: "KRISNApedia Admin",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

### 4. Buat route baru `src/routes/studio.$.tsx`
Route catch-all (`$`) supaya Sanity Studio bisa handle internal routing-nya sendiri (mis. `/studio/desk/insight;abc123`).

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "sanity";
import { studioConfig } from "@/sanity/config";

export const Route = createFileRoute("/studio/$")({
  component: StudioPage,
  ssr: false,    // Studio butuh window, jadi client-only
});

function StudioPage() {
  return <Studio config={studioConfig} />;
}
```
Plus route index `src/routes/studio.tsx` yang juga render Studio supaya `/studio` (tanpa trailing) jalan.

### 5. Tambahkan CORS origin di Sanity
Pakai MCP tool `add_cors_origin` untuk allowlist:
- `https://*.lovable.app` (preview & published)
- `https://*.lovableproject.com` (preview lama)
- Custom domain Anda nanti, kalau sudah dipasang

Dengan `allowCredentials: true` supaya login bisa jalan.

### 6. Tambahkan link "Admin" tersembunyi di Footer (opsional)
Footer dapat tombol kecil "Admin" → ke `/studio`. Atau tidak — tim cukup bookmark URL-nya. Saya bias ke **tidak menambah link publik** supaya admin URL tidak terekspos ke pengunjung biasa.

### 7. Verifikasi bundle tidak membengkak halaman publik
Karena Studio besar (~2MB), saya pastikan dia hanya di-load saat user buka `/studio` (lazy via route splitting yang sudah default di TanStack Start). Halaman publik tidak terpengaruh.

## Cara tim Anda pakai setelah selesai

1. Buka `https://<preview-url>.lovable.app/studio` (atau nanti `krisnapedia.com/studio`)
2. Klik **Sign in** → pilih provider (Google / email yang dipakai di Sanity)
3. Sanity akan verifikasi email Anda terdaftar di project members → masuk
4. Sidebar kiri muncul: **Insight, Manual, Regulation, FAQ** — semua 33 dokumen yang sudah di-seed kelihatan
5. Klik dokumen → drag PDF ke field **File** → klik **Publish** (kanan bawah)
6. Website auto-update dalam ~60 detik (cache TanStack Query)

**Undang anggota tim:** tetap via https://www.sanity.io/manage/project/l6d1o9wo → tab **Members** → invite by email. Mereka login di `/studio` dengan email yang diundang.

## File yang akan dibuat / diubah

**Baru:**
- `src/sanity/config.ts`
- `src/sanity/schemas/index.ts`
- `src/sanity/schemas/insight.ts`
- `src/sanity/schemas/manual.ts`
- `src/sanity/schemas/regulation.ts`
- `src/sanity/schemas/faq.ts`
- `src/routes/studio.tsx` (landing redirect ke `/studio/`)
- `src/routes/studio.$.tsx` (catch-all yang render `<Studio>`)

**Tidak diubah:**
- Semua route publik, komponen, query Sanity di `src/lib/sanity-queries.ts` — tetap berfungsi seperti sekarang
- 33 dokumen yang sudah live — tidak terganggu

## Risiko & catatan jujur

- **Bundle size**: Studio menambah ~2MB JS, tapi hanya untuk pengunjung `/studio`. Halaman publik tidak terpengaruh.
- **SSR**: Studio dipaksa `ssr: false` karena butuh `window`. Ini normal untuk semua Studio embed.
- **Login**: Pertama kali login Sanity akan redirect ke domain mereka untuk OAuth lalu balik. Pastikan CORS sudah di-allowlist (langkah 5) supaya tidak gagal.
- **Update schema**: Kalau ke depan kita mau tambah field baru, saya tinggal edit file di `src/sanity/schemas/` — perubahan langsung aktif begitu Lovable deploy ulang. Tidak perlu CLI.

---

Setuju lanjut dengan rencana ini? Kalau Anda lebih pilih **Opsi B** (Studio terpisah via CLI di komputer Anda), bilang saja, saya susun plan baru.