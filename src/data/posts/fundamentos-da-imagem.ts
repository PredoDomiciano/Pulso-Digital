import { siteConfig } from "@/lib/site";
import type { Post } from "@/types/post";

export const postFundamentosDaImagem: Post = {
  id: "base-fundamentos-da-imagem",
  title: "Imagem digital: da luz que entra no olho ao pixel na tela",
  slug: "imagem-digital-da-luz-ao-pixel",
  excerpt:
    "O que é uma imagem, como chegamos das paredes das cavernas à câmara escura e à fotografia, como o olho e o sensor transformam luz em informação, e o que realmente existe dentro de um arquivo JPEG, PNG ou HEIC.",
  category: "Imagem Digital",
  tags: ["imagem digital", "fotografia", "pixel", "sensor", "formatos de arquivo", "visão humana"],
  cover_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/View_from_the_Window_at_Le_Gras%2C_Joseph_Nic%C3%A9phore_Ni%C3%A9pce.jpg/1280px-View_from_the_Window_at_Le_Gras%2C_Joseph_Nic%C3%A9phore_Ni%C3%A9pce.jpg",
  status: "published",
  featured: false,
  author: siteConfig.author,
  reading_time: 16,
  published_at: "2026-11-12T12:00:00.000Z",
  created_at: "2026-11-12T12:00:00.000Z",
  updated_at: "2026-11-12T12:00:00.000Z",
  content: [
    {
      id: "img-intro",
      type: "paragraph",
      text: "Você tira o celular do bolso, aponta para o pôr do sol e, em menos de um segundo, existe uma foto. Parece um gesto simples, mas dentro dele cabem séculos de história e uma cadeia técnica inteira: a luz atravessa uma lente, atinge milhões de pequenos sensores, vira carga elétrica, vira número, passa por correções automáticas, é comprimida em um formato de arquivo e, por fim, volta a ser luz na tela de quem vê. Entender essa cadeia é entender o que uma imagem digital é de verdade — e por que ela nunca é uma cópia neutra do mundo.",
    },
    {
      id: "img-intro-2",
      type: "paragraph",
      text: "Esta publicação abre a série do Pulso Digital sobre imagem. Ela conversa com o trio de fundamentos que já publicamos: se mídia é o caminho de uma mensagem e multimídia é a combinação de formatos, a imagem é o formato que mais circula nesse caminho. Aqui vamos do conceito ao pixel — da origem da palavra até o que acontece dentro do sensor —, e a próxima publicação segue o caminho inverso, olhando para onde as imagens vão depois de prontas.",
    },
    { id: "img-heading-conceito", type: "heading", text: "Afinal, o que é uma imagem?" },
    {
      id: "img-conceito-1",
      type: "paragraph",
      text: "A palavra vem do latim imago, que designava a representação, a cópia, o retrato — e também a máscara de cera que os romanos faziam dos mortos. Desde a origem, portanto, a imagem carrega uma tensão: ela se parece com algo, mas não é esse algo. Platão desconfiava dela justamente por isso, tratando sombras e reflexos como cópias imperfeitas de uma realidade que estaria em outro lugar. Aristóteles foi mais generoso e via na representação uma forma natural de aprender, já que reconhecemos o mundo também pelas imitações que fazemos dele.",
    },
    {
      id: "img-conceito-2",
      type: "paragraph",
      text: "Os estudos de comunicação costumam separar dois domínios. Há as imagens mentais — lembranças, sonhos, aquilo que imaginamos — e as imagens materiais, que existem fora de nós em um suporte: parede, papel, tela. Lucia Santaella e Winfried Nöth propõem ainda uma divisão histórica em três paradigmas. No pré-fotográfico, a imagem é feita à mão, gesto a gesto. No fotográfico, ela é registrada: a luz deixa uma marca física em uma superfície sensível. No pós-fotográfico, ela é calculada: números geram a imagem, com ou sem uma cena real por trás.",
    },
    {
      id: "img-conceito-3",
      type: "paragraph",
      text: "Essa divisão ajuda a ler o presente. A foto do celular é ao mesmo tempo registro e cálculo — a luz real entra pela lente, mas o que chega à tela passou por dezenas de decisões de software. E as imagens produzidas por inteligência artificial levam o paradigma pós-fotográfico ao extremo: são imagens que parecem fotografias sem que nenhuma luz tenha atravessado nenhuma lente. Saber em qual paradigma uma imagem foi produzida é o primeiro passo para saber quanto confiar nela.",
    },
    {
      id: "img-quote",
      type: "quote",
      text: "Fotografar é apropriar-se da coisa fotografada. Significa pôr a si mesmo em determinada relação com o mundo, semelhante ao conhecimento — e, portanto, ao poder.",
      author: "Susan Sontag, Sobre fotografia (1977)",
    },
    { id: "img-heading-cavernas", type: "heading", text: "Das paredes das cavernas à câmara escura" },
    {
      id: "img-cavernas-1",
      type: "paragraph",
      text: "As imagens materiais mais antigas que conhecemos estão em cavernas. As pinturas de Chauvet, na França, têm mais de 30 mil anos; as de Lascaux, também na França, cerca de 17 mil. No Brasil, a Serra da Capivara, no Piauí, reúne milhares de pinturas rupestres e é patrimônio mundial reconhecido pela Unesco. Não sabemos com certeza para que serviam — registro de caçadas, rituais, ensino, marcação de território —, mas sabemos que já ali a imagem cumpria uma função que nunca perdeu: fixar algo fora da memória de quem viu, para que outros pudessem ver depois.",
    },
    {
      id: "img-image-lascaux",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Lascaux_painting.jpg",
      alt: "Pintura rupestre de animais na caverna de Lascaux, na França",
      caption:
        "Animais pintados na caverna de Lascaux, na França, há cerca de 17 mil anos: imagem feita à mão, no paradigma pré-fotográfico. Imagem: Wikimedia Commons, domínio público.",
    },
    {
      id: "img-cavernas-2",
      type: "paragraph",
      text: "O passo seguinte não foi pintar melhor, e sim descobrir que a própria luz desenha. Se um cômodo totalmente escuro tem um pequeno furo em uma parede, a cena do lado de fora aparece projetada na parede oposta, de cabeça para baixo. O fenômeno era conhecido na Antiguidade, foi descrito com rigor por Ibn al-Haytham no início do século XI, em seu Livro da Óptica, e ganhou o nome de câmara escura — em latim, camera obscura, a origem da palavra câmera.",
    },
    {
      id: "img-cavernas-3",
      type: "paragraph",
      text: "No Renascimento, a câmara escura encolheu, ganhou lentes para deixar a imagem mais clara e nítida e virou ferramenta de desenho: o artista traçava sobre o papel os contornos projetados, com perspectiva perfeita. Faltava apenas uma coisa — fazer a imagem ficar. Durante séculos, ela existiu só enquanto houvesse luz entrando pelo furo.",
    },
    {
      id: "img-image-camara",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/001_a01_camera_obscura_abrazolas.jpg/1280px-001_a01_camera_obscura_abrazolas.jpg",
      alt: "Gravura antiga mostrando uma pessoa do lado de fora de uma caixa escura e sua imagem projetada de cabeça para baixo dentro dela",
      caption:
        "O princípio da câmara escura: a luz que passa por um pequeno orifício projeta a cena invertida na parede oposta. Imagem: autor desconhecido/Wikimedia Commons, domínio público.",
    },
    { id: "img-heading-fotografia", type: "heading", text: "Fixar a luz: o nascimento da fotografia" },
    {
      id: "img-fotografia-1",
      type: "paragraph",
      text: "A imagem fotográfica mais antiga que sobreviveu foi feita por Joseph Nicéphore Niépce por volta de 1826 ou 1827, da janela de sua casa em Le Gras, na França. Ele cobriu uma placa de estanho com betume da Judeia, uma substância que endurece quando exposta à luz, e deixou a placa dentro de uma câmara escura por horas — as estimativas vão de oito horas a alguns dias. As partes que receberam mais luz endureceram; o resto foi lavado com solvente. O resultado é a vista borrada de telhados que ilustra a capa desta publicação.",
    },
    {
      id: "img-fotografia-2",
      type: "paragraph",
      text: "Em 1839, Louis Daguerre apresentou o daguerreótipo, uma imagem nítida sobre placa de cobre prateada, mas única: não havia como copiá-la. Pouco depois, William Henry Fox Talbot desenvolveu o calótipo, que produzia um negativo em papel do qual se podiam tirar várias cópias positivas — o princípio que sustentaria a fotografia por mais de um século. Vieram em seguida o colódio úmido, as placas secas de gelatina e, em 1888, a câmera Kodak de George Eastman, carregada de fábrica com filme em rolo. A fotografia deixou de ser ofício de especialista e virou hábito.",
    },
    {
      id: "img-fotografia-3",
      type: "paragraph",
      text: "Há um capítulo brasileiro nessa história. Em 1833, em Campinas, o francês radicado no Brasil Hercule Florence obteve imagens com papel sensibilizado e chamou o processo de photographie, alguns anos antes de a palavra circular na Europa. O trabalho ficou isolado e só foi reconhecido mais de um século depois, graças à pesquisa do historiador Boris Kossoy. É um bom lembrete de que invenções técnicas raramente têm um único pai — elas amadurecem em vários lugares ao mesmo tempo.",
    },
    {
      id: "img-fotografia-4",
      type: "paragraph",
      text: "O salto para o digital começou em 1975, quando Steven Sasson, engenheiro da Kodak, montou um protótipo que registrava imagens em preto e branco de 100 por 100 pixels e as gravava em fita cassete, em cerca de 23 segundos por foto. A própria empresa demorou a apostar na ideia. Três décadas depois, o sensor digital havia substituído o filme quase por completo e, com a chegada dos smartphones, a câmera passou a ser um recurso de um aparelho que levamos para todo lugar.",
    },
    {
      id: "img-image-legras",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/View_from_the_Window_at_Le_Gras%2C_Joseph_Nic%C3%A9phore_Ni%C3%A9pce.jpg/1280px-View_from_the_Window_at_Le_Gras%2C_Joseph_Nic%C3%A9phore_Ni%C3%A9pce.jpg",
      alt: "Imagem borrada em tons de cinza mostrando telhados vistos de uma janela",
      caption:
        "Vista da janela em Le Gras (c. 1826–1827), de Niépce: a fotografia mais antiga que sobreviveu, registrada em placa com betume da Judeia. Imagem: Joseph Nicéphore Niépce/Wikimedia Commons, domínio público.",
    },
    {
      id: "img-video-historia",
      type: "video",
      url: "https://www.youtube.com/watch?v=eANrUjNv7Kw",
      caption: "A história da fotografia, da câmera escura ao celular — episódio da série História da Tecnologia, do TecMundo.",
    },
    { id: "img-heading-olho", type: "heading", text: "Como o olho forma uma imagem" },
    {
      id: "img-olho-1",
      type: "paragraph",
      text: "Antes de qualquer câmera, existe o instrumento óptico que toda imagem precisa convencer: o olho humano. A luz entra pela córnea, uma superfície transparente e curva que faz a maior parte do trabalho de desviar os raios. A íris regula a quantidade de luz abrindo ou fechando a pupila — exatamente o que o diafragma faz em uma câmera. O cristalino, uma lente flexível, ajusta o foco mudando de forma conforme olhamos para perto ou para longe.",
    },
    {
      id: "img-olho-2",
      type: "paragraph",
      text: "Os raios convergem na retina, no fundo do olho, onde forma-se uma imagem invertida, como na câmara escura. A retina é tecido nervoso: suas células convertem luz em sinais elétricos, que saem pelo nervo óptico em direção ao lobo occipital, na parte de trás do cérebro. No ponto onde o nervo deixa o olho não há células sensíveis — é o ponto cego —, e nunca o percebemos porque o cérebro preenche a lacuna com o que está em volta. Já aqui fica claro que enxergar não é registrar: é interpretar.",
    },
    {
      id: "img-image-olho",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Schematic_diagram_of_the_human_eye_en.svg/1280px-Schematic_diagram_of_the_human_eye_en.svg.png",
      alt: "Diagrama em corte do olho humano com córnea, íris, cristalino, retina, fóvea e nervo óptico",
      caption:
        "Corte esquemático do olho humano (rótulos em inglês): córnea, íris, cristalino, retina, fóvea e nervo óptico. Imagem: Rhcastilhos e Jmarchn/Wikimedia Commons, CC BY-SA 3.0.",
    },
    { id: "img-heading-cones", type: "heading", text: "Cones, bastonetes e a origem do RGB" },
    {
      id: "img-cones-1",
      type: "paragraph",
      text: "A retina tem dois tipos de fotorreceptores. Os bastonetes são muito mais numerosos — cerca de 120 milhões por olho —, extremamente sensíveis e responsáveis pela visão em baixa luminosidade e pela visão periférica. Eles não distinguem cores, o que explica por que, à noite, o mundo parece cinza. Os cones, cerca de 6 milhões, funcionam com mais luz, concentram-se na fóvea, a pequena região central da retina onde a visão é mais nítida, e são os responsáveis pela cor.",
    },
    {
      id: "img-cones-2",
      type: "paragraph",
      text: "Existem três tipos de cone, cada um mais sensível a uma faixa do espectro: comprimentos de onda curtos, que percebemos como azul; médios, como verde; e longos, como vermelho. Toda cor que vemos é a combinação das respostas desses três tipos. Essa teoria, chamada tricromacia, é a razão técnica pela qual telas usam três canais — vermelho, verde e azul, o famoso RGB. Uma tela não reproduz a luz de uma flor; ela reproduz a combinação de estímulos que nossos três cones receberiam olhando para a flor.",
    },
    {
      id: "img-cones-3",
      type: "paragraph",
      text: "Há uma consequência interessante: a imagem digital foi desenhada sob medida para a biologia humana. Um animal com quatro tipos de cone, como muitas aves, veria uma foto do celular como incompleta. E pessoas com daltonismo, que têm um dos tipos de cone ausente ou alterado, percebem de forma diferente combinações que a maioria distingue — o que faz do contraste e do uso de cor uma questão de acessibilidade, e não só de estética.",
    },
    {
      id: "img-video-olho",
      type: "video",
      url: "https://www.youtube.com/watch?v=gg_XP1MQflk",
      caption: "Como os olhos enxergam as cores? — resposta curta do quadro Ciência USP Responde, do Canal USP.",
    },
    { id: "img-heading-sensor", type: "heading", text: "Da lente ao sensor: como a câmera captura" },
    {
      id: "img-sensor-1",
      type: "paragraph",
      text: "A câmera digital repete a lógica do olho com outras peças. A lente concentra a luz por refração e define o enquadramento: a distância focal determina o ângulo de visão, e a abertura — indicada por números como f/1.8 ou f/8 — determina quanta luz passa e quanto da cena fica em foco ao mesmo tempo. Aberturas grandes deixam o fundo desfocado; aberturas pequenas mantêm tudo nítido. O obturador controla por quanto tempo o sensor fica exposto, e é aí que o movimento congela ou vira rastro.",
    },
    {
      id: "img-sensor-2",
      type: "paragraph",
      text: "O sensor é uma grade de milhões de fotodiodos, pequenas células que convertem fótons em carga elétrica: quanto mais luz, mais carga. Durante décadas, o tipo dominante foi o CCD, que transfere as cargas célula a célula até um ponto de leitura e produz imagens muito limpas, ao custo de mais energia. Hoje predomina o CMOS, em que cada célula tem seu próprio circuito de leitura; ele consome menos, lê mais rápido e pode ser fabricado como um chip comum, o que o tornou a escolha natural para celulares.",
    },
    {
      id: "img-sensor-3",
      type: "paragraph",
      text: "O tamanho de cada célula importa mais do que a contagem de megapixels sugere. Uma célula maior recebe mais luz e, portanto, produz um sinal mais forte em relação ao ruído — aquele granulado colorido que aparece em fotos noturnas. É por isso que uma câmera profissional de 24 megapixels, com sensor grande, costuma superar um celular de 200 megapixels em baixa luz: o número de pontos diz quantos detalhes cabem na imagem, não quanta informação boa cada ponto carrega.",
    },
    { id: "img-heading-bayer", type: "heading", text: "O sensor não enxerga cor" },
    {
      id: "img-bayer-1",
      type: "paragraph",
      text: "Um fotodiodo mede apenas intensidade: ele sabe quanta luz chegou, mas não de que cor. Para obter cor, coloca-se sobre o sensor um mosaico de filtros minúsculos, um por célula, deixando passar só vermelho, só verde ou só azul. O arranjo mais comum foi patenteado por Bryce Bayer, da Kodak, em 1976, e leva o nome dele. No filtro de Bayer, metade das células recebe filtro verde e um quarto recebe cada uma das outras duas cores — mais verde porque nossa visão é mais sensível a essa faixa e extrai dela a maior parte da percepção de detalhe.",
    },
    {
      id: "img-bayer-2",
      type: "paragraph",
      text: "O resultado é que cada pixel registra só um terço da informação de cor. As outras duas componentes são estimadas a partir dos vizinhos, em um processo chamado demosaicização. Em uma área lisa, a estimativa é fácil; em bordas finas e texturas repetitivas, ela pode errar e produzir franjas coloridas ou padrões ondulados, o efeito moiré. Toda foto colorida que você já tirou é, portanto, dois terços interpolação — uma reconstrução muito bem feita, mas ainda uma reconstrução.",
    },
    {
      id: "img-image-bayer",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Bayer_pattern_on_sensor.svg/1280px-Bayer_pattern_on_sensor.svg.png",
      alt: "Esquema do filtro de Bayer: grade de quadrados vermelhos, verdes e azuis sobre a grade de células do sensor",
      caption:
        "O filtro de Bayer sobre o sensor: cada célula recebe só uma cor, com o dobro de células verdes. Imagem: Cburnett/Wikimedia Commons, CC BY-SA 3.0.",
    },
    { id: "img-heading-processamento", type: "heading", text: "O que acontece antes de você ver a foto" },
    {
      id: "img-processamento-1",
      type: "paragraph",
      text: "Entre o sensor e a tela existe um processador de imagem que toma decisões em milissegundos. Ele faz o balanço de branco, estimando a cor da luz da cena para que uma parede branca pareça branca tanto sob lâmpada amarela quanto sob céu nublado. Reduz o ruído, aplica nitidez nas bordas, ajusta contraste e saturação e comprime as altas luzes e as sombras para caber na faixa que a tela consegue mostrar. Cada uma dessas etapas é uma escolha estética embutida no aparelho.",
    },
    {
      id: "img-processamento-2",
      type: "paragraph",
      text: "Nos celulares, esse trabalho ganhou nome próprio: fotografia computacional. Ao apertar o botão, o aparelho muitas vezes já capturou vários quadros, com exposições diferentes, e os combina em um só — escurecendo o céu estourado, clareando o rosto na sombra, eliminando o tremor da mão. Modos noturnos empilham dezenas de quadros; modos retrato estimam a profundidade da cena para desfocar o fundo artificialmente. A foto que vemos é menos um instante registrado e mais um instante calculado a partir de vários.",
    },
    {
      id: "img-processamento-3",
      type: "paragraph",
      text: "Câmeras e alguns celulares permitem guardar o arquivo RAW, que preserva os dados do sensor quase sem tratamento. Ele é pesado e precisa ser revelado em um programa de edição, mas dá a quem fotografa o controle sobre as decisões que o processador tomaria sozinho. A diferença entre RAW e JPEG é, no fundo, a diferença entre receber os ingredientes e receber o prato pronto.",
    },
    { id: "img-heading-pixel", type: "heading", text: "Pixel, resolução e profundidade de cor" },
    {
      id: "img-pixel-1",
      type: "paragraph",
      text: "Pixel é a abreviação de picture element, o menor elemento de uma imagem digital. Não é um quadradinho físico: é uma amostra, um valor numérico que representa a cor de uma pequena área da cena. A resolução diz quantas amostras existem — 4000 por 3000 pixels são 12 milhões de pontos, ou 12 megapixels. Em exames de tomografia e ressonância, o equivalente tridimensional do pixel é o voxel, um pequeno volume do corpo ao qual se atribui um valor.",
    },
    {
      id: "img-pixel-2",
      type: "paragraph",
      text: "Cada pixel guarda um número por canal de cor. Com 8 bits por canal, cada canal vai de 0 a 255, o que dá 256 níveis de vermelho, 256 de verde e 256 de azul — combinados, cerca de 16,7 milhões de cores. Essa é a profundidade de cor padrão da web. Fotografia profissional e vídeo em HDR usam 10, 12 ou mais bits por canal, o que evita faixas visíveis em degradês suaves, como o céu ao entardecer. O trecho abaixo mostra, em Python, que uma foto não passa de uma tabela de números.",
    },
    {
      id: "img-codigo",
      type: "code",
      language: "python",
      text: `# uma imagem é uma matriz: altura x largura x canais
# requer: pip install pillow numpy
from PIL import Image
import numpy as np

foto = np.array(Image.open("por-do-sol.jpg").convert("RGB"))

altura, largura, canais = foto.shape
print(f"{largura} x {altura} pixels, {canais} canais")

# cor do pixel no centro da imagem (valores de 0 a 255)
r, g, b = foto[altura // 2, largura // 2]
print(f"centro: vermelho={r}, verde={g}, azul={b}")

# quanto ocuparia sem nenhuma compressão (1 byte por canal)
bytes_brutos = altura * largura * canais
print(f"sem compressão: {bytes_brutos / 1_000_000:.1f} MB")`,
    },
    {
      id: "img-pixel-3",
      type: "paragraph",
      text: "Rodando esse código em uma foto de 12 megapixels, a última linha mostra 36 megabytes. Mas o arquivo JPEG da mesma foto costuma ter entre 3 e 5 megabytes. A diferença é o trabalho da compressão — e é aí que os formatos de arquivo deixam de ser detalhe técnico e passam a ser decisão de projeto.",
    },
    { id: "img-heading-raster", type: "heading", text: "Mapa de bits ou vetor: dois jeitos de descrever uma imagem" },
    {
      id: "img-raster-1",
      type: "paragraph",
      text: "Tudo o que vimos até aqui descreve imagens em mapa de bits, também chamadas de raster: uma grade de pixels com valores. Elas são ideais para fotografias e cenas com variações contínuas, mas têm um limite rígido — ao ampliar além da resolução original, os pixels aparecem e a imagem fica serrilhada ou borrada.",
    },
    {
      id: "img-raster-2",
      type: "paragraph",
      text: "Imagens vetoriais funcionam de outro modo: em vez de pontos, guardam instruções geométricas — um círculo com tal centro, uma curva entre tais pontos, preenchida com tal cor. O formato SVG, usado na web, é texto legível com essas instruções. Como a imagem é recalculada a cada exibição, ela fica nítida em qualquer tamanho, do ícone de 16 pixels ao painel de fachada. Logotipos, ícones, gráficos e diagramas são candidatos naturais ao vetor; fotografias, não.",
    },
    { id: "img-heading-formatos", type: "heading", text: "JPEG, PNG, GIF, HEIC: o que cada formato guarda" },
    {
      id: "img-formatos-1",
      type: "paragraph",
      text: "O JPEG, padronizado no início dos anos 1990, é o formato mais usado para fotos. Ele usa compressão com perdas: divide a imagem em blocos, descarta detalhes finos que a visão humana mal percebe e guarda o restante de forma compacta. Funciona muito bem para fotografias, mal para textos e ilustrações de contorno nítido — onde aparecem borrões em volta das letras — e piora a cada vez que o arquivo é editado e salvo de novo, porque a perda se acumula.",
    },
    {
      id: "img-formatos-2",
      type: "paragraph",
      text: "O PNG usa compressão sem perdas: o arquivo reconstruído é idêntico ao original, pixel por pixel. Ele suporta transparência, o que o torna o padrão para capturas de tela, ícones, logotipos sobre fundos variados e qualquer imagem com texto. O preço é o tamanho: uma fotografia em PNG pode pesar várias vezes mais que em JPEG. O GIF, de 1987, também é sem perdas, mas limitado a 256 cores por quadro; sobreviveu por suportar animação e virou linguagem própria da internet.",
    },
    {
      id: "img-formatos-3",
      type: "paragraph",
      text: "Há ainda os formatos de arquivo e de trabalho. O TIFF guarda imagens com alta fidelidade e é usado em gráficas e acervos. O BMP armazena os pixels praticamente sem compressão. E há a nova geração: o WebP, criado pelo Google, e o AVIF oferecem compressão com ou sem perdas, transparência e animação em arquivos bem menores que JPEG e PNG, e já são aceitos pelos principais navegadores. O HEIC, adotado pela Apple nos iPhones a partir de 2017, guarda fotos com qualidade parecida à do JPEG em cerca de metade do espaço, mas ainda exige conversão em alguns sistemas e sites.",
    },
    {
      id: "img-formatos-4",
      type: "paragraph",
      text: "Para escolher, três perguntas resolvem a maioria dos casos. É fotografia ou desenho com áreas chapadas e texto? A imagem precisa de transparência? Ela vai ser editada de novo ou é a versão final? Foto final para a web: JPEG, WebP ou AVIF. Captura de tela, logotipo ou ilustração com texto: PNG ou SVG. Arquivo de trabalho que ainda vai passar por edição: RAW, TIFF ou o formato nativo do editor, exportando para um formato leve só no fim.",
    },
    { id: "img-heading-podcast", type: "heading", text: "Ouça: imagens que nenhuma câmera capturou" },
    {
      id: "img-podcast-context",
      type: "paragraph",
      text: "O paradigma pós-fotográfico, que parecia teoria há poucos anos, chegou ao cotidiano com os geradores de imagem por inteligência artificial. O episódio abaixo discute como funcionam ferramentas como Midjourney e DALL-E, o que elas mudam no trabalho de quem cria imagens e as questões de autoria e autenticidade que surgem quando uma fotografia convincente pode ser produzida a partir de uma frase.",
    },
    {
      id: "img-podcast",
      type: "audio",
      title: "Hipsters Ponto Tech #353 — Midjourney, DALL-E e IA generativa para imagens",
      url: "https://media.blubrry.com/hipsterstech/content.blubrry.com/hipsterstech/hipsters_353_midjourney.mp3",
      caption: "Episódio em áudio do podcast Hipsters Ponto Tech (2023) sobre geração de imagens por inteligência artificial. Fonte: feed público do programa.",
    },
    { id: "img-heading-limites", type: "heading", text: "O que a imagem digital esconde" },
    {
      id: "img-limites-1",
      type: "paragraph",
      text: "Toda foto digital carrega mais do que mostra. Os metadados EXIF, gravados dentro do arquivo, registram modelo da câmera, data, hora, configurações de exposição e, muitas vezes, as coordenadas de GPS de onde a foto foi tirada. Várias redes sociais removem esses dados ao publicar, mas arquivos enviados por e-mail, aplicativos de mensagem como documento ou sites próprios podem levá-los intactos. Publicar a foto da casa nova pode significar publicar o endereço.",
    },
    {
      id: "img-limites-2",
      type: "paragraph",
      text: "Há também a questão da autenticidade. Se toda foto já é processada, a fronteira entre corrigir e manipular fica difusa — e, com a geração por inteligência artificial, a fronteira entre registrar e inventar também. Uma resposta técnica em construção é a das credenciais de conteúdo, padrão aberto mantido pela coalizão C2PA, que grava no arquivo, de forma verificável, a origem da imagem e as edições pelas quais ela passou. Ainda é pouco adotado, mas aponta para um futuro em que a pergunta “essa foto é real?” possa ser respondida pelo próprio arquivo.",
    },
    {
      id: "img-limites-3",
      type: "paragraph",
      text: "Por fim, a imagem só comunica a quem consegue vê-la. Pessoas cegas ou com baixa visão dependem do texto alternativo para saber o que uma imagem mostra, e leitores de tela anunciam apenas o que foi escrito nele. Descrever a imagem — o que ela mostra e por que está ali — é parte do trabalho de publicar, não um acessório. Nesta publicação, cada figura tem esse texto, e vale o exercício de pensar como você descreveria as suas.",
    },
    { id: "img-heading-serie", type: "heading", text: "Imagem como mídia, elemento e camada" },
    {
      id: "img-serie-1",
      type: "paragraph",
      text: "Retomando os conceitos das publicações anteriores: a imagem é uma mídia por si só, com linguagem e suportes próprios; é um dos elementos que a multimídia combina com texto, som e vídeo; e é um dos nós mais comuns da hipermídia, quase sempre acompanhada de legenda e link. Na realidade aumentada, ela vira camada sobre o mundo físico, e o mesmo sensor que tira fotos passa a medir a geometria do ambiente.",
    },
    {
      id: "img-serie-2",
      type: "paragraph",
      text: "Essa versatilidade tem uma explicação simples: uma imagem digital é uma matriz de números, e números podem ser transmitidos, combinados, analisados e recalculados por qualquer sistema. É por isso que a mesma foto pode aparecer em um feed, em um outdoor e no algoritmo que procura rostos em uma multidão — destinos tão diferentes que merecem uma publicação própria.",
    },
    { id: "img-heading-conclusao", type: "heading", text: "Para fechar" },
    {
      id: "img-conclusao",
      type: "paragraph",
      text: "Do pigmento na parede da caverna ao filtro de Bayer, a história da imagem é a história de como fixamos a luz fora dos olhos. O digital não acabou com essa história, mas mudou sua natureza: hoje, toda imagem que vemos foi amostrada, interpretada, comprimida e reconstruída antes de chegar até nós. Saber disso não tira a beleza da foto do pôr do sol; só nos lembra de que ela é uma construção. A próxima publicação acompanha essa construção depois de pronta — nas redes, no papel, nos satélites e nas máquinas que enxergam.",
    },
    { id: "img-heading-links", type: "heading", text: "Links para continuar" },
    {
      id: "img-link-destino",
      type: "link",
      title: "Próxima leitura: o destino da imagem",
      url: "/publicacoes/destino-da-imagem-telas-papel-e-maquinas",
      caption: "Telas, impressão, satélites e visão computacional: para onde as imagens vão depois de prontas.",
    },
    {
      id: "img-link-multimidia",
      type: "link",
      title: "Revisite o conceito de multimídia",
      url: "/publicacoes/multimidia-integracao-de-formatos",
      caption: "A imagem como um dos elementos que a multimídia combina.",
    },
    {
      id: "img-link-mdn",
      type: "link",
      title: "MDN — Guia de tipos e formatos de imagem",
      url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types",
      caption: "Comparação técnica entre JPEG, PNG, GIF, WebP, AVIF, SVG e outros formatos aceitos na web.",
    },
    { id: "img-heading-references", type: "heading", text: "Fontes e referências" },
    {
      id: "img-ref-1",
      type: "link",
      title: "Harry Ransom Center — The Niépce Heliograph",
      url: "https://www.hrc.utexas.edu/niepce-heliograph/",
      caption: "Página do acervo que guarda a fotografia mais antiga que sobreviveu, com a história e o processo de Niépce.",
    },
    {
      id: "img-ref-2",
      type: "link",
      title: "OpenStax — Psychology 2e, seção Vision",
      url: "https://openstax.org/books/psychology-2e/pages/5-3-vision",
      caption: "Livro aberto com a anatomia do olho, cones, bastonetes e a teoria tricromática.",
    },
    {
      id: "img-ref-3",
      type: "link",
      title: "Bryce E. Bayer — Color imaging array, patente US 3,971,065 (1976)",
      url: "https://patents.google.com/patent/US3971065A/en",
      caption: "Patente original do mosaico de filtros usado na maioria dos sensores de cor.",
    },
    {
      id: "img-ref-4",
      type: "link",
      title: "MDN — Image file type and format guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types",
      caption: "Referência sobre compressão, transparência e compatibilidade dos formatos de imagem.",
    },
    {
      id: "img-ref-5",
      type: "link",
      title: "C2PA — Coalition for Content Provenance and Authenticity",
      url: "https://c2pa.org/",
      caption: "Padrão aberto de credenciais de conteúdo para registrar origem e edições de imagens.",
    },
    {
      id: "img-ref-6",
      type: "link",
      title: "Wikimedia Commons — Lascaux painting",
      url: "https://commons.wikimedia.org/wiki/File:Lascaux_painting.jpg",
      caption: "Fonte da imagem das pinturas de Lascaux.",
    },
    {
      id: "img-ref-7",
      type: "link",
      title: "Wikimedia Commons — Câmara escura (gravura)",
      url: "https://commons.wikimedia.org/wiki/File:001_a01_camera_obscura_abrazolas.jpg",
      caption: "Fonte da gravura que ilustra o princípio da câmara escura.",
    },
    {
      id: "img-ref-8",
      type: "link",
      title: "Wikimedia Commons — View from the Window at Le Gras",
      url: "https://commons.wikimedia.org/wiki/File:View_from_the_Window_at_Le_Gras,_Joseph_Nic%C3%A9phore_Ni%C3%A9pce.jpg",
      caption: "Fonte da reprodução da heliografia de Niépce usada na capa.",
    },
    {
      id: "img-ref-9",
      type: "link",
      title: "Wikimedia Commons — Schematic diagram of the human eye",
      url: "https://commons.wikimedia.org/wiki/File:Schematic_diagram_of_the_human_eye_en.svg",
      caption: "Fonte do diagrama do olho humano.",
    },
    {
      id: "img-ref-10",
      type: "link",
      title: "Wikimedia Commons — Bayer pattern on sensor",
      url: "https://commons.wikimedia.org/wiki/File:Bayer_pattern_on_sensor.svg",
      caption: "Fonte do esquema do filtro de Bayer.",
    },
    {
      id: "img-ref-11",
      type: "link",
      title: "Hipsters Ponto Tech #353 — Midjourney, DALL-E e IA generativa para imagens",
      url: "https://www.hipsters.tech/midjourney-dall-e-e-ia-generativa-para-imagens-hipsters-ponto-tech-353/",
      caption: "Página oficial do episódio de podcast incorporado nesta matéria.",
    },
    {
      id: "img-ref-12",
      type: "paragraph",
      text: "Bibliografia de apoio: AUMONT, Jacques. A imagem. Campinas: Papirus, 1993. SANTAELLA, Lucia; NÖTH, Winfried. Imagem: cognição, semiótica, mídia. São Paulo: Iluminuras, 1998. SONTAG, Susan. Sobre fotografia. São Paulo: Companhia das Letras, 2004. KOSSOY, Boris. Hercule Florence: a descoberta isolada da fotografia no Brasil. São Paulo: Edusp, 2006. GONZALEZ, Rafael C.; WOODS, Richard E. Processamento digital de imagens. 3. ed. São Paulo: Pearson, 2010.",
    },
  ],
};
