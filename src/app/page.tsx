import { HomeContent } from "@/components/home-content";
import { getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Tecnologia • ideias • negócios</span>
            <h1>Ideias que movem o <em>digital.</em></h1>
            <p className="hero-copy">{siteConfig.description} Um espaço para transformar pesquisas, aprendizados e experiências em conteúdo claro e acessível.</p>
          </div>
          <div>
            <div className="hero-orbit" />
            <div className="hero-note"><strong>Um blog em constante construção.</strong><p>Novas publicações entram pelo painel e aparecem aqui automaticamente, organizadas por data, categoria e destaque.</p></div>
          </div>
        </div>
      </section>
      <HomeContent posts={posts}/>
    </>
  );
}
