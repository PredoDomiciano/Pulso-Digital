"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { getPostCategories, postHasCategory, uniqueCategories } from "@/lib/categories";
import type { Post } from "@/types/post";

export function PublicationsBrowser({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...uniqueCategories(posts.flatMap((post) => getPostCategories(post)))],
    [posts],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return posts.filter((post) => {
      const categoryMatches = category === "Todos" || postHasCategory(post, category);
      const searchable = [post.title, post.excerpt, ...getPostCategories(post), ...(post.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      return categoryMatches && (!normalized || searchable.includes(normalized));
    });
  }, [posts, query, category]);

  return (
    <div className="publications-browser">
      {posts.length > 0 && (
        <div className="publications-toolbar">
          <div className="search-box">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar publicações..."
              aria-label="Buscar publicações"
            />
          </div>
          <div className="category-row" aria-label="Filtrar por categoria">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`category-chip ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhuma publicação disponível.</h2>
          <p>As matérias publicadas aparecerão aqui e poderão ser organizadas por categoria.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhuma publicação encontrada.</h2>
          <p>Tente outra busca ou escolha uma categoria diferente.</p>
        </div>
      ) : (
        <>
          <div className="publications-result-head">
            <strong>{category === "Todos" ? "Todas as publicações" : category}</strong>
            <span>{filtered.length} {filtered.length === 1 ? "publicação" : "publicações"}</span>
          </div>
          <div className="posts-grid">
            {filtered.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        </>
      )}
    </div>
  );
}
