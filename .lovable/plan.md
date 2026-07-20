## Rencana: Ubah status dokumen menjadi "Terbaru, Aktif, Arsip"

Saat ini field `status` di dokumen Insight, Manual, dan Regulation memiliki pilihan: **Aktif / Aktif Terbaru / Arsip**. Kamu ingin mengganti "Aktif Terbaru" menjadi **"Terbaru"**, sehingga kategori status menjadi **Terbaru, Aktif, Arsip**.

### Yang akan diubah

1. **Sanity schemas**
   - `src/sanity/schemas/insight.ts`
   - `src/sanity/schemas/manual.ts`
   - `src/sanity/schemas/regulation.ts`
   - Mengganti opsi list dari `["Aktif", "Aktif Terbaru", "Arsip"]` menjadi `["Terbaru", "Aktif", "Arsip"]`.
   - `initialValue` tetap `"Aktif"` (atau diubah menjadi `"Terbaru"` jika kamu inginkan — bisa dibahas).

2. **Data migration di Sanity**
   - Semua dokumen yang saat ini bernilai `"Aktif Terbaru"` perlu di-patch menjadi `"Terbaru"`.
   - Dokumen dengan status `"Aktif"` atau `"Arsip"` tidak berubah.
   - Migration dilakukan via Sanity API (patch bulk) untuk tiga tipe dokumen: `insight`, `manual`, `regulation`.

3. **Komponen UI**
   - `src/components/site/StatusBadge.tsx`: memperbarui mapping warna, label, dan logika `hideActive` agar mengenali `"Terbaru"` sebagai status oranye, dan tetap menyembunyikan badge `"Aktif"` di content card.

4. **Terjemahan i18n**
   - `src/i18n/translations.ts`: memperbarui key `status.baru` dari `"Aktif Terbaru"` menjadi `"Terbaru"` (ID), dan EN-nya dari `"Newly Active"` menjadi `"Latest"` (atau sesuai pilihan).

### Catatan

- Perubahan ini **tidak** menyentuh field `regulasiStatus` di schema Regulation (Berlaku/Dicabut/Direvisi), karena itu adalah status hukum regulasi, bukan status tampilan dokumen.
- Setelah schema diubah, dokumen lama yang masih menyimpan `"Aktif Terbaru"` akan tetap tampil di UI, tetapi badge-nya mungkin tidak ter-styling. Oleh karena itu migration data wajib dilakukan bersamaan.

### Langkah pengerjaan
1. Update tiga schema Sanity.
2. Patch data existing `"Aktif Terbaru"` → `"Terbaru"`.
3. Update `StatusBadge.tsx` dan `translations.ts`.
4. Verifikasi build & preview badge di content card dan halaman detail.

Apakah ingin `initialValue`-nya tetap `"Aktif"` atau diubah menjadi `"Terbaru"`?