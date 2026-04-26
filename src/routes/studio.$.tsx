import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

/**
 * Embedded Sanity Studio at /studio (and anything under it).
 *
 * Studio is a heavy client-side bundle (~2 MB). We:
 *  - lazy-import it so it never lands on public route bundles
 *  - render only on the client (Studio touches `window` on mount)
 */
const StudioComponent = lazy(() =>
  import("@/sanity/studio-mount").then((m) => ({ default: m.StudioMount })),
);

export const Route = createFileRoute("/studio/$")({
  ssr: false,
  component: StudioPage,
  head: () => ({
    meta: [
      { title: "KRISNApedia Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            Memuat Studio…
          </div>
        </div>
      }
    >
      <StudioComponent />
    </Suspense>
  );
}
