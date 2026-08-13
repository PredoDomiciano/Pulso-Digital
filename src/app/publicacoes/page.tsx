import { PublicationsBrowser } from "@/components/publications-browser";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Publicações | Pulso Digital",
  description: "Explore as publicações do Pulso Digital e filtre os artigos por categoria.",
};

export default async function PublicationsPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="publications-page">
      <div className="container">
        <header className="publications-hero">
          <span className="eyebrow">Arquivo do blog</span>
          <h1>Publicações</h1>
          <p>Escolha uma categoria para ver somente as matérias daquele assunto ou use a busca para encontrar um conteúdo específico.</p>
        </header>
        <PublicationsBrowser posts={posts} />
      </div>
    </div>
  );
}
