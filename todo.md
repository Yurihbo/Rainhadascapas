# Atualização solicitada

## Nova rodada

- [x] Habilitar backend, banco e autenticação do projeto.
- [x] Integrar login OAuth com conta Google pelo portal de autenticação.
- [x] Definir a conta proprietária como administradora geral.
- [x] Proteger o dashboard para usuários autenticados.
- [x] Criar aba Usuários visível para administradores.
- [x] Permitir cargos, permissões, ativação e remoção de usuários.
- [x] Validar login, logout e controle de acesso.


## Nova rodada

- [x] Usar LogoTemaescuro.png como nova logo do site.
- [x] Usar a mesma marca como favicon.
- [x] Ajustar o enquadramento da logo no desktop e no mobile.
- [x] Validar carregamento e build após substituir os ativos.


## Nova rodada

- [x] Ajustar o layout de Semanas para largura estreita.
- [x] Evitar overflow no cabeçalho e nos cards de semana.
- [x] Reorganizar o relatório selecionado e suas ações no celular.
- [x] Validar Semanas em celular sem alterar tablet e PC.


## Nova rodada

- [x] Fechar a sidebar mobile ao clicar fora dela.
- [x] Fechar a sidebar mobile ao arrastar para a esquerda.
- [x] Manter o fechamento pelo botão do menu.
- [x] Validar o gesto e o clique externo em celular.


## Nova rodada

- [x] Validar e ajustar o shell em celular e tablet.
- [x] Melhorar navegação lateral e cabeçalho em telas menores.
- [x] Reorganizar cards, gráficos e métricas para mobile/tablet.
- [x] Tornar tabelas, formulários e catálogo confortáveis em telas estreitas.
- [x] Validar PC, tablet e celular sem alterar o layout desktop.


## Nova rodada

- [x] Criar popup discreto para adicionar categoria.
- [x] Criar popup discreto para adicionar subcategoria vinculada à categoria.
- [x] Adicionar botão para imprimir/salvar lista compacta da loja selecionada.
- [x] Formatar lista com loja, categoria, subcategoria e itens, economizando espaço.
- [x] Ocultar navegação e controles na impressão.


## Nova rodada

- [x] Remover o contador numérico ao lado de Pagamentos.
- [x] Manter somente Loja 01 (Yuri) e Loja 02 (Amanda).
- [x] Criar categorias ilimitadas por loja.
- [x] Criar subcategorias ilimitadas dentro de categorias.
- [x] Criar itens dentro das subcategorias.
- [x] Editar e remover categorias, subcategorias e itens.
- [x] Atualizar a navegação do catálogo sem módulos fictícios.


## Nova rodada

- [x] Calcular a semana atual por blocos de 7 dias dentro do mês.
- [x] Usar a mesma semana automática ao gerar relatórios.
- [x] Exibir semanas anteriores do mês na aba Semanas.
- [x] Permitir consultar detalhes de uma semana passada.
- [x] Permitir imprimir o relatório da semana consultada.


## Nova rodada

- [x] Derivar valor total da semana a partir dos itens dos revendedores.
- [x] Derivar número de revendedores e pedidos a partir do estado atual.
- [x] Derivar recebimentos pagos, pendentes e em acordo por status.
- [x] Atualizar gráfico semanal conforme a quantidade real de itens/pedidos.
- [x] Reutilizar os mesmos cálculos na aba de Pagamentos.


## Nova rodada

- [x] Manter apenas João Carlos como exemplo em todas as abas.
- [x] Remover os demais revendedores e exemplos demonstrativos.
- [x] Tornar o status de pagamento editável e persistido no estado da interface.
- [x] Exibir data e horário atuais automaticamente.
- [x] Numerar a semana administrativa pelo mês, como MÊS 08 · SEMANA 02.


## Nova rodada

- [x] Adicionar exclusão de revendedor com confirmação.
- [x] Adicionar exclusão de item com confirmação.
- [x] Criar relatório semanal simples ou detalhado.
- [x] Permitir visualizar o relatório criado.
- [x] Permitir imprimir/salvar o relatório como PDF.
- [x] Permitir compartilhar o relatório via Web Share ou área de transferência.

