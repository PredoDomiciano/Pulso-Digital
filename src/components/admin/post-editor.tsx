"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, TrashIcon, UploadIcon } from "@/components/icons";
import { readingTime, slugify } from "@/lib/utils";
import type { BlockType, ContentBlock, Post } from "@/types/post";

const blockNames: Record<BlockType, string> = {
  paragraph: "Texto",
  heading: "Subtítulo",
  image: "Imagem",
  video: "Vídeo",
  code: "Código",
  quote: "Citação",
  embed: "Embed",
};

function newBlock(type: BlockType): ContentBlock {
  return { id: crypto.randomUUID(), type, text: "" };
}

export function PostEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(Boolean(postId));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [original, setOriginal] = useState<Post | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    async function init() {
      if (!postId) {
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/admin/posts/${postId}`, { cache: "no-store" }).catch(() => null);
      if (!response || response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!response.ok) {
        setError("Publicação não encontrada.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      const post = data.post as Post;
      setOriginal(post);
      setTitle(post.title);
      setSlug(post.slug);
      setSlugTouched(true);
      setExcerpt(post.excerpt || "");
      setCategory(post.category || "");
      setTags((post.tags || []).join(", "));
      setCoverUrl(post.cover_url || "");
      setFeatured(post.featured);
      setBlocks(post.content || []);
      setLoading(false);
    }
    init();
  }, [postId, router]);

  function changeTitle(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function addBlock(type: BlockType) {
    setBlocks((current) => [...current, newBlock(type)]);
  }

  function updateBlock(id: string, patch: Partial<ContentBlock>) {
    setBlocks((current) => current.map((block) => block.id === id ? { ...block, ...patch } : block));
  }

  function removeBlock(id: string) {
    setBlocks((current) => current.filter((block) => block.id !== id));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setBlocks((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form }).catch(() => null);
    setUploading(false);

    if (!response) {
      setError("Não foi possível enviar a imagem.");
      return null;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401) router.replace("/admin/login");
      setError(data.error || "Não foi possível enviar a imagem.");
      return null;
    }
    return String(data.url || "") || null;
  }

  async function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setCoverUrl(url);
  }

  async function uploadBlockImage(blockId: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) updateBlock(blockId, { url });
  }

  async function save(status: "draft" | "published") {
    setError("");
    if (!title.trim()) return setError("Informe o título da publicação.");
    if (!slug.trim()) return setError("Informe o endereço (slug) da publicação.");
    if (status === "published" && blocks.length === 0) return setError("Adicione pelo menos um bloco de conteúdo antes de publicar.");

    setSaving(true);
    const payload = {
      title: title.trim(),
      slug: slugify(slug),
      excerpt: excerpt.trim() || null,
      category: category.trim() || "Geral",
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      cover_url: coverUrl || null,
      content: blocks,
      status,
      featured,
    };

    const response = await fetch(postId ? `/api/admin/posts/${postId}` : "/api/admin/posts", {
      method: postId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    setSaving(false);
    if (!response) {
      setError("Não foi possível conectar ao servidor.");
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401) router.replace("/admin/login");
      setError(data.error || "Não foi possível salvar a publicação.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (loading) return <div className="admin-page"><div className="container"><div className="panel"><div className="skeleton" style={{ height: 350 }}/></div></div></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-top">
          <div><span className="eyebrow">Editor</span><h1>{postId ? "Editar publicação" : "Nova publicação"}</h1><p>Monte a matéria por blocos e publique quando estiver pronta.</p></div>
          <div className="admin-actions"><button className="button secondary" onClick={() => router.push("/admin")}>Cancelar</button></div>
        </div>

        <div className="editor-layout">
          <div className="editor-main">
            <section className="editor-card">
              <div className="editor-fields">
                <div className="field"><label>Título</label><input className="input editor-title" value={title} onChange={(e) => changeTitle(e.target.value)} placeholder="Título da matéria" /></div>
                <div className="field"><label>Resumo</label><textarea className="textarea" style={{ minHeight: 100 }} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Um resumo curto que aparecerá nos cards e no topo da publicação." /></div>
                <div className="editor-row">
                  <div className="field"><label>Categoria</label><input className="input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ex.: Tecnologia" /></div>
                  <div className="field"><label>Tags</label><input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="IA, programação, faculdade" /></div>
                </div>
                <div className="field"><label>Endereço da publicação</label><input className="input" value={slug} onChange={(e) => { setSlugTouched(true); setSlug(e.target.value); }} onBlur={() => setSlug(slugify(slug))} placeholder="titulo-da-publicacao" /></div>
              </div>
            </section>

            <section className="editor-card">
              <h2>Conteúdo</h2>
              <div className="blocks-list">
                {blocks.map((block, index) => (
                  <div className="block-card" key={block.id}>
                    <div className="block-head">
                      <strong>{index + 1}. {blockNames[block.type]}</strong>
                      <div className="block-actions">
                        <button onClick={() => moveBlock(index, -1)} title="Mover para cima">↑</button>
                        <button onClick={() => moveBlock(index, 1)} title="Mover para baixo">↓</button>
                        <button onClick={() => removeBlock(block.id)} title="Excluir"><TrashIcon width={14} height={14}/></button>
                      </div>
                    </div>

                    {block.type === "paragraph" && <textarea className="textarea" value={block.text || ""} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Escreva um parágrafo..." />}
                    {block.type === "heading" && <input className="input" value={block.text || ""} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Subtítulo da seção" />}
                    {block.type === "quote" && <div className="editor-fields"><textarea className="textarea" style={{ minHeight: 95 }} value={block.text || ""} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Texto da citação"/><input className="input" value={block.author || ""} onChange={(e) => updateBlock(block.id, { author: e.target.value })} placeholder="Autor da citação (opcional)"/></div>}
                    {block.type === "code" && <div className="editor-fields"><input className="input" value={block.language || ""} onChange={(e) => updateBlock(block.id, { language: e.target.value })} placeholder="Linguagem: Java, Python, C#..."/><textarea className="textarea" style={{ minHeight: 190, fontFamily: "monospace" }} value={block.text || ""} onChange={(e) => updateBlock(block.id, { text: e.target.value })} placeholder="Cole o código aqui..."/></div>}
                    {block.type === "image" && <div className="editor-fields"><div className="upload-area"><UploadIcon style={{ margin: "0 auto 8px" }}/><strong>{uploading ? "Enviando..." : "Clique para enviar uma imagem"}</strong><input type="file" accept="image/*" onChange={(e) => uploadBlockImage(block.id, e)}/></div><input className="input" value={block.url || ""} onChange={(e) => updateBlock(block.id, { url: e.target.value })} placeholder="Ou cole a URL da imagem"/><input className="input" value={block.alt || ""} onChange={(e) => updateBlock(block.id, { alt: e.target.value })} placeholder="Descrição da imagem (acessibilidade)"/><input className="input" value={block.caption || ""} onChange={(e) => updateBlock(block.id, { caption: e.target.value })} placeholder="Legenda (opcional)"/>{block.url && <div className="cover-preview"><img src={block.url} alt="Prévia"/></div>}</div>}
                    {block.type === "video" && <div className="editor-fields"><input className="input" value={block.url || ""} onChange={(e) => updateBlock(block.id, { url: e.target.value })} placeholder="URL do YouTube ou arquivo de vídeo"/><input className="input" value={block.caption || ""} onChange={(e) => updateBlock(block.id, { caption: e.target.value })} placeholder="Legenda (opcional)"/></div>}
                    {block.type === "embed" && <div className="editor-fields"><input className="input" value={block.title || ""} onChange={(e) => updateBlock(block.id, { title: e.target.value })} placeholder="Título do conteúdo"/><input className="input" value={block.url || ""} onChange={(e) => updateBlock(block.id, { url: e.target.value })} placeholder="URL para incorporar"/><input className="input" value={block.caption || ""} onChange={(e) => updateBlock(block.id, { caption: e.target.value })} placeholder="Legenda (opcional)"/></div>}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <div className="add-block-menu">
                  {(Object.keys(blockNames) as BlockType[]).map((type) => <button key={type} onClick={() => addBlock(type)}><PlusIcon width={15} height={15} style={{ margin: "0 auto 5px" }}/>{blockNames[type]}</button>)}
                </div>
              </div>
            </section>
          </div>

          <aside className="editor-side">
            <section className="editor-card sticky-card">
              <h2>Publicação</h2>
              <div className="editor-fields">
                <div className="field"><label>Imagem de capa</label><div className="upload-area"><UploadIcon style={{ margin: "0 auto 8px" }}/><strong>{uploading ? "Enviando..." : "Enviar capa"}</strong><input type="file" accept="image/*" onChange={uploadCover}/></div><input className="input" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="Ou cole uma URL"/>{coverUrl && <div className="cover-preview"><img src={coverUrl} alt="Capa"/></div>}</div>
                <label className="checkbox-row"><input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)}/> Destacar na página inicial</label>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}><small style={{ color: "var(--muted)" }}>Tempo estimado: {readingTime(blocks)} min de leitura</small></div>
                <button className="button secondary" disabled={saving || uploading} onClick={() => save("draft")}>{saving ? "Salvando..." : "Salvar rascunho"}</button>
                <button className="button accent" disabled={saving || uploading} onClick={() => save("published")}>{saving ? "Salvando..." : original?.status === "published" ? "Atualizar publicação" : "Publicar agora"}</button>
                {error && <div className="form-status error">{error}</div>}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
