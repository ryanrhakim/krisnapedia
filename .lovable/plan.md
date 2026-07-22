
## Tujuan

Menggantikan tiga link dummy (`href="#"`) di footer dengan halaman legal statis yang:
- Merefleksikan kondisi aktual KRISNApedia (tidak ada login, tidak ada tracking pihak ketiga)
- Merujuk pada regulasi resmi Kementerian PPN/Bappenas
- Menghindari klaim kepatuhan berlebihan (tidak ada sertifikasi, bukan dokumen hukum yang mengikat — halaman berperan sebagai kebijakan yang dikelola pemilik aplikasi)

## Halaman yang dibuat

### 1. `/kebijakan-privasi` (Privasi)
Struktur konten:
- **Ringkasan** — KRISNApedia adalah portal informasi publik, tidak menyimpan data pribadi pengguna secara aktif.
- **Data yang dikumpulkan** — hanya email jika pengguna mengirim pertanyaan via Klinik KRISNA; tidak ada registrasi/login.
- **Tujuan penggunaan data** — merespons pertanyaan pengguna.
- **Dasar hukum** — mengacu pada UU No. 27/2022 tentang Pelindungan Data Pribadi & Permen PPN/Bappenas No. 7/2025.
- **Keamanan** — mengikuti standar keamanan siber Bappenas (RFC 2350 CSIRT Bappenas).
- **Hak pengguna** — hak akses, koreksi, dan penghapusan sesuai UU PDP.
- **Kontak** — `krisna@bappenas.go.id`.

### 2. `/ketentuan-penggunaan` (Ketentuan)
Struktur konten:
- **Penerimaan ketentuan** — dengan mengakses, pengguna dianggap menyetujui.
- **Sifat konten** — KRISNApedia menyediakan informasi rujukan; bukan dokumen legal formal. Rujukan resmi tetap merujuk pada dokumen asli yang diterbitkan pemerintah.
- **Hak kekayaan intelektual** — konten milik Kementerian PPN/Bappenas.
- **Penggunaan yang diizinkan** — akses non-komersial, edukasi, dan penelitian; wajib mencantumkan sumber.
- **Batasan tanggung jawab** — tidak menjamin ketiadaan kesalahan; Bappenas tidak bertanggung jawab atas kerugian dari penggunaan konten.
- **Perubahan** — ketentuan dapat diperbarui sewaktu-waktu.
- **Kontak**.

### 3. `/kebijakan-cookie` (Kebijakan Cookie)
Struktur konten:
- **Apa itu cookie** — penjelasan singkat.
- **Cookie yang digunakan** — saat ini hanya cookie esensial (preferensi tema light/dark & bahasa ID/EN yang disimpan via `localStorage`); tidak ada analytics/marketing.
- **Cara mengelola** — instruksi menghapus via pengaturan browser.
- **Perubahan** — kebijakan dapat diperbarui.

## Perubahan file

### Baru
- `src/routes/kebijakan-privasi.tsx` — route + component + head metadata (title, description, og, canonical)
- `src/routes/ketentuan-penggunaan.tsx` — route + component + head metadata
- `src/routes/kebijakan-cookie.tsx` — route + component + head metadata

Ketiga halaman menggunakan komponen `Navbar` & `Footer` yang sudah ada, layout mirip `/tentang` (hero + sections + card) agar konsisten dengan design system.

### Edit
- `src/components/site/Footer.tsx` — ganti 3 `<a href="#">` menjadi `<Link to="/kebijakan-privasi">`, `/ketentuan-penggunaan`, `/kebijakan-cookie`.
- `src/i18n/translations.ts` — tambahkan translation keys untuk ID & EN:
  - `privacy.title`, `privacy.lead`, `privacy.section.*` (~8 section headings + bodies)
  - `terms.title`, `terms.lead`, `terms.section.*` (~7 sections)
  - `cookies.title`, `cookies.lead`, `cookies.section.*` (~4 sections)
- `public/llms.txt` — tambahkan 3 entry pages baru.
- `src/routes/sitemap[.]xml.ts` — tambahkan 3 URL baru ke sitemap statis.

## Design system

Semua halaman mengikuti pattern yang sudah ada di `/tentang`:
- Hero dengan badge `bg-[var(--primary-soft)]` + eyebrow uppercase tracking
- Section body dengan `text-muted-foreground`
- `max-w-4xl` untuk konten teks legal (lebih sempit dari landing, lebih nyaman dibaca)
- Card container `rounded-2xl border border-border bg-card` untuk grouping section
- Tanggal "Terakhir diperbarui" di header setiap halaman

## Yang TIDAK dilakukan

- Tidak menambahkan cookie consent banner (tidak dibutuhkan karena tidak ada tracking).
- Tidak mengklaim kepatuhan spesifik (sertifikasi, audit) — hanya menyebut "berpedoman pada" regulasi.
- Tidak menambahkan form kontak baru — cukup arahkan ke email & Klinik KRISNA.
