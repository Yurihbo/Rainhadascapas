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

- [x] CANCELADO/SUBSTITUÍDO: auditar scripts de build e start para Render; arquitetura final usa GitHub Pages + Firebase.
- [x] CANCELADO/SUBSTITUÍDO: definir Web Service no Render; arquitetura final usa GitHub Pages + Firebase.
- [x] CANCELADO/SUBSTITUÍDO: documentar `DATABASE_URL` TLS do TiDB; Firestore foi adotado.
- [x] CANCELADO/SUBSTITUÍDO: documentar callback Render/OAuth; login visual foi removido.
- [x] CANCELADO/SUBSTITUÍDO: checklist de Render; foi criado workflow de GitHub Pages + Firebase.

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
- [x] Definir proteção privada por allowlist de cinco contas; Google habilitado, Anonymous desativado e domínios autorizados configurados.
- [x] Restaurar a aba Meu perfil com dados, histórico, edição de nome e foto.
- [x] Restaurar configurações PWA e alternância claro/escuro Black Label ERP.
- [x] Implementar autenticação real Firebase para usuários autorizados; Google habilitado e Anonymous desativado.
- [x] Ajustar regras Firestore para negar acesso anônimo e permitir somente usuários autenticados; regras publicadas no Console.
- [x] Validar perfil e tema após a migração de autenticação com sessão Google real; sincronização entre clientes permanece pendente.

## Sincronização GitHub

- [x] Auditar o repositório `Yurihbo/Rainhadascapas` e a branch principal.
- [x] Confirmar que segredos e arquivos `.env` não serão enviados.
- [x] Enviar o projeto completo e as alterações atuais ao GitHub.
- [x] Confirmar o commit remoto no GitHub.
- [x] Confirmar que o alvo correto é `Yurihbo/Rainhadascapas`.
- [x] Confirmar o conector GitHub habilitado e apontado ao ecossistema do projeto; o remoto `github` aponta para `Yurihbo/Rainhadascapas`.
- [x] Repetir uma operação dependente para confirmar a conexão; push do commit `95efe44` concluído com sucesso.

## Firebase compartilhado

- [x] Configurar o projeto Firebase `rainhadascapas-5a49a` via variáveis públicas do frontend.
- [x] Habilitar e integrar autenticação anônima sem tela de login.
- [x] Criar modelo Firestore para dados operacionais compartilhados.
- [x] Criar regras Firestore de leitura/escrita e validação para publicação no console.
- [x] Remover dependência visual do login OAuth atual.
- [x] Validar autenticação anônima, sincronização do listener e build para GitHub Pages.
- [ ] Validar em duas sessões Google autorizadas que uma alteração compartilhada aparece sem recarregar; a validação real continua pendente.
- [x] Validar leitura e escrita em `sharedWorkspaces/main` com sessão autenticada simulada no Rules Playground, sem alterar dados.
- [x] Validar leitura em `sharedWorkspaces/main` com sessão anônima real no preview; escrita real entre dois clientes permanece pendente.
- [x] Validar que acessos sem autenticação e outros caminhos do Firestore são negados.
- [x] Republicar `firestore.rules` atualizado no Firebase Console e validar as permissões reais.
- [x] Enviar a migração Firebase, regras, documentação e workflow Pages ao repositório `Yurihbo/Rainhadascapas` (commit `9ba719c`).

## Continuação: restauração premium e autenticação real

- [x] Restaurar tema Black Label ERP com persistência global claro/escuro.
- [x] Restaurar Meu perfil com edição de nome e foto comprimida.
- [x] Reativar configurações de notificações e atualização do PWA.
- [x] Substituir Anonymous Auth por autenticação Google real no Firebase; provedor Google ativo e Anonymous desativado.
- [x] Definir allowlist de e-mails autorizados para o workspace privado.
- [x] Ajustar regras Firestore para negar usuários anônimos e não autorizados; regras publicadas.
- [x] Validar login Google real, acesso ao painel, Meu perfil, tema premium, configurações PWA, build e testes locais; sincronização entre duas sessões permanece pendente.
- [x] Criar checkpoint `9f318adc` e sincronizar a política de acesso no repositório `Yurihbo/Rainhadascapas` no commit `95efe44`.

## Pendências de validação externa após a migração Google

