# in.orbit — Frontend

Aplicação web do in.orbit para acompanhar metas semanais, registrar conclusões
e visualizar o resumo da semana.

## Sobre o projeto

O in.orbit nasceu durante a **Next Level Week**, da Rocketseat, como um
projeto de aprendizado baseado no desafio do evento. Depois da experiência,
continuei desenvolvendo e adaptando a aplicação para o meu portfólio.

Esta versão é uma evolução do projeto original, com novas decisões de produto,
regras de negócio, melhorias de segurança, refatorações e uma experiência de
uso mais completa. A origem educacional e as referências da Rocketseat são
mantidas nesta documentação.

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
- PWA com manifest e service worker

## Funcionalidades atuais

- Autenticação com sessão persistida, cookies, CSRF e renovação de tokens;
- Modo demonstração com conta temporária, sem exigir cadastro do visitante;
- Expiração, invalidação e limpeza controlada das contas demo;
- Cadastro, conclusão, arquivamento e restauração de metas;
- Limite de uma conclusão por meta no mesmo dia;
- Navegação entre semanas atuais e históricas, com URL sincronizada;
- Histórico de conclusões e regras para preservar períodos anteriores;
- Resumo semanal com progresso baseado nas metas existentes em cada período;
- Interface responsiva para desktop e mobile;
- Tabs, dialogs, tooltips e navegação mobile com visual liquid glass;
- Aplicação instalável como PWA, com atualização automática dos assets.

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

Em produção, o build também gera o manifest e o service worker da PWA. O
service worker pré-armazena somente assets estáticos da aplicação; dados
autenticados da API não são armazenados no cache offline.

## Origem

O projeto foi desenvolvido inicialmente a partir da Next Level Week
Pocket/in.orbit e mantém licença MIT. O layout de referência está no
[Figma da Rocketseat](https://www.figma.com/community/file/1415093862269754302/nlw-pocket-js-in-orbit).

As funcionalidades, refatorações, adaptações visuais e melhorias posteriores
descritas neste README foram desenvolvidas para a evolução desta versão de
portfólio.
