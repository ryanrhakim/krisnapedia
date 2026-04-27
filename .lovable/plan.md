# Global Search — Command Palette (⌘K)

Tujuan: ganti search dummy di Navbar & Hero dengan satu command palette global yang mencari lintas Insight + Manual + Regulasi + FAQ secara real-time, dengan hasil dikelompokkan per tipe konten dan langsung navigasi ke detail.

## Arsitektur

**Single source of truth** — satu komponen `<SearchCommand />` yang dipasang sekali di root layout. State buka/tutup + initial query dikelola via React Context (`SearchProvider`) sehingga Navbar button, Hero input, Hero trending chips, dan keyboard shortcut semua trigger ke palette yang sama tanpa duplikasi logika.

**Data fetching** — palette menggunakan `useQuery` ke 4 query options yang sudah ada (`insightsQueryOptions`, `manualsQueryOptions`, `regulationsQueryOptions`, `faqsQueryOptions`). Karena query keys-nya cached oleh TanStack Query (staleTime 60s), kalau user sudah pernah buka halaman hub manapun, palette langsung pakai data dari cache → instan tanpa request ulang. Kalau belum, fetch on-open (palette load < 500ms typical).

**Search engine** — pure JS scoring function di client, dijalankan via `useMemo` saat query atau dataset berubah. Tidak perlu Fuse.js (bundle hemat ~12KB). Algoritma:

```
score(item, q):
  q_lower = q.toLowerCase().trim()
  if q_lower in title.toLowerCase()        → +10  (boost kalau prefix match: +5 lagi)
  if q_lower in description.toLowerCase()  → +3
  if q_lower in (tags joined)              → +4
  if q_lower in category|subCategory       → +2
  if q_lower in author                     → +1
  return total (0 = exclude)
```
Sort descending by score, ambil top 8 per kategori (Insight/Manual/Regulasi/FAQ). Total max 32 hasil yang ditampilkan, lebih dari cukup untuk overlay.

## File baru

### 1. `src/components/site/SearchProvider.tsx` (Context)

```tsx
type SearchContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  initialQuery: string;
  openWith: (q?: string) => void;  // buka palette + prefill query
};
```
- Pasang global keyboard listener (`⌘K` / `Ctrl+K`) di `useEffect` — toggle `open`.
- Expose `openWith(q)` untuk Hero input & trending chips.

### 2. `src/components/site/SearchCommand.tsx` (Palette UI)

Pakai komponen shadcn `Command` (`src/components/ui/command.tsx` sudah ada) di dalam `Dialog` (juga sudah ada). Struktur:

```
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Cari di KRISNApedia..." value={query} onValueChange={setQuery} />
  <CommandList>
    {query === "" && <RecentOrEmpty />}     // empty state singkat (tanpa recent search history)
    <CommandEmpty>Tidak ada hasil untuk "{query}"</CommandEmpty>

    {insightHits.length > 0 && (
      <CommandGroup heading="Insight Hub">
        {insightHits.map(hit => (
          <CommandItem onSelect={() => navigate(`/insight-hub/${hit.slug}`)}>
            <Lightbulb /> {hit.title}
            <span className="badge">{hit.category}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    )}
    {/* Manual Hub, Pustaka Regulasi, FAQ groups — pola sama */}
  </CommandList>
</CommandDialog>
```

Detail UI:
- Setiap group punya icon distinctive (Lightbulb / BookOpen / Scale / HelpCircle dari lucide).
- Item kanan: badge kecil category + tipe file.
- FAQ item klik → navigate `/faq` + scroll/highlight (untuk MVP cukup navigate ke `/faq`, scroll-to-anchor bisa iterasi berikut).
- Loading state: skeleton 3 baris saat `isLoading` true.
- Disable shadcn cmdk's built-in fuzzy filter (`shouldFilter={false}`) — kita pakai scoring sendiri.

### 3. (opsional, kecil) `src/lib/search.ts`

Helper `scoreItem(item, query)` + `searchAll(items, query, limit)` — testable pure function, dipanggil dari `SearchCommand.tsx` via `useMemo`.

## File yang diubah

### 4. `src/routes/__root.tsx`
Wrap `<Outlet />` dengan `<SearchProvider>` di dalam `QueryClientProvider`, dan render `<SearchCommand />` sekali setelah Outlet sehingga tersedia di semua route.

### 5. `src/components/site/Navbar.tsx`
- Tombol Search (`<Search />` icon) → `onClick={() => openWith()}`.
- Tambah hint shortcut: di desktop tampilkan `<kbd>⌘K</kbd>` kecil di samping icon (sembunyikan di mobile).
- Tombol mobile menu dipertahankan; tombol search juga aktif di mobile (tanpa kbd hint).

