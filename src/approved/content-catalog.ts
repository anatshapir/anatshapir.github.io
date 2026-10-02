import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const ORIGINAL_SITE_URL = "https://anatshapir.github.io/";
export const CATALOG_URL = "materials.json";

const materialSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  category: z.enum(["teaching", "general", "discover", "create", "love", "products"]),
  path: z.array(z.string().min(1)),
  linkUrl: z.string(),
});
const catalogSchema = z.object({
  materials: z.array(materialSchema),
}).superRefine((catalog, context) => {
  const ids = new Set<string>();
  for (const material of catalog.materials) {
    if (ids.has(material.id)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "Duplicate content id" });
    }
    ids.add(material.id);
  }
});

export type Material = z.infer<typeof materialSchema>;
export type Catalog = z.infer<typeof catalogSchema>;

export function useContentCatalog() {
  return useQuery({
    queryKey: ["original-site-content"],
    queryFn: async ({ signal }): Promise<Catalog> => {
      const catalogUrl = new URL(CATALOG_URL, window.location.href.split("#")[0]).href;
      const response = await fetch(catalogUrl, {
        signal: AbortSignal.any([signal, AbortSignal.timeout(15_000)]),
        cache: "no-cache",
      });
      if (!response.ok) throw new Error(`Content catalog request failed (${response.status})`);
      return catalogSchema.parse(await response.json());
    },
    staleTime: 60_000,
    retry: 1,
  });
}

export function getMaterialUrl(item: Material): string | null {
  if (!item.linkUrl.trim()) return null;
  try {
    const url = new URL(item.linkUrl.trim(), ORIGINAL_SITE_URL);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return null;
    // The original catalog has an HTML filename ending in "/".
    // GitHub Pages serves that file without the extra slash.
    if (url.origin === new URL(ORIGINAL_SITE_URL).origin) {
      url.pathname = url.pathname.replace(/\.html\/$/, ".html");
    }
    return url.href;
  } catch {
    return null;
  }
}

export function getCategoryMaterials(materials: Material[], slug: string): Material[] {
  return materials.filter((item) => {
    if (slug === "learn") return item.category === "teaching";
    if (item.category === "general") {
      return slug === (item.path[0] === "ספרים" ? "discover" : "love");
    }
    return item.category === slug;
  });
}

export function contentHref(item: Material, from: string): string {
  return `/content/${encodeURIComponent(item.id)}?from=${encodeURIComponent(from)}`;
}