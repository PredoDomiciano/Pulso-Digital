"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchIcon, ArrowIcon, PlusIcon } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";

export function HomeContent({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]))], [posts]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return posts.filter((post) => {
      const categoryMatches = category === "Todos" || post.category === category;
      const searchMatches = !normalized || [post.title, post.excerpt, post.category, ...(post.tags || [])]
        .filter(Boolean).join(" ").toLowerCase().includes(normalized);
      return categoryMatches && searchMatches;
    });
  }, [posts, query, category]);

  const featured = filtered.find((post) => post.featured) || filtered[0];
  const rest = featured ? filtered.filter((post) => post.id !== featured.id) : filtered;

  return (
    <section className="content-section">
      <div className="container">
        {posts.length > 0 && (
          <div className="toolbar">
            <div className="search-box">
              <SearchIcon />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por título, assunto ou tag..." aria-label="Buscar publicações" />
            </div>
            <div className="category-row">
              {categories.map((item) => <button key={item} className={`category-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><PlusIcon width={30} height={30}/></div>
            <h2>O primeiro artigo começa aqui.</h2>
            <p>O blog já está pronto. Entre no painel administrativo, crie sua primeira publicação e ela aparecerá automaticamente nesta página.</p>
            <Link href="/admin" className="button accent"><PlusIcon width={18} height={18}/> Criar primeira publicação</Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state"><h2>Nenhuma publicação encontrada.</h2><p>Tente outro termo ou selecione outra categoria.</p></div>
        ) : (
          <>
            {featured && (
              <>
                <div className="section-heading"><h2>Em destaque</h2><span>Selecionado para você</span></div>
                <article className="featured-card">
                  <Link href={`/publicacoes/${featured.slug}`} className="featured-media">
                    {featured.cover_url ? <img src={featured.cover_url} alt="" /> : <div className="media-placeholder"><div className="media-placeholder-shape" /></div>}
                  </Link>
                  <div className="featured-content">
                    <span className="category-label">{featured.category || "Geral"}</span>
                    <h3><Link href={`/publicacoes/${featured.slug}`}>{featured.title}</Link></h3>
                    <p>{featured.excerpt || "Leia a publicação completa."}</p>
                    <div className="post-meta"><span>{formatDate(featured.published_at)}</span><span className="dot"/><span>{featured.reading_time} min de leitura</span></div>
                    <div style={{ marginTop: 28 }}><Link className="read-link" href={`/publicacoes/${featured.slug}`}>Ler publicação <ArrowIcon/></Link></div>
                  </div>
                </article>
              </>
            )}

            {rest.length > 0 && (
              <>
                <div className="section-heading"><h2>Publicações recentes</h2><span>{rest.length} {rest.length === 1 ? "artigo" : "artigos"}</span></div>
                <div className="posts-grid">{rest.map((post) => <PostCard key={post.id} post={post}/>)}</div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