### 6. `src/components/site/Hero.tsx`
- Ubah `<input>` menjadi controlled, value state lokal `heroQuery`.
- `onFocus` atau `onChange` (saat 1 char pertama) → `openWith(heroQuery)` lalu kosongkan input lokal. Alternatif lebih halus: input tetap berfungsi sebagai trigger button — saat user mulai mengetik, palette terbuka dengan query terisi, user lanjut mengetik di palette tanpa kehilangan fokus (cmdk auto-focus input-nya). 
  - **Pendekatan dipilih**: `onClick`/`onFocus` → `openWith("")`; `onChange` di partial typing → `openWith(value)`. Lebih sederhana & tidak ada race condition fokus.
- Tombol "Search" di kanan input → `onClick={() => openWith(heroQuery)}`.
- Trending chips (`Onboarding`, `API Reference`, dll): ubah dari `<a href="#">` ke `<button onClick={() => openWith(label)}>`. Daftar trending tetap hardcoded di Hero (sesuai sekarang) — tidak perlu CMS-driven untuk MVP.

### 7. `package.json`
`cmdk` adalah dependency dari shadcn `command.tsx` — cek apakah sudah terinstall via `bun pm ls cmdk`. Kalau belum, `bun add cmdk`. (Kemungkinan besar sudah ada karena `command.tsx` ter-listed di components/ui.)

## UX detail

| Skenario | Hasil |
|---|---|
| User tekan ⌘K dari halaman manapun | Palette terbuka, focus ke input, query kosong |
| User klik icon Search di Navbar | Sama seperti ⌘K |
| User klik input Hero | Palette terbuka, input Hero sendiri tidak menerima ketikan lanjutan (focus pindah ke palette input) |
| User mulai ketik di Hero | Palette terbuka, query Hero ter-pass sebagai initial value, user lanjut ketik di palette |
| User klik trending chip "Onboarding" | Palette terbuka dengan query "Onboarding" → langsung tampil hasil |
| Hasil 0 | "Tidak ada hasil untuk '{query}'. Coba kata kunci lain." |
| User klik hasil | Navigate ke `/insight-hub/{slug}` (atau hub terkait), palette tertutup otomatis |
| Esc | Tutup palette |
| ↑/↓ + Enter | Navigasi & pilih (built-in cmdk) |

## Edge cases

1. **Query cache kosong saat palette dibuka pertama kali** — show 4 skeleton groups singkat sambil background fetch. `useQuery` per dataset, 4-paralel, total < 1 detik.
2. **Konten draft/unpublished** — sudah di-filter di GROQ query (`published == true`), aman.
3. **FAQ punya `question` bukan `title`** — adapter di scoring function (`item.title ?? item.question`).
4. **Field opsional (tags, author, subCategory, description) bisa undefined** — guard via `?.` + default ke `""`.
5. **Mobile (998px ke bawah)** — `CommandDialog` shadcn sudah responsive; di viewport sempit dialog jadi near-fullscreen, tetap nyaman.
6. **Hero input value** — kosongkan lokal saat palette terbuka supaya tidak terlihat duplikasi visual antara teks di Hero & teks di palette.
7. **SSR safety** — keyboard listener di `useEffect`, tidak ada `window` access di render tree.

## Yang TIDAK dikerjakan (sesuai jawaban Anda)

- ❌ Recent searches (localStorage) — dilewati, bisa ditambahkan nanti tanpa breaking change.
- ❌ Halaman `/search?q=` dedicated — palette sudah cukup untuk semua use case.
- ❌ Fuse.js / fuzzy typo tolerance — substring match dengan scoring weighted sudah cukup baik untuk dataset puluhan-ratusan item.

## Verifikasi setelah implementasi

1. `tsc --noEmit` lulus (no type error).
2. Tekan ⌘K dari `/`, `/insight-hub`, `/manual-hub` → palette terbuka di mana pun.
3. Ketik "manual" → muncul section "Manual Hub" dengan ≥1 hasil; klik → navigate ke detail manual.
4. Ketik "RPJMN" → muncul di Manual Hub (matched via subCategory).
5. Klik trending chip "Onboarding" di Hero → palette terbuka prefilled "Onboarding".
6. Klik input Hero (tanpa ketik) → palette terbuka dengan query kosong.
7. Esc → palette tutup, fokus kembali normal.
8. Mobile (resize ke 375px) → palette tetap usable, tombol search di Navbar tetap berfungsi.
