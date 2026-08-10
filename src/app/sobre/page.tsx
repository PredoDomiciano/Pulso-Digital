import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Sobre" };

export default function SobrePage() {
  return (
    <div className="inner-page about-page">
      <div className="container">
        <header className="about-hero">
          <div className="about-title">
            <span className="eyebrow">Sobre o Pulso Digital</span>
            <h1>O que aprendemos não precisa ficar preso na sala de aula.</h1>
          </div>

          <div className="about-lead">
            <p>
              Este é o nosso espaço para transformar pesquisas, trabalhos e
              descobertas em conteúdo que vale a pena compartilhar.
            </p>
            <div className="about-origin">
              <span>Projeto acadêmico</span>
              <strong>{siteConfig.institution}</strong>
              <small>{siteConfig.city}</small>
            </div>
          </div>
        </header>

        <section className="about-section">
          <div className="about-section-heading">
            <span className="about-index">01</span>
            <span className="eyebrow">O projeto</span>
            <h2>Um blog feito para organizar ideias e explicar bem.</h2>
          </div>
          <div className="about-copy">
            <p className="about-copy-lead">
              O {siteConfig.name} nasceu para reunir assuntos que fazem parte da
              nossa formação em tecnologia e negócios — mas com uma linguagem
              direta, que qualquer pessoa interessada possa acompanhar.
            </p>
            <p>
              Por aqui, teoria e prática aparecem lado a lado. Cada publicação
              parte de uma pergunta, de uma pesquisa ou de algo que aprendemos no
              caminho. A ideia não é parecer complicado: é tornar o assunto mais
              claro, útil e interessante.
            </p>
            <div className="about-course">
              <span>Curso</span>
              <strong>{siteConfig.course}</strong>
            </div>
          </div>
        </section>

        <section className="about-section contributors-section">
          <div className="about-section-heading">
            <span className="about-index">02</span>
            <span className="eyebrow">Quem escreve</span>
            <h2>Duas pessoas, uma mesma curiosidade pelo digital.</h2>
          </div>
          <div className="contributors-list">
            <article className="contributor">
              <span className="contributor-initials" aria-hidden="true">PD</span>
              <div>
                <span className="contributor-role">Autor</span>
                <h3>Pedro Domiciano</h3>
                <p>
                  Estudante de Tecnologia em Informática para Negócios e um dos
                  responsáveis pelas pesquisas e publicações do blog.
                </p>
              </div>
            </article>

            <article className="contributor">
              <span className="contributor-initials contributor-initials-alt" aria-hidden="true">DC</span>
              <div>
                <span className="contributor-role">Autor</span>
                <h3>Diogo Carvalho</h3>
                <p>
                  Estudante de Tecnologia em Informática para Negócios e um dos
                  responsáveis pelas pesquisas e publicações do blog.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="about-section principles-section">
          <div className="about-section-heading">
            <span className="about-index">03</span>
            <span className="eyebrow">Nosso jeito</span>
            <h2>Conteúdo pensado para ser lido, não apenas entregue.</h2>
          </div>
          <ol className="principles-list">
            <li>
              <span>01</span>
              <div><strong>Começar pela ideia</strong><p>Antes do formato, vem a pergunta que queremos responder.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><strong>Escrever com clareza</strong><p>Termos técnicos entram quando ajudam — e sempre com contexto.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><strong>Compartilhar o processo</strong><p>O blog acompanha o que aprendemos e evolui junto com a gente.</p></div>
            </li>
          </ol>
        </section>

        <aside className="about-contact">
          <div>
            <span className="eyebrow">Continue a conversa</span>
            <h2>Tem uma pauta, pergunta ou sugestão?</h2>
          </div>
          <Link className="button accent" href="/contato">Fale com a gente</Link>
        </aside>
      </div>
    </div>
  );
}
