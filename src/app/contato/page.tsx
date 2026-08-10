import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  return (
    <div className="inner-page">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">Contato</span>
          <h1>Vamos conversar?</h1>
          <p>Dúvidas, comentários sobre alguma publicação ou sugestões de temas podem ser enviados por aqui.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-copy">
            <h2>Seu feedback também faz parte do projeto.</h2>
            <p>Use o formulário ao lado. As mensagens ficam disponíveis diretamente no painel administrativo do blog.</p>
          </div>
          <div className="contact-card"><ContactForm /></div>
        </div>
      </div>
    </div>
  );
}
