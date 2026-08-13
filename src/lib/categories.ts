import type { Post } from "@/types/post";

export function normalizeCategoryName(value: unknown) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export function uniqueCategories(values: unknown[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const category = normalizeCategoryName(value);
    if (!category) continue;
    const key = category.toLocaleLowerCase("pt-BR");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(category);
  }

  return result;
}

export function getPostCategories(post: Pick<Post, "category" | "categories">) {
  return uniqueCategories([
    ...(Array.isArray(post.categories) ? post.categories : []),
    post.category,
  ]);
}

export function getPrimaryCategory(post: Pick<Post, "category" | "categories">) {
  return getPostCategories(post)[0] || "Geral";
}

export function postHasCategory(post: Pick<Post, "category" | "categories">, category: string) {
  const target = normalizeCategoryName(category).toLocaleLowerCase("pt-BR");
  return getPostCategories(post).some((item) => item.toLocaleLowerCase("pt-BR") === target);
}
