import { siteConfig } from "@/lib/site";
import type { Post } from "@/types/post";

const pasta = "/posts/grandmaster-alchemist";

export const postGrandmasterAlchemist: Post = {
  id: "base-grandmaster-alchemist",
  title: "Grandmaster Alchemist: plantar, refinar e cultivar o próprio poder",
  slug: "grandmaster-alchemist-fazenda-xianxia",
  excerpt:
    "O jogo que desenvolvemos como Trabalho de Graduação: uma simulação de fazenda em pixel art em que cada avanço de poder depende do que a personagem planta, refina no caldeirão e encontra em uma mina de cem andares.",
  category: "Jogos Digitais",
  tags: ["Grandmaster Alchemist", "game design", "Unity", "xianxia", "simulação de fazenda", "trabalho de graduação"],
  cover_url: `${pasta}/fazenda.jpg`,
  status: "published",
  featured: false,
  author: siteConfig.author,
  reading_time: 17,
  published_at: "2026-11-12T14:00:00.000Z",
  created_at: "2026-11-12T14:00:00.000Z",
  updated_at: "2026-11-12T14:00:00.000Z",
  content: [
    {
      id: "ga-intro",
      type: "paragraph",
      text: "Uma jovem chega a uma seita que já foi respeitada e hoje está quase abandonada. Ela quer seguir o caminho do cultivo — acumular energia interior, romper reinos de poder, um dia alcançar a imortalidade —, mas tem os meridianos rompidos: a meditação, que levaria qualquer discípulo adiante, rende pouco para ela. Sem acesso ao caminho tradicional, ela pega uma enxada. As plantas que cultiva viram ingredientes, os ingredientes viram pílulas no caldeirão, e as pílulas pagam cada avanço. Essa é a premissa do Grandmaster Alchemist.",
    },
    {
      id: "ga-intro-2",
      type: "paragraph",
      text: "O Grandmaster Alchemist é o jogo que estamos desenvolvendo como Trabalho de Graduação no curso de Informática para Negócios da Fatec Rio Preto, com orientação da professora Luciene Cavalcanti. É um jogo 2D para Windows, com visão de cima, feito na Unity. Esta publicação apresenta a proposta, os sistemas que já funcionam, o visual e os bastidores técnicos; a próxima detalha a parte que é o núcleo da pesquisa: o gerador procedural da mina de cem andares.",
    },
    { id: "ga-heading-ideia", type: "heading", text: "Duas comunidades enormes que quase não se encontram" },
    {
      id: "ga-ideia-1",
      type: "paragraph",
      text: "Os simuladores de fazenda formam um gênero consolidado: o jogador prepara o solo, planta, rega, colhe, acompanha a passagem dos dias e convive com os moradores de uma pequena comunidade. O principal representante contemporâneo é Stardew Valley, lançado em 2016 por Eric Barone, que desenvolveu o jogo praticamente sozinho e combinou a rotina agrícola com mineração, combate e evolução do personagem. Segundo dados da própria desenvolvedora, o jogo ultrapassou 20 milhões de cópias vendidas até 2022.",
    },
    {
      id: "ga-video-stardew",
      type: "video",
      url: "https://www.youtube.com/watch?v=_AZRvSb54WQ",
      caption: "A história de Eric Barone, criador de Stardew Valley, a principal referência de escopo do projeto — vídeo do canal Crie Seus Jogos.",
    },
    {
      id: "ga-ideia-2",
      type: "paragraph",
      text: "Do outro lado está o xianxia, gênero da literatura chinesa publicada na internet. Derivado da ficção de artes marciais, ele acompanha cultivadores inspirados no taoismo que desenvolvem o qi, a energia interior, e sobem por reinos sucessivos de poder rumo à imortalidade. Pesquisadores já notaram que essa progressão lembra a de um personagem de videogame que sobe de nível — e a literatura online chinesa reunia, em 2023, cerca de 200 milhões de leitores ativos fora da China.",
    },
    {
      id: "ga-ideia-3",
      type: "paragraph",
      text: "Mesmo assim, jogos que unem as duas coisas são raros. Amazing Cultivation Simulator coloca o jogador para administrar uma seita inteira, com foco estratégico; Immortal Life aproxima o cultivo da simulação de fazenda e é o título comercial mais próximo da nossa proposta. Nenhum deles, porém, faz cada avanço de reino depender ao mesmo tempo da produção da fazenda, da alquimia e da exploração de uma mina extensa. É nessa integração que situamos o projeto.",
    },
    {
      id: "ga-video-xianxia",
      type: "video",
      url: "https://www.youtube.com/watch?v=Qnf7NochBK0",
      caption: "Qual é a diferença entre wuxia, xianxia e xuanhuan? — introdução às novels chinesas do canal Hua BaiYue.",
    },
    { id: "ga-heading-ciclo", type: "heading", text: "Cultivar, explorar, refinar, evoluir, reconstruir" },
    {
      id: "ga-ciclo-1",
      type: "paragraph",
      text: "O ciclo principal do jogo tem cinco etapas, e cada uma alimenta a seguinte. Na fazenda, a personagem cultiva comida, ingredientes e plantas espirituais. Na mina, encontra minérios, materiais de monstros, sementes raras e receitas. No caldeirão, refina esses recursos em pílulas. Com as pílulas e os materiais, rompe reinos de cultivo e fica mais forte — o que abre andares mais profundos e mecânicas novas na própria fazenda. E, a longo prazo, reconstrói os pavilhões da seita.",
    },
    {
      id: "ga-ciclo-2",
      type: "paragraph",
      text: "O universo toma como referência dois romances do gênero: Nine Star Hegemon Body Art, de onde vêm a sequência de reinos e a união entre fortalecimento do corpo e alquimia, e Battle Through the Heavens, de onde vem a importância da chama no refino de pílulas. Tratamos essas obras como inspiração de fantasia, e não como retrato documental de uma cultura — uma preocupação que orienta tanto os textos quanto a arte do jogo.",
    },
    {
      id: "ga-ciclo-3",
      type: "paragraph",
      text: "Para desenhar as regras, usamos o modelo MDA, de Hunicke, LeBlanc e Zubek, que separa o jogo em mecânicas, as regras implementadas; dinâmicas, o comportamento que surge quando o jogador interage com elas; e estéticas, as emoções que se pretende provocar. Um exemplo do próprio jogo: a planta só cresce nos dias em que foi regada (mecânica), o que cria uma rotina diária de cuidado com a lavoura (dinâmica), que busca a sensação de dedicação recompensada (estética).",
    },
    {
      id: "ga-quote",
      type: "quote",
      text: "Do ponto de vista do designer, as mecânicas dão origem ao comportamento dinâmico do sistema, que por sua vez leva a experiências estéticas específicas.",
      author: "Robin Hunicke, Marc LeBlanc e Robert Zubek, MDA: a formal approach to game design and game research (2004), tradução nossa",
    },
    {
      id: "ga-video-mda",
      type: "video",
      url: "https://www.youtube.com/watch?v=AoRq2AYcUIY",
      caption: "Introdução ao modelo Mecânicas, Dinâmicas e Estéticas (MDA) — explicação do canal Jogos no Tabuleiro.",
    },
    { id: "ga-heading-fazenda", type: "heading", text: "A fazenda: um compromisso que se renova todo dia" },
    {
      id: "ga-fazenda-1",
      type: "paragraph",
      text: "A personagem anda com W, A, S e D, corre com Shift e usa o item que está na mão com o clique esquerdo. A enxada transforma grama em solo arado, o regador umedece o solo, o machado derruba árvores e a picareta quebra pedras; cada uso gasta estamina. As ferramentas atingem a célula da grade bem à frente dos pés da personagem, e o efeito acontece no quadro exato do impacto da animação, para que o resultado na tela coincida com o gesto.",
    },
    {
      id: "ga-fazenda-2",
      type: "paragraph",
      text: "O tempo do jogo corre na proporção de meio segundo real para cada minuto, o que dá um dia completo em cerca de doze minutos, com a luz da cena mudando do amanhecer à noite. O crescimento das plantas não depende do tempo que passou, e sim de quantos dias a planta passou em solo úmido: na virada do dia, cada planta confere se a terra estava molhada, avança um dia se estava, e a terra volta a secar. Há dezoito culturas — cinco de uso geral, como o Ginseng Espiritual e o Arroz de Jade, e treze ligadas aos rompimentos de reino.",
    },
    {
      id: "ga-image-estagios",
      type: "image",
      url: `${pasta}/estagios-das-culturas.jpg`,
      alt: "Tabela com cinco culturas do jogo em pixel art, cada uma em três estágios de crescimento, da cova à planta madura",
      caption: "Estágios de crescimento das cinco culturas de uso geral, da cova à colheita. Imagem: elaboração própria.",
    },
    {
      id: "ga-fazenda-3",
      type: "paragraph",
      text: "Esse comportamento é implementado de forma bem direta. O relógio do jogo anuncia a virada do dia como um evento, e quem se interessa por ele reage sem conhecer o relógio. O trecho abaixo, do código do próprio jogo, é o que cada planta executa nesse momento — inclusive a regra das plantas espirituais, que só contam o dia se tiverem recebido água carregada de Qi.",
    },
    {
      id: "ga-codigo",
      type: "code",
      language: "csharp",
      text: `// Crop.cs (trecho simplificado) — executado em cada planta quando o dia vira
public void ProcessNewDay()
{
    if (cropData == null || IsMature)
    {
        return;
    }

    bool wasWatered = farmManager.IsCellWatered(cellPosition);
    // Planta espiritual: água comum não basta, precisa da água de Qi.
    if (cropData.Espiritual && !farmManager.IsCellQi(cellPosition))
    {
        wasWatered = false;
    }

    if (wasWatered)
    {
        wateredGrowthDays++;
        UpdateGrowthStage();
        if (IsMature) TentarMutar();
    }

    farmManager.ResetCellToDry(cellPosition);
}`,
    },
    {
      id: "ga-image-dia-noite",
      type: "image",
      url: `${pasta}/dia-e-noite.jpg`,
      alt: "A mesma cena da fazenda em duas versões, uma iluminada pela manhã e outra escura à noite",
      caption: "A mesma cena de manhã e à noite: a cor da luz global acompanha um gradiente que percorre as 24 horas. Imagem: elaboração própria.",
    },
    { id: "ga-heading-cultivo", type: "heading", text: "Cultivo: reinos que se pagam com o que você planta" },
    {
      id: "ga-cultivo-1",
      type: "paragraph",
      text: "O documento de game design prevê quatorze reinos de cultivo, agrupados em três grandes reinos que funcionam como os atos do jogo: Houtian, Xiantian e Divino. O protótipo atual cobre o primeiro ato inteiro: os cinco reinos do Houtian — Condensação de Qi, Condensação de Sangue, Transformação de Tendões, Forjamento de Ossos e Abertura de Meridianos —, cada um com nove camadas, até o nível 45, o auge do Houtian. Um reino é conquistado a cada vinte andares da mina.",
    },
    {
      id: "ga-cultivo-2",
      type: "paragraph",
      text: "Para começar, a personagem precisa encontrar um tomo de cultivo na mina e aprendê-lo em um minijogo de circulação do Qi. A partir daí, acumula Qi meditando, derrotando monstros e consumindo núcleos de fera. Como os meridianos dela são rompidos, a meditação rende cada vez menos se ela ficar parada — a fadiga só passa ao lutar, dormir ou consumir um núcleo —, o que empurra o jogador para fora da almofada e de volta à fazenda e à mina.",
    },
    {
      id: "ga-image-qi",
      type: "image",
      url: `${pasta}/minijogo-qi.jpg`,
      alt: "Tela do minijogo de circulação do Qi, com um diagrama do corpo e pontos de energia a percorrer",
      caption: "Minijogo de circulação do Qi, que ensina a personagem a cultivar. Imagem: elaboração própria.",
    },
    {
      id: "ga-cultivo-3",
      type: "paragraph",
      text: "O rompimento de reino é o ponto em que tudo se encontra. Com a barra de cultivo cheia e o guardião da faixa derrotado, a barra pisca em dourado e a personagem abre a janela de rompimento, onde oferece um minério da mina e uma planta cultivada na fazenda. Cada material existe em quatro categorias — baixa, média, alta e suprema —, e a quantidade pedida cai conforme a categoria sobe: 20, 10, 3 ou uma única unidade. No lugar dos dois materiais, ela pode consumir uma pílula de avanço refinada no caldeirão.",
    },
    {
      id: "ga-cultivo-4",
      type: "paragraph",
      text: "O que é oferecido fica gravado para sempre na Fundação da personagem: o minério aumenta vida e estamina, a planta aumenta o Qi, e o bônus de cada categoria multiplica todos os rompimentos seguintes. Oferecer os dois materiais supremos no mesmo rompimento forma a Fundação Celestial, com bônus extra em todos os atributos. É uma decisão com peso: romper logo com materiais comuns ou descer mais fundo atrás dos supremos.",
    },
    {
      id: "ga-cultivo-5",
      type: "paragraph",
      text: "Seguindo o princípio de que cada reino deve liberar uma mecânica, e não só números maiores, os cinco reinos mudam a fazenda. No primeiro, o regador passa a usar Qi e molha uma área de 3 por 3 com água espiritual. No segundo, a Essência de Sangue vira adubo, e plantas adubadas podem amadurecer como versões mutantes, mais valiosas. No terceiro, ferramentas de nível mais alto quebram obsidiana e troncos antigos que bloqueavam partes do mapa. No quarto, o corpo resiste melhor à toxicidade dos andares profundos. No quinto, o Canalizador de Qi rega sozinho uma área de 5 por 5 toda manhã.",
    },
    { id: "ga-heading-alquimia", type: "heading", text: "Alquimia: o minijogo que dá nome ao jogo" },
    {
      id: "ga-alquimia-1",
      type: "paragraph",
      text: "O caldeirão é construído com pedra e madeira e pode ficar dentro de casa ou na fazenda. Ao escolher uma receita, a personagem gasta os ingredientes e começa o refino: segurando a barra de espaço, aviva a chama, e precisa manter a temperatura dentro de uma faixa dourada que muda de lugar a cada ingrediente, enquanto adiciona os ingredientes na ordem certa. A pureza é a fração do tempo em que a temperatura ficou na faixa, descontados os erros, e define a qualidade da pílula: inferior, comum, superior ou perfeita.",
    },
    {
      id: "ga-alquimia-2",
      type: "paragraph",
      text: "Se a temperatura chega ao topo, o caldeirão explode, os ingredientes se perdem e a personagem leva dano. Há quatro receitas básicas — cura, vigor, Qi e purificação — e dezesseis receitas de avanço, quatro para cada rompimento, que somam sessenta e quatro pílulas possíveis considerando as quatro qualidades. Cada pílula consumida acumula toxina, menos nas qualidades altas, e a Pílula Purificadora reduz o acúmulo. Assim, refinar bem não é só estética: é o que permite usar mais pílulas sem adoecer.",
    },
    {
      id: "ga-image-refino",
      type: "image",
      url: `${pasta}/refino-pilula.jpg`,
      alt: "Tela do minijogo de refino com o caldeirão, a barra de temperatura e a faixa dourada",
      caption: "Minijogo de refino da Pílula de Cura: manter a temperatura na faixa dourada enquanto os ingredientes entram na ordem. Imagem: elaboração própria.",
    },
    { id: "ga-heading-mina", type: "heading", text: "A mina: cem andares, cinco biomas, um guardião por reino" },
    {
      id: "ga-mina-1",
      type: "paragraph",
      text: "A mina é o lado arriscado do ciclo. Ela tem cem andares, organizados em cinco faixas de vinte, cada uma com bioma, minérios e reino próprios: a Caverna, os Veios de Jade, a Obsidiana, com lava que queima, o Pântano Tóxico, com névoa e poças venenosas, e o Céu Estrelado, onde raios caem do teto. Os andares comuns são gerados por algoritmo no momento em que a personagem entra, e checkpoints a cada cinco andares evitam recomeçar do zero.",
    },
    {
      id: "ga-mina-2",
      type: "paragraph",
      text: "Cada faixa de dez andares tem dois tipos de inimigo: um que aparece sozinho e é forte, e outro que ataca em bando e é fraco. Os andares 10, 30, 50, 70 e 90 são arenas com um chefe; os andares 20, 40, 60, 80 e 100 têm o guardião do reino, cuja derrota libera o rompimento. Os inimigos comuns têm dois ataques; chefes e guardiões têm quatro, incluindo um modo de fúria abaixo da metade da vida. Todo ataque perigoso é anunciado com uma marca no chão antes de acontecer — o jogo pune quem não presta atenção, mas sempre avisa.",
    },
    {
      id: "ga-image-guardiao",
      type: "image",
      url: `${pasta}/guardiao-andar-10.jpg`,
      alt: "A personagem enfrentando um pangolim gigante em uma arena da mina, com a barra de vida do chefe no topo da tela",
      caption: "Combate contra o Pangolim Couraça-de-Bronze, chefe do andar 10, que rola pela arena e devolve parte do dano com a couraça fechada. Imagem: elaboração própria.",
    },
    {
      id: "ga-mina-3",
      type: "paragraph",
      text: "O bestiário dos cem andares mistura animais e criaturas da mitologia chinesa: o Javali Presa-de-Ferro investe em linha reta e fica tonto ao bater na parede; o Lobo da Névoa caça em matilha e se desfaz em névoa para escapar; a Tartaruga Negra da Montanha só recebe dano pelas costas; o Taotie, a fera devoradora, puxa a personagem para a boca; o Pássaro Vermelhão renasce das cinzas uma vez; a Serpente de Nove Cabeças cospe veneno em leque; e o Dragão Azul Celeste, guardião do andar 100, voa entre as nuvens e solta uma pérola que o cura até que três golpes a rachem.",
    },
    {
      id: "ga-image-guardioes",
      type: "image",
      url: `${pasta}/guardioes-dos-reinos.png`,
      alt: "Folha com os cinco guardiões dos reinos em pixel art: escorpião de jade, tartaruga negra, pássaro vermelho, serpente de nove cabeças e dragão azul",
      caption: "Os guardiões dos andares 20, 40, 60, 80 e 100, um para cada reino do Houtian. Imagem: elaboração própria.",
    },
    {
      id: "ga-mina-4",
      type: "paragraph",
      text: "Cada inimigo é controlado por uma máquina de estados finitos, técnica clássica de inteligência artificial para jogos: ele está sempre em um estado — passear, perseguir, preparar o ataque, atacar, ficar tonto, recuperar-se — e muda de estado conforme a distância até a personagem e o resultado dos golpes. Uma classe base comum cuida da animação, do dano, do recuo e dos itens derrubados, e cada criatura só descreve o próprio comportamento. Como a geração dos andares funciona, e como provamos que ela nunca prende o jogador, é o assunto da próxima publicação.",
    },
    { id: "ga-heading-mundo", type: "heading", text: "A vila, a floresta e a casa" },
    {
      id: "ga-mundo-1",
      type: "paragraph",
      text: "A leste da fazenda fica a vila, com oito moradores que seguem uma rotina própria por hora do dia — dormir, trabalhar, passear, conversar — e andam pelas ruas pelo caminho mais curto, calculado sobre o mapa das estradas. Conversar com eles todos os dias revela segredos aos poucos, e esses segredos compõem uma história oculta sobre uma seita que selou algo sob a montanha e um Grande Alquimista que desapareceu na mina. A moeda do jogo são as Pedras Espirituais, e o lojista Wang Fu compra o que a personagem traz e vende sementes.",
    },
    {
      id: "ga-image-conversa",
      type: "image",
      url: `${pasta}/conversa-vila.jpg`,
      alt: "A personagem conversando com um morador na praça da vila, com uma caixa de diálogo na parte de baixo da tela",
      caption: "Conversa com um morador da vila: com três, cinco e sete dias de conversa, cada um revela um segredo novo. Imagem: elaboração própria.",
    },
    {
      id: "ga-mundo-2",
      type: "paragraph",
      text: "Ao norte da vila, um pórtico leva à floresta, com lebres e cervos neutros que só reagem quando atacados e uma escola de artes marciais no fim da trilha, onde o mestre Yun Feng apresenta o Caminho da Espada. A casa da personagem fica na fazenda: todos os móveis são itens que podem ser guardados na mochila e recolocados, com uma prévia verde ou vermelha indicando onde cabem, e os baús guardam o excedente. O jogo salva tudo em disco quando a personagem dorme — como manda a tradição do gênero —, e o progresso da mina é gravado à parte, a cada mudança.",
    },
    { id: "ga-heading-visual", type: "heading", text: "Pixel art em vista três-quartos" },
    {
      id: "ga-visual-1",
      type: "paragraph",
      text: "O jogo usa pixel art com 16 pixels por unidade de mundo, filtragem pontual e nenhuma compressão, para que cada pixel desenhado apareça exatamente como foi feito. A regra visual é a vista três-quartos: os objetos mostram o topo e uma face lateral, com volume, luz vinda de cima e da esquerda, sombra de contato no chão e contorno na cor escura do próprio objeto. Telhados curvos, lanternas vermelhas, bambuzais e pátios de pedra dão o tom chinês do cenário.",
    },
    {
      id: "ga-visual-2",
      type: "paragraph",
      text: "Para que a personagem passe na frente de uma árvore e atrás de outra de forma convincente, tudo no mundo é ordenado pela altura da base do desenho: quem está mais abaixo na tela é desenhado por cima. A interface ganhou molduras de laca e painéis de inspiração chinesa, e a vegetação e a água são animadas — árvores e capim balançam em oito quadros, com a fase de cada planta derivada da posição no mapa, para que uma onda de vento atravesse o cenário. A interface foi criada por Bianca Aparecida Sansão Buzzatto e as ilustrações e a pixel art, por Matheus Jinguji, colaboradores do projeto, com apoio de ferramentas de inteligência artificial generativa em parte dos elementos.",
    },
    {
      id: "ga-image-menu",
      type: "image",
      url: `${pasta}/menu-principal.jpg`,
      alt: "Menu principal do Grandmaster Alchemist com o título em pincelada sobre um caldeirão desenhado e as opções Continuar, Novo Jogo, Opções, Créditos e Sair",
      caption: "Menu principal: o título em traço de pincel sobre o desenho de um caldeirão alquímico. Imagem: elaboração própria.",
    },
    { id: "ga-heading-tecnico", type: "heading", text: "Bastidores técnicos" },
    {
      id: "ga-tecnico-1",
      type: "paragraph",
      text: "O jogo é feito na Unity 6, em C#, com cenários montados em Tilemaps — grades de peças gráficas — e iluminação 2D do Universal Render Pipeline. Usamos o Input System para teclado e mouse, o Cinemachine para a câmera que segue a personagem sem passar das bordas do mapa e o TextMesh Pro para os textos. O projeto tem seis cenas — menu, fazenda, vila, floresta, pedreira e masmorra — e já passa de duzentos scripts.",
    },
    {
      id: "ga-tecnico-2",
      type: "paragraph",
      text: "Quatro padrões de projeto, descritos por Robert Nystrom no livro Game Programming Patterns, organizam o código. O Singleton garante um único relógio e um único gerenciador de pausa. O Observer permite que a interface e as plantas reajam a eventos, como a mudança do inventário ou a virada do dia, sem consultar nada a cada quadro. O State organiza inimigos e moradores em máquinas de estados. E o Strategy deixa trocar a técnica de geração da mina sem mexer no resto. Itens, culturas e receitas são ScriptableObjects, arquivos de dados da Unity: um item novo é criado no editor, sem escrever código.",
    },
    {
      id: "ga-tecnico-3",
      type: "paragraph",
      text: "O defeito mais instrutivo do projeto envolveu a mira das ferramentas. O plantio era recusado mesmo com a personagem de frente para um bloco arado. A causa era sutil: o Tilemap estava configurado com a âncora das peças em um canto, e não no centro, e o código do plantio convertia a coordenada da célula em posição no mundo e depois de volta em célula. O deslocamento de meio bloco fazia essa ida e volta cair na célula vizinha. A correção foi transportar a coordenada da célula diretamente entre os componentes e usar a posição de mundo só para desenhar — uma lição que vale para qualquer jogo em grade: a posição lógica e a posição de desenho são coisas diferentes.",
    },
    {
      id: "ga-image-interface",
      type: "image",
      url: `${pasta}/interface.jpg`,
      alt: "Tela de jogo com barras de vida, estamina e cultivo no canto superior esquerdo, relógio no canto superior direito e barra rápida de itens na base",
      caption: "Interface durante a partida: vida, estamina e cultivo à esquerda, relógio e Pedras Espirituais à direita, barra rápida na base. Imagem: elaboração própria.",
    },
    { id: "ga-heading-podcast", type: "heading", text: "Ouça: como é desenvolver jogos" },
    {
      id: "ga-podcast-context",
      type: "paragraph",
      text: "Grande parte do que aprendemos no projeto não está em nenhum sistema específico, e sim no processo: cortar escopo, testar cedo, manter a arte coerente, decidir o que fica para depois. O episódio abaixo conversa justamente sobre o desenvolvimento de jogos como profissão — motores, linguagens, equipes, mercado brasileiro e o caminho de quem quer começar.",
    },
    {
      id: "ga-podcast",
      type: "audio",
      title: "Hipsters Ponto Tech #438 — Desenvolvimento de Jogos",
      url: "https://media.blubrry.com/hipsterstech/content.blubrry.com/hipsterstech/HpT-438-desenvolvimento-de-jogos-gamedev.mp3",
      caption: "Episódio em áudio do podcast Hipsters Ponto Tech (2024) sobre carreira e processo no desenvolvimento de jogos. Fonte: feed público do programa.",
    },
    { id: "ga-heading-futuro", type: "heading", text: "O que já funciona e o que vem a seguir" },
    {
      id: "ga-futuro-1",
      type: "paragraph",
      text: "O protótipo já permite uma sessão contínua: preparar a terra, plantar, regar e colher; atravessar fazenda, vila, floresta e mina; enfrentar os monstros dos cem andares; meditar, refinar pílulas e romper os cinco reinos do Houtian oferecendo minérios e plantas; conversar com os moradores, vender na loja, organizar a casa e salvar ao dormir. Os defeitos críticos encontrados ao longo do desenvolvimento — os que impediam o avanço ou fechavam o jogo — foram todos corrigidos.",
    },
    {
      id: "ga-futuro-2",
      type: "paragraph",
      text: "A versão 1.0 planejada é bem maior do que cabe no prazo de um Trabalho de Graduação, e por isso o escopo foi dividido. Ficam para as próximas etapas o ferreiro, que melhora ferramentas ao longo de alguns dias; a tribulação celestial, um evento jogável de sobrevivência a relâmpagos que marca a passagem do Houtian para o Xiantian; os reinos seguintes e uma segunda mina; o ranking de alquimista e as Chamas Celestiais; o treino na escola; a trilha sonora e os efeitos sonoros; e testes de jogabilidade com pessoas de fora da equipe. Para a versão comercial, estão previstas localização em português e inglês e recursos de acessibilidade.",
    },
    {
      id: "ga-futuro-3",
      type: "paragraph",
      text: "A divisão de trabalho acompanhou o projeto desde o início: Pedro Domiciano responde pela arquitetura, pela jogabilidade, pelo combate, pela progressão de cultivo e pela geração procedural; Diogo Teodoro, pelo level design, pelos mapas e zonas da mina e pela programação das interfaces. Cada sistema tem um responsável direto, e o código e a arte passam por revisão conjunta.",
    },
    { id: "ga-heading-serie", type: "heading", text: "Um jogo como multimídia e hipermídia" },
    {
      id: "ga-serie-1",
      type: "paragraph",
      text: "Olhando pelos conceitos da série, um jogo é talvez a forma mais completa de multimídia: combina imagem, animação, texto, som e interação em uma experiência única, e cada elemento precisa trabalhar a favor dos outros. É também hipermídia em estado puro — não há uma ordem fixa de leitura, e o percurso de cada jogador é construído por suas escolhas: plantar hoje ou descer à mina, romper o reino agora ou esperar pelos materiais supremos.",
    },
    {
      id: "ga-serie-2",
      type: "paragraph",
      text: "A diferença em relação a um site ou a um vídeo é que, no jogo, o sistema responde. A planta que não foi regada não cresce, o caldeirão mal cuidado explode, o guardião que não foi estudado vence. Projetar um jogo é projetar essas respostas para que, juntas, contem uma história que o jogador sente que é dele.",
    },
    { id: "ga-heading-conclusao", type: "heading", text: "Para fechar" },
    {
      id: "ga-conclusao",
      type: "paragraph",
      text: "O Grandmaster Alchemist nasceu de uma pergunta simples: e se o poder de uma cultivadora viesse da terra, e não do talento? Responder a ela exigiu juntar simulação de fazenda, alquimia, combate e exploração em um mesmo ciclo, de modo que nenhum sistema fizesse sentido sozinho. O protótipo mostra que essa integração funciona; os próximos meses dirão até onde ela vai. A próxima publicação desce à mina e mostra como cem andares podem existir sem que ninguém tenha desenhado nenhum deles.",
    },
    { id: "ga-heading-links", type: "heading", text: "Links para continuar" },
    {
      id: "ga-link-mina",
      type: "link",
      title: "Próxima leitura: a mina de cem andares que ninguém desenhou",
      url: "/publicacoes/mina-de-cem-andares-geracao-procedural",
      caption: "Como funciona e como foi testado o gerador procedural do Grandmaster Alchemist.",
    },
    {
      id: "ga-link-hipermidia",
      type: "link",
      title: "Revisite o conceito de hipermídia",
      url: "/publicacoes/hipermidia-conteudo-em-rede",
      caption: "Percursos escolhidos por quem navega — ou por quem joga.",
    },
    {
      id: "ga-link-patterns",
      type: "link",
      title: "Game Programming Patterns — Robert Nystrom",
      url: "https://gameprogrammingpatterns.com/",
      caption: "Livro gratuito on-line com os padrões Singleton, Observer, State e outros usados no projeto.",
    },
    { id: "ga-heading-references", type: "heading", text: "Fontes e referências" },
    {
      id: "ga-ref-1",
      type: "link",
      title: "Hunicke, LeBlanc e Zubek — MDA: a formal approach to game design and game research (2004)",
      url: "https://users.cs.northwestern.edu/~hunicke/MDA.pdf",
      caption: "Artigo que define o modelo de mecânicas, dinâmicas e estéticas usado no projeto.",
    },
    {
      id: "ga-ref-2",
      type: "link",
      title: "Aguiar e Carvalho — A representação do museu de ciência em Stardew Valley (SBGames 2023)",
      url: "https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/27827",
      caption: "Fonte dos dados de vendas e da análise do ciclo de jogo de Stardew Valley.",
    },
    {
      id: "ga-ref-3",
      type: "link",
      title: "Booth e Zhang — Ironizing the martial protagonist: Jin Yong and the web novelists (2025)",
      url: "https://doi.org/10.1057/s41599-024-04256-y",
      caption: "Estudo sobre o xianxia, a cultivação e o alcance da literatura online chinesa.",
    },
    {
      id: "ga-ref-4",
      type: "link",
      title: "Stardew Valley — site oficial",
      url: "https://www.stardewvalley.net/",
      caption: "Jogo de Eric Barone (ConcernedApe), principal referência do gênero.",
    },
    {
      id: "ga-ref-5",
      type: "link",
      title: "Nine Star Hegemon Body Art — Wuxiaworld",
      url: "https://www.wuxiaworld.com/novel/nine-star-hegemon",
      caption: "Romance que inspira a sequência de reinos e a união entre corpo e alquimia.",
    },
    {
      id: "ga-ref-6",
      type: "link",
      title: "Battle Through the Heavens — Wuxiaworld",
      url: "https://www.wuxiaworld.com/novel/battle-through-the-heavens",
      caption: "Romance que inspira o papel da chama no refino de pílulas.",
    },
    {
      id: "ga-ref-7",
      type: "link",
      title: "Unity Manual",
      url: "https://docs.unity3d.com/Manual/index.html",
      caption: "Documentação do motor, de Tilemaps, ScriptableObjects e iluminação 2D.",
    },
    {
      id: "ga-ref-8",
      type: "link",
      title: "Hipsters Ponto Tech #438 — Desenvolvimento de Jogos",
      url: "https://www.hipsters.tech/desenvolvimento-de-jogos-hipsters-ponto-tech-438/",
      caption: "Página oficial do episódio de podcast incorporado nesta matéria.",
    },
    {
      id: "ga-ref-9",
      type: "paragraph",
      text: "Bibliografia de apoio: SCHELL, Jesse. A arte de game design: o livro original. Rio de Janeiro: Elsevier, 2011. SALEN, Katie; ZIMMERMAN, Eric. Regras do jogo: fundamentos do design de jogos. São Paulo: Blucher, 2012. MILLINGTON, Ian. AI for games. 3. ed. Boca Raton: CRC Press, 2019. NYSTROM, Robert. Game programming patterns. Genever Benning, 2014. As imagens do jogo são capturas do protótipo, de elaboração própria.",
    },
  ],
};
