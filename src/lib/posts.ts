import { getAllStoredPosts } from "@/lib/blob-storage";
import type { Post } from "@/types/post";

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllStoredPosts();
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.published_at || b.updated_at).getTime() - new Date(a.published_at || a.updated_at).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) || null;
}
