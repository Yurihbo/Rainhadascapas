# Rainha das Capas — Gestão Comercial

Aplicação PWA para gestão de revendedores, itens, pagamentos, relatórios semanais, catálogo e colaboração em tempo real da Rainha das Capas. A interface usa o design **Black Label ERP**, com superfícies grafite, acentos dourados, perfil editável, modo claro/escuro, operação responsiva e recursos offline do PWA.

## Arquitetura atual

A publicação final foi preparada para **GitHub Pages + Firebase**. O GitHub Pages entrega os arquivos estáticos da aplicação, enquanto o Firebase fornece autenticação Google, Firestore em tempo real e proteção das regras. Não há servidor Node obrigatório para a versão publicada no Pages.

| Necessidade | Implementação |
|---|---|
| Hospedagem da interface | GitHub Pages pela branch `main` e GitHub Actions |
| Login | Firebase Authentication com provedor Google |
| Acesso privado | Allowlist de cinco contas Google autorizadas no frontend e nas regras Firestore |
| Dados compartilhados | Documento `sharedWorkspaces/main` no Cloud Firestore |
| Tempo real | Listener `onSnapshot` do Firestore |
| PWA | Manifesto, service worker, instalação e atualização do aplicativo |
| Trabalho sem conexão | Cache do PWA e reidratação do workspace local até a reconexão |

O repositório oficial é [Yurihbo/Rainhadascapas](https://github.com/Yurihbo/Rainhadascapas), na branch `main`.

## Contas autorizadas

A política atual permite somente as cinco contas fornecidas pelo administrador. A conta `yuridesousasilva@gmail.com` é a administradora principal. A mesma lista está refletida em `client/src/lib/sharedWorkspace.ts` e em `firestore.rules`; se a equipe mudar, os dois arquivos devem ser atualizados juntos e as regras precisam ser publicadas novamente no Firebase Console.

## Configuração do Firebase

No [Firebase Console](https://console.firebase.google.com/), abra o projeto `rainhadascapas-5a49a` e habilite **Authentication → Sign-in method → Google**. Em **Authentication → Settings → Authorized domains**, adicione o domínio do GitHub Pages, normalmente `yurihbo.github.io`, e qualquer domínio personalizado utilizado posteriormente.

Em **Firestore Database → Rules**, publique o conteúdo de `firestore.rules`. As regras negam sessões anônimas, contas fora da allowlist e qualquer caminho que não seja `sharedWorkspaces/main`. A aplicação não deve voltar a habilitar Anonymous Auth como mecanismo de acesso.

A configuração pública do Firebase é lida por variáveis Vite. Os valores podem ficar no ambiente de build do GitHub Actions porque não são credenciais privadas; a proteção real está nas regras do Firestore e na lista de contas autorizadas.

| Variável | Finalidade |
|---|---|
| `VITE_FIREBASE_API_KEY` | Chave pública do aplicativo Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domínio do Authentication |
| `VITE_FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket configurado no projeto |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Identificador de mensagens Firebase |
| `VITE_FIREBASE_APP_ID` | Identificador do aplicativo web |
| `VITE_FIREBASE_MEASUREMENT_ID` | Identificador opcional do Analytics |

Os valores padrão existentes correspondem ao projeto `rainhadascapas-5a49a`. Em um fork ou novo projeto, substitua-os por variáveis no ambiente de build e nunca grave credenciais privadas no repositório.

## Desenvolvimento local

Instale Node.js 22 ou superior e pnpm. Depois, execute:

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm test
pnpm run build
pnpm dev
```

O desenvolvimento abre a aplicação em `http://localhost:3000`. Para testar o login localmente, adicione `localhost` aos domínios autorizados do Firebase. O login Google usa popup e pode exigir que o navegador permita popups para o endereço local.

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` instala as dependências, gera o build estático e publica o diretório de saída no Pages. A aplicação utiliza `import.meta.env.BASE_URL` para calcular o caminho do manifesto e do service worker quando o endereço contém `/Rainhadascapas/`.

Após a publicação, abra o endereço do Pages, selecione **Entrar com Google** e use uma das contas autorizadas. Uma conta fora da allowlist será desconectada imediatamente e não conseguirá ler nem gravar o Firestore.

## Operação compartilhada e perfil

As alterações em revendedores, itens, pagamentos e catálogo são gravadas no workspace principal e distribuídas pelo listener do Firestore aos usuários autorizados. O módulo **Meu perfil** permite alterar nome e foto; a foto é recortada para quadrado e comprimida no navegador antes do salvamento local. **Configurações** mantém notificações, atualização do PWA e a alternância persistente entre modo claro e modo escuro premium.

## Validação

A validação local atual inclui typecheck, build de produção e oito testes Vitest. Ainda é necessário concluir no Firebase Console a habilitação do provedor Google e a publicação da versão atual de `firestore.rules`, caso essas duas ações ainda não tenham sido feitas após esta alteração. Depois disso, valide com duas contas autorizadas em navegadores diferentes: uma alteração de pagamento ou cadastro deve aparecer sem recarregar a página.
