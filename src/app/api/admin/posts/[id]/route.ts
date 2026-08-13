import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { deleteStoredPost, getAllStoredPosts, getStoredPostById, saveStoredPost } from "@/lib/blob-storage";
import { siteConfig } from "@/lib/site";
import { getPostCategories, getPrimaryCategory, uniqueCategories } from "@/lib/categories";
import { readingTime, slugify } from "@/lib/utils";
import type { ContentBlock, Post } from "@/types/post";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };

function unauthorized() {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
}

export async function GET(_: Request, { params }: Context) {
  if (!(await isAdminSession())) return unauthorized();
  const { id } = await params;
  const post = await getStoredPostById(id);
  return post ? NextResponse.json({ post }) : NextResponse.json({ error: "Publicação não encontrada." }, { status: 404 });
}

export async function PUT(request: Request, { params }: Context) {
  if (!(await isAdminSession())) return unauthorized();
  const { id } = await params;
  const original = await getStoredPostById(id);
  if (!original) return NextResponse.json({ error: "Publicação não encontrada." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  const slug = slugify(String(body.slug || title));
  const content = (Array.isArray(body.content) ? body.content : []) as ContentBlock[];
  const status: Post["status"] = body.status === "published" ? "published" : "draft";

  if (!title || !slug) return NextResponse.json({ error: "Informe título e endereço da publicação." }, { status: 400 });
  if (status === "published" && content.length === 0) return NextResponse.json({ error: "Adicione conteúdo antes de publicar." }, { status: 400 });

  const posts = await getAllStoredPosts();
  if (posts.some((post) => post.id !== id && post.slug === slug)) return NextResponse.json({ error: "Esse endereço (slug) já está em uso." }, { status: 409 });

  const now = new Date().toISOString();
  const oldPrimaryCategory = getPrimaryCategory(original);
  const primaryCategory = String(body.category || "").trim() || "Geral";
  const secondaryCategories = getPostCategories(original).filter(
    (item) => item.toLocaleLowerCase("pt-BR") !== oldPrimaryCategory.toLocaleLowerCase("pt-BR"),
  );
  const post: Post = {
    ...original,
    title,
    slug,
    excerpt: String(body.excerpt || "").trim() || null,
    category: primaryCategory,
    categories: uniqueCategories([primaryCategory, ...secondaryCategories]),
    tags: Array.isArray(body.tags) ? body.tags.map(String).map((tag: string) => tag.trim()).filter(Boolean) : [],
    cover_url: String(body.cover_url || "").trim() || null,
    content,
    status,
    featured: Boolean(body.featured),
    author: siteConfig.author,
    reading_time: readingTime(content),
    published_at: status === "published" ? original.published_at || now : null,
    updated_at: now,
  };

  try {
    await saveStoredPost(post);
    return NextResponse.json({ post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível atualizar. Confira a configuração do Vercel Blob." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  if (!(await isAdminSession())) return unauthorized();
  const { id } = await params;
  try {
    await deleteStoredPost(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível excluir a publicação." }, { status: 500 });
  }
}