- [x] Trocar “Distribuidora · SP” por “Anápolis-GO” em toda a interface.
- [x] Substituir o cartão de sincronização da sidebar por controle de tema claro/escuro.
- [x] Criar perfil simples em Configurações com seleção de foto e edição de nome.
- [x] Refletir nome e avatar editados no perfil da sidebar e no avatar do topo.
- [x] Implementar modal funcional para adicionar revendedor.
- [x] Persistir revendedores adicionados no estado da aplicação e atualizar contagens/listas.
- [x] Implementar cadastro de item dentro da página individual do revendedor.
- [x] Recalcular valor total do revendedor após adicionar item.
- [x] Aguardar arquivo do usuário para adaptar ícone e favicon.
- [x] Validar fluxos desktop e mobile e gerar novo checkpoint.

## Fechamento da autenticação

- [x] Adicionar status ativo/inativo no schema, banco, procedures e UI.
- [x] Impedir acesso de contas desativadas aos procedimentos protegidos.
- [x] Cobrir bloqueios administrativos com testes Vitest.
- [x] Confirmar o primeiro login real com a conta Google proprietária no ambiente de preview.

## Perfil individual

- [x] Criar tabela persistida de atividades vinculada ao usuário autenticado.
- [x] Criar procedures para consultar e registrar apenas as próprias atividades.
- [x] Adicionar página Perfil ao menu e ao menu da conta.
- [x] Exibir dados próprios da conta, cargo, login e datas importantes.
- [x] Exibir histórico de atividades em ordem cronológica.
- [x] Registrar login e ações operacionais relevantes.
- [x] Validar privacidade, typecheck, testes e build.

## Refinamento do perfil

- [x] Adicionar atalho Meu perfil ao menu da conta junto com Sair da conta.
- [x] Registrar criação e remoção de revendedores, criação e remoção de itens e alterações de pagamentos.

## Perfil editável e PWA

- [x] Permitir editar nome diretamente em Meu perfil.
- [x] Permitir selecionar e atualizar foto diretamente em Meu perfil.
- [x] Persistir alterações de perfil na conta autenticada.
- [x] Criar manifesto PWA com nome, cores, ícones e modo standalone.
- [x] Adicionar service worker e registro no frontend.
- [x] Validar instalação e funcionamento responsivo do PWA.

## Validação final do perfil e PWA

- [x] Hidratar nome e foto persistidos na sessão autenticada.
- [x] Exibir botão Instalar quando o navegador oferecer instalação PWA.
- [x] Confirmar manifesto, service worker e layout mobile do aplicativo.

## Offline, notificações e fotos

- [x] Criar fila local persistente para registros feitos sem conexão.
- [x] Sincronizar automaticamente a fila quando a conexão voltar.
- [x] Exibir estado online/offline e quantidade de itens pendentes.
- [x] Evitar duplicidade durante novas tentativas de sincronização.
- [x] Criar configurações PWA para notificações e permissões.
- [x] Permitir solicitar, ativar e desativar notificações.
- [x] Permitir verificar e aplicar atualização do aplicativo em segundo plano.
- [x] Criar recorte quadrado da foto antes do salvamento.
- [x] Comprimir a foto para reduzir tamanho e manter qualidade.
- [x] Validar os fluxos em desktop, tablet e celular.

## Correção da sincronização offline

- [x] Enfileirar operações reais de revendedor, item e pagamento com payload.
- [x] Persistir operações offline no backend com chave idempotente.
- [x] Sincronizar operações reais ao reconectar, não apenas atividades.
- [x] Adicionar trava de sincronização e deduplicação por operação.
- [x] Validar os novos fluxos em desktop, tablet e celular.

## Fechamento da sincronização real

- [x] Enfileirar operações reais de revendedor, item e pagamento com payload.
- [x] Persistir operações offline no backend com chave idempotente.
- [x] Sincronizar operações reais ao reconectar, não apenas atividades.
- [x] Adicionar trava de sincronização e deduplicação por operação.
- [x] Validar os novos fluxos em desktop, tablet e celular.

## Reconciliação canônica