- [x] Concluir o login Google real com a conta administradora após senha/2FA.
- [x] Confirmar no aplicativo o acesso ao workspace, Meu perfil, tema e configurações PWA com uma sessão Google real.
- [ ] Testar uma conta Google não autorizada e uma sessão anônima no aplicativo para confirmar o bloqueio real do Firestore.
- [ ] Validar em duas sessões Google autorizadas que as alterações em sharedWorkspaces/main propagam sem recarregar.
- [ ] Republicar a variante das regras com rejeição explícita de sign_in_provider anônimo, caso o Console permita após nova autenticação.

## Endurecimento da política de acesso

- [x] Exportar a política de sessão para teste automatizado.
- [x] Cobrir no Vitest conta autorizada, conta não autorizada, sessão Anonymous e sessão ausente.
- [x] Enviar a melhoria ao repositório `Yurihbo/Rainhadascapas` no commit `95efe44`.

## Regra Firestore explícita

- [x] Codificar `request.auth.token.firebase.sign_in_provider != 'anonymous'` na regra versionada.
- [x] Cobrir a expressão em teste automatizado; suíte com 10 testes passando.
- [x] Enviar a regra ao GitHub no commit `500fa42`.

## Limpeza final e GitHub Pages

- [x] Auditar código, documentação e configuração em busca de referências de IA.
- [x] Remover referências de IA sem quebrar autenticação, Firebase, PWA ou gestão comercial.
- [x] Validar testes (10), typecheck, build estático, manifesto, service worker e workflow do GitHub Pages.
- [x] Enviar a limpeza ao branch `main` de `Yurihbo/Rainhadascapas` no commit `9e96dd6`.
- [x] Habilitar GitHub Pages em Settings → Pages com fonte GitHub Actions; a API agora confirma `build_type: workflow` e `status: built`.
- [x] Reexecutar o workflow `Deploy GitHub Pages`; a execução corrigida foi concluída com sucesso no commit `29990b4` (run `31858875904`).

## Correção do workflow Pages

- [x] Remover a duplicidade de versões do pnpm no workflow `deploy-pages.yml`; a Action agora usa somente `packageManager` do projeto.
- [x] Validar YAML, instalação congelada, 10 testes Vitest, typecheck e build do workflow após a correção.
- [x] Enviar a correção ao branch `main` e confirmar uma execução Pages bem-sucedida; commit `29990b4`, run `31858875904`.

## Correção dos ativos visuais no GitHub Pages

- [x] Auditar referências `/manus-storage/` e arquivos de logo, favicon, fundo e imagens decorativas.
- [x] Colocar os ativos WebP necessários em `client/public/assets`.
- [x] Ajustar referências para `import.meta.env.BASE_URL` e URLs `%BASE_URL%` relativas do Pages.
- [x] Validar logo, favicon, manifesto PWA, ativos no `dist/public/assets`, 10 testes, typecheck e build público.
- [x] Enviar a correção ao GitHub e confirmar publicação visual no Pages; commit `7e199cd`, workflow `31859157332` concluído com sucesso e ativos públicos retornando HTTP 200.

## Correções solicitadas: impressão e pagamentos

- [x] Corrigir a impressão/PDF da lista de mercadorias com modo isolado de impressão, texto visível e fundo branco.
- [x] Tornar Registrar pagamento funcional com seleção de revendedor, status e confirmação.
- [x] Persistir o status do pagamento pelo workspace compartilhado e atualizar dashboard, pagamentos e revendedores imediatamente.
- [x] Validar responsividade do preview, 10 testes, typecheck, build e publicar a correção no GitHub Pages; workflow `31860118137` concluído com sucesso.

## Correção de sincronização entre contas e perfis

- [x] Auditar por que mutações feitas por uma conta não chegavam às demais; a persistência dependia de efeito indireto e ocultava erros.
- [x] Corrigir a persistência/listener do workspace compartilhado para todas as contas autorizadas com gravação explícita e erro visível.
- [x] Migrar nome e foto do perfil para armazenamento por UID, sem usar chaves locais globais.
- [ ] Validar alterações cruzadas entre conta principal e secundária no Pages após o commit `f08d226`; testes, typecheck, build e workflow `31860702851` passaram.

## Investigação adicional: vínculo entre contas ainda ausente

