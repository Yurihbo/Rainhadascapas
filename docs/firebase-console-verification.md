# Verificação do Firebase Console

Em 14 de agosto de 2026, o projeto `rainhadascapas-5a49a` foi aberto no Firebase Console com a conta proprietária autorizada.

A tela **Authentication → Sign-in method** mostrou os provedores **Google** e **Anonymous** como `Enabled`.

A tela **Cloud Firestore → Data** mostrou que o banco padrão está criado e pronto para uso, sem coleções iniciais, na região `southamerica-east1`. O próximo passo de segurança é publicar o conteúdo de `firestore.rules` neste banco.

A aba **Rules** foi aberta no mesmo console autenticado e o editor apareceu em carregamento; ainda não há confirmação de publicação das regras. A publicação será considerada concluída somente quando o console mostrar o editor e o botão de publicar, seguido de uma validação real pelo aplicativo.

O editor de regras carregou com a política padrão `allow read, write: if false`. O botão **Edit rules** está disponível; a próxima ação autorizada é substituir esse conteúdo pelas regras versionadas em `firestore.rules` e publicar.

Durante a edição, o campo `textarea[aria-label="Edit text"]` contém exatamente a regra válida de 26 linhas, mas o editor visual do console mantém linhas residuais de uma edição anterior e acusa chaves extras. A publicação ainda não foi concluída; a solução segura é descartar o rascunho e reabrir o editor para inserir a regra uma única vez.

O frontend grava somente `{ sellers, catalog, updatedAt }` no documento `sharedWorkspaces/main`. A regra com validação de chaves continuou retornando erro desconhecido no console, então a publicação deve ser tentada primeiro com uma política mínima autenticada e depois endurecida no CLI/emulador.

A tentativa alternativa com Firebase CLI 15.27.0 não foi autenticada no sandbox (`Failed to authenticate, have you run firebase login?`). Portanto, não foi possível publicar as regras automaticamente. A configuração local, o SDK, Anonymous Auth e o build permanecem preparados; a publicação das regras exige o console/Cloud Shell autenticado pela conta do usuário.

A publicação foi concluída com sucesso no console Firebase. O histórico agora mostra somente versões com horário, sem “Right now unpublished changes”, e a regra ativa é a política mínima: `allow read, write: if request.auth != null` apenas em `sharedWorkspaces/main`, com bloqueio global dos demais caminhos.

Após a publicação, o preview abriu sem tela de login e exibiu `Operação compartilhada · FireStore · acesso anônimo`, com dashboard e dados do workspace. A conexão de um cliente está validada; a confirmação entre dois navegadores ainda depende de uma segunda sessão/dispositivo.

O preview mostrou o workspace com `FireStore · acesso anônimo` e dados carregados. O console Firebase permanece autenticado na conta proprietária e a aba Rules mostra a política publicada; o Rules Playground foi aberto e está carregando para validação controlada das permissões.

O Rules Playground foi reaberto com a política publicada, sem alterações pendentes. O console permanece autenticado como Yuri de Sousa Silva e o documento protegido é `sharedWorkspaces/main`.

O Rules Playground confirmou: `get` em `sharedWorkspaces/main` com autenticação resulta em “Simulated read allowed”; o mesmo `get` sem autenticação resulta em “Simulated read denied”. Isso valida a proteção principal publicada sem tocar nos dados reais.

O Rules Playground também confirmou `update` autenticado em `sharedWorkspaces/main` como “Simulated write allowed”, sem escrever no banco real. A leitura sem autenticação já havia sido confirmada como negada.

O Rules Playground confirmou `get` autenticado em `other/path` como “Simulated read denied”. Assim, o acesso está limitado ao documento `sharedWorkspaces/main`, sem criar ou alterar dados reais.

O preview iniciou inicialmente em “Conectando ao espaço compartilhado”, mas após aguardar carregou com sucesso como “Visitante · Acesso compartilhado”, exibindo o dashboard e os dados do workspace. Isso confirma a inicialização real do cliente anônimo e a leitura Firestore no preview.
