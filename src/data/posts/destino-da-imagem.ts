import { siteConfig } from "@/lib/site";
import type { Post } from "@/types/post";

export const postDestinoDaImagem: Post = {
  id: "base-destino-da-imagem",
  title: "O destino da imagem: telas, papel, satélites e máquinas que enxergam",
  slug: "destino-da-imagem-telas-papel-e-maquinas",
  excerpt:
    "Uma mesma imagem pode virar post, vídeo, outdoor, mapa de desmatamento ou dado para um algoritmo. Como proporção, quadros por segundo, RGB, CMYK, bandas espectrais e processamento digital decidem o que cada destino exige.",
  category: "Imagem Digital",
  tags: ["imagem digital", "redes sociais", "vídeo", "impressão", "sensoriamento remoto", "visão computacional", "OpenCV"],
  cover_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rond%C3%B4nia_Deforestation_%2825_July_2016%29%2C_Brazil_%2834296310700%29.jpg/1280px-Rond%C3%B4nia_Deforestation_%2825_July_2016%29%2C_Brazil_%2834296310700%29.jpg",
  status: "published",
  featured: false,
  author: siteConfig.author,
  reading_time: 17,
  published_at: "2026-11-12T13:00:00.000Z",
  created_at: "2026-11-12T13:00:00.000Z",
  updated_at: "2026-11-12T13:00:00.000Z",
  content: [
    {
      id: "dst-intro",
      type: "paragraph",
      text: "Uma foto sai da câmera e, a partir daí, ela não tem um único destino. Pode ser recortada em quadrado para o feed, esticada na vertical para um story, impressa em um cartaz de três metros na frente de uma loja, virar quadro de um vídeo, ou nunca ser vista por olhos humanos — e só ser lida por um programa que conta árvores, procura defeitos em uma peça ou reconhece placas de carro. Cada um desses destinos exige que a imagem seja preparada de um jeito, e o que funciona perfeitamente em um costuma falhar no outro.",
    },
    {
      id: "dst-intro-2",
      type: "paragraph",
      text: "Esta publicação continua a anterior, sobre os fundamentos da imagem digital. Lá acompanhamos o caminho da luz até o pixel; aqui seguimos o caminho de saída. Vamos passar pelas telas das redes sociais, pela imagem em movimento, pela impressão e seus modelos de cor, pelos satélites que fotografam o planeta e, por fim, pelas máquinas que aprenderam a extrair informação de imagens — o campo do processamento digital e da visão computacional.",
    },
    { id: "dst-heading-saida", type: "heading", text: "Uma imagem, muitos destinos" },
    {
      id: "dst-saida-1",
      type: "paragraph",
      text: "Toda imagem digital é uma matriz de números, mas o destino decide como esses números precisam estar organizados. Quatro variáveis aparecem em praticamente todos os casos: a proporção, que é a relação entre largura e altura; a resolução, que é a quantidade de pixels disponível; o espaço de cor, que define como os números viram cor naquele suporte; e a compressão, que define quanto da informação pode ser descartada sem que o público perceba.",
    },
    {
      id: "dst-saida-2",
      type: "paragraph",
      text: "Errar qualquer uma delas tem consequência visível. Proporção errada corta cabeças e textos nas bordas. Resolução baixa deixa a imagem borrada no tamanho final. Espaço de cor errado faz o vermelho vibrante da tela virar um tijolo apagado no papel. Compressão excessiva cria blocos e borrões. Preparar uma imagem para um destino é, portanto, tomar essas quatro decisões de forma consciente — e é exatamente o que se chama, em produção gráfica e audiovisual, de saída ou exportação.",
    },
    { id: "dst-heading-redes", type: "heading", text: "Nas redes sociais: proporção e recompressão" },
    {
      id: "dst-redes-1",
      type: "paragraph",
      text: "Nas redes, a proporção é a variável mais importante, porque é ela que decide quanto espaço a imagem ocupa na tela do celular. O quadrado, em 1:1, foi o padrão por muito tempo; hoje o formato vertical 4:5, em 1080 por 1350 pixels, ocupa mais área no feed e se tornou o mais usado para fotos. Stories, reels e vídeos curtos usam 9:16, em 1080 por 1920 pixels, a tela inteira do aparelho na vertical. O formato horizontal 16:9, herdado da televisão, continua dominante no YouTube e em telas de computador.",
    },
    {
      id: "dst-redes-2",
      type: "paragraph",
      text: "Dois cuidados valem para qualquer plataforma. O primeiro é a área de segurança: nos formatos verticais, a interface do aplicativo cobre partes da imagem — nome do perfil no topo, legenda e botões na base e na lateral —, e texto importante colocado ali fica escondido. O segundo é a recompressão: as plataformas reprocessam tudo o que recebem para economizar armazenamento e banda. Enviar a imagem já na resolução recomendada reduz o estrago; enviar um arquivo enorme ou pequeno demais faz o próprio servidor redimensionar, quase sempre com resultado pior.",
    },
    {
      id: "dst-redes-3",
      type: "paragraph",
      text: "As medidas exatas mudam com frequência, à medida que os aplicativos alteram suas interfaces, e por isso vale consultar a central de ajuda de cada plataforma antes de produzir uma peça. O princípio, porém, é estável: projete para a proporção do destino desde o início, em vez de recortar depois. Uma foto pensada em 16:9 e cortada para 9:16 perde dois terços da largura — e, com ela, quase sempre o assunto.",
    },
    { id: "dst-heading-video", type: "heading", text: "Imagem em movimento: quadros por segundo" },
    {
      id: "dst-video-1",
      type: "paragraph",
      text: "Vídeo é uma sequência de imagens estáticas exibidas rápido o bastante para o cérebro perceber movimento contínuo. Cada imagem é um quadro, e a taxa de quadros por segundo define a sensação do movimento. O cinema se estabilizou em 24 quadros por segundo com a chegada do som, no fim dos anos 1920, e esse ritmo ficou associado à estética cinematográfica. A televisão adotou valores ligados à frequência da rede elétrica de cada região: 25 nos países do padrão europeu e cerca de 30 nos que seguiram o padrão americano, entre eles o Brasil.",
    },
    {
      id: "dst-video-2",
      type: "paragraph",
      text: "Taxas de 60 quadros por segundo ou mais deixam o movimento mais fluido e são o padrão em jogos, transmissões esportivas e telas de celular. Câmeras que gravam a 120 ou 240 quadros permitem câmera lenta: os quadros extras, exibidos a 30 por segundo, esticam o tempo. Há uma relação com a fotografia: a velocidade do obturador costuma ficar em torno do dobro da taxa de quadros — 1/50 de segundo para 24 quadros — porque isso produz um leve borrão de movimento que o olho interpreta como natural. Obturadores muito rápidos deixam cada quadro nítido demais e o movimento parece picotado.",
    },
    {
      id: "dst-video-3",
      type: "paragraph",
      text: "Com dezenas de imagens por segundo, o tamanho dos arquivos explode, e o vídeo depende de codecs — H.264, H.265, AV1 — que exploram a semelhança entre quadros vizinhos e guardam apenas o que mudou. Mais quadros por segundo significam mais dados para a mesma duração, e é por isso que plataformas de streaming ajustam a qualidade conforme a conexão de quem assiste. Escolher a taxa de quadros é escolher ao mesmo tempo uma estética e um orçamento de dados.",
    },
    { id: "dst-heading-cor", type: "heading", text: "Luz que soma, tinta que subtrai" },
    {
      id: "dst-cor-1",
      type: "paragraph",
      text: "Uma tela emite luz. Cada pixel combina vermelho, verde e azul em intensidades de 0 a 255, e a mistura das três no máximo produz branco — por isso o RGB é chamado de modelo aditivo: começa no preto e soma luz até chegar ao branco. Esse é o modelo natural de tudo o que é exibido em monitor, celular, televisão e projetor, porque reproduz diretamente o estímulo dos três tipos de cone do olho humano.",
    },
    {
      id: "dst-image-rgb",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/AdditiveColor.svg/1280px-AdditiveColor.svg.png",
      alt: "Três círculos de luz vermelho, verde e azul sobrepostos; as interseções formam ciano, magenta, amarelo e, no centro, branco",
      caption:
        "Síntese aditiva (RGB): a soma das três luzes primárias resulta em branco. Imagem: SharkD/Wikimedia Commons, domínio público.",
    },
    {
      id: "dst-cor-2",
      type: "paragraph",
      text: "O papel não emite luz: ele reflete a luz do ambiente, e a tinta funciona filtrando parte dela. A impressão usa o modelo CMYK — ciano, magenta, amarelo e preto, em percentuais de 0 a 100% de cobertura de tinta. É um modelo subtrativo: começa no branco do papel e cada tinta subtrai uma faixa da luz refletida. Em teoria, ciano, magenta e amarelo juntos dariam preto; na prática dão um marrom escuro, e por isso existe a quarta tinta, o preto, identificado pela letra K.",
    },
    {
      id: "dst-image-cmyk",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/CMYK_subtractive_color_mixing.svg/1280px-CMYK_subtractive_color_mixing.svg.png",
      alt: "Três círculos de tinta ciano, magenta e amarelo sobrepostos; as interseções formam vermelho, verde, azul e, no centro, um tom escuro",
      caption:
        "Síntese subtrativa (CMY): cada tinta remove uma faixa da luz refletida pelo papel. Imagem: SharkD/Wikimedia Commons, CC0.",
    },
    {
      id: "dst-cor-3",
      type: "paragraph",
      text: "A consequência prática é que os dois modelos não cobrem as mesmas cores. Verdes e azuis muito saturados, fáceis de mostrar em uma tela, simplesmente não existem em tinta CMYK. A faixa de cores que um dispositivo consegue reproduzir se chama gamut, e converter de um modelo para o outro sempre aproxima algumas cores. Para controlar essa conversão, a indústria gráfica usa perfis de cor ICC, que descrevem cada impressora e cada papel, e provas impressas antes da tiragem. Arquivos para gráfica são entregues em CMYK justamente para que as surpresas apareçam na tela do designer, e não no material impresso.",
    },
    {
      id: "dst-video-cor",
      type: "video",
      url: "https://www.youtube.com/watch?v=ICu0G5aqCO8",
      caption: "O que é CMYK e o que é RGB? Qual a diferença? — explicação do canal Coisas de Designer.",
    },
    { id: "dst-heading-impressao", type: "heading", text: "Quanta resolução o papel precisa" },
    {
      id: "dst-impressao-1",
      type: "paragraph",
      text: "Na impressão, a resolução é medida em pixels por polegada, o ppi. O número de referência, 300 ppi, vem da acuidade da visão humana: a uma distância de leitura de cerca de 30 centímetros, o olho distingue detalhes de aproximadamente um minuto de arco, o que corresponde a algo perto de 0,09 milímetro — ou cerca de 290 pontos por polegada. Acima disso, mais pixels não trazem mais nitidez perceptível para quem segura o papel na mão.",
    },
    {
      id: "dst-impressao-2",
      type: "paragraph",
      text: "A mesma conta mostra por que um outdoor não precisa de 300 ppi. A dez metros de distância, o menor detalhe que o olho separa tem cerca de 3 milímetros, o que equivale a menos de 10 pontos por polegada. Um painel de 9 por 3 metros impresso a 300 ppi teria mais de 3 bilhões de pixels — um arquivo impossível de manipular e sem nenhum ganho visível. Gráficas de grandes formatos trabalham com resoluções de algumas dezenas de ppi, com folga para quem chegar mais perto, e a regra prática passa a ser: quanto maior a distância de leitura, menor a resolução necessária.",
    },
    {
      id: "dst-impressao-3",
      type: "paragraph",
      text: "Vale o mesmo raciocínio para telas grandes em lojas, estações e fachadas. O que define a qualidade percebida não é o número absoluto de pixels, e sim a relação entre o tamanho do ponto e a distância de quem olha. Projetar uma peça é, também, projetar a distância do público.",
    },
    { id: "dst-heading-satelite", type: "heading", text: "Do espaço: satélites e sensoriamento remoto" },
    {
      id: "dst-satelite-1",
      type: "paragraph",
      text: "Sensoriamento remoto é a obtenção de informações sobre um objeto sem contato físico com ele — no caso dos satélites, medindo a energia que a superfície da Terra reflete ou emite. A diferença em relação a uma câmera comum está nas bandas: além do vermelho, do verde e do azul, os sensores orbitais registram faixas invisíveis para nós, como o infravermelho próximo e o infravermelho termal. Cada banda é uma imagem em tons de cinza; combinadas, revelam o que nenhuma foto colorida mostraria.",
    },
    {
      id: "dst-satelite-2",
      type: "paragraph",
      text: "Quatro resoluções descrevem um sensor orbital: a espacial, que é o tamanho do terreno coberto por um pixel; a espectral, que é a quantidade e a largura das bandas; a temporal, que é o intervalo entre duas passagens sobre o mesmo ponto; e a radiométrica, que é quantos níveis de intensidade cada pixel pode registrar. Os satélites Landsat, em operação desde 1972, formam a série histórica mais longa de imagens da superfície terrestre. O Brasil opera os satélites CBERS, em parceria com a China, e lançou em 2021 o Amazonia-1, o primeiro satélite de observação da Terra inteiramente projetado, integrado e operado pelo país.",
    },
    {
      id: "dst-image-rondonia",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rond%C3%B4nia_Deforestation_%2825_July_2016%29%2C_Brazil_%2834296310700%29.jpg/1280px-Rond%C3%B4nia_Deforestation_%2825_July_2016%29%2C_Brazil_%2834296310700%29.jpg",
      alt: "Imagem de satélite de Rondônia com faixas de floresta cortadas por estradas e áreas desmatadas em padrão de espinha de peixe",
      caption:
        "Desmatamento em Rondônia visto do espaço (julho de 2016): as estradas abrem um padrão de espinha de peixe na floresta. Imagem: Overview/Wikimedia Commons, CC BY 2.0.",
    },
    {
      id: "dst-satelite-3",
      type: "paragraph",
      text: "A aplicação mais conhecida no Brasil é o monitoramento da Amazônia pelo INPE. O projeto PRODES calcula, desde 1988, a taxa anual de desmatamento por corte raso; o DETER produz alertas quase diários que orientam a fiscalização. Como a região passa boa parte do ano coberta de nuvens, que bloqueiam os sensores ópticos, entram em cena os radares de abertura sintética, que emitem micro-ondas próprias e enxergam através delas. Imagens de satélite também apoiam a previsão do tempo, o acompanhamento de safras, o mapeamento de queimadas e a resposta a enchentes.",
    },
    {
      id: "dst-satelite-4",
      type: "paragraph",
      text: "Um índice resume bem a lógica das bandas. A vegetação saudável absorve quase todo o vermelho, que usa na fotossíntese, e reflete fortemente o infravermelho próximo. O NDVI, índice de vegetação por diferença normalizada, explora esse contraste calculando, pixel a pixel, a diferença entre as duas bandas dividida pela soma delas. O resultado vai de −1 a 1: valores altos indicam vegetação densa e vigorosa, valores próximos de zero indicam solo exposto ou área urbana, e valores negativos indicam água. É uma conta de uma linha, aplicada a milhões de pixels.",
    },
    {
      id: "dst-codigo-ndvi",
      type: "code",
      language: "python",
      text: `# NDVI: índice de vegetação a partir de duas bandas de satélite
# requer: pip install numpy rasterio
import numpy as np
import rasterio

# bandas do Landsat 8/9: B4 = vermelho, B5 = infravermelho próximo
with rasterio.open("LC09_B4.TIF") as f:
    vermelho = f.read(1).astype("float32")
with rasterio.open("LC09_B5.TIF") as f:
    infravermelho = f.read(1).astype("float32")

soma = infravermelho + vermelho
ndvi = np.where(soma == 0, 0, (infravermelho - vermelho) / soma)

vegetacao_densa = (ndvi > 0.6).mean() * 100
print(f"NDVI médio: {ndvi.mean():.2f}")
print(f"área com vegetação densa: {vegetacao_densa:.1f}%")`,
    },
    {
      id: "dst-video-satelite",
      type: "video",
      url: "https://www.youtube.com/watch?v=80vkvtxVvXg",
      caption: "Sensoriamento remoto: o que é e como funciona — aula do canal Brasil Escola.",
    },
    { id: "dst-heading-matriz", type: "heading", text: "A imagem como matriz: processamento digital" },
    {
      id: "dst-matriz-1",
      type: "paragraph",
      text: "O cálculo do NDVI é um exemplo de processamento digital de imagens, área que trata a imagem como dado a ser transformado. A definição clássica, de Rafael Gonzalez e Richard Woods, descreve a imagem como uma função de duas variáveis, em que cada par de coordenadas tem uma intensidade. Para chegar a ela, o mundo contínuo passa por duas etapas: a amostragem, que escolhe em quais pontos medir, e a quantização, que arredonda cada medida para um número inteiro, como os 256 níveis de um canal de 8 bits.",
    },
    {
      id: "dst-quote",
      type: "quote",
      text: "Uma imagem pode ser definida como uma função bidimensional, f(x, y), em que x e y são coordenadas espaciais (plano), e a amplitude de f em qualquer par de coordenadas (x, y) é chamada de intensidade ou nível de cinza da imagem nesse ponto.",
      author: "Rafael C. Gonzalez e Richard E. Woods, Processamento digital de imagens",
    },
    {
      id: "dst-matriz-2",
      type: "paragraph",
      text: "Com a imagem como matriz, as operações viram matemática. As operações pontuais alteram cada pixel isoladamente — ajustar brilho é somar um valor, aumentar contraste é multiplicar. Os filtros olham para a vizinhança: uma convolução percorre a imagem com uma pequena janela de pesos e pode suavizar ruído, realçar bordas ou detectar contornos. A segmentação separa regiões de interesse do fundo; a morfologia limpa e corrige essas regiões. Quase toda edição de foto, de um aplicativo de celular a um programa profissional, é uma combinação dessas operações.",
    },
    {
      id: "dst-video-pdi",
      type: "video",
      url: "https://www.youtube.com/watch?v=T9V_axU6jU8",
      caption: "O que é uma imagem? — primeiro episódio da série Processamento de Imagens, do canal Programação Dinâmica.",
    },
    { id: "dst-heading-opencv", type: "heading", text: "Na prática: Python e OpenCV" },
    {
      id: "dst-opencv-1",
      type: "paragraph",
      text: "A biblioteca mais usada para processamento de imagens e visão computacional é a OpenCV, de código aberto, criada no início dos anos 2000 e hoje com milhares de algoritmos acessíveis em Python, C++ e outras linguagens. Ela se integra à NumPy, de modo que uma imagem carregada é diretamente uma matriz que pode ser manipulada. O exemplo abaixo resolve uma tarefa comum na agricultura: estimar quanto de uma foto tirada por drone é planta, isolando os tons de verde.",
    },
    {
      id: "dst-codigo-opencv",
      type: "code",
      language: "python",
      text: `# separa a vegetação de uma foto aérea pela cor
# requer: pip install opencv-python numpy
import cv2
import numpy as np

foto = cv2.imread("lavoura-drone.jpg")         # a OpenCV lê em BGR, não RGB
hsv = cv2.cvtColor(foto, cv2.COLOR_BGR2HSV)    # matiz, saturação e brilho

# faixa de verdes no espaço HSV (matiz de 0 a 179 na OpenCV)
verde_min = np.array([35, 40, 40])
verde_max = np.array([85, 255, 255])
mascara = cv2.inRange(hsv, verde_min, verde_max)

# limpa pontinhos isolados com uma abertura morfológica
nucleo = np.ones((5, 5), np.uint8)
mascara = cv2.morphologyEx(mascara, cv2.MORPH_OPEN, nucleo)

cobertura = cv2.countNonZero(mascara) / mascara.size * 100
print(f"cobertura vegetal: {cobertura:.1f}%")

contornos, _ = cv2.findContours(mascara, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
print(f"manchas de vegetação: {len(contornos)}")
cv2.imwrite("mascara.png", mascara)`,
    },
    {
      id: "dst-opencv-2",
      type: "paragraph",
      text: "Três detalhes desse código ilustram armadilhas reais. A OpenCV guarda os canais na ordem azul, verde e vermelho, herança de câmeras antigas, e esquecer isso troca cores. A conversão para HSV separa a cor do brilho, o que torna a seleção de verdes muito mais robusta à sombra do que comparar valores RGB. E a abertura morfológica remove ruídos de poucos pixels antes da contagem. É uma técnica simples, que funciona bem em condições controladas — e começa a falhar com sombras fortes, solo esverdeado ou iluminação diferente, que é exatamente onde entra a visão computacional moderna.",
    },
    { id: "dst-heading-visao", type: "heading", text: "Máquinas que enxergam: visão computacional" },
    {
      id: "dst-visao-1",
      type: "paragraph",
      text: "Visão computacional é o campo que busca extrair significado de imagens: não só alterar pixels, mas responder perguntas sobre eles. As tarefas mais comuns são a classificação, que diz o que a imagem contém; a detecção, que localiza cada objeto com uma caixa; e a segmentação, que marca a quais pixels cada objeto pertence. Durante décadas, essas tarefas dependiam de regras escritas à mão, como as do exemplo anterior. A virada aconteceu por volta de 2012, quando redes neurais convolucionais treinadas com milhões de imagens rotuladas passaram a superar com folga os métodos tradicionais em competições de reconhecimento.",
    },
    {
      id: "dst-visao-2",
      type: "paragraph",
      text: "Hoje a visão computacional está na inspeção de qualidade em linhas de produção, que encontra rachaduras invisíveis a olho nu; nos carros com assistência ao motorista, que reconhecem faixas, placas e pedestres; na medicina, como apoio na leitura de exames de imagem; no agronegócio, que identifica pragas e falhas de plantio a partir de drones; e nos próprios celulares, que reconhecem rostos para desbloquear a tela e textos para traduzir uma placa. Em todos esses casos, o destino final da imagem não é ser vista, e sim virar decisão.",
    },
    {
      id: "dst-video-visao",
      type: "video",
      url: "https://www.youtube.com/watch?v=RSkbjZZb-1c",
      caption: "O que é visão computacional? Conceito e aplicações — episódio da série IA Descomplicada, do canal Programação Dinâmica.",
    },
    { id: "dst-heading-podcast", type: "heading", text: "Ouça: visão computacional aplicada a um problema real" },
    {
      id: "dst-podcast-context",
      type: "paragraph",
      text: "Entre a teoria e o produto há muitas decisões: que modelo usar, como conseguir imagens para treinar, como lidar com erros e com a privacidade das pessoas filmadas. O episódio abaixo acompanha um caso concreto — o uso de Python e de modelos de detecção de objetos para identificar comportamentos de risco em ambiente escolar —, com as escolhas técnicas e os cuidados éticos que um projeto desse tipo exige.",
    },
    {
      id: "dst-podcast",
      type: "audio",
      title: "Hipsters.Talks #19 — Detecção de bullying com IA: Python e visão computacional",
      url: "https://media.blubrry.com/hipsterstech/content.blubrry.com/hipsterstech/HpTalks-19.mp3",
      caption: "Episódio em áudio da série Hipsters.Talks (2026) sobre detecção de objetos e treinamento de modelos de visão computacional. Fonte: feed público do programa.",
    },
    { id: "dst-heading-limites", type: "heading", text: "Quando o destino da imagem é uma decisão sobre pessoas" },
    {
      id: "dst-limites-1",
      type: "paragraph",
      text: "Um modelo de visão computacional aprende com os exemplos que recebe, e herda os vieses deles. Em 2018, o estudo Gender Shades, de Joy Buolamwini e Timnit Gebru, avaliou sistemas comerciais de classificação facial e encontrou taxas de erro de até 34,7% para mulheres de pele escura, contra menos de 1% para homens de pele clara. A diferença não vinha de má intenção, e sim de bases de treinamento com poucas pessoas negras. Quando essas ferramentas são usadas em segurança pública ou em seleção de pessoas, o erro estatístico vira injustiça concreta.",
    },
    {
      id: "dst-limites-2",
      type: "paragraph",
      text: "No Brasil, a Lei Geral de Proteção de Dados classifica o dado biométrico — o que inclui a geometria do rosto extraída de uma imagem — como dado pessoal sensível, que exige base legal específica e cuidados reforçados. Câmeras com reconhecimento facial em lojas, estádios e transporte público estão no centro desse debate. A pergunta não é apenas se a tecnologia funciona, mas quem decide onde ela é usada, por quanto tempo as imagens são guardadas e como alguém contesta um erro.",
    },
    {
      id: "dst-limites-3",
      type: "paragraph",
      text: "Há ainda limites técnicos que convém conhecer. A compressão com perdas, tão útil para o feed, apaga detalhes que podem ser justamente a evidência que um sistema precisava. Imagens de satélite dependem de céu limpo ou de radar, e sua resolução espacial pode não enxergar o desmatamento seletivo sob a copa das árvores. E imagens geradas ou alteradas por inteligência artificial podem enganar tanto pessoas quanto algoritmos. Saber de onde veio uma imagem e por quais processos passou é parte do trabalho de usá-la.",
    },
    { id: "dst-heading-serie", type: "heading", text: "A imagem em rede" },
    {
      id: "dst-serie-1",
      type: "paragraph",
      text: "Retomando a série: a publicação sobre mídia mostrou que o mesmo conteúdo muda de sentido conforme o meio que o transporta, e esta mostra o equivalente técnico disso — a mesma imagem precisa ser refeita para cada suporte. A multimídia aparece no vídeo, que combina imagem, tempo e som. A hipermídia aparece na imagem de satélite publicada em um painel interativo, em que cada região clicável leva a mais dados. E a realidade aumentada usa exatamente as técnicas de visão computacional descritas aqui para entender o ambiente antes de desenhar sobre ele.",
    },
    {
      id: "dst-serie-2",
      type: "paragraph",
      text: "O fio comum é o que a publicação anterior apontou: uma imagem digital é uma matriz de números. É isso que permite recortá-la para um story, convertê-la para CMYK, calcular um índice de vegetação ou alimentar uma rede neural. A tecnologia é a mesma; o que muda é a pergunta que fazemos aos números.",
    },
    { id: "dst-heading-conclusao", type: "heading", text: "Para fechar" },
    {
      id: "dst-conclusao",
      type: "paragraph",
      text: "Preparar uma imagem é pensar no destino antes de pensar na imagem. Para a tela do celular, a proporção e a recompressão; para o vídeo, a taxa de quadros e o codec; para o papel, o modelo de cor e a distância de quem olha; para o satélite, as bandas invisíveis; para a máquina, a matriz e o que se quer extrair dela. Em todos os casos, a imagem deixa de ser apenas algo que se vê e passa a ser algo que se projeta — com escolhas técnicas e, cada vez mais, com responsabilidade sobre o que ela vai decidir.",
    },
    { id: "dst-heading-links", type: "heading", text: "Links para continuar" },
    {
      id: "dst-link-fundamentos",
      type: "link",
      title: "Leitura anterior: imagem digital, da luz ao pixel",
      url: "/publicacoes/imagem-digital-da-luz-ao-pixel",
      caption: "Como o olho e o sensor transformam luz em informação, e o que existe dentro de cada formato de arquivo.",
    },
    {
      id: "dst-link-midia",
      type: "link",
      title: "Revisite o conceito de mídia",
      url: "/publicacoes/midia-os-caminhos-da-mensagem",
      caption: "Por que o meio muda a mensagem — e a imagem que ela carrega.",
    },
    {
      id: "dst-link-terrabrasilis",
      type: "link",
      title: "TerraBrasilis — dados do PRODES e do DETER (INPE)",
      url: "https://terrabrasilis.dpi.inpe.br/",
      caption: "Plataforma pública do INPE com mapas e taxas de desmatamento obtidos por satélite.",
    },
    {
      id: "dst-link-opencv",
      type: "link",
      title: "OpenCV — tutorial de espaços de cor em Python",
      url: "https://docs.opencv.org/4.x/df/d9d/tutorial_py_colorspaces.html",
      caption: "Documentação oficial das funções cvtColor e inRange usadas no exemplo.",
    },
    { id: "dst-heading-references", type: "heading", text: "Fontes e referências" },
    {
      id: "dst-ref-1",
      type: "link",
      title: "USGS — Landsat Normalized Difference Vegetation Index",
      url: "https://www.usgs.gov/landsat-missions/landsat-normalized-difference-vegetation-index",
      caption: "Definição do NDVI e das bandas do Landsat usadas no cálculo.",
    },
    {
      id: "dst-ref-2",
      type: "link",
      title: "USGS — Landsat Missions",
      url: "https://www.usgs.gov/landsat-missions",
      caption: "Histórico da série Landsat, em operação desde 1972.",
    },
    {
      id: "dst-ref-3",
      type: "link",
      title: "INPE — TerraBrasilis",
      url: "https://terrabrasilis.dpi.inpe.br/",
      caption: "Fonte das informações sobre o PRODES e o DETER.",
    },
    {
      id: "dst-ref-4",
      type: "link",
      title: "OpenCV — Changing Colorspaces",
      url: "https://docs.opencv.org/4.x/df/d9d/tutorial_py_colorspaces.html",
      caption: "Documentação da conversão para HSV e do isolamento de cores.",
    },
    {
      id: "dst-ref-5",
      type: "link",
      title: "Buolamwini e Gebru — Gender Shades (2018)",
      url: "https://proceedings.mlr.press/v81/buolamwini18a.html",
      caption: "Estudo sobre diferenças de acurácia de sistemas comerciais de classificação facial.",
    },
    {
      id: "dst-ref-6",
      type: "link",
      title: "Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      caption: "Texto da lei que classifica o dado biométrico como dado pessoal sensível (art. 5º, II).",
    },
    {
      id: "dst-ref-7",
      type: "link",
      title: "Wikimedia Commons — Rondônia Deforestation (25 July 2016)",
      url: "https://commons.wikimedia.org/wiki/File:Rond%C3%B4nia_Deforestation_(25_July_2016),_Brazil_(34296310700).jpg",
      caption: "Fonte da imagem de satélite usada na capa e no corpo da matéria.",
    },
    {
      id: "dst-ref-8",
      type: "link",
      title: "Wikimedia Commons — AdditiveColor.svg e CMYK subtractive color mixing.svg",
      url: "https://commons.wikimedia.org/wiki/File:AdditiveColor.svg",
      caption: "Fontes dos diagramas de síntese aditiva e subtrativa.",
    },
    {
      id: "dst-ref-9",
      type: "link",
      title: "Hipsters.Talks #19 — Detecção de bullying com IA",
      url: "https://www.hipsters.tech/deteccao-de-bullying-com-ia-como-usar-python-e-visao-computacional-para-identificar-comportamentos-hipsters-talks-19/",
      caption: "Página oficial do episódio de podcast incorporado nesta matéria.",
    },
    {
      id: "dst-ref-10",
      type: "paragraph",
      text: "Bibliografia de apoio: GONZALEZ, Rafael C.; WOODS, Richard E. Processamento digital de imagens. 3. ed. São Paulo: Pearson, 2010. FLORENZANO, Teresa Gallotti. Iniciação em sensoriamento remoto. 3. ed. São Paulo: Oficina de Textos, 2011.",
    },
  ],
};