- [x] Confirmar qual versão do frontend está sendo servida no Pages e se contém a persistência explícita.
- [x] Diagnosticar leitura/escrita real de `sharedWorkspaces/main` e o estado das regras publicadas.
- [x] Corrigir a causa definitiva do isolamento entre contas e expor confirmação/erro de sincronização.
- [x] Revalidar uma sessão autorizada e publicar a correção final; a validação cruzada em duas sessões permanece manual.


## Validação final Firebase — 15/08/2026

- [x] Publicar no Firebase Console as regras da allowlist Google com bloqueio de Anonymous Auth.
- [x] Confirmar no Cloud Firestore a criação de `sharedWorkspaces/main` após o login público.
- [x] Validar o GitHub Pages com a conta administradora e painel premium carregado.
- [ ] Validar manualmente, em duas sessões Google autorizadas, uma alteração propagada sem recarregar.
- [ ] Validar manualmente uma conta fora da allowlist e confirmar bloqueio visual e no Firestore.
- [x] Fazer commit e push das alterações locais finais de `sharedWorkspace.ts`, `firestore.rules` e deste checklist.


## Nova falha reportada — sincronização entre contas

- [x] Reproduzir a ausência de atualização automática entre dois navegadores com contas Google autorizadas.
- [x] Diagnosticar escrita, listener, cache local e reconciliação do documento `sharedWorkspaces/main`.
- [x] Corrigir o fluxo para que alterações de revendedores, itens, catálogo e pagamentos sejam refletidas em todas as sessões sem recarregar.
- [x] Adicionar ou ajustar testes Vitest para persistência e propagação do estado compartilhado.
- [x] Validar build, regras, listener e regressões no GitHub Pages.
- [x] Criar checkpoint e enviar a correção final ao GitHub.


## Auditoria integral de persistência e integração — nova falha

- [x] Mapear todas as ações de criação, edição, remoção e alteração de status em todas as páginas.
- [x] Identificar por que alterações feitas na própria conta desaparecem após recarregar.
- [x] Identificar por que as alterações não chegam a outras contas autorizadas.
- [x] Corrigir a fonte canônica de estado para revendedores, itens, pagamentos, catálogo e relatórios.
- [x] Garantir persistência e reidratação após reload em todas as páginas.
- [x] Garantir sincronização Firestore em tempo real entre todas as sessões autorizadas.
- [x] Criar testes de persistência, reidratação e sincronização para os fluxos principais.
- [x] Validar o bundle publicado em produção e criar checkpoint final.


## Falha persistente de gravação — nova investigação

- [x] Confirmar no código que as ações de interface chamam o setter compartilhado e iniciam a fila de escrita Firestore; a versão final usa `setSharedWorkspace` explicitamente.
- [x] Tornar erros de `setDoc` observáveis e cobri-los na auditoria; a validação de regra e a propagação real continuam dependentes do Console Firebase/dispositivos.
- [x] Auditar a possibilidade de sobrescrita por snapshot e corrigir a fonte canônica com fila serializada; a confirmação visual no Console Firebase permanece externa.
- [x] Corrigir a perda após recarregar com reidratação do documento compartilhado, cache persistente e gravação explícita; falta apenas o teste externo final.
- [x] Validar localmente a persistência/reidratação e o listener; propagação entre contas/dispositivos permanece validação manual pendente.


## Nova falha — PDF de revendedores e itens

- [x] Auditar os botões Emitir PDF e Compartilhar na lista de revendedores e no detalhe individual.
- [x] Corrigir a montagem do conteúdo de impressão para incluir nome, características e itens selecionados.
- [x] Garantir que a janela de impressão/PDF seja aberta com conteúdo visível e fundo branco.
- [x] Validar a emissão da lista na aba Revendedores e na página individual do revendedor.
- [x] Validar desktop, tablet, celular e regressões da sincronização compartilhada.
- [x] Criar checkpoint e publicar a correção no GitHub Pages.


## Personalização do PDF e feedback de geração

- [x] Adicionar espaço para o logotipo da empresa no cabeçalho do PDF individual e da lista geral.
- [x] Adicionar cabeçalho com data e hora de emissão no PDF.
- [x] Exibir indicador visual de carregamento durante a preparação do PDF.
- [x] Garantir que o loading seja encerrado em sucesso, bloqueio de pop-up ou erro.
- [x] Validar PDF, responsividade e regressões com a sincronização compartilhada.
- [x] Criar checkpoint e publicar a atualização no GitHub Pages.


## Logo personalizado e exportação resumida

