import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await getPublishedPosts();
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/publicacoes`, lastModified: new Date(), priority: .9 },
    { url: `${base}/sobre`, lastModified: new Date(), priority: .7 },
    { url: `${base}/contato`, lastModified: new Date(), priority: .6 },
    ...posts.map((post) => ({ url: `${base}/publicacoes/${post.slug}`, lastModified: new Date(post.updated_at), priority: .8 })),
  ];
}