- [x] Criar persistência backend canônica para revendedores, itens e status de pagamento.
- [x] Aplicar operações offline sincronizadas nessas tabelas com idempotência.
- [x] Baixar o estado reconciliado após a reconexão e reidratar a interface.
- [x] Validar o fluxo ponta a ponta sem inserir dados artificiais no banco.
- [x] Corrigir a reidratação canônica para também tratar estado vazio e seleção removida.
- [x] Validar o fluxo offline, sincronização e leitura reconciliada com teste de integração controlado.

## GitHub e publicação

- [x] Auditar o repositório Yurihbo/Rainhadascapas e o estado local.
- [x] Remover menções de IA do código e da documentação sem quebrar funcionalidades.
- [x] Validar typecheck, testes e build após a limpeza.
- [x] Enviar o código completo ao repositório GitHub.
- [x] Orientar a publicação compatível, deixando claro que GitHub Pages não executa o backend full-stack.
- [x] Documentar no README a diferença entre Pages estático e hospedagem full-stack.
- [x] Documentar variáveis OAuth, banco, build e host compatível para a versão funcional.
- [x] Explicar a alternativa de publicar no Pages somente uma versão estática limitada.

## Publicação e domínio

- [x] Solicitar os segredos obrigatórios de produção com segurança (não aplicável: Firebase usa configuração pública no frontend).
- [x] Validar a configuração de ambiente após o preenchimento dos segredos (substituído pela validação do Firebase).
- [x] Orientar apontamento DNS e domínio próprio no hosting (não aplicável ao escopo atual sem domínio próprio).
- [x] Atualizar as URLs de retorno OAuth para o domínio final (não aplicável: login OAuth visual foi removido).

## Google OAuth com backend próprio

- [x] Mapear projeto Google Cloud, consentimento OAuth e credenciais web (substituído por Firebase Anonymous Auth).
- [x] Definir URI de callback e origens autorizadas para o domínio de produção (não aplicável ao modo anônimo).
- [x] Gerar e configurar JWT_SECRET (não aplicável: backend OAuth foi removido do modo Pages). com segurança.
- [x] Identificar OWNER_OPEN_ID e OWNER_NAME após o primeiro login (não aplicável ao modo sem login).
- [x] Validar login, logout e sessão no backend publicado (substituído por sessão anônima Firebase).

## Oracle Cloud Always Free

- [x] Definir VM, banco, domínio, HTTPS e estratégia de deploy (não aplicável: arquitetura final usa GitHub Pages + Firebase).
- [x] Preparar configuração de produção para execução em VM (não aplicável ao escopo final).
- [x] Obter acesso seguro à conta Oracle sem compartilhar senha ou chave privada (não aplicável: Oracle descartado).
- [x] Publicar a aplicação e configurar variáveis de ambiente (substituído por workflow Pages e Firebase público).
- [x] Validar login, banco, PWA, domínio e reinicialização do serviço (substituído por validação Firebase/PWA).

## Hospedagem simples sem cartão

- [x] Comparar opções gratuitas sem cartão para até cinco usuários.
- [x] Reescrever a escolha de hospedagem: o escopo final adotado é Firebase + GitHub Pages, embora exija migração maior que túnel local.
- [x] Documentar o modelo sem login: Anonymous Auth e regras protegem o banco contra acesso não autenticado, mas não criam allowlist privada de pessoas.
- [x] Validar o acesso compartilhado anônimo; autorização individual de pessoas não é oferecida sem login ou código verificado no backend.

## Render com MySQL/TiDB

- [ ] CANCELADO/SUBSTITUÍDO: auditar scripts de build e start para Render; arquitetura final usa GitHub Pages + Firebase.
- [ ] CANCELADO/SUBSTITUÍDO: definir Web Service no Render; arquitetura final usa GitHub Pages + Firebase.
- [ ] CANCELADO/SUBSTITUÍDO: documentar `DATABASE_URL` TLS do TiDB; Firestore foi adotado.
- [ ] CANCELADO/SUBSTITUÍDO: documentar callback Render/OAuth; login visual foi removido.
- [ ] CANCELADO/SUBSTITUÍDO: checklist de Render; foi criado workflow de GitHub Pages + Firebase.

