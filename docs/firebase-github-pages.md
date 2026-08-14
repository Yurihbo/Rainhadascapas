# Firebase compartilhado no GitHub Pages

O projeto usa o GitHub Pages apenas para servir o frontend estático. O compartilhamento de dados acontece no Cloud Firestore e cada navegador recebe uma sessão anônima pelo Firebase Authentication. Não existe tela de login e nenhuma senha é solicitada ao usuário.

## Configuração necessária no Firebase Console

No projeto `rainhadascapas-5a49a`, abra **Authentication → Sign-in method** e habilite o provedor **Anonymous**. Depois abra **Firestore Database**, crie o banco na região escolhida e publique o conteúdo de `firestore.rules` pela Firebase CLI ou pelo editor de regras do console.

As regras permitem que usuários autenticados anonimamente leiam e gravem somente o documento compartilhado `sharedWorkspaces/main`. O documento aceita apenas as propriedades `sellers`, `catalog` e `updatedAt`; outras coleções permanecem bloqueadas.

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila o frontend com `VITE_BASE_PATH=/Rainhadascapas/` e publica `dist/public`. No repositório, abra **Settings → Pages**, selecione **GitHub Actions** como fonte e aguarde a execução do workflow da branch `main`.

A URL esperada é:

```text
https://yurihbo.github.io/Rainhadascapas/
```

A configuração pública do Firebase está em `client/src/lib/firebase.ts`, com possibilidade de sobrescrita pelas variáveis `VITE_FIREBASE_*`. Essas informações são próprias de aplicações web Firebase e não substituem credenciais privadas de servidor.

## Verificação

Depois da publicação, abra o site em dois navegadores. Crie ou altere um revendedor em um deles e confirme a atualização no outro. Se a tela indicar que o acesso anônimo está desabilitado, volte ao Firebase Console e habilite o provedor Anonymous. Se aparecer erro de permissão do Firestore, publique novamente `firestore.rules`.

O banco atual guarda apenas dados estruturados de operação. PDFs e compartilhamentos continuam sendo gerados no navegador; não são armazenados como arquivos no Firestore.
