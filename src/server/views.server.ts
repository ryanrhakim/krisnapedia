import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type ContentType = "insight" | "manual" | "regulation";

export async function rpcIncrementView(input: {
  type: ContentType;
  slug: string;
  contentId: string;
}): Promise<number> {
  const { data, error } = await supabaseAdmin.rpc("increment_view", {
    p_type: input.type,
    p_slug: input.slug,
    p_content_id: input.contentId,
  });
  if (error) throw new Error(`increment_view failed: ${error.message}`);
  return typeof data === "number" ? data : 0;
}

export async function fetchViewsMap(
  type: ContentType,
): Promise<Record<string, number>> {
  const { data, error } = await supabaseAdmin
    .from("content_views")
    .select("slug, views")
    .eq("content_type", type);
  if (error) throw new Error(`fetchViewsMap failed: ${error.message}`);
  const map: Record<string, number> = {};
  for (const row of data ?? []) {
    map[row.slug as string] = (row.views as number) ?? 0;
  }
  return map;
}

/** Simple in-memory rate limit. Best-effort, per Worker instance. */
const recentHits = new Map<string, number>();
const WINDOW_MS = 30_000;

export function shouldThrottle(key: string): boolean {
  const now = Date.now();
  // opportunistic cleanup
  if (recentHits.size > 1000) {
    for (const [k, t] of recentHits) {
      if (now - t > WINDOW_MS) recentHits.delete(k);
    }
  }
  const last = recentHits.get(key);
  if (last && now - last < WINDOW_MS) return true;
  recentHits.set(key, now);
  return false;
}
