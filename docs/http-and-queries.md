# HTTP e queries

## TanStack Query

[`src/main.tsx`](../src/main.tsx) cria um `QueryClient` sem configuração global
adicional. O [`WeekProvider`](../src/contexts/week.tsx) mantém o deslocamento
da semana selecionada (`0` para a atual e valores negativos para o histórico).
As chaves ficam centralizadas em [`src/lib/query-keys.ts`](../src/lib/query-keys.ts),
para que queries e invalidações compartilhem o mesmo contrato.

Queries usadas atualmente incluem:

- `get-summary` para o resumo semanal;
- `get-pending-goals` para metas pendentes;
- `get-archived-goals` para metas arquivadas;
- `user` para o perfil.

Resumo e metas pendentes usam `queryKeys.summary.byWeek(week)` e
`queryKeys.pendingGoals.byWeek(week)`. Ao invalidar todas as semanas, use as
chaves raiz `queryKeys.summary.all()` ou `queryKeys.pendingGoals.all()`.

## Mutations

As mutations são criadas nas telas ou componentes que apresentam o fluxo. Ao
concluir, criar, arquivar ou desarquivar uma meta, os componentes invalidam as
queries relacionadas para buscar os dados atualizados.

## Convenções

- Fetchers HTTP ficam em `src/http/<recurso>`.
- Fetchers semanais recebem `week` explicitamente e enviam o valor para a API;
  componentes obtêm esse valor com `useWeek()`.
- Não escreva arrays de `queryKey` diretamente nos componentes; adicione a
  chave à fábrica central antes de usar a nova query.
- Componentes não devem montar URLs da API manualmente.
- Requisições protegidas devem usar a instância `api`, que adiciona CSRF e
  credenciais.
- Chamadas públicas de autenticação também usam `api`, após inicializar o CSRF.
- Erros são transformados pelos fetchers e apresentados por feedback visual da
  tela.
