import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import { getPrimaryCategory } from "@/lib/categories";
import type { Post } from "@/types/post";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <Link href={`/publicacoes/${post.slug}`} className="post-card-media" aria-label={`Ler ${post.title}`}>
        {post.cover_url ? <img src={post.cover_url} alt="" /> : <div className="media-placeholder"><div className="media-placeholder-shape" /></div>}
      </Link>
      <div className="post-card-body">
        <h3><Link href={`/publicacoes/${post.slug}`}>{post.title}</Link></h3>
        <span className="category-label post-card-category">{getPrimaryCategory(post)}</span>
        <p>{post.excerpt || "Leia a publicação completa."}</p>
        <div className="post-meta">
          <span>{formatDate(post.published_at)}</span><span className="dot"/><span>{post.reading_time} min de leitura</span>
        </div>
        <div style={{ marginTop: 18 }}>
          <Link className="read-link" href={`/publicacoes/${post.slug}`}>Ler artigo <ArrowIcon width={18} height={18}/></Link>
        </div>
      </div>
    </article>
  );
}
