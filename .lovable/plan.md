## Tujuan
Tambahkan **dialog modal sukses** yang muncul setelah user menekan "Kirim Pertanyaan" pada form Klinik KRISNA di `/faq`. Dialog menampilkan ringkasan pertanyaan yang dikirim. Pengiriman tetap **simulasi** (tidak benar-benar mengirim email).

## Perubahan
Hanya 1 file: `src/routes/faq.tsx`.

### Behavior baru
1. User isi form → klik "Kirim Pertanyaan".
2. Validasi Zod tetap berjalan (toast error jika invalid).
3. Setelah delay 600ms simulasi:
   - Toast lama dihapus (digantikan dialog).
   - Simpan snapshot data form ke state `submittedData`.
   - Buka `Dialog` modal sukses.
   - Reset form.

### Isi dialog modal
- Ikon centang besar (`CheckCircle2` dari lucide-react) dengan warna `text-primary` di lingkaran `bg-[var(--primary-soft)]`.
- Judul: "Pertanyaan berhasil terkirim"
- Deskripsi: "Tim Klinik KRISNA akan meninjau pertanyaan Anda dan membalas via email dalam 1–3 hari kerja."
- **Ringkasan pertanyaan** (kartu `bg-muted/40 rounded-xl p-4`):
  - Nama: `{submittedData.nama}`
  - Email: `{submittedData.email}`
  - Subjek: `{submittedData.subjek}`
  - Pertanyaan: cuplikan max 200 karakter + `…` jika lebih panjang
- Footer: 2 tombol
  - Outline: "Tutup"
  - Primary: "Kirim pertanyaan lain" (tutup dialog, fokus ke field nama)

### Komponen yang dipakai
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` dari `@/components/ui/dialog` (sudah ada).
- `CheckCircle2` dari `lucide-react`.

### State baru
```ts
const [successOpen, setSuccessOpen] = useState(false);
const [submittedData, setSubmittedData] = useState<typeof form | null>(null);
```

### i18n
Halaman `/faq` saat ini hardcoded Bahasa Indonesia (lihat string existing seperti "Pertanyaan terkirim!"), jadi teks dialog juga hardcoded ID — konsisten dengan pola sekarang. Tidak menambah key i18n baru.

## Yang tidak berubah
- Form fields, validasi Zod, layout halaman, FAQ accordion, hero, search.
- Tidak ada backend, tidak ada email sungguhan, tidak ada tabel database.

## File
- edit `src/routes/faq.tsx`
