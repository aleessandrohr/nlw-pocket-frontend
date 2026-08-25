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
- **Impacto adicional:** a listagem de metas pendentes foi reorganizada em cards responsivos com contador, estados visuais e feedback de conclusão.
- **Impacto adicional:** o resumo ganhou tabs para alternar entre os cards de metas e o histórico da semana, com metas desabilitadas agrupadas ao final e cada grupo ordenado alfabeticamente.
- **Impacto adicional:** ajustado o cabeçalho responsivo para manter as ações de meta acima da navegação semanal em telas estreitas.
- **Impacto adicional:** o botão de cadastro e a navegação semanal agora aproveitam toda a largura disponível em telas estreitas.
- **Impacto adicional:** o cabeçalho do resumo foi fixado e o conteúdo de cada tab passou a usar rolagem vertical própria.
- **Impacto adicional:** adicionada navegação inferior com efeito glass no mobile, mantendo as tabs acessíveis e reservando espaço para o último conteúdo.
- **Impacto adicional:** a navegação mobile foi compactada em um menu tipo cápsula, com ícones e bordas mais arredondadas.
- **Impacto adicional:** removido o espaçamento inferior excedente e restaurados os nomes das opções na navegação mobile.
- **Impacto adicional:** corrigido o posicionamento global dos tooltips para aparecerem acima do cabeçalho sticky e fora de containers com overflow.
- **Impacto adicional:** a semana selecionada agora é refletida no parâmetro `week` da URL e restaurada ao recarregar a página.
- **Impacto adicional:** os cards agora recebem `completedToday` e bloqueiam visualmente a conclusão repetida da mesma meta no dia atual.
- **Impacto adicional:** o histórico da semana atual agora permite desmarcar conclusões, enquanto semanas anteriores permanecem somente leitura.
- **Impacto adicional:** o histórico mantém altura e alinhamento consistentes mesmo quando a ação de desmarcar não está disponível.
- **Impacto adicional:** o diálogo de metas agora usa tabs em cápsula liquid glass na parte inferior em telas mobile.
- **Correção:** reduzido o espaçamento inferior do menu mobile do diálogo de metas para manter apenas um respiro visual.
- **Impacto adicional:** o painel rolável do resumo agora usa o mesmo respiro inferior do diálogo de metas.
- **Correção:** simplificada a estilização global das scrollbars para remover os controles nativos de navegação.
- **Impacto adicional:** conclusões de metas arquivadas agora recebem destaque visual e identificação própria no histórico semanal.
- **Correção:** o histórico agora exibe a ação de desmarcar somente para conclusões feitas no dia atual.
- **Correção:** cabeçalhos, horários, expiração da demo e dias do histórico agora usam o fuso `America/Fortaleza` de forma consistente.
- **Impacto adicional:** desmarcar uma conclusão agora exige confirmação explícita antes de executar a remoção.
- **Impacto adicional:** o diálogo de confirmação ganhou ícone de alerta centralizado e fechamento pelo botão `X`, alinhado aos demais dialogs.
- **Impacto adicional:** contas demo agora oferecem a ação de encerrar a demonstração e iniciar o cadastro de uma conta pessoal.
- **Correção:** o cabeçalho da conta demo agora separa identidade, ação e cronômetro em telas mobile estreitas, evitando compressão e truncamento.
- **Correção:** menus liquid glass mobile passaram a ocupar uma área sticky própria, com fundo translúcido e blur sem sobrepor o conteúdo rolável.
- **Correção:** a aba de metas ativas agora ordena os títulos alfabeticamente, preservando a ordem de arquivamento na aba de arquivadas.
- **Validação:** Biome, TypeScript, build e `git diff --check` concluídos.
