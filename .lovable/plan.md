## Masalah

Akses ke `/studio` mengembalikan **403 Forbidden**. Ini bukan bug kode — Sanity menolak request dari origin yang belum di-allowlist di project Sanity `l6d1o9wo`.

Ketika Studio di-embed pada domain baru (preview Lovable, custom domain, atau URL published yang berubah), Sanity API akan menolak login/token exchange dengan 403 hingga origin tersebut ditambahkan sebagai **CORS origin** di project settings.

## Rencana Perbaikan

Tambahkan origin berikut ke project Sanity `l6d1o9wo` via MCP Sanity (`add_cors_origin`, `allowCredentials: true` karena Studio butuh session cookie):

1. `https://id-preview--978af0ea-41d9-4a76-88f5-cc6302f9f565.lovable.app` — preview aktif
2. `https://978af0ea-41d9-4a76-88f5-cc6302f9f565.lovableproject.com` — dev/preview alternatif
3. `https://krisnapedia.lovable.app` — published site
4. `https://*.lovable.app` — wildcard agar preview URL selanjutnya tetap jalan (opsional; jika Sanity menolak wildcard dengan credentials, dilewati)

Tidak ada perubahan kode aplikasi.

## Verifikasi

Setelah CORS ditambahkan:
- Refresh `/studio` (hard-reload, Ctrl/Cmd+Shift+R)
- Studio harus memuat form login Sanity, lalu setelah login masuk ke dashboard konten
- Jika masih 403 → berarti akun Sanity Anda dicabut aksesnya dari project (perlu di-invite ulang di sanity.io/manage → Members). Ini di luar kontrol kode; saya akan pandu langkahnya bila terjadi.

## Catatan tentang error runtime lain

Log menunjukkan `500 GET /src/styles.css` dan `views-queries.ts` — itu error dev-server HMR sementara yang tidak terkait 403 Studio. Akan hilang setelah refresh. Jika masih muncul setelah CORS diperbaiki, kita tangani terpisah.
