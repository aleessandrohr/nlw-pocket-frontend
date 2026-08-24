# Autenticação e API

## Contexto de autenticação

[`src/contexts/auth.tsx`](../src/contexts/auth.tsx) mantém o usuário e o token
CSRF em memória. Ao iniciar, chama `GET /user/profile` e
`GET /auth/csrf-token`; se a sessão falhar, redireciona para o login.

O login e o cadastro recebem o usuário da API, obtêm o CSRF e atualizam o
contexto. O logout chama `POST /auth/logout`, limpa o estado local e retorna a
`/auth/login`.

## Cliente HTTP

[`src/services/api.ts`](../src/services/api.ts) cria o Axios com:

- `baseURL` em `VITE_BACKEND_URL`;
- `withCredentials: true`;
- header `X-CSRF-TOKEN` em mutations;
- interceptor que tenta renovar a sessão em respostas `401`.

O refresh chama primeiro o endpoint CSRF e depois
`POST /auth/refresh-token`. O token CSRF nunca é persistido em storage do
navegador.

## Organização dos fetchers

Os módulos de `src/http` não renderizam JSX nem controlam componentes. Eles
fazem as chamadas para os recursos de autenticação, metas, resumo e usuário.
As telas e hooks de query ficam em `src/routes` e `src/components`.

## Contrato com o backend

O backend aceita somente a origem configurada em `FRONTEND_URL` e exige
credenciais. Em desenvolvimento, o frontend usa `http://localhost:3000` como
API e roda em `http://localhost:3001`.
