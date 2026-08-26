# in.orbit — Frontend

Aplicação web do in.orbit para acompanhar metas semanais, registrar conclusões
e visualizar o resumo da semana.

## Sobre o projeto

Esse projeto começou durante a **Next Level Week Pocket**, da Rocketseat. A
primeira versão foi construída acompanhando o desafio do evento e acabou sendo
um bom ponto de partida para estudar React e desenvolvimento web na prática.

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

O ponto de partida do projeto foi a Next Level Week Pocket/in.orbit. O layout
original pode ser encontrado no
[Figma da Rocketseat](https://www.figma.com/community/file/1415093862269754302/nlw-pocket-js-in-orbit).

Depois do evento, o projeto ganhou novas funcionalidades, mudanças visuais e
uma boa dose de refatoração. Esta versão continua sob licença MIT.
