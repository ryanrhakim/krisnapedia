
# Kategori Terpusat di Sanity CMS

## Masalah saat ini

Field `category` di skema Insight, Manual, dan Regulation bertipe **string bebas**. Setiap editor mengetik ulang nama kategori — rawan typo (mis. "Panduan" vs "panduan " vs "Panduan Umum"). Kategori di frontend diambil dari `Array.from(new Set(...))`, jadi setiap variasi ketikan dianggap kategori berbeda dan muncul terpisah di filter/card.

## Solusi

Buat **document type baru `category`** di Sanity, lalu ubah field `category` di Insight/Manual/Regulation menjadi **reference** ke document tersebut. Hasilnya:

- Editor memilih kategori lewat **dropdown** (autocomplete Sanity).
- Tombol **"Create new category"** langsung tersedia di dropdown yang sama → bisa tambah kategori baru tanpa keluar dari halaman konten.
- Tidak ada lagi typo karena semua konten menunjuk ke satu dokumen sumber.
- Ubah nama kategori di satu tempat → otomatis update di semua konten & filter.

## Struktur teknis

### 1. Skema baru `src/sanity/schemas/category.ts`

```
name: 'category', type: 'document'
fields:
  - title       (string, required)  → nama tampilan
  - slug        (slug, from title)  → id stabil untuk filter URL
  - scope       (string, list: ['insight','manual','regulation']) → membatasi dropdown per tipe konten
  - orderIndex  (number)            → urutan tampil di filter
  - description (text, optional)
```

Daftarkan di `src/sanity/schemas/index.ts`.

### 2. Ubah field `category` menjadi reference

Di `insight.ts`, `manual.ts`, `regulation.ts`:

```
defineField({
  name: 'category',
  type: 'reference',
  to: [{ type: 'category' }],
  options: {
    filter: 'scope == $scope',
    filterParams: { scope: 'insight' }, // 'manual' / 'regulation'
  },
  validation: R => R.required(),
})
```

Sanity Studio otomatis menampilkan dropdown + tombol "Create new category".

### 3. GROQ projection

Kategori sekarang berupa reference → dereference jadi string di query supaya frontend tidak perlu berubah:

```groq
"category": category->title,
"categorySlug": category->slug.current,
```

Update `BASE_PROJECTION` di `src/lib/sanity-queries.ts`. Tipe di `sanity-types.ts` tetap `category: string`.

### 4. Filter frontend pakai daftar kategori dari CMS

Tambah `categoriesQueryOptions(scope)` yang fetch `*[_type=="category" && scope==$scope] | order(orderIndex asc, title asc)`. Gunakan di:

- `src/routes/insight-hub.tsx`
- `src/routes/manual-hub.tsx`
- `src/routes/pustaka-regulasi.tsx`

Ganti derivasi `Array.from(new Set(...))` menjadi daftar dari query kategori. Efek: kategori kosong pun tetap muncul di dropdown, dan urutan bisa dikendalikan lewat `orderIndex`.

## Migrasi data existing

Konten lama masih menyimpan `category` sebagai string. Langkah migrasi (dilakukan otomatis via script Node dengan token editor):

1. Kumpulkan nilai `category` unik per tipe dari dokumen existing.
2. Buat dokumen `category` untuk tiap nilai (title = nilai lama, scope = tipe konten, slug auto).
3. Patch setiap Insight/Manual/Regulation: ganti `category` string → `{ _type: 'reference', _ref: <categoryId> }`.
4. Verifikasi query homepage & listing masih memuat 8 dokumen regulasi + semua insight/manual.

Skema lama (`type: 'string'`) tidak kompatibel dengan reference baru, jadi migrasi WAJIB dijalankan sebelum deploy skema baru — kalau tidak, dokumen lama akan invalid di Studio.

## Yang tidak berubah

- Tampilan card, filter chip, URL param `?category=…` (masih pakai title string).
- Sub-category tetap string bebas untuk sekarang (bisa dinaikkan ke skema serupa nanti bila perlu).
- Tidak menyentuh view counter, i18n, atau routing.

## Deliverable

1. `src/sanity/schemas/category.ts` (baru) + registrasi di `index.ts`.
2. `insight.ts`, `manual.ts`, `regulation.ts` — field `category` diubah ke reference.
3. `src/lib/sanity-queries.ts` — projection dereference + `categoriesQueryOptions`.
4. Tiga route listing — pakai `categoriesQueryOptions` untuk dropdown filter.
5. Script migrasi one-shot untuk konten existing (tidak masuk repo, dijalankan sekali via token editor).

Setelah plan disetujui, saya jalankan migrasi lebih dulu supaya data tidak sempat invalid saat skema baru aktif.
