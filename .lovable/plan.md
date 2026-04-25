# Sanity CMS Integration Plan for KRISNApedia

Replace the static `src/data/*.ts` files with content fetched live from **Sanity**, so you and your fellow admins can manage all four content types from the Sanity Studio dashboard — no code changes needed for new content.

---

## 1. Connect Sanity (one-time setup)

- Connect the **Sanity MCP connector** so I can:
  - Fetch your project ID and dataset automatically (no manual copy-paste).
  - Create the schema for all four content types directly in your Sanity project.
  - Add your Lovable preview/published URLs to the CORS allowlist automatically.
- You'll be prompted to sign in to Sanity (free account if you don't have one) and pick or create a project.

## 2. Sanity Schema (4 content types + supporting types)

I'll define these document types in your Sanity project, mirroring the current data shapes:

| Document type | Fields |
|---|---|
| `insight` | title, slug, category, subCategory, description, longDescription (rich text), coverImage, file (PDF/PPTX/DOCX upload), youtubeUrl, author, date, pages, fileSize, language, tags[], viewer (pdf/slides/image/video/web), status |
| `manual` | same as insight + `version` |
| `regulation` | same as insight + `jurisdiction`, `effectiveDate`, `regulasiStatus` |
| `faq` | question, answer (rich text), category, orderIndex, published |
| `category` (lookup) | name, slug, parentType (insight/manual/regulation), subcategories[] |

**File handling:**
- PDFs, PPTX, DOCX, images → uploaded directly into Sanity's asset library (drag-and-drop in Studio). Sanity handles storage, CDN, and file size detection.
- Videos → `youtubeUrl` text field. The viewer auto-embeds `https://www.youtube.com/embed/{id}`.
- Cover images → uploaded image field with built-in cropping.

**Multi-admin:** You invite other admins from your Sanity project dashboard (Sanity → Members). Free tier supports **3 users**; paid tiers add more. Each admin gets the full Studio editor.

## 3. Sanity Studio (the admin dashboard)

Sanity Studio is the editing UI — a polished, hosted web app where you and other admins manage content. Two options for hosting:

- **Recommended: Hosted on sanity.io** — zero setup, just visit `your-project.sanity.studio`. Free.
- Alternative: Embed Studio at `/studio` inside KRISNApedia. More work, no real benefit unless you want single-domain branding.

I'll go with the hosted option (faster, simpler, less code in your repo).

## 4. Frontend Refactor

Replace static data with TanStack Query hooks fetching from Sanity:

**New files:**
- `src/lib/sanity.ts` — Sanity client config (project ID from MCP).
- `src/lib/sanity-queries.ts` — GROQ queries for each content type.
- `src/hooks/use-content.ts` — `useInsights()`, `useInsight(slug)`, `useManuals()`, `useManual(slug)`, `useRegulations()`, `useRegulasi(slug)`, `useFaqs()`.

**Refactored files (same UI, new data source):**
- `src/routes/insight-hub.tsx`, `insight-hub_.$slug.tsx`
- `src/routes/manual-hub.tsx`, `manual-hub_.$slug.tsx`
- `src/routes/pustaka-regulasi.tsx`, `pustaka-regulasi_.$slug.tsx`
- `src/routes/faq.tsx`
- `src/components/site/InsightHub.tsx`, `ManualHub.tsx`, `Faq.tsx` (homepage sections)

**Loaders use `queryClient.ensureQueryData()`** for SSR-friendly hydration so pages render fast and are SEO-indexable.

**Content Viewer enhancement:** Adds a YouTube iframe branch alongside the existing PDF/Slides/Image/Video paths, driven by the `youtubeUrl` field.

## 5. Initial Content Seeding

Once the schema is live, I'll seed Sanity with the **40 documents** from your reference PDF — metadata only (titles, categories, sub-categories, status). This gives you pre-structured rows so you only need to drag-and-drop the actual PDF/PPTX files into each row when ready.

Taxonomy will match your folder structure exactly:
- **Pustaka Regulasi:** Undang-Undang, Peraturan Pemerintah, Peraturan Menteri, Keputusan Menteri, Surat Edaran Bersama (8 docs)
- **Insight Hub:** Materi Pembelajaran, Laporan, Dokumentasi Kegiatan (15 docs)
- **Manual Hub:** Manual Teknis Pusat, Manual Teknis Daerah (17 docs)

## 6. What stays the same

- All your existing UI (cards, viewers, filters, navbar, footer) — untouched.
- All routes and URLs — unchanged. Detail pages still live at `/insight-hub/{slug}`, etc.
- Design, colors, layout — identical to today.

## 7. What you'll do after build

1. Visit your Sanity Studio URL (I'll give it to you).
2. Sign in with the same account you used to connect.
3. Invite other admins from Sanity → Members.
4. Open any seeded document → drag in the PDF/PPTX file → save → it appears live on KRISNApedia within seconds.

## 8. Cost & limits

- **Sanity Free tier:** 3 users, 10k documents, 5GB asset storage, 100GB bandwidth/month. More than enough for KRISNApedia's scale.
- **No Lovable Cloud needed** for this approach — saves your $25/mo Cloud balance for other features.

## 9. Out of scope (for this phase)

- Document version history (Sanity has built-in revision history per document — you get this free).
- Workflow approvals (draft/publish is built into Sanity — you get this free too).
- Per-document granular permissions (Sanity has roles on paid tiers).
- Analytics dashboard (views/downloads).

---

## Files to be created / changed

**New:**
- `src/lib/sanity.ts`
- `src/lib/sanity-queries.ts`
- `src/hooks/use-content.ts`
- Sanity schema files (in your Sanity project, not in this repo)

**Refactored:**
- 7 route files (listed above)
- 3 homepage section components
- `src/router.tsx` — ensure QueryClient is set up correctly

**Removed:**
- `src/data/insights.ts`, `manuals.ts`, `regulasi.ts` (content moves to Sanity)

---

Approve this plan and I'll: (1) connect Sanity, (2) create the schema, (3) seed the 40 documents, (4) refactor the frontend, (5) hand you the Studio URL.
