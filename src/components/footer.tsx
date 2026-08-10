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
          <span className="footer-label">Projeto acadêmico</span>
          <p>{siteConfig.author}<br />{siteConfig.course}<br />{siteConfig.institution}<br />{siteConfig.city}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}.</span>
        <span>Conteúdo acadêmico por {siteConfig.author}.</span>
      </div>
    </footer>
  );
}
