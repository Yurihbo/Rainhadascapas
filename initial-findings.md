# Evidências iniciais — 27/08/2026

- O projeto Firebase `rainhadascapas-5a49a` está acessível pela conta `yuridesousasilva@gmail.com`.
- O produto em uso é **Cloud Firestore**, banco `(default)`, região `southamerica-east1`.
- Existe a coleção `sharedWorkspaces` e o documento `sharedWorkspaces/main`.
- O documento não está vazio: contém os campos `catalog`, `categories`/lojas, `reports` e `sellers`.
- Foram observados dados de estoque/vendas no documento, incluindo um vendedor `João Carlos`, itens `Película iPhone 11`, `Capa iPhone 11` e `Carregador Turbo`, quantidades 5, 10 e 2, totais `R$ 75,00`, `R$ 180,00` e `R$ 90,00`.
- O documento exibe `updatedAt` `1787829571006` e `updatedBy` `dQBZR1uJo9XrqBmRCU2KkfR3u0t2`.
- O código atual do repositório lê exatamente `doc(firestore, "sharedWorkspaces", "main")` e usa `onSnapshot`.
- A causa ainda não está fechada: o banco contém dados, mas a interface pode estar falhando na sessão anônima, nas regras, na publicação do bundle/ambiente, no cache persistente ou por sobrescrita parcial/conflito de escrita.

Fonte: inspeção somente leitura do console Firebase e do repositório GitHub informado pelo usuário.


## Verificação da versão publicada

Em 27/08/2026 às 14:19, a URL pública `https://yurihbo.github.io/Rainhadascapas/` carregou o dashboard e exibiu os dados do Firestore: 1 revendedor ativo (`João Carlos`), 3 pedidos/itens, valor da semana `R$ 350,00`, e os mesmos três itens observados no console. Isso confirma que o site publicado está apontando para o mesmo projeto e documento e que o banco não foi apagado por completo. A mensagem inicial “Conectando...” era apenas o estado transitório de carregamento; após a conclusão, os dados apareceram.

A hipótese mais provável neste momento é que o conteúdo que existia antes foi substituído por uma gravação posterior/estado parcial, ou que alguns aparelhos estejam com bundle/cache antigo ou sessão offline; não há evidência de que o documento esteja totalmente vazio.


## Auditoria de atividade adicional

- A página **Analytics** do projeto informa “Add an app to get started”; não há painel de eventos de Analytics disponível para este app.
- O código do site não contém chamadas `logEvent`, `firebase/analytics` ou `gtag`. Ele possui apenas um `measurementId` na configuração, que por si só não registra o conteúdo de revendedores ou itens.
- A aba **Firestore → Usage**, em 27/08/2026, mostrou 77 leituras, 26 gravações e nenhuma exclusão no período exibido. O console apresentou a opção `Last 7 days`, mas o gráfico carregado permaneceu com faixa horária de 24 horas; portanto, os números são evidência de uso recente, não um inventário dos 400 lançamentos.
- O documento atual exibe `updatedAt` 1787829571006, correspondente a 27/08/2026 09:39:31 no fuso UTC, e a interface mostra “Hoje, 09:42” para o vendedor sobrevivente.
- Conclusão: Analytics/Usage pode provar que houve atividade, mas não armazena o conteúdo dos revendedores nem permite reconstruir os 400 lançamentos. O conteúdo só pode ser recuperado de um documento/backup/export/cache que ainda contenha os dados.


## Busca de retrocesso e hipótese de gravação pendente

Não foram encontrados commits no GitHub em 27/08/2026; portanto, não há evidência de alteração de código hoje. O Firebase Analytics não fornece versões de documentos. O Storage do Firebase está indisponível no plano atual e o Firestore Disaster Recovery não mostrou PITR/backups agendados habilitados.

O fato de todos os dispositivos exibirem agora os mesmos três registros confirma que o estado reduzido foi sincronizado pelo servidor, mas não prova que o pai tenha apagado algo manualmente. Com cache offline persistente, um aplicativo PWA pode reabrir com uma gravação pendente de sessão anterior e sincronizá-la ao recuperar conexão. A abertura/fechamento isolada, em uma sessão limpa e sem escrita pendente, não deveria por si só apagar a lista; o cenário de estado local antigo/vazio com escrita pendente é a hipótese técnica relevante.

Não é possível puxar uma versão de ontem diretamente do documento atual sem PITR, exportação prévia ou cache local ainda não sobrescrito. A próxima ação segura é procurar um cache/export antigo, mantendo os aparelhos sem limpar dados e sem novas gravações.


## Diagnóstico da tela branca offline

O service worker `client/public/sw.js` usa a política `network-first` para navegação, scripts e estilos. No install, ele armazena somente `index.html` em `rainha-das-capas-v4`; os arquivos JavaScript e CSS não são pré-cacheados. Quando o aparelho fica sem internet, o navegador recebe o `index.html` do cache, mas não consegue baixar o bundle `/assets/index-*.js` e o CSS, resultando em tela branca.

