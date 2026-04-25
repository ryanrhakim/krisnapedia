import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const SANITY_PROJECT_ID = "l6d1o9wo";
export const SANITY_DATASET = "production";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource | undefined | null) {
  if (!source) return null;
  return builder.image(source);
}

export function imageUrl(
  source: SanityImageSource | undefined | null,
  width = 1200,
): string {
  const b = urlFor(source);
  return b ? b.width(width).auto("format").url() : "";
}

/**
 * Build a downloadable file URL from a Sanity file asset reference.
 * The asset _ref looks like "file-<hash>-pdf"; we transform it to the CDN URL.
 */
export function fileUrl(file: { asset?: { _ref?: string; url?: string } } | undefined | null): string {
  if (!file?.asset) return "";
  if (file.asset.url) return file.asset.url;
  const ref = file.asset._ref;
  if (!ref) return "";
  // file-<id>-<ext>  →  https://cdn.sanity.io/files/<projectId>/<dataset>/<id>.<ext>
  const [, id, ext] = ref.split("-");
  if (!id || !ext) return "";
  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}.${ext}`;
}

/** Convert a YouTube URL to an embeddable iframe URL. */
export function youtubeEmbedUrl(url: string | undefined | null): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.replace("/", "");
    } else if (u.searchParams.get("v")) {
      id = u.searchParams.get("v") ?? "";
    } else if (u.pathname.startsWith("/embed/")) {
      id = u.pathname.replace("/embed/", "");
    } else if (u.pathname.startsWith("/shorts/")) {
      id = u.pathname.replace("/shorts/", "");
    }
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

/** Render Sanity portable text blocks as plain text (for descriptions / og). */
export function blocksToPlainText(
  blocks: Array<{ _type?: string; children?: Array<{ text?: string }> }> | undefined | null,
): string {
  if (!blocks?.length) return "";
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .join("\n\n");
}
