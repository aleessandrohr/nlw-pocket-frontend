# Datas e horários

O frontend usa o [`lib/dayjs.ts`](../src/lib/dayjs.ts) como ponto único de
configuração do `dayjs`, incluindo o locale `pt-br`. Os componentes usam essa
instância para calcular início e fim da semana, exibir dias em português e
formatar horários de conclusões.

Os valores de `createdAt`, `updatedAt` e `completedAt` vêm da API e são
interpretados por `dayjs` no navegador. Ao adicionar datas:

- mantenha instantes em formato compatível com ISO;
- converta para a timezone local somente na apresentação;
- não transforme uma data civil sem horário em um instante UTC;
- preserve a consistência com os timestamps `with time zone` do backend.
