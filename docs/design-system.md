# Design system

O design do in.orbit é compacto e orientado à ação: resumo semanal, progresso,
metas pendentes e cadastro rápido.

## Primitivas locais

- `Button` e `OutlineButton` para ações;
- `Input` e `Label` para campos;
- `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription` e
  `DialogClose` para o cadastro de metas;
- `Progress` e `ProgressIndicator` para o progresso semanal;
- `RadioGroup` para a frequência desejada;
- `Tooltip` para ações compactas, como logout no mobile.

## Composição

As telas devem preservar foco visível, labels associados, mensagens de erro e
estados de carregamento. Use as classes existentes como referência visual e
evite introduzir uma biblioteca de UI sem necessidade concreta.