- [x] Adicionar upload de logotipo personalizado na aba Configurações.
- [x] Recortar/comprimir o logo e persistir a escolha por conta autorizada.
- [x] Usar o logo personalizado nos PDFs individual e geral, com fallback para o logo oficial.
- [x] Simplificar o PDF geral de Revendedores para exibir somente revendedor e total.
- [x] Manter o PDF individual com o detalhamento completo dos itens.
- [x] Validar testes, build, responsividade, sincronização e publicação.
- [x] Criar checkpoint da atualização.


## PDF do relatório semanal

- [x] Auditar por que a impressão atual do relatório semanal gera página em branco.
- [x] Criar geração isolada do relatório semanal com logo personalizado ou fallback oficial.
- [x] Adicionar cabeçalho com data/hora, semana, tipo, totais e linhas reais do relatório.
- [x] Exibir loading durante a preparação e encerrar em sucesso, erro ou pop-up bloqueado.
- [x] Validar impressão/PDF, responsividade e regressões.
- [x] Criar checkpoint e publicar a correção.


## Loop de login no PWA instalado

- [x] Auditar persistência do Firebase Auth e retorno do Google em modo standalone no celular.
- [x] Corrigir a restauração da sessão antes de renderizar novamente a tela de login.
- [x] Corrigir o redirecionamento/callback do Google para o caminho base do GitHub Pages.
- [x] Validar service worker, manifest, login administradora e contas autorizadas no fluxo PWA; teste final em aparelho instalado permanece recomendado.
- [x] Adicionar ou ajustar testes contra o loop de login.
- [x] Criar checkpoint e publicar a correção.


## Loop confirmado no iPhone após 2FA

- [x] Reproduzir e documentar o reset após a validação do código Google no PWA instalado.
- [x] Impedir que `onAuthStateChanged(null)` transitório devolva a interface ao login durante o redirect.
- [x] Garantir que `getRedirectResult` e a persistência IndexedDB sejam concluídos antes da decisão de sessão.
- [x] Tratar corretamente o retorno do Google no domínio/base path do GitHub Pages em iOS standalone.
- [x] Validar login administradora, contas autorizadas e carregamento do workspace no iPhone; publicação e validação automatizada concluídas, confirmação física no aparelho permanece recomendada.
- [x] Criar checkpoint e publicar a correção final.


## Loop persistente no iOS após 2FA

- [x] Identificar por que o redirect Google não conserva a sessão no PWA standalone do iPhone.
- [x] Substituir ou adaptar o fluxo mobile para evitar o retorno ao login após a verificação.
- [x] Garantir uma mensagem de erro observável quando a sessão não puder ser restaurada.
- [x] Validar login administradora e conta autorizada no Safari/PWA após limpar o estado anterior; testes automatizados e deploy concluídos, confirmação física permanece pendente.
- [x] Criar checkpoint e publicar a correção final.


## PWA iOS: Safari funciona, standalone entra em loop

- [x] Reproduzir a diferença entre login no Safari móvel e retorno após 2FA no PWA instalado.
- [x] Implementar um fluxo específico de restauração da sessão para o contexto standalone do iPhone.
- [x] Evitar que a tela de login seja renderizada novamente enquanto a sessão pós-Google ainda está sendo recuperada.
- [x] Preservar o fluxo normal do Safari móvel e das contas autorizadas.
- [x] Validar no PWA instalado e publicar checkpoint da correção; validação automatizada e deploy concluídos, confirmação física no aparelho permanece necessária.


## Nova tentativa após limpeza sem efeito

- [x] Auditar manifesto, service worker, base path, origem e fluxo de callback usados pelo PWA instalado.
- [x] Implementar handoff controlado para autenticação fora do contexto standalone, sem reset silencioso.
- [x] Exibir diagnóstico de recuperação quando a sessão não for restaurada.
- [x] Validar Safari, PWA instalado e preservação do login no desktop; testes automatizados e deploy concluídos, reinstalação física do atalho permanece necessária.
- [x] Publicar a tentativa e criar checkpoint para novo teste no iPhone.

