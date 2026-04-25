# Admin Dashboard for KRISNApedia — Implementation Plan

A self-contained CMS built into KRISNApedia using **Lovable Cloud** (Supabase). Multiple admins can sign in, upload files, and manage all four content types. The public site reads live from the database instead of static `src/data/*.ts` files.

---

## 1. Backend (Lovable Cloud)

### Authentication
- Enable **email + password** auth (no public sign-up — admins are invited/created from within the dashboard).
- Use a separate **`user_roles`** table with an `app_role` enum (`admin`, `editor`) and a `has_role()` SECURITY DEFINER function — avoids recursive RLS, prevents privilege escalation.
- The very first admin will be promoted via SQL after they sign up (one-time bootstrap).

### Database Tables
Four content tables mirroring the current static data, plus supporting tables:

| Table | Purpose |
|---|---|
| `insights` | Insight Hub items (slug, title, desc, long_desc, category, sub_category, file_type, file_url, cover_url, author, date, pages, file_size, language, tags, viewer, video_src, status) |
| `manuals` | Manual Hub items (same shape + `version`) |
| `regulations` | Pustaka Regulasi (same shape + `jurisdiction`, `effective_date`, `regulasi_status`) |
| `faqs` | FAQ items (question, answer, category, order_index, published) |
| `user_roles` | `(user_id, role)` for RBAC |
| `categories` | Optional lookup for category/sub-category trees per content type (matches the folder taxonomy in your reference doc) |

**RLS policies:**
- **Public read:** anyone can `SELECT` published rows (so the existing public pages work).
- **Admin write:** only users where `has_role(auth.uid(), 'admin')` can `INSERT/UPDATE/DELETE`.

### Storage Buckets
- `content-files` (public read) — stores uploaded PDFs, PPTX, DOCX, images. Path convention: `{contentType}/{slug}/{filename}`.
- `content-covers` (public read) — stores cover images. Auto-generated thumbnail or admin-uploaded.
- File size limit: 50 MB per file (configurable). MIME validation on upload.

### Seeding
The 40 documents from your reference PDF will be seeded into the database with the correct categories/sub-categories matching the folder taxonomy:
- **Pustaka Regulasi:** Undang-Undang, Peraturan Pemerintah, Peraturan Menteri, Keputusan Menteri, Surat Edaran Bersama (8 docs)
- **Insight Hub:** Materi Pembelajaran (Bimtek/Sosialisasi/Infografis), Laporan (Kinerja/Kajian/Evaluasi/Survei), Dokumentasi Kegiatan (15 docs)
- **Manual Hub:** Manual Teknis Pusat (RPJMN/Renstra K/L/RKP/Renja K/L/Pagu/Pagu JM/Tagging/SBN/KRISNA IP), Manual Teknis Daerah (DAK Fisik/Nonfisik/JM/Modul Persiapan/Selaras/Aspirasi) (17 docs)

Metadata (titles, categories, status) will be seeded immediately. The actual PDF/PPTX files can be uploaded later via the admin UI per row — placeholder file slots will be created.

---

## 2. Admin Dashboard (Frontend)

### New Routes
- `/login` — admin sign-in (email + password). Redirects to `/admin` on success.
- `/admin` — protected layout with sidebar navigation; redirects unauthenticated users to `/login`.
  - `/admin` (overview) — counts per content type, recent activity, quick actions.
  - `/admin/insights` — list, search, filter, create, edit, delete Insight items.
  - `/admin/manuals` — same for Manual Hub.
  - `/admin/regulations` — same for Pustaka Regulasi.
  - `/admin/faqs` — same for FAQs (drag-to-reorder).
  - `/admin/users` — manage admin accounts (invite by email, promote/demote, remove).

