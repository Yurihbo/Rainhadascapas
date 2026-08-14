# Verificação do Firebase Console

Em 14 de agosto de 2026, o projeto `rainhadascapas-5a49a` foi aberto no Firebase Console com a conta proprietária autorizada.

A tela **Authentication → Sign-in method** mostrou os provedores **Google** e **Anonymous** como `Enabled`.

A tela **Cloud Firestore → Data** mostrou que o banco padrão está criado e pronto para uso, sem coleções iniciais, na região `southamerica-east1`. O próximo passo de segurança é publicar o conteúdo de `firestore.rules` neste banco.

A aba **Rules** foi aberta no mesmo console autenticado e o editor apareceu em carregamento; ainda não há confirmação de publicação das regras. A publicação será considerada concluída somente quando o console mostrar o editor e o botão de publicar, seguido de uma validação real pelo aplicativo.

O editor de regras carregou com a política padrão `allow read, write: if false`. O botão **Edit rules** está disponível; a próxima ação autorizada é substituir esse conteúdo pelas regras versionadas em `firestore.rules` e publicar.

Durante a edição, o campo `textarea[aria-label="Edit text"]` contém exatamente a regra válida de 26 linhas, mas o editor visual do console mantém linhas residuais de uma edição anterior e acusa chaves extras. A publicação ainda não foi concluída; a solução segura é descartar o rascunho e reabrir o editor para inserir a regra uma única vez.

O frontend grava somente `{ sellers, catalog, updatedAt }` no documento `sharedWorkspaces/main`. A regra com validação de chaves continuou retornando erro desconhecido no console, então a publicação deve ser tentada primeiro com uma política mínima autenticada e depois endurecida no CLI/emulador.
