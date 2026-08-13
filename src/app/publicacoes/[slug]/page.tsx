import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { ShareButton } from "@/components/share-button";
import { getPostBySlug } from "@/lib/posts";
import { getPrimaryCategory } from "@/lib/categories";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Publicação não encontrada" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: { title: post.title, description: post.excerpt || undefined, images: post.cover_url ? [post.cover_url] : undefined, type: "article" },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="article-shell">
      <header className="article-head">
        <span className="category-label">{getPrimaryCategory(post)}</span>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="lead">{post.excerpt}</p>}
        <div className="post-meta" style={{ marginTop: 20 }}><span>Por {post.author}</span><span className="dot"/><span>{formatDate(post.published_at)}</span><span className="dot"/><span>{post.reading_time} min de leitura</span></div>
      </header>

      {post.cover_url && <div className="article-cover"><img src={post.cover_url} alt={`Capa: ${post.title}`}/></div>}
      <ContentRenderer blocks={post.content || []}/>
      {(post.tags || []).length > 0 && <div className="article-body"><div className="article-tags">{post.tags!.map((tag) => <span className="tag" key={tag}>#{tag}</span>)}</div></div>}
      <div className="share-row"><span>Gostou da publicação? Compartilhe com alguém.</span><ShareButton /></div>
    </article>
  );
}
