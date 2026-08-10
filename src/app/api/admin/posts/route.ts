import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { getAllStoredPosts, saveStoredPost } from "@/lib/blob-storage";
import { siteConfig } from "@/lib/site";
import { readingTime, slugify } from "@/lib/utils";
import type { ContentBlock, Post } from "@/types/post";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminSession())) return unauthorized();
  return NextResponse.json({ posts: await getAllStoredPosts() });
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  const slug = slugify(String(body.slug || title));
  const content = (Array.isArray(body.content) ? body.content : []) as ContentBlock[];
  const status: Post["status"] = body.status === "published" ? "published" : "draft";

  if (!title || !slug) return NextResponse.json({ error: "Informe título e endereço da publicação." }, { status: 400 });
  if (status === "published" && content.length === 0) return NextResponse.json({ error: "Adicione conteúdo antes de publicar." }, { status: 400 });

  const existing = await getAllStoredPosts();
  if (existing.some((post) => post.slug === slug)) return NextResponse.json({ error: "Esse endereço (slug) já está em uso." }, { status: 409 });

  const now = new Date().toISOString();
  const post: Post = {
    id: randomUUID(),
    title,
    slug,
    excerpt: String(body.excerpt || "").trim() || null,
    category: String(body.category || "").trim() || "Geral",
    tags: Array.isArray(body.tags) ? body.tags.map(String).map((tag: string) => tag.trim()).filter(Boolean) : [],
    cover_url: String(body.cover_url || "").trim() || null,
    content,
    status,
    featured: Boolean(body.featured),
    author: siteConfig.author,
    reading_time: readingTime(content),
    published_at: status === "published" ? now : null,
    created_at: now,
    updated_at: now,
  };

  try {
    await saveStoredPost(post);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível salvar. Confira se o Vercel Blob está conectado ao projeto." }, { status: 500 });
  }
}
