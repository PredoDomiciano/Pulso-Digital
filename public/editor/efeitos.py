"""
Efeitos do editor de imagem do Pulso Digital.

Este arquivo roda dentro do navegador, no Pyodide (Python compilado para
WebAssembly), com a biblioteca Pillow. A página entrega os pixels da imagem
como bytes RGBA, o Python aplica o efeito e devolve os novos pixels.
"""

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


def _so_cor(funcao):
    """Aplica o efeito só nos canais de cor, preservando a transparência (canal alfa)."""

    def aplicar(img):
        alfa = img.getchannel("A")
        nova = funcao(img.convert("RGB")).convert("RGB")
        nova.putalpha(alfa)
        return nova

    return aplicar


def preto_e_branco(img):
    # ImageOps.grayscale usa 29,9% do vermelho, 58,7% do verde e 11,4% do azul
    return _so_cor(ImageOps.grayscale)(img)


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
    # máscara de nitidez: compara com uma cópia desfocada e reforça a diferença
    return _so_cor(lambda i: i.filter(ImageFilter.UnsharpMask(radius=2, percent=120, threshold=2)))(img)


def desfocar(img):
    return _so_cor(lambda i: i.filter(ImageFilter.GaussianBlur(radius=2)))(img)


def realcar_bordas(img):
    return _so_cor(lambda i: i.filter(ImageFilter.FIND_EDGES))(img)


def diminuir_resolucao(img):
    """Reduz largura e altura pela metade: a imagem passa a ter 1/4 dos pixels."""
    return img.resize((max(1, img.width // 2), max(1, img.height // 2)), Image.Resampling.BOX)


def pixelizar(img):
    """Reduz bastante e volta ao tamanho original sem suavizar: os pixels ficam visíveis."""
    bloco = max(2, max(img.width, img.height) // 64)
    pequena = img.resize((max(1, img.width // bloco), max(1, img.height // bloco)), Image.Resampling.BOX)
    return pequena.resize(img.size, Image.Resampling.NEAREST)


def girar(img):
    return img.rotate(-90, expand=True)


def espelhar(img):
    return ImageOps.mirror(img)


EFEITOS = {
    "preto_e_branco": preto_e_branco,
    "sepia": sepia,
    "negativo": negativo,
    "mais_saturacao": mais_saturacao,
    "menos_saturacao": menos_saturacao,
    "mais_brilho": mais_brilho,
    "menos_brilho": menos_brilho,
    "mais_contraste": mais_contraste,
    "menos_contraste": menos_contraste,
    "mais_nitidez": mais_nitidez,
    "desfocar": desfocar,
    "realcar_bordas": realcar_bordas,
    "diminuir_resolucao": diminuir_resolucao,
    "pixelizar": pixelizar,
    "girar": girar,
    "espelhar": espelhar,
}


def aplicar(nome, largura, altura, pixels):
    """Recebe pixels RGBA, aplica o efeito `nome` e devolve [largura, altura, pixels]."""
    # no Pyodide, os pixels chegam como um buffer do JavaScript
    dados = pixels.to_bytes() if hasattr(pixels, "to_bytes") else bytes(pixels)
    img = Image.frombytes("RGBA", (largura, altura), dados)
    nova = EFEITOS[nome](img)
    return [nova.width, nova.height, nova.tobytes()]
