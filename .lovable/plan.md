## Masalah

Semua 14 dokumen `category` di Sanity dibuat dengan `_id` ber-titik (mis. `category.insight.materi-bimtek`). Sanity menganggap ID semacam ini sebagai dokumen tersembunyi dari query publik/anon — hanya bisa diambil lewat token atau dengan mereferensikan ID persisnya. Efeknya di frontend anonim (CDN):

- `*[_type == "category" && scope == $scope]` → array kosong ⇒ dropdown filter kategori kosong di Insight Hub, Manual Hub, Pustaka Regulasi (dan hanya menampilkan opsi hasil derive dari `it.category` yang juga null).
- `"category": category->title` pada dokumen insight/manual/regulation → `null` ⇒ label kategori di content card & badge di homepage hilang.

Verified via anonymous `apicdn.sanity.io` vs MCP query (dengan token) — hasil beda persis untuk tipe `category` saja.

## Perbaikan

Recreate 14 dokumen `category` dengan `_id` UUID biasa (tanpa titik), lalu ubah setiap `category._ref` di 36 dokumen insight/manual/regulation ke ID baru, kemudian publish & hapus dokumen lama.

### Langkah

1. Untuk tiap kategori lama, buat dokumen kategori baru via `create_documents` dengan payload yang sama (`title`, `slug`, `scope`, `orderIndex`, `description`, `published: true`) tapi biarkan Sanity generate `_id` UUID default. Simpan mapping `oldId → newId`.
2. Publish semua kategori baru (`publish_documents`).
3. Query semua insight/manual/regulation, untuk masing-masing patch `category._ref` dari old → new (batch via `patch_documents`, maksimum 25 per call).
4. Publish ulang seluruh dokumen konten yang di-patch supaya perubahan referensi ikut ke perspective published.
5. Verifikasi via anonymous CDN:
   - `*[_type=="category"]` mengembalikan 14 baris.
   - `*[_type=="insight"][0]{ "category": category->title }` mengembalikan string (bukan null).
6. Hapus (unpublish + delete) 14 dokumen kategori lama yang ber-ID titik.

### Kode aplikasi

Tidak perlu perubahan pada schema/query — `BASE_PROJECTION` dan `categoriesQueryOptions` sudah benar. Hanya data di Sanity yang perlu dinormalisasi.

### Rollback

Jika langkah 3 gagal di tengah jalan, mapping `old→new` disimpan sehingga dapat diulang idempotent (patch hanya jika `_ref` masih menunjuk ID lama).
