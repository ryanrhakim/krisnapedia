// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Sanity Studio is mounted client-only at /studio via lazy import.
    // We let Vite pre-bundle Studio deps in dev so their CJS transitive
    // imports (styled-components → void-elements/prop-types, lodash, debug,
    // react-compiler-runtime, etc.) are converted to ESM correctly.
    optimizeDeps: {
      include: [
        "react-is",
        "use-sync-external-store/shim",
        "use-sync-external-store/shim/with-selector",
        "react/compiler-runtime",
        "react-compiler-runtime",
        "react-easy-crop",
        "styled-components",
        "sanity",
        "@sanity/vision",
      ],
    },
  },
});
