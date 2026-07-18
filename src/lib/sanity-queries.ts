import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./sanity";
import type {
  CategoryOption,
  CategoryScope,
  Faq,
  Insight,
  Manual,
  Regulation,
} from "./sanity-types";

/** Common projection so we get string slug + asset urls in one shot. */
const BASE_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  "category": coalesce(category->title, category),
  "categorySlug": category->slug.current,
  subCategory,
  description,
  longDescription,
  coverImage,
  file{ asset->{_ref, url, originalFilename, size} },
  youtubeUrl,
  viewer,
  fileType,
  author,
  "date": coalesce(date, _createdAt),
  pages,
  fileSize,
  language,
  readTime,
  tags,
  status,
  published
`;

/* ───────── Insights ───────── */

export const insightsQueryOptions = () =>
  queryOptions({
    queryKey: ["insights"],
    queryFn: async (): Promise<Insight[]> =>
      sanityClient.fetch(
        `*[_type == "insight" && published == true] | order(date desc) { ${BASE_PROJECTION} }`,
      ),
    staleTime: 60_000,
  });

export const insightBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["insight", slug],
    queryFn: async (): Promise<Insight | null> =>
      sanityClient.fetch(
        `*[_type == "insight" && slug.current == $slug && published == true][0] { ${BASE_PROJECTION} }`,
        { slug },
      ),
    staleTime: 60_000,
  });

/* ───────── Manuals ───────── */

export const manualsQueryOptions = () =>
  queryOptions({
    queryKey: ["manuals"],
    queryFn: async (): Promise<Manual[]> =>
      sanityClient.fetch(
        `*[_type == "manual" && published == true] | order(date desc) { ${BASE_PROJECTION}, version }`,
      ),
    staleTime: 60_000,
  });

export const manualBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["manual", slug],
    queryFn: async (): Promise<Manual | null> =>
      sanityClient.fetch(
        `*[_type == "manual" && slug.current == $slug && published == true][0] { ${BASE_PROJECTION}, version }`,
        { slug },
      ),
    staleTime: 60_000,
  });

/* ───────── Regulations ───────── */

export const regulationsQueryOptions = () =>
  queryOptions({
    queryKey: ["regulations"],
    queryFn: async (): Promise<Regulation[]> =>
      sanityClient.fetch(
        `*[_type == "regulation" && published == true] | order(date desc) {
          ${BASE_PROJECTION},
          jurisdiction,
          effectiveDate,
          regulasiStatus
        }`,
      ),
    staleTime: 60_000,
  });

export const regulationBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["regulation", slug],
    queryFn: async (): Promise<Regulation | null> =>
      sanityClient.fetch(
        `*[_type == "regulation" && slug.current == $slug && published == true][0] {
          ${BASE_PROJECTION},
          jurisdiction,
          effectiveDate,
          regulasiStatus
        }`,
        { slug },
      ),
    staleTime: 60_000,
  });

/* ───────── FAQs ───────── */

export const faqsQueryOptions = () =>
  queryOptions({
    queryKey: ["faqs"],
    queryFn: async (): Promise<Faq[]> =>
      sanityClient.fetch(
        `*[_type == "faq" && published == true] | order(orderIndex asc, _createdAt asc) {
          _id,
          question,
          answer,
          category,
          orderIndex,
          published
        }`,
      ),
    staleTime: 60_000,
  });

/* ───────── Categories ───────── */

export const categoriesQueryOptions = (scope: CategoryScope) =>
  queryOptions({
    queryKey: ["categories", scope],
    queryFn: async (): Promise<CategoryOption[]> =>
      sanityClient.fetch(
        `*[_type == "category" && scope == $scope && published == true]
          | order(orderIndex asc, title asc) {
            _id,
            title,
            "slug": slug.current,
            scope,
            orderIndex
          }`,
        { scope },
      ),
    staleTime: 5 * 60_000,
  });
