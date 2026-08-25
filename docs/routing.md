# Rotas e navegação

O app usa `BrowserRouter` e `Routes` do React Router DOM. A composição está em
[`src/routes/index.tsx`](../src/routes/index.tsx).

## Rotas públicas

- `/auth/login`: login por e-mail e senha;
- `/auth/create-user`: cadastro;
- `/demo`: cria uma conta temporária, inicia a sessão e redireciona para o resumo;
- `/`: redireciona para `/summary` se autenticado ou `/auth/login` caso
  contrário.

## Rotas privadas

- `/summary`: metas pendentes, progresso, conclusões e cadastro de meta;
- `/user/profile`: consulta o perfil atual;
- `/auth/logout`: executa o fluxo de logout.

`AuthenticatedRoute` impede acesso às rotas privadas sem sessão. A
`NotAuthenticatedRoute` impede que uma sessão ativa volte às telas de login ou
cadastro.

O `vercel.json` reescreve qualquer caminho para `index.html`, permitindo que o
Vite SPA seja servido diretamente em rotas internas.
