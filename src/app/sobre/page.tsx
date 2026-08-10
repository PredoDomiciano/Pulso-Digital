import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Sobre" };

export default function SobrePage() {
  return (
    <div className="inner-page">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">Sobre o projeto</span>
          <h1>Conteúdo acadêmico com identidade própria.</h1>
          <p>O {siteConfig.name} foi criado como um espaço de publicação acadêmica para reunir pesquisas, reflexões, experiências e conteúdos relacionados à tecnologia, inovação e negócios digitais.</p>
        </div>

        <div className="about-grid">
          <aside className="profile-card">
            <div className="profile-avatar">PD</div>
            <h2>{siteConfig.author}</h2>
            <p>Estudante de tecnologia interessado em desenvolvimento de software, sistemas, banco de dados, automação e na relação entre tecnologia e negócios.</p>
            <div className="info-list">
              <div className="info-line"><span>Curso</span>{siteConfig.course}</div>
              <div className="info-line"><span>Instituição</span>{siteConfig.institution}</div>
              <div className="info-line"><span>Local</span>{siteConfig.city}</div>
            </div>
          </aside>

          <section className="content-card">
            <span className="eyebrow">Propósito</span>
            <h2>Aprender, registrar e compartilhar.</h2>
            <p>Este blog funciona como um registro de aprendizagem e também como um espaço de comunicação. A proposta é apresentar assuntos técnicos de maneira organizada, visual e compreensível, usando diferentes formatos de mídia quando eles ajudam a explicar melhor uma ideia.</p>
            <p>As publicações podem reunir textos, imagens, vídeos, trechos de código, citações e conteúdos incorporados. Assim, cada matéria pode ser estruturada de acordo com o assunto abordado.</p>

            <div className="values-grid">
              <div className="value-box"><strong>Clareza</strong><span>Conteúdo organizado para facilitar leitura e compreensão.</span></div>
              <div className="value-box"><strong>Tecnologia</strong><span>Temas ligados ao desenvolvimento e ao universo digital.</span></div>
              <div className="value-box"><strong>Multimídia</strong><span>Uso de diferentes formatos para enriquecer as publicações.</span></div>
              <div className="value-box"><strong>Evolução</strong><span>Um projeto que cresce a cada nova pesquisa e matéria.</span></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
