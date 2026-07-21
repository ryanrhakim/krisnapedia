## Masalah
Studio pada preview Lovable (`https://id-preview--978af0ea-41d9-4a76-88f5-cc6302f9f565.lovable.app`) masih menampilkan "Connect this studio to your project" karena origin tersebut belum ada di CORS allow-list Sanity. Sebelumnya hanya `*.lovableproject.com` / `krisnapedia.lovable.app` yang di-whitelist, sedangkan URL `id-preview--*.lovable.app` berbeda.

## Rencana Perbaikan

1. Tambahkan wildcard CORS origin `https://*.lovable.app` ke project Sanity via MCP (`add_cors_origin` dengan `allowCredentials: true`). Ini mencakup:
   - `id-preview--*.lovable.app` (preview Lovable)
   - `krisnapedia.lovable.app` (published)
   - Semua sub-domain `.lovable.app` lain di masa depan
2. Verifikasi dengan membuka ulang `/studio` di preview — layar "Connect this studio" seharusnya hilang dan langsung masuk ke Studio (setelah login Sanity bila perlu).

## Catatan
- Tidak ada perubahan kode. Hanya konfigurasi CORS di sisi Sanity.
- Jika setelah menambahkan origin masih muncul layar connect, cukup klik "Connect" sekali untuk menyelesaikan login OAuth Sanity — token disimpan di browser origin tersebut.
