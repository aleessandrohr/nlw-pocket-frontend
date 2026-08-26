# Configurações

## Ambiente

[`src/schemas/env.ts`](../src/schemas/env.ts) valida a configuração pública do
Vite:

| Variável | Uso |
| --- | --- |
| `VITE_BACKEND_URL` | URL base da API do in.orbit. |

Tudo que começa com `VITE_` é embutido no bundle do navegador. Não coloque
segredos, senhas ou tokens privados nessa variável.

## Vite

[`vite.config.ts`](../vite.config.ts) instala o plugin React e o alias `@`
para `src`. O build é estático e usa `index.html` como entrada.

## Headers de hospedagem

O `vercel.json` mantém o fallback do SPA e envia headers que bloqueiam objetos
embutidos, restringem permissões de dispositivo, evitam MIME sniffing e reduzem
o referrer. Ele não envia `X-Frame-Options` nem restringe `frame-ancestors`,
pois a demonstração precisa continuar abrindo no iframe do portfólio.

## Biome e TypeScript

O Biome 2.x valida apenas arquivos de código em `src`, com exceção dos
componentes UI locais. Os scripts disponíveis são `biome:lint`, `biome:check`,
`biome:fix` e `biome:format`.

O TypeScript usa projetos referenciados em `tsconfig.app.json` e
`tsconfig.node.json`; `bun run build` executa `tsc -b` antes do Vite.