### Editor UI (per content type)
A consistent form layout:
- **Basic info:** title, slug (auto-generated from title, editable), description, long description (rich text or markdown textarea).
- **Taxonomy:** category + sub-category dropdowns (driven by the seeded taxonomy from your folder structure).
- **Metadata:** author, date, language, tags (chip input), status (Aktif / Aktif Terbaru / Arsip).
- **File upload:**
  - Drag-and-drop file picker → uploads directly to Storage → stores returned URL in the row.
  - Auto-detects `file_type` (PDF / PPTX / DOCX / Image) and `file_size` from the uploaded file.
  - For PDFs, page count is extracted client-side using `pdfjs-dist`.
- **Video field:** YouTube URL input. The viewer auto-embeds `https://www.youtube.com/embed/{id}` instead of an `<video>` tag.
- **Cover image:** upload or pick from a small library of stock covers.
- **Preview button:** opens the public detail page in a new tab.

### Listing screens
- Search by title, filter by category/status, sortable columns.
- Bulk actions: publish/unpublish, delete.
- Row actions: edit, duplicate, view public page.

---

## 3. Public Site Refactor

The four static data files (`src/data/insights.ts`, `manuals.ts`, `regulasi.ts`, plus FAQ arrays) will be replaced with **TanStack Query hooks** that fetch from Lovable Cloud:
- `useInsights()`, `useManuals()`, `useRegulations()`, `useFaqs()` for lists.
- `useInsight(slug)`, `useManual(slug)`, `useRegulasi(slug)` for detail pages.
- Loaders use `queryClient.ensureQueryData()` for SSR-friendly hydration.

The existing UI components (cards, viewers, filters) stay the same — only the data source changes. The Content Viewer will gain a YouTube iframe branch alongside the existing PDF/Slides/Image/Video paths.

---

## 4. Security
- All admin routes protected via TanStack Router `beforeLoad` guards checking `has_role(uid, 'admin')`.
- RLS enforced server-side — even if a non-admin reaches the dashboard, they cannot write.
- File MIME validation client-side AND via Storage bucket policies.
- Input validation with **Zod** on every form (title length, slug format, file size).

---

## 5. What You'll Need to Do
1. After build: visit `/login`, click **Sign Up** to create your first admin account.
2. I'll provide a one-line SQL snippet (or click in Cloud → SQL editor) to promote that account to `admin`.
3. Log in → start uploading the 40 documents (metadata is pre-seeded; you just attach files).
4. Invite additional admins from `/admin/users`.

---

## 6. Out of Scope (for this phase)
- Versioning / revision history of documents (can be added later).
- Per-document granular permissions (only admin/editor split for now).
- Workflow approvals (draft → review → publish) — currently a simple `status` field.
- Analytics dashboard (views, downloads) — can be a follow-up.

---

## Files to be Created / Changed

**New:**
- `src/routes/login.tsx`, `src/routes/_admin.tsx` (layout guard)
- `src/routes/_admin/index.tsx`, `insights.tsx`, `insights.$id.tsx`, `manuals.tsx`, `manuals.$id.tsx`, `regulations.tsx`, `regulations.$id.tsx`, `faqs.tsx`, `users.tsx`
- `src/components/admin/*` (ContentForm, FileUploader, TaxonomyPicker, DataTable, etc.)
- `src/hooks/use-content.ts` (TanStack Query hooks per content type)
- `src/integrations/supabase/*` (auto-generated by Cloud)

**Refactored:**
- `src/routes/insight-hub.tsx`, `insight-hub_.$slug.tsx`, `manual-hub.tsx`, `manual-hub_.$slug.tsx`, `pustaka-regulasi.tsx`, `pustaka-regulasi_.$slug.tsx`, `faq.tsx` — read from DB instead of static files.
- `src/components/site/InsightHub.tsx`, `ManualHub.tsx`, `Faq.tsx` (homepage sections) — same.
- Navbar — add "Admin" link visible only when logged in as admin.

**Removed (or kept as fallback):**
- `src/data/insights.ts`, `manuals.ts`, `regulasi.ts` — content moves to DB.

---

This is a substantial build (~25 files). Once you approve, I'll enable Lovable Cloud, set up auth + tables + storage + RLS, seed the 40 documents from your reference, build the admin UI, and refactor the public pages — all in one go.