## Modo compartilhado sem login

- [x] Remover login e sessão visíveis da interface.
- [x] Definir Firestore como banco externo compatível com frontend estático do GitHub Pages.
- [x] Implementar Anonymous Auth invisível, regras Firestore e identificação anônima do cliente.
- [x] Sincronizar alterações compartilhadas por listener Firestore no workspace principal.
- [x] Validar build estático, preview e colaboração sem login; propagação entre dois clientes permanece teste manual pendente.

## Arquitetura final: GitHub Pages + Firebase

- [x] Preparar build estático com base `/Rainhadascapas/`.
- [x] Configurar workflow automático do GitHub Pages.
- [x] Integrar Firebase Anonymous Auth e Firestore compartilhado.
- [x] Publicar e testar regras de segurança do documento compartilhado.
- [x] Documentar configuração do Firebase Console e publicação.
- [ ] Definir proteção adicional para uso privado por poucas pessoas sem login; código preparado, aguardando habilitação e teste do provedor Google no Firebase.
- [x] Restaurar a aba Meu perfil com dados, histórico, edição de nome e foto.
- [x] Restaurar configurações PWA e alternância claro/escuro Black Label ERP.
- [ ] Implementar autenticação real Firebase para usuários autorizados; código concluído, aguardando ativação do provedor Google e teste com conta permitida.
- [ ] Ajustar regras Firestore para negar acesso anônimo e permitir somente usuários autenticados; arquivo atualizado, aguardando republicação no Console.
- [ ] Validar perfil, tema e sincronização após a migração de autenticação com uma sessão Google real.

## Sincronização GitHub

- [x] Auditar o repositório `Yurihbo/Rainhadascapas` e a branch principal.
- [x] Confirmar que segredos e arquivos `.env` não serão enviados.
- [x] Enviar o projeto completo e as alterações atuais ao GitHub.
- [x] Confirmar o commit remoto no GitHub.
- [x] Confirmar que o alvo correto é `Yurihbo/Rainhadascapas`.
- [ ] Reautorizar a conexão do projeto com o GitHub em Connectors apontando para `Yurihbo/Rainhadascapas`.
- [ ] Repetir uma operação dependente para confirmar a reconexão do projeto.

## Firebase compartilhado

- [x] Configurar o projeto Firebase `rainhadascapas-5a49a` via variáveis públicas do frontend.
- [x] Habilitar e integrar autenticação anônima sem tela de login.
- [x] Criar modelo Firestore para dados operacionais compartilhados.
- [x] Criar regras Firestore de leitura/escrita e validação para publicação no console.
- [x] Remover dependência visual do login OAuth atual.
- [x] Validar autenticação anônima, sincronização do listener e build para GitHub Pages.
- [ ] Validar em dois clientes que uma alteração compartilhada aparece sem recarregar (pendente de duas sessões Google autorizadas).
- [x] Validar leitura e escrita em `sharedWorkspaces/main` com sessão autenticada simulada no Rules Playground, sem alterar dados.
- [x] Validar leitura em `sharedWorkspaces/main` com sessão anônima real no preview; escrita real entre dois clientes permanece pendente.
- [x] Validar que acessos sem autenticação e outros caminhos do Firestore são negados.
- [ ] Republicar `firestore.rules` atualizado no Firebase Console e validar as permissões reais.
- [x] Enviar a migração Firebase, regras, documentação e workflow Pages ao repositório `Yurihbo/Rainhadascapas` (commit `9ba719c`).

## Continuação: restauração premium e autenticação real

- [ ] Restaurar tema Black Label ERP com persistência global claro/escuro.
- [ ] Restaurar Meu perfil com edição de nome e foto comprimida.
- [ ] Reativar configurações de notificações e atualização do PWA.
- [ ] Substituir Anonymous Auth por autenticação Google real no Firebase.
- [ ] Definir allowlist de e-mails autorizados para o workspace privado.
- [ ] Ajustar regras Firestore para negar usuários anônimos e não autorizados.
- [ ] Validar build, testes, sincronização entre clientes e PWA.
- [ ] Criar checkpoint e sincronizar a versão final com Yurihbo/Rainhadascapas.
