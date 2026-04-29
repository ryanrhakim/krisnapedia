import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { InsightHub } from "@/components/site/InsightHub";
import { ManualHub } from "@/components/site/ManualHub";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { viewsQueryOptions } from "@/lib/views-queries";
import { insightsQueryOptions, manualsQueryOptions } from "@/lib/sanity-queries";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(insightsQueryOptions());
    queryClient.prefetchQuery(manualsQueryOptions());
    queryClient.prefetchQuery(viewsQueryOptions("insight"));
    queryClient.prefetchQuery(viewsQueryOptions("manual"));
  },
  component: Index,
  head: () => ({
    meta: [
      { title: "KRISNApedia — Knowledge Management System" },
      {
        name: "description",
        content:
          "KRISNApedia centralizes documents, manuals, and insights into one searchable knowledge repository for modern teams.",
      },
      { property: "og:title", content: "KRISNApedia — Knowledge Management System" },
      {
        property: "og:description",
        content:
          "One repository for every answer. Centralize manuals, insights, and SOPs in a single platform.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <InsightHub />
      <ManualHub />
      <Faq />
      <Footer />
    </main>
  );
}
