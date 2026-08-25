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
- **Impacto adicional:** o `dayjs` passou a usar uma configuração compartilhada com locale `pt-br`.
- **Validação:** Biome, TypeScript, build e `git diff --check` concluídos.
