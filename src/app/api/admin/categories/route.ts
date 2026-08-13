import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { getPostCategories, normalizeCategoryName, uniqueCategories } from "@/lib/categories";
import { getAllStoredPosts, getStoredCategories, saveStoredCategories, saveStoredPost } from "@/lib/blob-storage";
import type { Post } from "@/types/post";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
}

function withCategories(post: Post, categories: string[]): Post {
  const normalized = uniqueCategories(categories);
  const nextCategories = normalized.length ? normalized : ["Geral"];
  return {
    ...post,
    category: nextCategories[0],
    categories: nextCategories,
    updated_at: new Date().toISOString(),
  };
}

export async function GET() {
  if (!(await isAdminSession())) return unauthorized();
  const [categories, posts] = await Promise.all([getStoredCategories(), getAllStoredPosts()]);
  return NextResponse.json({ categories, posts });
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const name = normalizeCategoryName(body.name);
  if (!name) return NextResponse.json({ error: "Informe o nome da categoria." }, { status: 400 });

  try {
    const categories = await getStoredCategories();
    const saved = await saveStoredCategories(uniqueCategories([...categories, name]));
    return NextResponse.json({ categories: saved }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível criar a categoria." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminSession())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const name = normalizeCategoryName(body.name);
  const selectedIds = new Set(Array.isArray(body.postIds) ? body.postIds.map(String) : []);
  if (!name) return NextResponse.json({ error: "Categoria inválida." }, { status: 400 });

  try {
    const [posts, categories] = await Promise.all([getAllStoredPosts(), getStoredCategories()]);
    const updatedPosts: Post[] = [];

    for (const post of posts) {
      const current = getPostCategories(post);
      const hasCategory = current.some((item) => item.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"));
      const shouldHaveCategory = selectedIds.has(post.id);
      if (hasCategory === shouldHaveCategory) {
        updatedPosts.push(post);
        continue;
      }

      const next = shouldHaveCategory
        ? uniqueCategories([...current, name])
        : current.filter((item) => item.toLocaleLowerCase("pt-BR") !== name.toLocaleLowerCase("pt-BR"));
      const updated = withCategories(post, next);
      await saveStoredPost(updated);
      updatedPosts.push(updated);
    }

    const derivedCategories = uniqueCategories(updatedPosts.flatMap((post) => getPostCategories(post)));
    const savedCategories = await saveStoredCategories(uniqueCategories([...categories, name, ...derivedCategories]));
    return NextResponse.json({ categories: savedCategories, posts: updatedPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível atualizar as publicações da categoria." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminSession())) return unauthorized();
  const url = new URL(request.url);
  const name = normalizeCategoryName(url.searchParams.get("name"));
  if (!name) return NextResponse.json({ error: "Categoria inválida." }, { status: 400 });
  if (name.toLocaleLowerCase("pt-BR") === "geral") return NextResponse.json({ error: "A categoria Geral não pode ser excluída." }, { status: 400 });

  try {
    const [posts, categories] = await Promise.all([getAllStoredPosts(), getStoredCategories()]);
    const updatedPosts: Post[] = [];

    for (const post of posts) {
      const current = getPostCategories(post);
      const next = current.filter((item) => item.toLocaleLowerCase("pt-BR") !== name.toLocaleLowerCase("pt-BR"));
      if (next.length === current.length) {
        updatedPosts.push(post);
        continue;
      }

      const updated = withCategories(post, next);
      await saveStoredPost(updated);
      updatedPosts.push(updated);
    }

    const remainingConfigured = categories.filter(
      (item) => item.toLocaleLowerCase("pt-BR") !== name.toLocaleLowerCase("pt-BR"),
    );
    const derivedCategories = uniqueCategories(updatedPosts.flatMap((post) => getPostCategories(post)));
    const savedCategories = await saveStoredCategories(uniqueCategories([...remainingConfigured, ...derivedCategories]));
    return NextResponse.json({ categories: savedCategories, posts: updatedPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível excluir a categoria." }, { status: 500 });
  }
}
