"""
Editor de imagem do Pulso Digital
=================================

Uma janela simples para abrir uma imagem e aplicar efeitos com cliques:
preto e branco, nitidez, brilho, contraste, resolução, desfoque, bordas e mais.
Cada clique aplica o efeito mais uma vez, então dá para acumular ajustes.

Como usar:
    1. Instale o Python 3 (https://www.python.org/downloads/).
       No Windows, marque "Add python.exe to PATH" durante a instalação.
    2. Instale a biblioteca Pillow:   pip install pillow
    3. Rode este arquivo:             python editor_de_imagem.py

O Tkinter, usado para desenhar a janela, já vem com o Python.
"""

import os
import tkinter as tk
from tkinter import filedialog, messagebox

try:
    from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageTk
except ImportError:  # avisa de forma amigável se o Pillow não estiver instalado
    raiz = tk.Tk()
    raiz.withdraw()
    messagebox.showerror(
        "Falta o Pillow",
        "Este editor precisa da biblioteca Pillow.\n\n"
        "Abra o terminal e rode:\n    pip install pillow\n\n"
        "Depois abra o editor de novo.",
    )
    raise SystemExit(1)


# ---------------------------------------------------------------------------
# Efeitos: cada função recebe uma imagem e devolve uma nova imagem
# ---------------------------------------------------------------------------

def _so_cor(funcao):
    """Aplica o efeito só nos canais de cor, preservando a transparência (canal alfa)."""

    def aplicar(img):
        if img.mode == "RGBA":
            alfa = img.getchannel("A")
            nova = funcao(img.convert("RGB")).convert("RGB")
            nova.putalpha(alfa)
            return nova
        return funcao(img).convert("RGB")

    return aplicar


def preto_e_branco(img):
    return _so_cor(lambda i: ImageOps.grayscale(i))(img)


def sepia(img):
    def tingir(i):
        cinza = ImageOps.grayscale(i)
        return ImageOps.colorize(cinza, black=(45, 25, 10), white=(255, 240, 200), mid=(165, 120, 75))

    return _so_cor(tingir)(img)


def negativo(img):
    return _so_cor(ImageOps.invert)(img)


def mais_brilho(img):
    return _so_cor(lambda i: ImageEnhance.Brightness(i).enhance(1.15))(img)


def menos_brilho(img):
    return _so_cor(lambda i: ImageEnhance.Brightness(i).enhance(0.87))(img)


def mais_contraste(img):
    return _so_cor(lambda i: ImageEnhance.Contrast(i).enhance(1.2))(img)


def menos_contraste(img):
    return _so_cor(lambda i: ImageEnhance.Contrast(i).enhance(0.83))(img)


def mais_saturacao(img):
    return _so_cor(lambda i: ImageEnhance.Color(i).enhance(1.25))(img)


def menos_saturacao(img):
    return _so_cor(lambda i: ImageEnhance.Color(i).enhance(0.8))(img)


def mais_nitidez(img):
    return _so_cor(lambda i: i.filter(ImageFilter.UnsharpMask(radius=2, percent=120, threshold=2)))(img)


def desfocar(img):
    return _so_cor(lambda i: i.filter(ImageFilter.GaussianBlur(radius=2)))(img)


def realcar_bordas(img):
    return _so_cor(lambda i: i.filter(ImageFilter.FIND_EDGES))(img)


