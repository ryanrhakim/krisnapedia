## Optimasi Language Switcher (ID & EN)

Fitur ini **tidak sulit**, tapi cakupan pengerjaannya menengah karena seluruh teks UI saat ini di-hardcode dalam Bahasa Indonesia di banyak komponen (Navbar, Hero, InsightHub, ManualHub, Faq, Footer, SearchCommand, CategoryTabs, halaman route, dll). Untuk benar-benar berfungsi, setiap teks itu harus diganti dengan key terjemahan.

Saya akan menggunakan pendekatan **ringan tanpa library i18n** (cukup React Context + dua kamus JSON), supaya cepat, type-safe, dan tidak menambah dependensi.

### Yang akan dilakukan

1. **Sederhanakan opsi bahasa** di `Navbar.tsx` menjadi hanya 2: `ID` dan `EN` (hapus `ja`, `es`).

2. **Buat sistem terjemahan ringan**:
   - `src/i18n/translations.ts` — dua objek kamus (`id` dan `en`) dengan key terstruktur (mis. `nav.regulasi`, `hero.badge`, `hero.title1`, `hero.title2`, `hero.subtitle`, `hero.searchPlaceholder`, `hero.searchCta`, `footer.*`, `faq.*`, dst.)
   - `src/i18n/LanguageProvider.tsx` — Context + hook `useT()` yang mengembalikan fungsi `t("hero.title1")` dan state `lang` + `setLang`.
   - Bahasa default: **Indonesia (`id`)**.
   - Pilihan bahasa disimpan di `localStorage` agar persisten antar kunjungan.

3. **Pasang Provider** di `src/routes/__root.tsx` (membungkus `<Outlet />`).

4. **Ganti string hardcoded** dengan `t(...)` di komponen-komponen ini:
   - `Navbar.tsx` (label menu, aria-label, language dropdown)
   - `Hero.tsx` (badge, headline 2 baris, subtitle, placeholder search, tombol Telusuri)
   - `HeroStats.tsx`, `InsightHub.tsx`, `ManualHub.tsx`, `CategoryTabs.tsx`
   - `Faq.tsx`, `Footer.tsx`, `SearchCommand.tsx`
   - Heading dan label statis di route: `insight-hub.tsx`, `manual-hub.tsx`, `pustaka-regulasi.tsx`, dan halaman detail
   - `ContentViewer.tsx` & `PaginationBar.tsx` (label tombol seperti "Halaman", "Berikutnya", dsb.)

5. **Update Navbar dropdown bahasa**:
   - Hanya menampilkan "Bahasa Indonesia" dan "English"
   - Klik = panggil `setLang('id'|'en')` dari provider (bukan state lokal)
   - Indikator (chip "ID"/"EN") menggunakan bahasa aktif dari context

### Detail teknis

- **Tidak menerjemahkan konten dinamis** dari Sanity (artikel, manual, regulasi). Konten editor tetap apa adanya — hanya UI/chrome situs yang diterjemahkan. Jika nanti ingin konten Sanity multibahasa juga, itu butuh skema field terjemahan terpisah dan bisa dikerjakan sebagai tahap berikutnya.
- **Tipe aman**: `t()` menerima string key; kamus `en` dan `id` dipaksa memiliki bentuk yang sama lewat `Record<keyof typeof id, string>`.
- **Tanpa SSR mismatch**: bahasa awal dibaca dari `localStorage` di dalam `useEffect` setelah hydration, sehingga server selalu render Bahasa Indonesia (default), lalu beralih di klien jika user pernah memilih EN.

### Yang TIDAK termasuk dalam plan ini
- Terjemahan konten artikel/manual/regulasi dari Sanity.
- Deteksi bahasa otomatis dari header browser (bisa ditambahkan kemudian).
- URL berbasis lokal (mis. `/en/...`) — tetap satu URL, bahasa via toggle.

Setelah disetujui, saya akan implementasikan dalam satu kali pengerjaan.