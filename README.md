# Pulso Digital

Blog acadêmico com painel de publicação para Pedro Domiciano e Diogo Teodoro. O site foi pensado para ser publicado na Vercel e administrado pelo próprio navegador, sem banco de dados.

## Como os dados são salvos

O projeto usa apenas **Next.js + Vercel Blob**:

- cada publicação é salva como um pequeno arquivo JSON no Blob;
- capas e imagens são enviadas para o Blob;
- rascunhos também ficam no Blob e só aparecem no painel;
- mensagens da página Contato são criptografadas no servidor antes de serem armazenadas;
- a senha do painel fica somente na variável `ADMIN_PASSWORD` da Vercel;
- o login cria um cookie HttpOnly assinado, sem expor a senha para o JavaScript do navegador.

Não há Supabase, PostgreSQL, SQL, migrations ou cadastro de usuários.

## O que já vem pronto

- Página inicial moderna e responsiva
- Estado inicial sem publicações
- Publicação em destaque
- Publicações recentes
- Busca por título, resumo, categoria e tags
- Filtro por categorias
- Página individual de cada matéria
- Data, autor e tempo estimado de leitura
- Tags e compartilhamento
- Modo claro/escuro
- Página Sobre
- Página Contato com formulário funcional
- Painel `/admin` protegido por senha
- Criar, editar, excluir, salvar rascunho e publicar matérias
- Upload de capa e imagens
- Editor por blocos: texto, subtítulo, imagem, vídeo/YouTube, código, citação e embed
- Mensagens da página Contato visíveis no painel
- SEO básico, Open Graph e sitemap

## 1. Criar o Blob na Vercel

Depois de importar o projeto para a Vercel:

1. Abra o projeto na Vercel.
2. Entre em **Storage**.
3. Clique em **Create Database**.
4. Escolha **Blob**.
5. Selecione acesso **Public**.
6. Conecte o Blob ao projeto.

O projeto usa um único Blob público para as publicações e imagens. As mensagens de contato são criptografadas antes de serem gravadas nele.

## 2. Configurar as variáveis

Na Vercel, em **Settings > Environment Variables**, adicione:

```env
ADMIN_PASSWORD=SUA-SENHA-FORTE
NEXT_PUBLIC_SITE_URL=https://SEU-SITE.vercel.app
```

Use pelo menos 8 caracteres em `ADMIN_PASSWORD`.

Em deploys executados dentro da Vercel, versões atuais do Vercel Blob podem autenticar as operações do servidor usando a integração/OIDC do projeto. Para desenvolvimento local, se necessário, use `BLOB_READ_WRITE_TOKEN` (o `.env.example` já tem o campo) ou puxe as variáveis do projeto com a Vercel CLI.

## 3. Rodar no computador

Tenha Node.js instalado e execute:

```bash
npm install
npm run dev
```

Abra:

```text
http://localhost:3000
```

O painel fica em:

```text
http://localhost:3000/admin
```

Para o painel funcionar localmente, crie `.env.local` a partir de `.env.example`. Se o Blob local não autenticar automaticamente, preencha também `BLOB_READ_WRITE_TOKEN`.

## 4. Publicar na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel, escolha **Add New > Project** e importe o repositório.
3. Crie/conecte o Blob conforme a seção 1.
4. Cadastre `ADMIN_PASSWORD` e `NEXT_PUBLIC_SITE_URL`.
5. Faça um novo deploy caso tenha criado as variáveis depois do primeiro deploy.
6. Acesse `https://seu-site.vercel.app/admin`.

Depois disso, você não precisa fazer novos deploys para publicar matérias. Basta usar o painel.

## Como publicar uma matéria

1. Entre em `/admin`.
2. Digite a senha configurada em `ADMIN_PASSWORD`.
3. Clique em **Nova publicação**.
4. Preencha título, resumo, categoria e tags.
5. Envie uma capa, se quiser.
6. Clique nos tipos de bloco para montar a matéria.
7. Reordene os blocos usando as setas.
8. Use **Salvar rascunho** ou **Publicar agora**.
9. Para editar depois, volte ao painel e clique no ícone de lápis.

## Imagens

O editor aceita upload de imagens de até **4 MB** por arquivo. Esse limite mantém o upload simples pelo servidor da Vercel. Também é possível colar uma URL de imagem diretamente no editor.

## Estrutura dos arquivos salvos

No Blob, o projeto cria caminhos semelhantes a:

```text
pulso/posts/<id-da-publicacao>/<versao>.json
pulso/images/<imagem>
pulso/contact/<mensagem-criptografada>.json
```

Ao editar uma publicação, uma nova versão é gravada e as versões anteriores são removidas.

## Personalização rápida

As informações principais ficam em:

```text
src/lib/site.ts
```

É ali que você troca o nome do blog, descrição, autor, curso, instituição e cidade.

O visual global está em:

```text
src/app/globals.css
```

## Segurança do painel

A senha nunca é enviada para componentes públicos do site. Ela é comparada no servidor e, após o login, o navegador recebe um cookie HttpOnly assinado com validade de 7 dias. Todas as APIs que criam, editam, excluem ou enviam imagens verificam esse cookie novamente.

Se você trocar `ADMIN_PASSWORD`, sessões antigas deixam de ser válidas automaticamente. Como a mesma senha também protege a criptografia das mensagens de contato, mensagens antigas ficam ilegíveis após a troca; se isso importar, copie-as antes de alterar a senha.

## Observação sobre embeds

Alguns sites bloqueiam exibição dentro de `iframe`. Quando isso acontecer, o bloco de embed ainda pode oferecer um link para abrir o conteúdo diretamente.