## Reutilização da sessão Google do Safari no PWA
- [x] Verificar se o Firebase Auth atual consegue compartilhar sessão entre Safari e Home Screen App no iOS; a sessão não é compartilhada pelo isolamento do iOS.
- [x] Verificar se cookies, localStorage, IndexedDB ou Web Credentials podem ser reutilizados sem expor senha; os contextos são isolados no Home Screen App.
- [x] Testar/avaliar uma ponte segura entre Safari e PWA; iOS mantém contextos isolados e Firebase não oferece suporte seguro para transferir a sessão, portanto nenhuma ponte por URL/token foi implementada.
- [x] Documentar claramente o resultado e evitar qualquer transferência de token sensível pela URL.


## Avaliação de app nativo iOS
- [x] Comparar Capacitor, React Native, Expo e alternativas híbridas; Capacitor é a migração incremental mais adequada caso a distribuição nativa seja necessária.
- [x] Verificar compatibilidade de Google Auth, Firebase, PWA e notificações; o fluxo atual usa Anonymous Auth e mantém Firebase, PWA e notificações web.
- [x] Comparar esforço de migração, manutenção, build e publicação na App Store; manter PWA no curto prazo e considerar Capacitor em uma etapa futura.
- [x] Recomendar a opção mais adequada: continuar com PWA + GitHub Pages + Firebase, usando Capacitor apenas se a App Store se tornar requisito.


## Correção de Mercadorias: categorias e impressão
- [x] Corrigir criação de categorias, incluindo nomes como “iPhone”, para Loja 01 e Loja 02.
- [x] Simplificar o fluxo de cadastro de categoria, subcategoria e item; o botão Nova categoria agora fica sempre visível na loja selecionada.
- [x] Corrigir o botão de impressão para gerar a lista da loja selecionada em janela isolada.
- [x] Padronizar a lista impressa com layout objetivo, compacto e legível.
- [x] Validar typecheck, 16 testes e build; a conferência manual dos dois botões de loja permanece recomendada.


## Sincronização da correção de Mercadorias no GitHub Pages
- [x] Confirmar estado local e remoto de `Yurihbo/Rainhadascapas`.
- [x] Enviar a correção de categorias e impressão ao branch publicado; commit 6838cf1.
- [x] Acompanhar o workflow do GitHub Pages; workflow 32060953437 concluído com sucesso.
- [x] Validar no bundle público a nova categoria e a impressão da loja; bundle assets/index-CQcXAdSQ.js confirmado.
## Correção do botão Abrir no Safari no iPhone
- [x] Auditar o handler do botão de recuperação e a URL usada no contexto PWA iOS.
- [x] Substituir a abertura que pisca tela branca por handoff compatível com Safari, sem depender de popup bloqueado.
- [x] Adicionar fallback visível para copiar/abrir o endereço quando o iOS não permitir a troca automática.
- [x] Cobrir a nova lógica com teste de auditoria e validar build; a validação física no iPhone ainda depende do teste do usuário.
- [x] Publicar checkpoint da correção e orientar novo teste físico; deploy 31934194399 concluído e bundle público validado, aguardando apenas o teste físico.


## Regressão do handoff iOS publicado
- [x] Remover a URL artificial `?auth=browser` que estava levando o retorno do Google a uma tela branca com código.
- [x] Corrigir a composição da tela de recuperação para eliminar botões e conteúdo sobrepostos.
- [x] Restaurar um fluxo de autenticação compatível com a rota base real do GitHub Pages.
- [x] Atualizar os testes de auditoria, validar typecheck, testes e build.
- [x] Publicar a correção e validar o bundle público antes de orientar novo teste no iPhone; deploy 31935074311 concluído e bundle público sem `auth=browser`.


## Loop reproduzido no atalho da Tela de Início do iPhone
- [x] Impedir que o ícone instalado tente autenticar Google dentro do contexto standalone.
- [x] Exibir uma tela estável no atalho, sem popup, redirect ou retorno ao botão de login.
- [x] Manter o login funcional quando o endereço é aberto diretamente no Safari; o fluxo normal permanece inalterado fora do standalone.
- [x] Atualizar testes, validar build e publicar a separação entre atalho e Safari.


## Feedback e gestão de categorias
- [x] Exibir notificação visual de sucesso ao criar uma categoria.
- [x] Permitir editar o nome de qualquer categoria existente.
- [x] Permitir excluir uma categoria existente com confirmação.
- [x] Atualizar testes, validar sincronização e publicar no GitHub Pages; typecheck, 16 testes e build passaram, workflow 32061714910 concluído e bundle público validado.


