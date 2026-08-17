# Rainha das Capas — Gestão Comercial

Aplicação PWA para gestão de revendedores, itens, pagamentos, relatórios semanais, catálogo e colaboração em tempo real da Rainha das Capas. A interface usa o design **Black Label ERP**, com superfícies grafite, acentos dourados, perfil editável, modo claro/escuro, operação responsiva e recursos offline do PWA.

## Arquitetura atual

A publicação final foi preparada para **GitHub Pages + Firebase**. O GitHub Pages entrega os arquivos estáticos da aplicação, enquanto o Firebase fornece Anonymous Auth automático, Firestore em tempo real e cache offline. Não há servidor Node obrigatório para a versão publicada no Pages.

| Necessidade | Implementação |
|---|---|
| Hospedagem da interface | GitHub Pages pela branch `main` e GitHub Actions |
| Acesso técnico | Firebase Anonymous Auth iniciado automaticamente em cada dispositivo |
| Interface de login | Não existe tela de login; o acesso é iniciado pelo aplicativo |
| Privacidade | O endereço funciona como chave operacional; qualquer pessoa que descubra o link poderá tentar acessar o workspace |
| Dados compartilhados | Documento `sharedWorkspaces/main` no Cloud Firestore |
| Tempo real | Listener `onSnapshot` do Firestore |
| PWA | Manifesto, service worker, instalação e atualização do aplicativo |
| Trabalho sem conexão | Cache do PWA e reidratação do workspace local até a reconexão |

O repositório oficial é [Yurihbo/Rainhadascapas](https://github.com/Yurihbo/Rainhadascapas), na branch `main`.

## Acesso automático

Cada dispositivo inicia uma identidade técnica anônima automaticamente. Os dispositivos não compartilham o mesmo UID; o vínculo entre eles ocorre porque todos leem e gravam o documento compartilhado `sharedWorkspaces/main`. Como não há allowlist nem login visível, o projeto deve ser tratado como uma operação privada por endereço. Não compartilhe o link publicamente.

## Configuração do Firebase

No [Firebase Console](https://console.firebase.google.com/), abra o projeto `rainhadascapas-5a49a` e habilite **Authentication → Sign-in method → Anonymous**. Em **Authentication → Settings → Authorized domains**, mantenha o domínio do GitHub Pages, normalmente `yurihbo.github.io`, e qualquer domínio personalizado utilizado posteriormente.

Em **Firestore Database → Rules**, publique o conteúdo de `firestore.rules`. As regras aceitam apenas sessões anônimas no documento `sharedWorkspaces/main` e negam qualquer outro caminho. O Firestore deve continuar habilitado para o documento compartilhado.

A configuração pública do Firebase é lida por variáveis Vite. Os valores podem ficar no ambiente de build do GitHub Actions porque não são credenciais privadas; a proteção operacional está nas regras do Firestore e no caráter privado do endereço.

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

O desenvolvimento abre a aplicação em `http://localhost:3000`. Para testar o acesso localmente, adicione `localhost` aos domínios autorizados do Firebase. O aplicativo inicia Anonymous Auth automaticamente, sem popup ou ação de login.

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` instala as dependências, gera o build estático e publica o diretório de saída no Pages. A aplicação utiliza `import.meta.env.BASE_URL` para calcular o caminho do manifesto e do service worker quando o endereço contém `/Rainhadascapas/`.

Após a publicação, abra o endereço do Pages. O acesso será iniciado automaticamente, sem botão de login. Em dois dispositivos, faça uma alteração em um deles e confirme que ela aparece no outro pelo listener do Firestore.

## Operação compartilhada e perfil

As alterações em revendedores, itens, pagamentos e catálogo são gravadas no workspace principal e distribuídas pelo listener do Firestore aos dispositivos conectados. O perfil, a foto e o logo de PDF são configurações locais do aparelho. O módulo **Meu perfil** permite alterar nome e foto; a foto é recortada para quadrado e comprimida no navegador antes do salvamento local. **Configurações** mantém notificações, atualização do PWA e a alternância persistente entre modo claro e modo escuro premium.

## Validação

A validação local inclui typecheck, build de produção e testes Vitest. No Firebase Console, confirme a habilitação de Anonymous Auth e publique `firestore.rules`. Depois, abra o mesmo endereço em dois dispositivos: uma alteração de pagamento, cadastro ou mercadoria deve aparecer no outro sem recarregar a página.
