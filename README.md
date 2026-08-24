# in.orbit — Frontend

Aplicação web do in.orbit para acompanhar metas semanais, registrar conclusões
e visualizar o resumo da semana.

<p align="center">
  <img alt="in.orbit" src="./src/assets/logo.svg" width="180">
</p>

## Stack

- React 18 e TypeScript
- Vite
- React Router DOM
- TanStack Query
- Axios
- React Hook Form e Zod
- Tailwind CSS 3
- Biome

## Documentação

- [Visão geral](./docs/overview.md)
- [Autenticação e API](./docs/auth-and-api.md)
- [Rotas](./docs/routing.md)
- [HTTP e queries](./docs/http-and-queries.md)
- [Configurações](./docs/configs.md)
- [Build e execução](./docs/build-and-run.md)
- [Datas e horários](./docs/date-and-time.md)
- [Estrutura de `src`](./docs/src-structure-and-conventions.md)
- [Estilo e UI](./docs/styling-and-ui.md)
- [Design system](./docs/design-system.md)
- [Changelog](./docs/changelog.md)
- [Instruções compartilhadas](../nlw-pocket-docs/instructions.md)

## Execução local

```sh
bun install
bun run dev
```

O Vite inicia em `http://localhost:3001`. A API esperada é definida por
`VITE_BACKEND_URL` em `.env.local`; use `.env.example` como modelo.

Para gerar e servir o build:

```sh
bun run build
bun run preview
```

O `vercel.json` mantém o fallback para `index.html`, necessário às rotas do
SPA.

## Origem

O projeto foi desenvolvido a partir da Next Level Week Pocket/in.orbit e
mantém licença MIT. O layout de referência está no
[Figma da Rocketseat](https://www.figma.com/community/file/1415093862269754302/nlw-pocket-js-in-orbit).
