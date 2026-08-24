# Estrutura de `src` e convenções

```text
src/
├── assets/       # logo, capa e ilustrações
├── components/   # componentes de tela e UI reutilizável
├── config/       # constantes de HTTP e regex
├── contexts/     # estado de autenticação
├── http/         # fetchers por recurso
├── routes/       # rotas públicas e privadas
├── schemas/      # validação de formulários e ambiente
├── services/     # cliente Axios e interceptors
└── utils/        # helpers pequenos de apresentação ou domínio
```

## Responsabilidades

- `routes` compõe páginas e coordena estado da tela;
- `components` renderiza a interface e fluxos locais;
- `http` conversa com a API sem depender de JSX;
- `services/api.ts` concentra cookies, CSRF e refresh;
- `contexts` mantém sessão em memória;
- `schemas` valida formulários com Zod;
- `components/ui` contém primitives visuais locais.

Mantenha fetchers, estado de query e JSX separados quando uma mudança nova
permitir essa divisão. Não crie uma árvore de páginas baseada em TanStack
Router: o roteador atual é React Router DOM.
