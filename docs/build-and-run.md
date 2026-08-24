# Build e execução

## Desenvolvimento

```sh
bun install
bun run dev
```

O Vite inicia em `http://localhost:3001`.

## Build de produção

```sh
bun run build
bun run preview
```

O build gera `dist/`. O `preview` serve os arquivos gerados localmente.

## Deploy

O frontend é uma SPA estática. O [`vercel.json`](../vercel.json) reescreve as
rotas para `index.html` para que o React Router possa resolver a navegação.
Configure `VITE_BACKEND_URL` no ambiente de build da hospedagem.

## Verificação

```sh
bun run biome:check
bun run build
git diff --check
```