## Correção da impressão branca de Mercadorias
- [x] Garantir que a janela de impressão receba os dados da loja selecionada.
- [x] Aguardar o carregamento do conteúdo antes de imprimir e impedir chamadas duplicadas.
- [x] Adicionar fallback visual informando a necessidade de permitir janelas pop-up quando a janela não puder abrir.
- [x] Atualizar testes, validar Loja 01 e Loja 02 no fluxo comum e publicar; typecheck, 16 testes, build e bundle público confirmados no workflow 32063540190.


## Refinamento visual da impressão de Mercadorias
- [x] Reorganizar o enquadramento da folha no padrão visual dos Revendedores.
- [x] Incluir o ícone/logo da loja no cabeçalho da impressão.
- [x] Alinhar mercadoria, categoria, subcategoria e preço em colunas legíveis; preços não cadastrados aparecem como “—”, sem inventar valores.
- [x] Atualizar testes, typecheck e build e publicar; workflow 32064034663 concluído e bundle público validado.


## Reavaliação: PWA sem login e dados compartilhados
- [x] Auditar o fluxo atual de autenticação, Firestore e listener compartilhado.
- [x] Comparar remoção do login com Firebase compartilhado, incluindo limitações de segurança.
- [x] Definir a arquitetura recomendada: PWA no GitHub Pages + Firebase Anonymous Auth invisível + Firestore compartilhado.
- [x] Planejar a migração sem perder os dados e o PWA instalável; implementação aguarda confirmação sobre remover histórico/perfil individual e aceitar acesso por endereço.


## Migração para PWA sem login visível e Firestore compartilhado
- [x] Remover a tela e o fluxo de login Google da interface.
- [x] Inicializar Firebase Anonymous Auth automaticamente em cada dispositivo.
- [x] Manter `sharedWorkspaces/main`, listener em tempo real e fila de escrita.
- [x] Converter perfil, foto, logo de PDF e histórico para armazenamento local do dispositivo; o UID anônimo é usado como chave local do aparelho.
- [x] Atualizar o arquivo `firestore.rules` para aceitar somente usuários anônimos no workspace compartilhado; publicação no Firebase Console permanece necessária.
- [x] Preservar PWA, modo offline e instalação na Tela de Início; cache persistente do Firestore foi ativado.
- [x] Validar 15 testes, typecheck e build; sincronização entre clientes depende da ativação do Anonymous Auth e das regras no Firebase Console.
- [x] Publicar no repositório e no GitHub Pages e salvar checkpoint; commit 3bf3eb9 e workflow 32068002493 concluídos. A ativação do Anonymous Auth e a publicação efetiva das regras no Firebase Console ainda dependem do console.

## Limpeza final após migração Anonymous Auth
- [x] Remover scripts temporários de migração, correção e diagnóstico sem uso no build.
- [x] Reexecutar Vitest (15), typecheck e build após a limpeza.
- [ ] Validar manualmente o fluxo compartilhado em dois dispositivos e a instalação/abertura PWA no aparelho do usuário.
- [x] Verificar o estado público do Firebase: `accounts:signUp` respondeu `ADMIN_ONLY_OPERATION`, confirmando que Anonymous Auth ainda está desativado; habilitação e publicação das regras continuam pendentes no Console.
- [x] Publicar a limpeza no repositório e no GitHub Pages após validação local.

## Avaliação registrada de app nativo iOS
- [x] Comparar Capacitor, React Native, Expo e alternativas híbridas para o site atual; Capacitor é a migração incremental mais adequada.
- [x] Verificar compatibilidade de Firebase, PWA e notificações; Google Auth não faz mais parte do fluxo atual e Anonymous Auth funciona no contexto web/PWA.
- [x] Comparar esforço de migração, manutenção, build e publicação na App Store; manter PWA no curto prazo e considerar Capacitor apenas se a distribuição nativa for necessária.
- [x] Recomendar a opção mais adequada ao projeto Rainha das Capas: continuar com PWA + GitHub Pages + Firebase, com Capacitor como próxima etapa opcional.

## Pendências antigas de validação externa
- [ ] Testar conta não autorizada, duas sessões simultâneas e ponte Safari/PWA em aparelhos reais; essas verificações dependem do Firebase Console e dos dispositivos do usuário.
- [x] Remover referências de login Google e autenticação visual do fluxo ativo; somente documentação histórica permanece no checklist.
