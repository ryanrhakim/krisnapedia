## Goal
Memperbarui alamat email kontak resmi menjadi `krisna@bappenas.go.id` dan menjadikan link "Contact Us" di footer langsung membuka email tersebut.

## Perubahan

### 1. `src/routes/faq.tsx` (kartu kontak di section "Ajukan Pertanyaan")
- Ganti teks email dari `klinik@krisnapedia.id` menjadi `krisna@bappenas.go.id`.
- Bungkus teks dengan `<a href="mailto:krisna@bappenas.go.id">` sehingga klik langsung membuka email client (sebelumnya hanya teks statis). Tambahkan styling hover ringan (`hover:text-primary transition-colors`) agar terlihat klikabel.

### 2. `src/components/site/Footer.tsx` (link "Contact Us")
- Ubah entry `{ label: "Contact Us", href: "#" }` menjadi `{ label: "Contact Us", href: "mailto:krisna@bappenas.go.id" }` agar klik langsung membuka komposer email ke alamat tersebut.
- Jika rendering link footer saat ini memakai `<Link to=...>` (TanStack Router) untuk semua entry, sesuaikan agar entry dengan `href` berawalan `mailto:` dirender sebagai `<a href={...}>` biasa — TanStack `Link` tidak boleh menerima skema `mailto:`. (Akan dicek saat implementasi; jika sudah memakai `<a>`, cukup ganti `href`.)

## Catatan
- Tidak ada perubahan rute, schema, atau dependency.
- Tidak menyentuh logika submit form FAQ (form tetap berjalan seperti sebelumnya).