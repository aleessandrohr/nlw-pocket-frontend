# Visão geral

Este repositório contém a interface React do **in.orbit**. Usuários autenticam,
cadastram metas semanais, marcam conclusões e consultam um resumo.

## Fluxo principal

1. `src/main.tsx` cria o `QueryClient` e monta o `App`.
2. `src/app.tsx` configura `BrowserRouter`, `AuthProvider`, toaster e tooltip.
3. `src/contexts/auth.tsx` valida a sessão existente pelo perfil da API.
4. `src/routes/index.tsx` redireciona `/` e protege as rotas privadas.
5. As telas usam fetchers HTTP e TanStack Query para leitura e mutations.

## Stack

- React 18 e Vite;
- React Router DOM para navegação;
- Axios com cookies e interceptors de refresh;
- TanStack Query para cache e estado assíncrono;
- React Hook Form, Zod e `@hookform/resolvers` para formulários;
- Tailwind CSS 3 e componentes locais em `src/components/ui`.

## Mapa da documentação

- [Autenticação e API](./auth-and-api.md)
- [Rotas](./routing.md)
- [HTTP e queries](./http-and-queries.md)
- [Configurações](./configs.md)
- [Build e execução](./build-and-run.md)
- [Datas e horários](./date-and-time.md)
- [Estrutura de `src`](./src-structure-and-conventions.md)
- [Estilo e UI](./styling-and-ui.md)
- [Design system](./design-system.md)
- [Changelog](./changelog.md)

O frontend não possui organizações, TanStack Router, Better Auth, Orgesta ou
Orbista. A demo efêmera do portfólio usa a rota `/demo` do frontend, que cria
uma sessão temporária pelo backend antes de abrir o resumo.
