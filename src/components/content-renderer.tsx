"use client";

import { useState } from "react";
import { CopyIcon, ExternalIcon } from "@/components/icons";
import { youtubeEmbed } from "@/lib/utils";
import type { ContentBlock } from "@/types/post";

function CodeBlock({ block }: { block: ContentBlock }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(block.text || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return (
    <div className="code-block">
      <div className="code-head"><span>{block.language || "código"}</span><button onClick={copy} className="button small secondary" style={{ color: "inherit", borderColor: "rgba(255,255,255,.12)", background: "transparent" }}><CopyIcon width={14} height={14}/>{copied ? "Copiado" : "Copiar"}</button></div>
      <pre><code>{block.text}</code></pre>
    </div>
  );
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block) => {
        if (block.type === "paragraph") return <p key={block.id}>{block.text}</p>;
        if (block.type === "heading") return <h2 key={block.id}>{block.text}</h2>;
        if (block.type === "image") return <figure key={block.id}>{block.url && <img src={block.url} alt={block.alt || "Imagem da publicação"}/>} {block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
        if (block.type === "quote") return <blockquote key={block.id}>{block.text}{block.author && <cite>— {block.author}</cite>}</blockquote>;
        if (block.type === "code") return <CodeBlock block={block} key={block.id}/>;
        if (block.type === "video") {
          const embed = block.url ? youtubeEmbed(block.url) : null;
          return <figure key={block.id}>{embed ? <div className="video-wrap"><iframe src={embed} title={block.caption || "Vídeo"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div> : block.url ? <div className="video-wrap"><video src={block.url} controls /></div> : null}{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
        }
        if (block.type === "embed") return <figure key={block.id}>{block.url && <div className="embed-wrap"><iframe src={block.url} title={block.title || "Conteúdo incorporado"} loading="lazy" /></div>}{block.caption && <figcaption>{block.caption}</figcaption>}{block.url && <a className="read-link" href={block.url} target="_blank" rel="noreferrer" style={{ marginTop: 10 }}>Abrir conteúdo <ExternalIcon width={16} height={16}/></a>}</figure>;
        return null;
      })}
    </div>
  );
}
