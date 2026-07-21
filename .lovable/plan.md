## Diagnosis

Error `Attempted to patch a read-only document` muncul di `CoverImageInput` (`src/sanity/components/CoverImageInput.tsx`).

Penyebab: `react-easy-crop` memanggil `onCropComplete` **secara otomatis saat mount** (bukan hanya saat user berinteraksi). Kalau dokumen yang sedang dibuka adalah versi read-only — mis. tampilan **published document** (Sanity menampilkan published sebagai read-only; edit hanya boleh ke draft), preview reference, atau saat user tidak punya izin edit — callback tersebut memanggil `onChange([set(crop), set(hotspot)])` pada dokumen read-only, dan Sanity melempar error itu.

Studio versi baru mengekspos `props.readOnly` di `ObjectInputProps`. Komponen kita tidak memeriksanya, jadi semua patch tetap dikirim.

## Perubahan

Satu file: **`src/sanity/components/CoverImageInput.tsx`**

1. Ambil `readOnly` dari `props` dan **bail out** di `onCropComplete` + `onReset` kalau `readOnly` truthy. Ini menghentikan error di semua kasus read-only (published view, permission read-only, reference preview).
2. Tambah flag `hasUserInteractedRef` yang di-set `true` di `onCropChange` / `onZoomChange` (aksi user), lalu `onCropComplete` hanya memanggil `onChange` kalau flag itu `true`. Ini mencegah patch "kosmetik" yang dikirim `react-easy-crop` saat mount / saat gambar pertama kali dimuat — patch yang sebenarnya tidak mengubah apa-apa tapi tetap menandai draft sebagai dirty.
3. Sembunyikan / disable UI cropper (slider zoom + tombol reset) saat `readOnly`, biar konsisten dengan input Sanity lain.

Tidak ada perubahan schema, tidak ada perubahan `vite.config.ts`, tidak ada perubahan di frontend publik — murni memperbaiki guard di custom input Studio.

## Verifikasi

1. Buka `/studio`, pilih dokumen Insight/Manual/Regulation yang tadinya memicu error (biasanya lewat panel **Published** di kanan, atau saat membuka referensi dari list) → error overlay tidak muncul lagi.
2. Buka draft dokumen → geser gambar dan slider zoom → crop tersimpan seperti sebelumnya (tidak ada regresi fungsi cropper).
3. Buka published view (read-only) → cropper tampil tapi tidak mencoba menulis; tidak ada error di console.