def diminuir_resolucao(img):
    """Reduz largura e altura pela metade: a imagem passa a ter 1/4 dos pixels."""
    largura = max(1, img.width // 2)
    altura = max(1, img.height // 2)
    return img.resize((largura, altura), Image.Resampling.BOX)


def pixelizar(img):
    """Reduz bastante e volta ao tamanho original sem suavizar: os pixels ficam visíveis."""
    lado = max(img.width, img.height)
    bloco = max(2, lado // 64)
    pequena = img.resize((max(1, img.width // bloco), max(1, img.height // bloco)), Image.Resampling.BOX)
    return pequena.resize(img.size, Image.Resampling.NEAREST)


def girar(img):
    return img.rotate(-90, expand=True)


def espelhar(img):
    return ImageOps.mirror(img)


# (texto do botão, função) agrupados por tipo de operação
GRUPOS = [
    ("Cor", [
        ("Preto e branco", preto_e_branco),
        ("Sépia", sepia),
        ("Negativo", negativo),
        ("+ Saturação", mais_saturacao),
        ("− Saturação", menos_saturacao),
    ]),
    ("Luz", [
        ("+ Brilho", mais_brilho),
        ("− Brilho", menos_brilho),
        ("+ Contraste", mais_contraste),
        ("− Contraste", menos_contraste),
    ]),
    ("Filtros", [
        ("+ Nitidez", mais_nitidez),
        ("Desfocar", desfocar),
        ("Bordas", realcar_bordas),
    ]),
    ("Tamanho e forma", [
        ("− Resolução", diminuir_resolucao),
        ("Pixelizar", pixelizar),
        ("Girar 90°", girar),
        ("Espelhar", espelhar),
    ]),
]

FORMATOS = [
    ("Imagens", "*.png *.jpg *.jpeg *.bmp *.gif *.webp *.tif *.tiff"),
    ("Todos os arquivos", "*.*"),
]

# cores da interface
FUNDO = "#14161c"
PAINEL = "#1d2029"
TEXTO = "#e9ebf1"
TEXTO_FRACO = "#8b90a0"
DESTAQUE = "#ff5a5f"
BOTAO = "#2a2e3a"
BOTAO_ATIVO = "#3a3f4f"

LIMITE_DESFAZER = 30
MAX_LINHAS_LISTA = 4  # linhas visíveis na lista de efeitos aplicados


class EditorDeImagem(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Editor de imagem · Pulso Digital")
        self.geometry("1180x740")
        self.minsize(820, 520)
        self.configure(bg=FUNDO)

        self.original = None      # imagem como foi aberta
        self.atual = None         # imagem com os efeitos aplicados
        self.caminho = None
        self.tamanho_tela = None  # espaço que a imagem ocupa na janela
        self.historico = []       # estados anteriores, para desfazer
        self.passos = []          # nome dos efeitos aplicados
        self.mostrando_original = False
        self._foto_tk = None      # referência para o Tkinter não descartar a imagem

        self._montar_interface()
        self._atualizar_estado()

        self.bind("<Control-o>", lambda e: self.abrir())
        self.bind("<Control-s>", lambda e: self.salvar())
        self.bind("<Control-z>", lambda e: self.desfazer())

    # ---------------------------------------------------------------- interface
    def _botao(self, pai, texto, comando, destaque=False):
        cor = DESTAQUE if destaque else BOTAO
        botao = tk.Button(
            pai, text=texto, command=comando, bg=cor, fg="white" if destaque else TEXTO,
            activebackground=BOTAO_ATIVO, activeforeground=TEXTO, relief="flat", bd=0,
            padx=10, pady=7, cursor="hand2", font=("Segoe UI", 10), disabledforeground="#5c6170",
        )
        return botao

    def _montar_interface(self):
        # barra superior
        topo = self.topo = tk.Frame(self, bg=PAINEL, padx=12, pady=10)
        topo.pack(side="top", fill="x")
        tk.Label(topo, text="Pulso Digital", bg=PAINEL, fg=DESTAQUE, font=("Segoe UI", 12, "bold")).pack(side="left")
        tk.Label(topo, text="  editor de imagem", bg=PAINEL, fg=TEXTO_FRACO, font=("Segoe UI", 11)).pack(side="left")

        self.btn_salvar = self._botao(topo, "Salvar como…", self.salvar)
        self.btn_salvar.pack(side="right", padx=(6, 0))
        self._botao(topo, "Abrir imagem…", self.abrir, destaque=True).pack(side="right", padx=(6, 0))
        self.btn_restaurar = self._botao(topo, "Restaurar original", self.restaurar)
        self.btn_restaurar.pack(side="right", padx=(6, 0))
        self.btn_desfazer = self._botao(topo, "Desfazer", self.desfazer)
        self.btn_desfazer.pack(side="right", padx=(6, 0))

        corpo = tk.Frame(self, bg=FUNDO)
        corpo.pack(side="top", fill="both", expand=True)

        # painel lateral com os efeitos
        lateral = tk.Frame(corpo, bg=PAINEL, width=250, padx=12, pady=8)
        lateral.pack(side="left", fill="y")
        lateral.pack_propagate(False)

        self.botoes_efeito = []
        for nome_grupo, efeitos in GRUPOS:
            tk.Label(lateral, text=nome_grupo.upper(), bg=PAINEL, fg=TEXTO_FRACO,
                     font=("Segoe UI", 8, "bold"), anchor="w").pack(fill="x", pady=(8, 3))
            grade = tk.Frame(lateral, bg=PAINEL)
            grade.pack(fill="x")
            grade.columnconfigure(0, weight=1, uniform="col")
            grade.columnconfigure(1, weight=1, uniform="col")
            for indice, (texto, funcao) in enumerate(efeitos):
                botao = self._botao(grade, texto, lambda f=funcao, t=texto: self.aplicar(f, t))
                botao.configure(padx=4, pady=4, font=("Segoe UI", 9))
                botao.grid(row=indice // 2, column=indice % 2, sticky="ew", padx=2, pady=2)
                self.botoes_efeito.append(botao)

        self.btn_comparar = self._botao(self.topo, "Segure para ver o original", None)
        self.btn_comparar.pack(side="right", padx=(6, 0))
        self.btn_comparar.bind("<ButtonPress-1>", lambda e: self._comparar(True))
        self.btn_comparar.bind("<ButtonRelease-1>", lambda e: self._comparar(False))

        tk.Label(lateral, text="EFEITOS APLICADOS", bg=PAINEL, fg=TEXTO_FRACO,
                 font=("Segoe UI", 8, "bold"), anchor="w").pack(fill="x", pady=(14, 4))
        self.lista_passos = tk.Label(lateral, text="", bg=PAINEL, fg=TEXTO, justify="left",
                                     anchor="nw", font=("Segoe UI", 9), wraplength=220)
        self.lista_passos.pack(fill="both", expand=True)

        # área da imagem
        self.tela = tk.Canvas(corpo, bg=FUNDO, highlightthickness=0)
        self.tela.pack(side="left", fill="both", expand=True)
        self.tela.bind("<Configure>", lambda e: self._desenhar())

        # barra de status
        self.status = tk.Label(self, text="", bg=PAINEL, fg=TEXTO_FRACO, anchor="w",
                               padx=12, pady=6, font=("Segoe UI", 9))
        self.status.pack(side="bottom", fill="x")

    # ------------------------------------------------------------------- ações
    def abrir(self):
        caminho = filedialog.askopenfilename(title="Escolha uma imagem", filetypes=FORMATOS)
        if not caminho:
            return
        try:
            with Image.open(caminho) as arquivo:
                arquivo.seek(0)  # em GIFs animados, usa o primeiro quadro
                imagem = ImageOps.exif_transpose(arquivo)  # respeita a orientação gravada pela câmera
                tem_transparencia = imagem.mode in ("RGBA", "LA", "PA") or "transparency" in imagem.info
                imagem = imagem.convert("RGBA" if tem_transparencia else "RGB")
        except Exception as erro:
            messagebox.showerror("Não foi possível abrir", f"Esse arquivo não parece ser uma imagem válida.\n\n{erro}")
            return

        self.caminho = caminho
        self.original = imagem
        self.atual = imagem.copy()
        self.tamanho_tela = imagem.size
        self.historico.clear()
        self.passos.clear()
        self._atualizar_estado()

    def aplicar(self, funcao, nome):
        if self.atual is None:
            return
        self.configure(cursor="watch")
        self.update_idletasks()
        try:
            nova = funcao(self.atual)
        finally:
            self.configure(cursor="")
        self.historico.append((self.atual, list(self.passos), self.tamanho_tela))
        if len(self.historico) > LIMITE_DESFAZER:
            self.historico.pop(0)
        # "tamanho_tela" é o espaço que a imagem ocupa na janela: diminuir a
        # resolução não o altera (os pixels ficam maiores), mas girar troca
        # largura e altura
        if nova.size == (self.atual.height, self.atual.width) and nova.width != nova.height:
            self.tamanho_tela = (self.tamanho_tela[1], self.tamanho_tela[0])
        self.atual = nova
        self.passos.append(nome)
        self._atualizar_estado()

    def desfazer(self):
        if not self.historico:
            return
        self.atual, self.passos, self.tamanho_tela = self.historico.pop()
        self._atualizar_estado()

    def restaurar(self):
        if self.original is None or not self.passos:
            return
        self.historico.append((self.atual, list(self.passos), self.tamanho_tela))
        self.atual = self.original.copy()
        self.tamanho_tela = self.original.size
        self.passos = []
        self._atualizar_estado()

    def salvar(self):
        if self.atual is None:
            return
        nome_base = os.path.splitext(os.path.basename(self.caminho or "imagem"))[0]
        caminho = filedialog.asksaveasfilename(
            title="Salvar imagem editada",
            initialfile=f"{nome_base}-editada.png",
            defaultextension=".png",
            filetypes=[("PNG", "*.png"), ("JPEG", "*.jpg *.jpeg"), ("WebP", "*.webp"), ("BMP", "*.bmp")],
        )
        if not caminho:
            return
        imagem = self.atual
        extensao = os.path.splitext(caminho)[1].lower()
        try:
            if extensao in (".jpg", ".jpeg", ".bmp"):
                if imagem.mode == "RGBA":  # esses formatos não têm transparência: usa fundo branco
                    fundo = Image.new("RGB", imagem.size, "white")
                    fundo.paste(imagem, mask=imagem.getchannel("A"))
                    imagem = fundo
            if extensao in (".jpg", ".jpeg"):
                imagem.save(caminho, quality=92)
            else:
                imagem.save(caminho)
        except Exception as erro:
            messagebox.showerror("Não foi possível salvar", str(erro))
            return
        self.status.configure(text=f"Salvo em {caminho}")

    def _comparar(self, ligado):
        if self.original is None:
            return
        self.mostrando_original = ligado
        self._desenhar()

    # ----------------------------------------------------------------- desenho
    def _atualizar_estado(self):
        tem_imagem = self.atual is not None
        for botao in self.botoes_efeito + [self.btn_salvar, self.btn_comparar]:
            botao.configure(state="normal" if tem_imagem else "disabled")
        self.btn_desfazer.configure(state="normal" if self.historico else "disabled")
        self.btn_restaurar.configure(state="normal" if self.passos else "disabled")

        if self.passos:
            # junta cliques repetidos em sequência: "− Resolução ×5"
            grupos = []
            for passo in self.passos:
                if grupos and grupos[-1][0] == passo:
                    grupos[-1][1] += 1
                else:
                    grupos.append([passo, 1])
            linhas = [f"{nome} ×{vezes}" if vezes > 1 else nome for nome, vezes in grupos]
            if len(linhas) > MAX_LINHAS_LISTA:  # mostra só os mais recentes
                ocultos = len(linhas) - (MAX_LINHAS_LISTA - 1)
                linhas = [f"… e mais {ocultos} antes"] + linhas[-(MAX_LINHAS_LISTA - 1):]
            self.lista_passos.configure(text="\n".join(linhas))
        else:
            self.lista_passos.configure(text="Nenhum ainda." if tem_imagem else "Abra uma imagem para começar.")

        if tem_imagem:
            o, a = self.original, self.atual
            texto = f"{os.path.basename(self.caminho)}   ·   original {o.width}×{o.height}px"
            if a.size != o.size:
                texto += f"   →   atual {a.width}×{a.height}px"
            texto += f"   ·   {a.width * a.height:,} pixels".replace(",", ".")
            self.status.configure(text=texto)
        else:
            self.status.configure(text="Ctrl+O abre, Ctrl+S salva, Ctrl+Z desfaz.")
        self._desenhar()

    def _desenhar(self):
        self.tela.delete("all")
        largura, altura = self.tela.winfo_width(), self.tela.winfo_height()
        if largura < 2 or altura < 2:
            return

        if self.atual is None:
            self.tela.create_text(largura / 2, altura / 2 - 12, text="Nenhuma imagem aberta",
                                  fill=TEXTO, font=("Segoe UI", 16, "bold"))
            self.tela.create_text(largura / 2, altura / 2 + 16, text="Clique em “Abrir imagem…” para escolher um arquivo",
                                  fill=TEXTO_FRACO, font=("Segoe UI", 10))
            return

        if self.mostrando_original:
            imagem, referencia = self.original, self.original.size
        else:
            # a imagem é exibida no espaço que a original ocuparia: assim uma
            # resolução menor aparece "ampliada" e os pixels ficam visíveis
            imagem, referencia = self.atual, self.tamanho_tela
        margem = 24
        escala = min((largura - 2 * margem) / referencia[0], (altura - 2 * margem) / referencia[1], 1.0)
        exibir = (max(1, round(referencia[0] * escala)), max(1, round(referencia[1] * escala)))

        reamostragem = Image.Resampling.NEAREST if imagem.width < exibir[0] else Image.Resampling.LANCZOS
        previa = imagem.resize(exibir, reamostragem)
        if previa.mode == "RGBA":  # desenha um xadrez atrás das áreas transparentes
            xadrez = Image.new("RGB", exibir, "#cfd2da")
            casa = 10
            pintor = Image.new("RGB", (casa, casa), "#eceef2")
            for y in range(0, exibir[1], casa):
                for x in range((y // casa) % 2 * casa, exibir[0], casa * 2):
                    xadrez.paste(pintor, (x, y))
            xadrez.paste(previa, mask=previa.getchannel("A"))
            previa = xadrez

        self._foto_tk = ImageTk.PhotoImage(previa)
        self.tela.create_image(largura / 2, altura / 2, image=self._foto_tk)
        if self.mostrando_original:
            self.tela.create_text(largura / 2, margem / 2 + 4, text="ORIGINAL", fill=DESTAQUE,
                                  font=("Segoe UI", 9, "bold"))


if __name__ == "__main__":
    EditorDeImagem().mainloop()
