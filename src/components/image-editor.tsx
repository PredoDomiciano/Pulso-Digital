"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Python no navegador: o Pyodide é carregado da CDN só quando a pessoa usa o editor.
const PYODIDE_VERSION = "0.28.0";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const EFEITOS_PY = "/editor/efeitos.py";
const EXEMPLO = "/editor/exemplo.jpg";
const LADO_MAXIMO = 1600; // imagens maiores são reduzidas ao abrir, para os efeitos ficarem rápidos
const LIMITE_DESFAZER = 30;

type Pixels = { width: number; height: number; data: Uint8ClampedArray };
type Estado = { imagem: Pixels; passos: string[]; tela: [number, number] };

type PyProxy = { toJs: () => unknown; destroy: () => void };
type Pyodide = {
  loadPackage: (pkg: string) => Promise<void>;
  runPython: (code: string) => unknown;
  globals: { get: (name: string) => (...args: unknown[]) => PyProxy };
};
declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<Pyodide>;
  }
}

const GRUPOS: { nome: string; efeitos: [string, string][] }[] = [
  { nome: "Cor", efeitos: [["preto_e_branco", "Preto e branco"], ["sepia", "Sépia"], ["negativo", "Negativo"], ["mais_saturacao", "+ Saturação"], ["menos_saturacao", "− Saturação"]] },
  { nome: "Luz", efeitos: [["mais_brilho", "+ Brilho"], ["menos_brilho", "− Brilho"], ["mais_contraste", "+ Contraste"], ["menos_contraste", "− Contraste"]] },
  { nome: "Filtros", efeitos: [["mais_nitidez", "+ Nitidez"], ["desfocar", "Desfocar"], ["realcar_bordas", "Bordas"]] },
  { nome: "Tamanho e forma", efeitos: [["diminuir_resolucao", "− Resolução"], ["pixelizar", "Pixelizar"], ["girar", "Girar 90°"], ["espelhar", "Espelhar"]] },
];

let pythonPronto: Promise<(...args: unknown[]) => PyProxy> | null = null;

function carregarScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = src;
    tag.async = true;
    tag.onload = () => resolve();
    tag.onerror = () => reject(new Error("Não foi possível baixar o Pyodide."));
    document.head.appendChild(tag);
  });
}

// Carrega o Python, a Pillow e o arquivo efeitos.py uma única vez por página.
function carregarPython(aoAvancar: (etapa: string) => void) {
  if (!pythonPronto) {
    pythonPronto = (async () => {
      aoAvancar("Baixando o Python (Pyodide)…");
      if (!window.loadPyodide) await carregarScript(`${PYODIDE_URL}pyodide.js`);
      const pyodide = await window.loadPyodide!({ indexURL: PYODIDE_URL });
      aoAvancar("Instalando a Pillow…");
      await pyodide.loadPackage("pillow");
      aoAvancar("Preparando os efeitos…");
      const codigo = await (await fetch(EFEITOS_PY)).text();
      pyodide.runPython(codigo);
      return pyodide.globals.get("aplicar");
    })();
    pythonPronto.catch(() => { pythonPronto = null; });
  }
  return pythonPronto;
}

function carregarImagem(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Esse arquivo não parece ser uma imagem válida."));
    img.src = src;
  });
}

function paraPixels(img: HTMLImageElement): Pixels {
  const escala = Math.min(1, LADO_MAXIMO / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.max(1, Math.round(img.naturalWidth * escala));
  const height = Math.max(1, Math.round(img.naturalHeight * escala));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);
  return { width, height, data: ctx.getImageData(0, 0, width, height).data };
}

function paraCanvas(p: Pixels) {
  const canvas = document.createElement("canvas");
  canvas.width = p.width;
  canvas.height = p.height;
  canvas.getContext("2d")!.putImageData(new ImageData(new Uint8ClampedArray(p.data), p.width, p.height), 0, 0);
  return canvas;
}

