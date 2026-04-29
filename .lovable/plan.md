## Fitur View Counter + Homepage berbasis Popularitas

Tambahkan tracking jumlah view per konten (Insight, Manual, Regulation), tampilkan angkanya di setiap content card, dan urutkan kartu di homepage berdasarkan popularitas (fallback ke konten terbaru bila views = 0).

---

### 1. Database (Lovable Cloud / Supabase)

Buat tabel baru `content_views` via migration:

```
content_views
- id            uuid PK
- content_type  text        -- 'insight' | 'manual' | 'regulation'
- content_id    text        -- Sanity _id
- slug          text        -- untuk lookup cepat
- views         integer     -- default 0
- updated_at    timestamptz
- UNIQUE (content_type, slug)
```

RLS:
- `SELECT` → public (anon + authenticated) → siapa pun bisa baca jumlah view.
- `INSERT` / `UPDATE` → hanya via RPC server (lihat poin 2). Tidak ada policy insert/update untuk anon → mencegah manipulasi langsung.

Plus RPC `increment_view(p_type text, p_slug text, p_content_id text)` yang melakukan upsert + `views = views + 1` dalam satu transaksi (SECURITY DEFINER, di-grant ke `anon` dan `authenticated`). Pakai RPC supaya angka tidak bisa di-set sembarangan dari client — hanya bisa naik 1.

### 2. Server function untuk increment

File baru `src/server/views.functions.ts`:
- `incrementView({ type, slug, contentId })` — `createServerFn POST` yang memanggil RPC `increment_view` via `supabaseAdmin`. Validasi input dengan Zod (enum tipe, slug regex aman).
- Rate-limit ringan in-memory per IP+slug (mis. 1 hit / 30 detik) untuk cegah spam refresh — pakai `getRequestIP()` dari `@tanstack/react-start/server`. Disclaimer in-memory: cukup untuk preview, untuk production keras nanti bisa diganti Redis.

### 3. Trigger di halaman detail

Di `insight-hub_.$slug.tsx`, `manual-hub_.$slug.tsx`, dan `pustaka-regulasi_.$slug.tsx`:
- Tambah `useEffect` di komponen yang memanggil `incrementView` sekali saat mount (guard via `useRef` agar StrictMode tidak double-fire).
- Tidak menunggu hasil — fire & forget. Tidak mengganggu render.

### 4. Query views untuk listing & homepage

File baru `src/server/views.functions.ts` juga mengekspor:
- `getViewsMap(type)` — `createServerFn GET` → mengembalikan `Record<slug, number>` untuk satu tipe konten. Dipanggil dari loader.

`src/lib/sanity-queries.ts` tetap tidak berubah — Sanity tidak tahu soal views.

Buat helper React Query `viewsQueryOptions(type)` di `src/lib/views-queries.ts` yang membungkus server function.

### 5. UI: angka view di kartu

Komponen baru kecil `src/components/site/ViewCount.tsx`:
- Props: `count?: number`.
- Render ikon `Eye` (lucide) + angka diformat (`1.2K`, `12.4K`) via helper `formatCompactNumber`.
- Bila `count` undefined / 0, tetap tampil `0` agar layout konsisten.

Sisipkan di footer kartu pada:
- `src/components/site/InsightHub.tsx`
- `src/components/site/ManualHub.tsx`
- `src/routes/insight-hub.tsx` (grid listing)
- `src/routes/manual-hub.tsx` (grid listing)
- `src/routes/pustaka-regulasi.tsx` (grid listing)

Letakkan di baris meta yang sudah ada (sejajar dengan ikon FileText dan tanggal). Untuk menjaga ruang, ganti layout meta jadi 3 kolom: `[FileType] [Eye+count] [date]`.

### 6. Homepage: sort by popularity + fallback

Di `InsightHub.tsx` & `ManualHub.tsx`:
- Ambil `viewsMap` lewat `useQuery(viewsQueryOptions(type))`.
- Sorting: 
  ```
  items.sort((a, b) => {
    const va = viewsMap[a.slug] ?? 0;
    const vb = viewsMap[b.slug] ?? 0;
    if (vb !== va) return vb - va;            // populer dulu
    return +new Date(b.date) - +new Date(a.date); // fallback: terbaru
  }).slice(0, 3);
  ```
- Loader di `src/routes/index.tsx` di-prefetch `viewsQueryOptions("insight")` dan `viewsQueryOptions("manual")` agar tidak ada flash.

### 7. Catatan teknis

- Tidak menyentuh schema Sanity — view count murni Lovable Cloud.
- `Insight` / `Manual` / `Regulation` di Sanity tetap bisa diedit tanpa kehilangan view count (kunci `slug`).
- Bila slug konten Sanity diubah, view count lama jadi yatim. Acceptable trade-off; bisa nanti dibuat tools admin untuk migrate.
- `formatCompactNumber`: `< 1000` → angka biasa; `>= 1000` → `1.2K`; `>= 1_000_000` → `1.2M`. Pakai `Intl.NumberFormat("en", { notation: "compact" })`.
- Pakai `defaultPreloadStaleTime: 0` (sudah ada) — query views punya `staleTime: 30_000` agar tidak refetch tiap navigasi.

### File yang dibuat / diubah

Baru:
- `src/server/views.functions.ts`
- `src/server/views.server.ts` (helper supabaseAdmin call)
- `src/lib/views-queries.ts`
- `src/lib/format-number.ts` (formatCompactNumber)
- `src/components/site/ViewCount.tsx`
- 1 migration SQL: tabel `content_views`, RLS, RPC `increment_view`.

Diubah:
- `src/components/site/InsightHub.tsx` — sort by views, render ViewCount.
- `src/components/site/ManualHub.tsx` — sama.
- `src/routes/insight-hub.tsx` — render ViewCount di kartu.
- `src/routes/manual-hub.tsx` — sama.
- `src/routes/pustaka-regulasi.tsx` — sama.
- `src/routes/insight-hub_.$slug.tsx` — panggil incrementView on mount.
- `src/routes/manual-hub_.$slug.tsx` — sama.
- `src/routes/pustaka-regulasi_.$slug.tsx` — sama.
- `src/routes/index.tsx` — prefetch views di loader.

Setujui rencana ini untuk aku eksekusi.