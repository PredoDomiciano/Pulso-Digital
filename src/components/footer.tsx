import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark"><span /></span>
            <span>{siteConfig.name}</span>
          </div>
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <span className="footer-label">Navegação</span>
          <div className="footer-links">
            <Link href="/">Início</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
          </div>
        </div>
        <div>
          <span className="footer-label">Feito por</span>
          <p className="footer-authors">
            {siteConfig.authors.map((author) => <strong key={author}>{author}</strong>)}
            <span>{siteConfig.institution}</span>
            <span>{siteConfig.discipline}</span>
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}.</span>
        <span>Conteúdo por {siteConfig.author}.</span>
      </div>
    </footer>
  );
}
