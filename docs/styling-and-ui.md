# Estilo e UI

O projeto usa Tailwind CSS 3, configurado em [`tailwind.config.js`](../tailwind.config.js),
e as diretivas Tailwind em [`src/index.css`](../src/index.css). A aplicação
usa a identidade escura do in.orbit com classes utilitárias, principalmente
tons `zinc` e `pink`.

Os componentes compartilhados ficam em `src/components/ui`, incluindo botão,
input, label, dialog, progress bar, radio group, separador e tooltip. Prefira
essas peças antes de criar markup duplicado.

Não existe atualmente um ThemeProvider ou uma implementação de tema claro/
escuro no código. Não documente tokens, storage de tema ou componentes de
outra aplicação como se fossem parte deste frontend.