function listaDePassos(passos: string[]) {
  const grupos: [string, number][] = [];
  for (const passo of passos) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo[0] === passo) ultimo[1] += 1;
    else grupos.push([passo, 1]);
  }
  return grupos.map(([nome, vezes]) => (vezes > 1 ? `${nome} ×${vezes}` : nome));
}

const numero = (n: number) => n.toLocaleString("pt-BR");

export function ImageEditor() {
  const telaRef = useRef<HTMLCanvasElement>(null);
  const arquivoRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<Pixels | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [estado, setEstado] = useState<Estado | null>(null);
  const [historico, setHistorico] = useState<Estado[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [pythonOk, setPythonOk] = useState(false);
  const [erro, setErro] = useState("");
  const [comparando, setComparando] = useState(false);
  const [arrastando, setArrastando] = useState(false);

  // desenha a imagem atual (ou a original, ao comparar) no espaço que a original ocupa
  useEffect(() => {
    const tela = telaRef.current;
    if (!tela || !estado || !original) return;
    const imagem = comparando ? original : estado.imagem;
    const [w, h] = comparando ? [original.width, original.height] : estado.tela;
    tela.width = w;
    tela.height = h;
    const ctx = tela.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = imagem.width >= w; // resolução menor: pixels aparecem como blocos
    ctx.drawImage(paraCanvas(imagem), 0, 0, w, h);
  }, [estado, original, comparando]);

  const prepararPython = useCallback(async () => {
    try {
      await carregarPython(setMensagem);
      setPythonOk(true);
      setMensagem("");
      setErro("");
    } catch {
      setErro("Não foi possível carregar o Python no navegador. Verifique a conexão e tente de novo.");
      setMensagem("");
    }
  }, []);

  async function abrir(src: string, nome: string) {
    setErro("");
    try {
      const pixels = paraPixels(await carregarImagem(src));
      setOriginal(pixels);
      setNomeArquivo(nome);
      setEstado({ imagem: pixels, passos: [], tela: [pixels.width, pixels.height] });
      setHistorico([]);
    } catch (e) {
      setErro((e as Error).message);
      return;
    }
    if (!pythonOk) prepararPython();
  }

  function abrirArquivo(arquivo: File | undefined) {
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) {
      setErro("Escolha um arquivo de imagem (JPEG, PNG, WebP, GIF…).");
      return;
    }
    const url = URL.createObjectURL(arquivo);
    abrir(url, arquivo.name).finally(() => URL.revokeObjectURL(url));
  }

  function aplicar(chave: string, rotulo: string) {
    if (!estado || ocupado || !pythonOk) return;
    setOcupado(true);
    // deixa o navegador mostrar "Aplicando…" antes de o Python ocupar a página
    setTimeout(async () => {
      try {
        const funcao = await carregarPython(setMensagem);
        const atual = estado.imagem;
        const resultado = funcao(chave, atual.width, atual.height, atual.data);
        const [width, height, bytes] = resultado.toJs() as [number, number, Uint8Array];
        resultado.destroy();
        const imagem = { width, height, data: new Uint8ClampedArray(bytes) };
        const girou = width === atual.height && height === atual.width && width !== height;
        const tela: [number, number] = girou ? [estado.tela[1], estado.tela[0]] : estado.tela;
        setHistorico((h) => [...h, estado].slice(-LIMITE_DESFAZER));
        setEstado({ imagem, passos: [...estado.passos, rotulo], tela });
      } catch {
        setErro("O efeito não pôde ser aplicado. Tente de novo.");
      } finally {
        setOcupado(false);
      }
    }, 20);
  }

  function desfazer() {
    if (!historico.length) return;
    setEstado(historico[historico.length - 1]);
    setHistorico((h) => h.slice(0, -1));
  }

  function restaurar() {
    if (!estado || !original || !estado.passos.length) return;
    setHistorico((h) => [...h, estado].slice(-LIMITE_DESFAZER));
    setEstado({ imagem: original, passos: [], tela: [original.width, original.height] });
  }

  function baixarResultado() {
    if (!estado) return;
    paraCanvas(estado.imagem).toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${nomeArquivo.replace(/\.[^.]+$/, "") || "imagem"}-editada.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, "image/png");
  }

  const podeEditar = Boolean(estado) && pythonOk && !ocupado;
  const passos = estado ? listaDePassos(estado.passos) : [];

  return (
    <section className="image-editor" aria-label="Editor de imagem em Python">
      <div className="image-editor-head">
        <div>
          <strong>Editor de imagem</strong>
          <span>Python + Pillow rodando no seu navegador</span>
        </div>
        <div className="image-editor-actions">
          <button className="button small secondary" onClick={() => arquivoRef.current?.click()}>Abrir imagem</button>
          <button className="button small secondary" onClick={() => abrir(EXEMPLO, "exemplo.jpg")}>Usar foto de exemplo</button>
          <input ref={arquivoRef} type="file" accept="image/*" hidden onChange={(e) => { abrirArquivo(e.target.files?.[0]); e.target.value = ""; }}/>
        </div>
      </div>

      {!estado ? (
        <div
          className={`image-editor-drop${arrastando ? " over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
          onDragLeave={() => setArrastando(false)}
          onDrop={(e) => { e.preventDefault(); setArrastando(false); abrirArquivo(e.dataTransfer.files[0]); }}
        >
          <strong>Arraste uma imagem para cá</strong>
          <span>ou use os botões acima. A imagem não sai do seu computador: tudo é processado aqui mesmo, no navegador.</span>
        </div>
      ) : (
        <>
          <div className="image-editor-tools">
            {GRUPOS.map((grupo) => (
              <div className="image-editor-group" key={grupo.nome}>
                <small>{grupo.nome}</small>
                <div>
                  {grupo.efeitos.map(([chave, rotulo]) => (
                    <button key={chave} className="button small secondary" disabled={!podeEditar} onClick={() => aplicar(chave, rotulo)}>{rotulo}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="image-editor-stage">
            <canvas ref={telaRef} aria-label={comparando ? "Imagem original" : "Imagem editada"} role="img"/>
            {comparando && <span className="image-editor-badge">Original</span>}
            {(ocupado || mensagem) && <span className="image-editor-loading">{mensagem || "Aplicando…"}</span>}
          </div>

          <div className="image-editor-footer">
            <div className="image-editor-steps">
              <small>Efeitos aplicados</small>
              <p>{passos.length ? passos.join(" → ") : "Nenhum ainda."}</p>
            </div>
            <div className="image-editor-actions">
              <button className="button small secondary" disabled={!historico.length || ocupado} onClick={desfazer}>Desfazer</button>
              <button className="button small secondary" disabled={!estado.passos.length || ocupado} onClick={restaurar}>Restaurar original</button>
              <button
                className="button small secondary"
                onPointerDown={() => setComparando(true)}
                onPointerUp={() => setComparando(false)}
                onPointerLeave={() => setComparando(false)}
                onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") setComparando(true); }}
                onKeyUp={() => setComparando(false)}
              >
                Segure para ver o original
              </button>
              <button className="button small accent" disabled={ocupado} onClick={baixarResultado}>Salvar imagem</button>
            </div>
          </div>

          <p className="image-editor-status">
            {nomeArquivo} · original {original!.width}×{original!.height}px
            {(estado.imagem.width !== original!.width || estado.imagem.height !== original!.height) && <> → atual {estado.imagem.width}×{estado.imagem.height}px</>}
            {" "}· {numero(estado.imagem.width * estado.imagem.height)} pixels
          </p>
        </>
      )}

      {erro && (
        <p className="image-editor-error">
          {erro}{" "}
          {!pythonOk && estado && <button className="button small secondary" onClick={prepararPython}>Tentar de novo</button>}
        </p>
      )}
    </section>
  );
}
