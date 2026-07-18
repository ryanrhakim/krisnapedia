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
          "Portal pengetahuan KRISNA: regulasi, panduan, insight, dan tanya jawab dalam satu tempat yang mudah dicari.",
      },
      { property: "og:title", content: "KRISNApedia — Knowledge Management System" },
      {
        property: "og:description",
        content:
          "Portal pengetahuan KRISNA: regulasi, panduan, insight, dan tanya jawab dalam satu tempat.",
      },
      { property: "og:url", content: "https://krisnapedia.lovable.app/" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/AfPlB052icUF36yeEAECGRv30ZJ2/social-images/social-1777438187435-Screenshot_2026-04-29_at_11.45.04.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/AfPlB052icUF36yeEAECGRv30ZJ2/social-images/social-1777438187435-Screenshot_2026-04-29_at_11.45.04.webp" },
    ],
    links: [{ rel: "canonical", href: "https://krisnapedia.lovable.app/" }],
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
