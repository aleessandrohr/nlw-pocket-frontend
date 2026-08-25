# Changelog

## Contexto vigente

- O frontend documenta React/Vite, React Router, TanStack Query, Axios e os
  fluxos atuais de autenticação e metas.
- A rota `/demo` do portfólio cria uma sessão demo pelo backend e abre o resumo.

## 2026-08-24

- **Escopo:** documentação do frontend
- **Resumo:** substituída a documentação herdada do Orgesta por tópicos do in.orbit.
- **Impacto:** README, autenticação, rotas, queries, configuração, UI, build e validação agora apontam para o código atual.
- **Validação:** revisão dos caminhos e contratos; `git diff --check` concluído.

## 2026-08-25

- **Escopo:** autenticação e roteamento da demonstração
- **Resumo:** adicionada a rota frontend `/demo` integrada ao endpoint `POST /auth/demo`.
- **Impacto:** visitantes recebem sessão autenticada, token CSRF, identificação `isDemo` e redirecionamento automático para `/summary` sem passar pelo login.
- **Impacto adicional:** o resumo agora exibe a conta atual e um contador em tempo real para a expiração da demo.
- **Impacto adicional:** ao expirar, a sessão demo chama o logout e limpa o estado local automaticamente.
- **Impacto adicional:** o logout de contas pessoais foi movido para o cabeçalho, e o resumo ganhou o botão reservado para opções de meta.
- **Impacto adicional:** o botão de opções agora abre o diálogo de metas, com filtro de arquivadas e ações de arquivar/desarquivar.
- **Impacto adicional:** corrigida a importação global dos estilos do `react-tooltip` para exibir as dicas das ações.
- **Impacto adicional:** adicionada descrição nativa nas ações de arquivar e desarquivar como fallback para tooltips em dialogs.
- **Impacto adicional:** corrigidas as cores e a compatibilidade da barra de rolagem do tema escuro.
- **Impacto adicional:** a barra de rolagem foi simplificada com espessura menor, cantos arredondados e destaque violeta discreto no hover.
- **Impacto adicional:** o estilo foi aplicado diretamente aos containers roláveis do cadastro e do gerenciamento de metas, removendo os controles nativos extras.
- **Impacto adicional:** o thumb da rolagem recebeu destaque violeta discreto e o overflow horizontal foi bloqueado nos diálogos.
- **Impacto adicional:** o `dayjs` passou a usar uma configuração compartilhada com locale `pt-br`.
- **Impacto adicional:** adicionados o contexto global da semana e uma fábrica central de `queryKeys`; resumo e metas pendentes agora enviam o deslocamento `week` ao backend.
- **Impacto adicional:** adicionados controles no resumo para navegar entre semanas anteriores, mantendo a próxima semana desabilitada na semana atual.
- **Impacto adicional:** conclusões foram desabilitadas nas semanas históricas e agora enviam o deslocamento `week` para o backend validar a operação.
- **Validação:** Biome, TypeScript, build e `git diff --check` concluídos.
