# Comece aqui

O blog não usa banco de dados. Depois da configuração inicial, você faz todas as publicações pelo botão **Nova publicação** dentro de `/admin`.

## Para colocar no ar

1. Suba o projeto no GitHub.
2. Importe o repositório na Vercel.
3. No projeto da Vercel, abra **Storage > Create Database > Blob**.
4. Crie um Blob com acesso **Public** e conecte ao projeto.
5. Em **Settings > Environment Variables**, crie:

```env
ADMIN_PASSWORD=SUA-SENHA-FORTE
NEXT_PUBLIC_SITE_URL=https://SEU-SITE.vercel.app
```

6. Faça o deploy/redeploy.
7. Entre em `https://SEU-SITE.vercel.app/admin`.
8. Digite a senha e clique em **Nova publicação**.

Pronto. Títulos, textos, imagens, rascunhos e publicações ficam salvos no Vercel Blob e não exigem novo deploy.

## Para testar localmente

Copie `.env.example` para `.env.local`, coloque sua senha e execute:

```bash
npm install
npm run dev
```

Se o Blob não estiver autenticado no ambiente local, preencha `BLOB_READ_WRITE_TOKEN` no `.env.local` ou use a Vercel CLI para puxar as variáveis do projeto.

Leia `README.md` para os detalhes completos.
