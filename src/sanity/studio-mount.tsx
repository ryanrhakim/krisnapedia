import { Studio } from "sanity";
import { studioConfig } from "./config";

/**
 * Client-only Sanity Studio mount. Imported lazily by the /studio routes so
 * that the ~2 MB Studio bundle never ships with public pages.
 */
export function StudioMount() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Studio config={studioConfig} />
    </div>
  );
}
