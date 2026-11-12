import { siteConfig } from "@/lib/site";
import type { Post } from "@/types/post";

const pasta = "/posts/grandmaster-alchemist";

export const postMinaProcedural: Post = {
  id: "base-mina-procedural",
  title: "Uma mina de cem andares que ninguém desenhou: geração procedural no Grandmaster Alchemist",
  slug: "mina-de-cem-andares-geracao-procedural",
  excerpt:
    "Como dois desenvolvedores produzem cem andares de masmorra sem desenhar nenhum: seeds, autômatos celulares, BSP, uma técnica híbrida, a verificação por busca em largura e os resultados de cinco mil gerações automatizadas.",
  category: "Jogos Digitais",
  tags: ["Grandmaster Alchemist", "geração procedural", "algoritmos", "Unity", "C#", "trabalho de graduação"],
  cover_url: `${pasta}/andar-50-quatro-tecnicas.jpg`,
  status: "published",
  featured: false,
  author: siteConfig.author,
  reading_time: 16,
  published_at: "2026-11-12T15:00:00.000Z",
  created_at: "2026-11-12T15:00:00.000Z",
  updated_at: "2026-11-12T15:00:00.000Z",
  content: [
    {
      id: "pcg-intro",
      type: "paragraph",
      text: "Toda vez que a personagem do Grandmaster Alchemist desce uma escada na mina, um andar novo passa a existir. Ele não estava guardado em lugar nenhum: as paredes, os túneis, os minérios, os baús e os monstros são calculados naquele instante, em cerca de onze milésimos de segundo. Se ela sair e voltar, o andar será outro. São cem andares que ninguém desenhou à mão — e, mesmo assim, nenhum deles pode prender o jogador em um beco sem saída nem esconder a escada de descida atrás de uma parede.",
    },
    {
      id: "pcg-intro-2",
      type: "paragraph",
      text: "Esta publicação continua a apresentação do jogo que desenvolvemos como Trabalho de Graduação e entra na parte que é o núcleo da pesquisa: o gerador procedural da mina. Vamos ver por que gerar em vez de desenhar, como uma seed transforma acaso em algo reproduzível, quatro técnicas de geração lado a lado, como verificamos cada andar e o que mostraram os testes automatizados com milhares de andares.",
    },
    { id: "pcg-heading-por-que", type: "heading", text: "Por que gerar em vez de desenhar" },
    {
      id: "pcg-por-que-1",
      type: "paragraph",
      text: "Geração procedural de conteúdo é a criação de conteúdo de jogo — mapas, fases, itens, missões — por algoritmo, com pouca ou nenhuma intervenção humana direta. A definição é de Noor Shaker, Julian Togelius e Mark Nelson, no livro de referência da área. As vantagens são diretas: menos trabalho manual, mais conteúdo do que uma equipe conseguiria produzir e rejogabilidade, porque cada partida é diferente da anterior.",
    },
    {
      id: "pcg-por-que-2",
      type: "paragraph",
      text: "Para uma equipe de duas pessoas, cem andares desenhados à mão seriam inviáveis dentro do prazo de um Trabalho de Graduação. Mas o motivo não é só economia. A mina é o lado arriscado do ciclo do jogo, o lugar para onde se volta várias vezes atrás de minérios e materiais; se cada visita fosse igual à anterior, o jogador decoraria o caminho e a exploração viraria tarefa. Um andar novo a cada entrada mantém a tensão de não saber o que há na próxima curva.",
    },
    {
      id: "pcg-por-que-3",
      type: "paragraph",
      text: "A ideia é antiga nos jogos. Rogue, de 1980, gerava masmorras em texto a cada partida e deu nome a todo um gênero. Diablo, em 1996, levou as masmorras aleatórias ao grande público. Spelunky, Minecraft e No Man's Sky mostraram, cada um a seu modo, que o algoritmo pode produzir de fases curtas e desafiadoras a mundos praticamente infinitos. O desafio, em todos eles, é o mesmo: o acaso precisa ser controlado o bastante para que o resultado seja sempre jogável.",
    },
    {
      id: "pcg-video-1",
      type: "video",
      url: "https://www.youtube.com/watch?v=5UvjeLkk9_g",
      caption: "Como os mundos de jogos são criados — introdução à geração procedural do canal Aspect Pedro.",
    },
    { id: "pcg-heading-seed", type: "heading", text: "A seed: acaso que se repete" },
    {
      id: "pcg-seed-1",
      type: "paragraph",
      text: "Computadores não sorteiam números de verdade: eles usam geradores pseudoaleatórios, fórmulas que produzem sequências que parecem aleatórias a partir de um número inicial, a seed, ou semente. A mesma seed produz sempre a mesma sequência e, portanto, o mesmo mapa. Isso tem duas consequências práticas. Para depurar, basta anotar a seed de um andar com problema e gerá-lo de novo quantas vezes for preciso. E para testar, é possível gerar mil andares diferentes simplesmente usando mil seeds diferentes.",
    },
    {
      id: "pcg-seed-2",
      type: "paragraph",
      text: "No jogo, cada entrada em um andar usa uma seed nova, e por isso o mapa muda a cada visita. O que fica salvo no arquivo da mina é só o progresso do jogador: o andar mais fundo alcançado, os checkpoints liberados a cada cinco andares e os guardiões já vencidos. Não é preciso guardar mapas — basta saber até onde a personagem chegou.",
    },
    { id: "pcg-heading-strategy", type: "heading", text: "Quatro técnicas atrás da mesma porta" },
    {
      id: "pcg-strategy-1",
      type: "paragraph",
      text: "Para comparar técnicas de forma justa, separamos o gerador em duas partes. A primeira, que muda de técnica para técnica, decide apenas quais células da grade viram chão. A segunda é comum a todas: escolher entrada e saída, validar o andar e posicionar minérios, inimigos e baús. Isso é o padrão de projeto Strategy: algoritmos intercambiáveis atrás de uma mesma interface. Trocar a técnica é trocar uma linha de código, e as diferenças medidas nos testes vêm só da escavação.",
    },
    {
      id: "pcg-codigo-interface",
      type: "code",
      language: "csharp",
      text: `// Strategy: cada técnica de geração só decide quais células viram chão.
// Entrada, saída, validação e posicionamento de elementos são comuns a todas,
// o que deixa a comparação entre técnicas justa.
public interface IGeradorMasmorra
{
    string Nome { get; }
    void Escavar(MapaMasmorra mapa, System.Random rng, ParametrosAndar p);
}

// Técnica escolhida para o jogo (ver comparação nos testes).
public static IGeradorMasmorra Padrao()
{
    return new GeradorHibrido();
}`,
    },
    {
      id: "pcg-strategy-2",
      type: "paragraph",
      text: "A caminhada aleatória é a mais simples: um escavador parte do centro da grade e anda em direções sorteadas, abrindo chão por onde passa, até atingir a área desejada. Tudo o que ele escava está conectado por construção, já que é o mesmo caminho. O resultado tende a ser uma mancha central com galerias curtas.",
    },
    {
      id: "pcg-strategy-3",
      type: "paragraph",
      text: "O particionamento binário do espaço, conhecido pela sigla BSP, divide a área ao meio repetidamente, ora na vertical, ora na horizontal, até que os pedaços fiquem pequenos. Cada pedaço final recebe uma sala retangular, e as salas irmãs são ligadas por corredores. A conectividade também é garantida, mas o resultado é regular: parece um prédio, não uma caverna.",
    },
    {
      id: "pcg-strategy-4",
      type: "paragraph",
      text: "O autômato celular começa com ruído: cada célula vira rocha com uma certa probabilidade, perto de 45%. Depois, aplica várias vezes uma regra local: uma célula vira rocha se ela e suas oito vizinhas somam cinco ou mais rochas, e vira chão caso contrário. A cada passada, o ruído se organiza em formas orgânicas, com paredes arredondadas e salões irregulares — exatamente o aspecto de uma caverna natural. A técnica foi avaliada por Johnson, Yannakakis e Togelius para gerar cavernas infinitas em tempo real.",
    },
    {
      id: "pcg-codigo-automato",
      type: "code",
      language: "csharp",
      text: `// Autômato celular (trecho simplificado de GeradoresMasmorra.cs)
// 1. ruído inicial: cada célula vira rocha com probabilidade chanceRocha
for (int x = 1; x < largura - 1; x++)
    for (int y = 1; y < altura - 1; y++)
        mapa.Chao[x, y] = rng.NextDouble() >= chanceRocha;

// 2. seis passadas da regra de vizinhança
var novo = new bool[largura, altura];
for (int iteracao = 0; iteracao < 6; iteracao++)
{
    for (int x = 1; x < largura - 1; x++)
        for (int y = 1; y < altura - 1; y++)
        {
            // rochas entre as 8 vizinhas, mais a própria célula
            int paredes = mapa.ParedesVizinhas8(x, y) + (mapa.Chao[x, y] ? 0 : 1);
            novo[x, y] = paredes < 5;   // 5 ou mais rochas: vira rocha
        }

    for (int x = 1; x < largura - 1; x++)
        for (int y = 1; y < altura - 1; y++)
            mapa.Chao[x, y] = novo[x, y];
}`,
    },
    {
      id: "pcg-strategy-5",
      type: "paragraph",
      text: "O problema do autômato é que nada na regra garante conectividade. Ele pode produzir bolsões de chão cercados de rocha por todos os lados — e, se a saída cair em um deles, o andar é impossível. A quarta técnica, a híbrida, resolve isso. Ela parte do autômato celular, elimina os bolsões com menos de 30 células, que não valem um túnel, liga cada região restante à principal por um túnel entre os pontos mais próximos e, por fim, alarga qualquer passagem com menos de três células de largura, para que a personagem e os monstros possam lutar e desviar nelas.",
    },
    {
      id: "pcg-video-2",
      type: "video",
      url: "https://www.youtube.com/watch?v=v7yyZZjF1z4",
      caption: "Procedural Cave Generation, episódio 1: autômatos celulares na Unity — tutorial em inglês de Sebastian Lague, com legendas disponíveis.",
    },
    { id: "pcg-heading-validacao", type: "heading", text: "Gerar e testar: a busca em largura" },
    {
      id: "pcg-validacao-1",
      type: "paragraph",
      text: "Shaker, Togelius e Nelson distinguem dois tipos de gerador. Os construtivos produzem o resultado em uma única passagem e confiam no próprio algoritmo. Os do tipo gerar e testar produzem um candidato, verificam se ele atende a critérios de validade e, se não atender, descartam e tentam de novo. Usamos as duas ideias: as técnicas escavam, e uma etapa comum verifica cada andar antes de entregá-lo ao jogo.",
    },
    {
      id: "pcg-validacao-2",
      type: "paragraph",
      text: "A verificação usa a busca em largura, um algoritmo clássico de grafos. Partindo de uma célula, ela visita todas as vizinhas, depois as vizinhas das vizinhas, e assim por diante, como uma onda que se espalha pelo chão. Repetida a partir de cada célula ainda não visitada, ela identifica as regiões conectadas do mapa; partindo da entrada, mede em quantos passos se chega à saída pelo caminho mais curto. Um andar só é aceito se três condições forem atendidas ao mesmo tempo.",
    },
    {
      id: "pcg-validacao-3",
      type: "paragraph",
      text: "Pelo menos 25% da grade precisa ser chão, para que o andar não seja um corredor apertado. A maior região conectada precisa reunir pelo menos 95% de todo o chão, para que quase nada fique isolado. E a distância entre entrada e saída precisa alcançar 60% da maior dimensão da grade, para que a escada de descida não fique ao lado da chegada. Se o andar falhar, uma nova tentativa é feita com uma seed derivada da original, até o limite de 30 tentativas.",
    },
    {
      id: "pcg-validacao-4",
      type: "paragraph",
      text: "Validade não é o mesmo que qualidade, e por isso medimos também a conformidade ao level design, isto é, ao que o andar precisa ter para ser bom de jogar: ao menos uma área aberta de 5 por 5 células para combate, bifurcações no caminho, para haver escolha, e nenhuma passagem de largura única entre a entrada e a saída, onde a personagem ficaria encurralada sem espaço para esquivar.",
    },
    { id: "pcg-heading-experimento", type: "heading", text: "O experimento: mil andares por técnica" },
    {
      id: "pcg-experimento-1",
      type: "paragraph",
      text: "Para comparar as técnicas, uma rotina automatizada no editor da Unity gerou mil andares com cada uma, todos com seeds distintas e na profundidade fixa do andar 50, em uma grade de 96 por 69 células. Para cada andar, a rotina registrou se ele foi válido na primeira tentativa, quantas tentativas foram necessárias, o tempo de geração, a área escavada, a distância entre entrada e saída, os becos sem saída e a conformidade ao level design. Os testes rodaram em um computador com processador AMD Ryzen 5 4500, 32 GB de memória e Windows 11, em uma única thread.",
    },
    {
      id: "pcg-tabela",
      type: "code",
      language: "text",
      text: `Andar 50, grade 96 x 69, 1.000 andares por técnica

Técnica              Válidos 1ª  Tentativas   Tempo médio  Área     Entrada-saída  Becos   Conformes
                     tentativa   (méd/máx)    (ms)         (cél.)   (passos)       (méd.)
-------------------  ----------  -----------  -----------  -------  -------------  ------  ---------
Caminhada aleatória  100,0%      1,00 / 1      3,44        2.517    121,8          30,3    100,0%
Autômato celular      83,6%      1,20 / 5     10,93        3.689    159,8          82,2     77,7%
BSP                  100,0%      1,00 / 1      3,07        2.837    208,1          41,3    100,0%
Híbrido (adotado)    100,0%      1,00 / 1     11,45        4.409    151,1          70,8    100,0%

Todas as técnicas terminaram com 100% de andares válidos após as novas tentativas.`,
    },
    {
      id: "pcg-image-tecnicas",
      type: "image",
      url: `${pasta}/andar-50-quatro-tecnicas.jpg`,
      alt: "Quatro mapas de andar lado a lado: acima, caminhada aleatória e autômato celular; abaixo, BSP com salas retangulares e o híbrido com cavernas amplas",
      caption:
        "O andar 50 gerado por cada técnica: caminhada aleatória e autômato celular (acima), BSP e híbrido (abaixo). Entrada em azul, saída em vermelho, minérios em verde, luzes em amarelo, inimigos em roxo e baús em laranja. Imagem: elaboração própria.",
    },
    { id: "pcg-heading-resultados", type: "heading", text: "O que os números mostram" },
    {
      id: "pcg-resultados-1",
      type: "paragraph",
      text: "Todas as técnicas chegaram a 100% de andares válidos, mas por caminhos diferentes. O autômato celular puro falhou na primeira tentativa em 16,4% dos casos — exatamente o risco de regiões isoladas que a literatura aponta —, precisou de até cinco tentativas e teve só 77,7% de andares conformes, porque deixou passagens estreitas demais no caminho. Ou seja, ele produz as cavernas mais bonitas, mas não as mais jogáveis.",
    },
    {
      id: "pcg-resultados-2",
      type: "paragraph",
      text: "A caminhada aleatória e o BSP foram os mais rápidos, com cerca de 3 milissegundos, e sempre válidos. O custo apareceu na forma: escavaram menos área e abriram menos galerias, com 30,3 e 41,3 becos sem saída em média. Becos, aqui, não são defeito: são os cantos onde ficam baús e minérios e que tornam a exploração interessante. O BSP, além disso, produz a planta regular de salas e corredores que destoa de uma mina natural.",
    },
    {
      id: "pcg-resultados-3",
      type: "paragraph",
      text: "A técnica híbrida reuniu o melhor dos dois lados: validade de 100% já na primeira tentativa, conformidade de 100%, a maior área escavada e uma quantidade de galerias próxima à do autômato. Seu custo foi o maior tempo médio, 11,45 milissegundos — ainda assim muito baixo para uma geração feita durante a transição entre andares, quando a tela já está escurecendo. Por esses resultados, o híbrido é a técnica usada no jogo.",
    },
    { id: "pcg-heading-validacao-final", type: "heading", text: "Do andar 1 ao andar 100" },
    {
      id: "pcg-final-1",
      type: "paragraph",
      text: "A comparação usou uma profundidade fixa, mas no jogo os andares crescem: a grade vai de 72 por 54 células no andar 1 a 120 por 84 no andar 100, e as quantidades acompanham — de 12 a 37 minérios, de 5 a 20 inimigos, de 1 a 5 baús. Para validar o gerador em todas essas configurações, a técnica híbrida gerou outros mil andares, com dez seeds para cada profundidade de 1 a 100.",
    },
    {
      id: "pcg-final-2",
      type: "paragraph",
      text: "Todos os mil foram válidos na primeira tentativa e conformes ao level design, sem nenhuma seed inválida. O tempo médio foi de 11,43 milissegundos, com mínimo de 5,91 e máximo de 29,90. Mesmo o pior caso equivale a menos de dois quadros de um jogo rodando a 60 quadros por segundo — nenhuma interrupção perceptível. Somando a comparação e a validação final, a técnica adotada passou por 2.000 gerações sem precisar de uma única segunda tentativa.",
    },
    {
      id: "pcg-tabela-2",
      type: "code",
      language: "text",
      text: `Técnica híbrida por profundidade (10 seeds por andar)

Andar   Grade      Minérios  Inimigos  Baús   Tempo médio
-----   --------   --------  --------  ----   -----------
1       72 x 54    12        5         1       6,49 ms
50      96 x 69    24        15        3      12,13 ms
100     120 x 84   37        20        5      17,27 ms`,
    },
    {
      id: "pcg-image-andares",
      type: "image",
      url: `${pasta}/andares-1-50-100.jpg`,
      alt: "Três mapas gerados pela técnica híbrida, cada vez maiores e com mais elementos, para os andares 1, 50 e 100",
      caption: "Andares 1, 50 e 100 gerados pela técnica híbrida: a grade e a quantidade de elementos crescem com a profundidade. Imagem: elaboração própria.",
    },
    { id: "pcg-heading-alem", type: "heading", text: "O que o gerador não decide" },
    {
      id: "pcg-alem-1",
      type: "paragraph",
      text: "Nem tudo na mina é procedural, e essa é uma decisão de projeto. Os andares múltiplos de dez são substituídos por arenas de tamanho fixo, desenhadas para as lutas contra chefes e guardiões: corredor de entrada, área redonda com quatro pilares e, ao norte, a sala do selo de descida, que só abre depois da vitória. Um chefe precisa de um palco previsível, em que o jogador possa aprender os padrões de ataque; uma caverna sorteada atrapalharia justamente essa leitura.",
    },
    {
      id: "pcg-alem-2",
      type: "paragraph",
      text: "Outras camadas são aplicadas por cima do mapa gerado, sem mexer no algoritmo testado. O bioma de cada faixa de vinte andares troca a paleta das peças, as luzes e os enfeites — cristais, lava, poças tóxicas, constelações —, e acrescenta perigos próprios. Os minérios mudam a cada faixa e nunca se repetem entre elas. Nos andares mais profundos, salas seladas por obsidiana são esculpidas depois da geração e só abrem com uma picareta de nível alto. E a força dos inimigos cresce com a profundidade: a vida aumenta 12% e o dano 8% a cada andar.",
    },
    {
      id: "pcg-image-chefes",
      type: "image",
      url: `${pasta}/chefes-da-mina.png`,
      alt: "Folha com os chefes dos andares 10, 30, 50, 70 e 90 em pixel art",
      caption: "Os chefes das arenas dos andares 10, 30, 50, 70 e 90: as lutas importantes acontecem em palcos fixos, não em mapas sorteados. Imagem: elaboração própria.",
    },
    { id: "pcg-heading-podcast", type: "heading", text: "Ouça: o ecossistema dos jogos independentes" },
    {
      id: "pcg-podcast-context",
      type: "paragraph",
      text: "Geração procedural é uma das ferramentas que permitem a equipes pequenas produzir jogos grandes, e não por acaso é tão comum no cenário independente. O episódio abaixo discute esse ecossistema: como estúdios pequenos se organizam, onde publicam, como financiam o desenvolvimento e quais escolhas técnicas e de escopo fazem diferença para chegar ao lançamento.",
    },
    {
      id: "pcg-podcast",
      type: "audio",
      title: "Hipsters Ponto Tech #315 — Ecossistema GameDev Indie",
      url: "https://media.blubrry.com/hipsterstech/content.blubrry.com/hipsterstech/hipsters_315_gamedev_indie.mp3",
      caption: "Episódio em áudio do podcast Hipsters Ponto Tech (2022) sobre o desenvolvimento de jogos independentes. Fonte: feed público do programa.",
    },
    { id: "pcg-heading-limites", type: "heading", text: "Os limites do que medimos" },
    {
      id: "pcg-limites-1",
      type: "paragraph",
      text: "Três limites precisam ficar claros. Primeiro, a rotina mede o gerador de andares comuns em todas as profundidades, inclusive nas múltiplas de dez, que no jogo viram arenas fixas; as arenas não entraram na amostra. Segundo, os tempos foram medidos no editor e cobrem a geração lógica do mapa, sem a montagem das peças gráficas e dos objetos na cena, que também tem custo. Terceiro, nenhum número da tabela mede diversão.",
    },
    {
      id: "pcg-limites-2",
      type: "paragraph",
      text: "Esse último ponto é o mais importante. Validade e conformidade garantem que o andar é jogável e segue as regras que definimos, mas não dizem se ele é interessante, se a distribuição de monstros é justa ou se o jogador sente vontade de descer mais um. Responder a isso exige testes com pessoas de fora da equipe, que estão entre os próximos passos do projeto. O gerador remove o pior caso; o bom caso ainda depende de design e de iteração.",
    },
    { id: "pcg-heading-serie", type: "heading", text: "A mina como hipermídia" },
    {
      id: "pcg-serie-1",
      type: "paragraph",
      text: "Há um paralelo direto com a publicação sobre hipermídia. Lá, o conteúdo é uma rede de nós ligados por links, e a liberdade de navegar exige que nenhum nó fique inalcançável — um link quebrado é um beco sem saída. Aqui, cada andar é um grafo de células ligadas por vizinhança, e a busca em largura é exatamente o mesmo algoritmo que um robô de busca usa para percorrer as páginas de um site. Verificar a mina é, no fundo, verificar se todos os links funcionam.",
    },
    {
      id: "pcg-serie-2",
      type: "paragraph",
      text: "E há uma diferença que vale notar. Na hipermídia, alguém escreve os nós e os links; na mina, o algoritmo escreve, e o papel humano passa a ser o de definir as regras e os critérios que separam um resultado aceitável de um inaceitável. É uma mudança de função que aparece cada vez mais em outras áreas — de quem produz cada peça para quem projeta o sistema que produz e o teste que o fiscaliza.",
    },
    { id: "pcg-heading-conclusao", type: "heading", text: "Para fechar" },
    {
      id: "pcg-conclusao",
      type: "paragraph",
      text: "Cem andares que ninguém desenhou só funcionam porque alguém desenhou com cuidado as regras que os produzem e os testes que os aprovam. A comparação mostrou que a técnica mais bonita não era a mais jogável e que a mais rápida não era a mais interessante; a híbrida venceu por combinar a forma orgânica do autômato com garantias de conectividade e largura, a um custo de poucos milissegundos. É esse equilíbrio entre acaso e controle que faz cada descida na mina ser nova sem nunca ser injusta.",
    },
    { id: "pcg-heading-links", type: "heading", text: "Links para continuar" },
    {
      id: "pcg-link-jogo",
      type: "link",
      title: "Leitura anterior: conheça o Grandmaster Alchemist",
      url: "/publicacoes/grandmaster-alchemist-fazenda-xianxia",
      caption: "A proposta, os sistemas, o visual e os bastidores do jogo.",
    },
    {
      id: "pcg-link-hipermidia",
      type: "link",
      title: "Revisite o conceito de hipermídia",
      url: "/publicacoes/hipermidia-conteudo-em-rede",
      caption: "Nós, links e percursos — a mesma estrutura de grafo que sustenta a mina.",
    },
    {
      id: "pcg-link-pcgbook",
      type: "link",
      title: "Procedural Content Generation in Games — livro de Shaker, Togelius e Nelson",
      url: "https://www.pcgbook.com/",
      caption: "Livro de referência da área, com os capítulos disponíveis gratuitamente on-line.",
    },
    { id: "pcg-heading-references", type: "heading", text: "Fontes e referências" },
    {
      id: "pcg-ref-1",
      type: "link",
      title: "Shaker, Togelius e Nelson — Procedural Content Generation in Games (2016)",
      url: "https://www.pcgbook.com/",
      caption: "Definição de geração procedural e distinção entre métodos construtivos e do tipo gerar e testar.",
    },
    {
      id: "pcg-ref-2",
      type: "link",
      title: "Johnson, Yannakakis e Togelius — Cellular automata for real-time generation of infinite cave levels (2010)",
      url: "https://doi.org/10.1145/1814256.1814266",
      caption: "Artigo que avalia autômatos celulares para gerar cavernas em tempo real.",
    },
    {
      id: "pcg-ref-3",
      type: "link",
      title: "Viana — Geração automática de níveis de masmorras com barreiras para jogos digitais (UFRN, 2019)",
      url: "https://repositorio.ufrn.br/handle/123456789/34188",
      caption: "Trabalho de conclusão de curso com critérios de validade e custo para geração de masmorras.",
    },
    {
      id: "pcg-ref-4",
      type: "link",
      title: "Costa e Knop — Geração procedural de conteúdo através de uma abordagem híbrida (SBGames 2020)",
      url: "https://www.sbgames.org/proceedings2020/WorkshopG2/209761.pdf",
      caption: "Abordagem híbrida entre autômatos celulares e heurísticas de busca em grade.",
    },
    {
      id: "pcg-ref-5",
      type: "link",
      title: "Robert Nystrom — Game Programming Patterns",
      url: "https://gameprogrammingpatterns.com/",
      caption: "Referência dos padrões de projeto usados na arquitetura, como o Strategy.",
    },
    {
      id: "pcg-ref-6",
      type: "link",
      title: "Hipsters Ponto Tech #315 — Ecossistema GameDev Indie",
      url: "https://www.hipsters.tech/ecossistema-gamedev-indie-hipsters-ponto-tech-315/",
      caption: "Página oficial do episódio de podcast incorporado nesta matéria.",
    },
    {
      id: "pcg-ref-7",
      type: "paragraph",
      text: "Os dados das tabelas vêm dos testes automatizados do próprio projeto, executados no editor da Unity e registrados no artigo do Trabalho de Graduação. As imagens dos mapas e dos chefes são de elaboração própria.",
    },
  ],
};
