## Masalah

UI bawaan Sanity untuk cover memakai **dua tool terpisah**:

- **Hotspot** = lingkaran + titik fokus (untuk crop otomatis di berbagai rasio)
- **Crop** = kotak potong manual dari sisi gambar

Buat editor yang cuma ingin "pas-in cover ke kartu 4:3", dua tool ini membingungkan — lingkaran hotspot terasa tidak relevan karena kartu bentuknya persegi panjang.

Yang kamu mau: **satu editor Instagram-style** — viewport kotak 4:3 (sama persis dengan kartu), gambar bisa di-**drag** dan **zoom in/out**, selesai. Tidak ada lingkaran, tidak ada dua tool.

## Solusi

Buat **custom input component** untuk field `coverImage` di Sanity Studio yang menggantikan UI hotspot/crop bawaan dengan cropper pan-and-zoom.

### Teknis

1. **Tambah dependency**: `react-easy-crop` (library ringan, ~15 KB, memang dipakai untuk UX ala Instagram/Facebook — drag & pinch zoom, viewport dengan rasio bebas).

2. **Buat komponen** `src/sanity/components/CoverImageInput.tsx`:
   - Menerima props Sanity image input standar (`value`, `onChange`, dsb.).
   - Menampilkan tombol upload seperti biasa.
   - Setelah gambar terunggah, tampilkan **viewport 4:3** dengan `react-easy-crop` di atasnya (bukan tool hotspot/crop bawaan).
   - Editor menggeser gambar & memutar slider zoom → koordinat crop dihitung otomatis.
   - Simpan hasilnya ke field `crop` dan `hotspot` **milik Sanity sendiri** (bukan skema custom). Ini penting karena:
     - `@sanity/image-url` sudah membaca kedua field itu di frontend.
     - Semua cover yang sudah kamu setel sebelumnya tetap kompatibel.
     - Kalau suatu hari plugin ini di-nonaktifkan, data tidak hilang.

3. **Konversi koordinat**: `react-easy-crop` memberi output `{x, y, width, height}` dalam persen 0-100 → dipetakan ke bentuk yang Sanity harapkan (`crop.top/right/bottom/left` dan `hotspot.x/y/width/height` dalam skala 0-1).

4. **Sematkan ke schema**: di `insight.ts`, `manual.ts`, `regulation.ts` ganti:
   ```ts
   defineField({ name: "coverImage", type: "image", options: { hotspot: true } })
   ```
   menjadi:
   ```ts
   defineField({
     name: "coverImage",
     type: "image",
     options: { hotspot: true },       // tetap true, supaya field crop/hotspot tersimpan
     components: { input: CoverImageInput },  // ← ini yang menggantikan UI bawaan
   })
   ```
   Tool hotspot/crop bawaan **tidak lagi muncul** karena input component sudah override.

5. **Frontend tidak berubah** — `imageUrl(item.coverImage, 800)` di kartu tetap dipakai. Karena kartu berukuran 4:3 dan crop yang tersimpan juga 4:3, browser tinggal menampilkan hasil crop yang sudah tepat.

### Alur editor setelah perbaikan

```text
1. Klik field "Cover Image" → Upload gambar
2. Muncul kotak 4:3 dengan gambar di dalamnya
3. Drag gambar untuk memindahkan fokus
4. Slider zoom untuk perbesar/perkecil (atau scroll wheel)
5. Klik "Simpan crop" → selesai
```

Tidak ada dua tab (Hotspot / Crop), tidak ada lingkaran, hanya satu viewport rectangle 4:3.

### File yang berubah

| File | Perubahan |
| --- | --- |
| `package.json` | + `react-easy-crop` |
| `src/sanity/components/CoverImageInput.tsx` | Baru — komponen cropper pan/zoom |
| `src/sanity/schemas/insight.ts` | Sematkan `components.input` ke `coverImage` |
| `src/sanity/schemas/manual.ts` | Sama |
| `src/sanity/schemas/regulation.ts` | Sama |

### Yang tidak berubah

- Data cover yang sudah kamu setel sebelumnya (hotspot/crop lama tetap terbaca).
- Skema field, GROQ query, dan cara `imageUrl` dipanggil di kartu.
- Tampilan frontend — kartu 4:3 tetap sama.

### Batasan / catatan

- Cropper ini **mengunci rasio ke 4:3** (sesuai kartu). Kalau suatu saat kamu perlu rasio berbeda per halaman (mis. detail hero 16:9), kita bisa buat viewport preview kedua di komponen yang sama — belum termasuk scope kali ini.
- Studio adalah bundle klien; dependency baru menambah ~15 KB gzip, tidak berdampak ke bundle publik karena Studio sudah lazy-loaded di route `/studio`.
