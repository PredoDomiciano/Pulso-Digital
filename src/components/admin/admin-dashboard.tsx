"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EditIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    async function load() {
      const [postsResponse, messagesResponse] = await Promise.all([
        fetch("/api/admin/posts", { cache: "no-store" }),
        fetch("/api/admin/messages", { cache: "no-store" }),
      ]).catch(() => [null, null] as const);

      if (!postsResponse || postsResponse.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const postData = await postsResponse.json().catch(() => ({ posts: [] }));
      const messageData = messagesResponse?.ok ? await messagesResponse.json().catch(() => ({ messages: [] })) : { messages: [] };
      setPosts(postData.posts || []);
      setMessages(messageData.messages || []);
      setChecking(false);
    }
    load();
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function deletePost(post: Post) {
    if (!window.confirm(`Excluir “${post.title}”? Essa ação não pode ser desfeita.`)) return;
    const response = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (response.ok) setPosts((current) => current.filter((item) => item.id !== post.id));
    else window.alert("Não foi possível excluir a publicação.");
  }

  if (checking) return <div className="admin-page"><div className="container"><div className="panel"><div className="skeleton" style={{ height: 180 }}/></div></div></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-top">
          <div><span className="eyebrow">Administração</span><h1>Seu painel editorial.</h1><p>Crie, organize e publique tudo sem editar código.</p></div>
          <div className="admin-actions"><Link href="/admin/nova" className="button accent"><PlusIcon width={18} height={18}/> Nova publicação</Link><button className="button secondary" onClick={logout}>Sair</button></div>
        </div>

        <div className="admin-grid">
          <section className="panel">
            <div className="panel-head"><h2>Publicações</h2><span className="status-badge">{posts.length} total</span></div>
            {posts.length === 0 ? (
              <div className="empty-state" style={{ padding: 38 }}><h2 style={{ fontSize: "1.3rem" }}>Nenhuma publicação ainda.</h2><p>Crie a primeira matéria e escolha se deseja salvar como rascunho ou publicar imediatamente.</p><Link href="/admin/nova" className="button accent small"><PlusIcon width={16} height={16}/> Criar publicação</Link></div>
            ) : (
              <div className="admin-list">
                {posts.map((post) => (
                  <div className="admin-item" key={post.id}>
                    <div className="admin-thumb">{post.cover_url && <img src={post.cover_url} alt=""/>}</div>
                    <div className="admin-item-copy"><strong>{post.title}</strong><span>{post.category || "Geral"} • {post.status === "published" ? formatDate(post.published_at) : "Rascunho"}</span></div>
                    <span className={`status-badge ${post.status}`}>{post.status === "published" ? "Publicado" : "Rascunho"}</span>
                    <div className="item-actions"><Link href={`/admin/editar/${post.id}`} className="icon-button" title="Editar"><EditIcon width={16} height={16}/></Link><button className="icon-button" title="Excluir" onClick={() => deletePost(post)}><TrashIcon width={16} height={16}/></button></div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="panel">
            <div className="panel-head"><h2>Mensagens de contato</h2><span className="status-badge">{messages.length}</span></div>
            {messages.length === 0 ? <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>As mensagens enviadas pela página Contato aparecerão aqui.</p> : messages.map((message) => (
              <div className="message-item" key={message.id}><strong>{message.subject}</strong><small>{message.name} • {message.email}</small><p>{message.message}</p></div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