A inspeção da versão publicada confirmou exatamente um cache com apenas `https://yurihbo.github.io/Rainhadascapas/index.html`. A sessão de investigação possui um IndexedDB Firestore chamado `firestore/[DEFAULT]/rainhadascapas-5a49a/main`, com um único documento remoto em cache, zero mutações pendentes e zero overlays; isso é somente o cache do navegador de investigação, não o cache dos celulares do usuário. Não há acesso remoto aos IndexedDB dos aparelhos físicos.

Conclusão: o modo offline não permite abrir a interface nesta versão e, por isso, não é possível usar o PWA offline para visualizar/exportar os dados antigos. Ainda vale preservar aparelhos sem limpar seus dados, mas a possibilidade de extração local dependerá de algum aparelho ter mantido documentos Firestore antigos antes da última sincronização.


## Confirmação de estado-base publicado

A comparação do código-fonte com o bundle público confirmou que os três registros atuais aparecem literalmente no bundle como seed: João Carlos, Película iPhone 11, Capa iPhone 11 e Carregador Turbo. O bundle também contém a configuração do projeto `rainhadascapas-5a49a` e usa `sharedWorkspaces/main`.

Isso mostra que o site publicado carrega dados-base de teste enquanto aguarda/usa o estado compartilhado. A presença dos mesmos registros no Firestore e no bundle não permite concluir, isoladamente, se eles foram gravados no banco a partir do seed ou se o Firestore foi reduzido para esse mesmo estado; porém confirma que a versão pública não contém os 20 revendedores reais em seu código. Não há outro projeto/documento identificado no repositório.


## Evidência enviada pelo usuário — Firestore Usage

A captura de tela enviada pelo usuário mostra o intervalo **Last 7 days — Aug 20–Aug 27**, com **405 Reads**, **241 Writes** e **nenhum Delete**. Esses números são métricas agregadas de operações do Firestore; não representam 241 cópias do documento nem armazenam o conteúdo dos revendedores em cada ponto. A ausência de deletes reforça que o desaparecimento pode ter ocorrido por gravações completas/substituições, não por exclusões individuais.


## Inspeção direta do Cloud Storage — 27/08/2026

O navegador de buckets do Google Cloud, autenticado no projeto `RainhaDasCapas`/`rainhadascapas-5a49a`, carregou a tabela sem nenhum bucket listado e exibiu a mensagem de início para criar um bucket. A área Firebase Storage também informou que o projeto precisa de upgrade para usar Storage. Não foi localizado nenhum bucket ou arquivo de exportação/backup nesse projeto durante a consulta somente leitura.

A captura do usuário confirma 405 leituras e 241 gravações no Firestore entre 20 e 27 de agosto, mas essas operações não são automaticamente copiadas para Cloud Storage. Portanto, não existe um arquivo no Storage que possa ser puxado agora com as 400 movimentações, pelo menos não em um bucket visível para a conta/projeto consultado.


## Descoberta crítica no histórico do GitHub

O commit `b92588f`, de 14/08/2026 às 05:33 UTC, alterou explicitamente os dados demonstrativos para manter somente João Carlos. A integração inicial com o Firebase ocorreu depois, em 15/08/2026. Portanto, o conjunto atual de João Carlos e seus três itens corresponde exatamente ao seed de teste anterior à integração, e não aos aproximadamente 20 revendedores reais cadastrados posteriormente.

O commit mais recente do repositório é `e63e110`, de 17/08/2026 às 22:46 UTC, e o último workflow Pages público também ocorreu em 17/08/2026. Não houve build/deploy do GitHub Actions entre ontem e hoje. O bundle público aponta para o projeto correto e contém os seeds de teste.

Essa evidência fortalece a hipótese de que uma gravação de inicialização/reconciliação com seed, possivelmente pendente no cache de algum cliente, substituiu o workspace real. O Firestore atual está funcionando e centralizado, mas centralizado no conteúdo reduzido que acabou persistido.


## Verificação de rollback no Firebase — 27/08/2026

A página oficial de Disaster Recovery do Firestore mostra: **"Upgrade your plan to edit point-in-time recovery and scheduled backups"**. Isso indica que o projeto atual não tem PITR nem backups agendados editáveis/habilitados no plano acessível.

A página de Import/Export do Google Cloud mostra um aviso de que o faturamento precisa estar habilitado para importar/exportar dados e a tabela de jobs informa: **"You haven't moved any data recently."** Não há job histórico de exportação ou importação listado para este banco.

Consequentemente, não foi encontrada no próprio Firebase uma versão de 1 ou 2 dias atrás que possa ser consultada ou restaurada. As métricas de reads/writes continuam sendo agregadas e não funcionam como histórico de versões.
