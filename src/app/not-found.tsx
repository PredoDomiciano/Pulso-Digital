import Link from "next/link";

export default function NotFound() {
  return <div className="inner-page"><div className="container"><div className="empty-state"><div className="empty-icon">404</div><h2>Página não encontrada.</h2><p>O conteúdo pode ter sido removido, ainda ser um rascunho ou o endereço pode estar incorreto.</p><Link className="button accent" href="/">Voltar ao início</Link></div></div></div>;
}
