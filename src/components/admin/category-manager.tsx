"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { PlusIcon, TrashIcon } from "@/components/icons";
import { getPostCategories } from "@/lib/categories";
import type { Post } from "@/types/post";

type Props = {
  posts: Post[];
  onPostsChange: (posts: Post[]) => void;
};

export function CategoryManager({ posts, onPostsChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/categories", { cache: "no-store" }).catch(() => null);
      if (!response?.ok) {
        setLoading(false);
        return;
      }
      const data = await response.json().catch(() => ({ categories: [] }));
      const next = (data.categories || []) as string[];
      setCategories(next);
      setSelectedCategory((current) => current || next[0] || "");
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedPosts(new Set());
      return;
    }
    setSelectedPosts(new Set(
      posts
        .filter((post) => getPostCategories(post).some((item) => item.toLocaleLowerCase("pt-BR") === selectedCategory.toLocaleLowerCase("pt-BR")))
        .map((post) => post.id),
    ));
  }, [selectedCategory, posts]);

  const selectedCount = selectedPosts.size;
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => a.title.localeCompare(b.title, "pt-BR")),
    [posts],
  );

  async function createCategory(event: FormEvent) {
    event.preventDefault();
    const name = newCategory.trim();
    if (!name) return;
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).catch(() => null);
    const data = await response?.json().catch(() => ({}));
    setSaving(false);
    if (!response?.ok) return setStatus(data?.error || "Não foi possível criar a categoria.");
    const savedCategories = (data.categories || []) as string[];
    setCategories(savedCategories);
    const canonicalName = savedCategories.find((item) => item.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR")) || name;
    setSelectedCategory(canonicalName);
    setNewCategory("");
    setStatus("Categoria criada. Agora marque as publicações que pertencem a ela.");
  }

  function togglePost(postId: string) {
    setSelectedPosts((current) => {
      const next = new Set(current);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
    setStatus("");
  }

  async function saveSelection() {
    if (!selectedCategory) return;
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedCategory, postIds: [...selectedPosts] }),
    }).catch(() => null);
    const data = await response?.json().catch(() => ({}));
    setSaving(false);
    if (!response?.ok) return setStatus(data?.error || "Não foi possível salvar a categoria.");
    setCategories(data.categories || categories);
    if (Array.isArray(data.posts)) onPostsChange(data.posts);
    setStatus("Seleção salva.");
  }

  async function deleteCategory() {
    if (!selectedCategory) return;
    if (!window.confirm(`Excluir a categoria “${selectedCategory}”? As publicações não serão apagadas.`)) return;
    setSaving(true);
    setStatus("");
    const response = await fetch(`/api/admin/categories?name=${encodeURIComponent(selectedCategory)}`, { method: "DELETE" }).catch(() => null);
    const data = await response?.json().catch(() => ({}));
    setSaving(false);
    if (!response?.ok) return setStatus(data?.error || "Não foi possível excluir a categoria.");
    const next = (data.categories || []) as string[];
    setCategories(next);
    if (Array.isArray(data.posts)) onPostsChange(data.posts);
    setSelectedCategory(next[0] || "");
    setStatus("Categoria excluída.");
  }

  return (
    <section className="panel category-manager">
      <div className="panel-head">
        <div>
          <h2>Categorias</h2>
          <p>Crie uma categoria e marque, com cliques, quais publicações fazem parte dela.</p>
        </div>
        <span className="status-badge">{categories.length} total</span>
      </div>

      <form className="category-create" onSubmit={createCategory}>
        <input
          className="input"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="Ex.: Programação"
          aria-label="Nome da nova categoria"
        />
        <button className="button accent small" disabled={saving || !newCategory.trim()}>
          <PlusIcon width={16} height={16} /> Criar categoria
        </button>
      </form>

      {loading ? (
        <div className="skeleton" style={{ height: 150 }} />
      ) : categories.length === 0 ? (
        <div className="category-empty">Crie sua primeira categoria acima.</div>
      ) : (
        <>
          <div className="category-admin-tabs" aria-label="Categorias cadastradas">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={`category-chip ${selectedCategory === item ? "active" : ""}`}
                onClick={() => { setSelectedCategory(item); setStatus(""); }}
              >
                {item}
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="category-assignment">
              <div className="category-assignment-head">
                <div>
                  <strong>{selectedCategory}</strong>
                  <span>{selectedCount} {selectedCount === 1 ? "publicação selecionada" : "publicações selecionadas"}</span>
                </div>
                <div className="category-assignment-actions">
                  <button className="button secondary small" type="button" onClick={deleteCategory} disabled={saving || selectedCategory === "Geral"}>
                    <TrashIcon width={15} height={15} /> Excluir categoria
                  </button>
                  <button className="button accent small" type="button" onClick={saveSelection} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar seleção"}
                  </button>
                </div>
              </div>

              <div className="category-post-picker">
                {sortedPosts.length === 0 ? (
                  <p>Nenhuma publicação disponível para selecionar.</p>
                ) : sortedPosts.map((post) => (
                  <label className={`category-post-option ${selectedPosts.has(post.id) ? "selected" : ""}`} key={post.id}>
                    <input
                      type="checkbox"
                      checked={selectedPosts.has(post.id)}
                      onChange={() => togglePost(post.id)}
                    />
                    <span className="category-post-thumb">
                      {post.cover_url ? <img src={post.cover_url} alt="" /> : null}
                    </span>
                    <span className="category-post-copy">
                      <strong>{post.title}</strong>
                      <small>{post.status === "published" ? "Publicado" : "Rascunho"}</small>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {status && <div className="category-status">{status}</div>}
    </section>
  );
}
