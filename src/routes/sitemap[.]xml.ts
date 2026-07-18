import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sanityClient } from "@/lib/sanity";

const BASE_URL = "https://krisnapedia.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

type Slugged = { slug: string; date?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/insight-hub", changefreq: "weekly", priority: "0.8" },
          { path: "/manual-hub", changefreq: "weekly", priority: "0.8" },
          { path: "/pustaka-regulasi", changefreq: "weekly", priority: "0.8" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/tentang", changefreq: "monthly", priority: "0.5" },
          { path: "/panduan", changefreq: "monthly", priority: "0.5" },
        ];

        const projection = `{ "slug": slug.current, "date": coalesce(date, _updatedAt) }`;
        let dynamicEntries: SitemapEntry[] = [];
        try {
          const [insights, manuals, regulations] = await Promise.all([
            sanityClient.fetch<Slugged[]>(
              `*[_type == "insight" && published == true] ${projection}`,
            ),
            sanityClient.fetch<Slugged[]>(
              `*[_type == "manual" && published == true] ${projection}`,
            ),
            sanityClient.fetch<Slugged[]>(
              `*[_type == "regulation" && published == true] ${projection}`,
            ),
          ]);
          dynamicEntries = [
            ...insights.map((i) => ({
              path: `/insight-hub/${i.slug}`,
              lastmod: i.date?.slice(0, 10),
              changefreq: "monthly" as const,
              priority: "0.7",
            })),
            ...manuals.map((m) => ({
              path: `/manual-hub/${m.slug}`,
              lastmod: m.date?.slice(0, 10),
              changefreq: "monthly" as const,
              priority: "0.7",
            })),
            ...regulations.map((r) => ({
              path: `/pustaka-regulasi/${r.slug}`,
              lastmod: r.date?.slice(0, 10),
              changefreq: "monthly" as const,
              priority: "0.7",
            })),
          ];
        } catch {
          dynamicEntries = [];
        }

        const entries = [...staticEntries, ...dynamicEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
