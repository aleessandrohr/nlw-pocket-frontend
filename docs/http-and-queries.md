# HTTP e queries

## TanStack Query

[`src/main.tsx`](../src/main.tsx) cria um `QueryClient` sem configuração global
adicional. Cada tela define suas próprias `queryKey`, `queryFn` e opções como
`staleTime`.

Queries usadas atualmente incluem:

- `get-summary` para o resumo semanal;
- `get-pending-goals` para metas pendentes;
- `get-archived-goals` para metas arquivadas;
- `user` para o perfil.

## Mutations

As mutations são criadas nas telas ou componentes que apresentam o fluxo. Ao
concluir, criar, arquivar ou desarquivar uma meta, os componentes invalidam as
queries relacionadas para buscar os dados atualizados.

## Convenções

- Fetchers HTTP ficam em `src/http/<recurso>`.
- Componentes não devem montar URLs da API manualmente.
- Requisições protegidas devem usar a instância `api`, que adiciona CSRF e
  credenciais.
- Chamadas públicas de login e cadastro usam Axios com `withCredentials: true`.
- Erros são transformados pelos fetchers e apresentados por feedback visual da
  tela.
