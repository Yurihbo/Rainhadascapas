# Rainha das Capas — Gestão Comercial

Aplicação PWA full-stack para gestão de revendedores, itens, pagamentos, relatórios semanais, catálogo, usuários e operações offline da Rainha das Capas.

## Arquitetura de publicação

A versão funcional utiliza React, servidor Express, tRPC, OAuth, banco MySQL/TiDB, armazenamento e service worker. Por isso, **não deve ser publicada diretamente no GitHub Pages**: o Pages hospeda arquivos estáticos e não executa o servidor, as procedures tRPC, as sessões OAuth nem o banco de dados.

| Necessidade | Publicação adequada |
|---|---|
| Interface estática sem login ou banco | GitHub Pages, com funcionalidades limitadas |
| Login Google, usuários, permissões e sessões | Hospedagem full-stack compatível com Node.js |
| Revendedores, itens, pagamentos e sincronização offline persistida | Hospedagem full-stack com MySQL/TiDB |
| PWA instalável | Hospedagem HTTPS com o manifesto e o service worker publicados |

A versão completa está no repositório [Yurihbo/Rainhadascapas](https://github.com/Yurihbo/Rainhadascapas), na branch `main`. Para preservar o login e a persistência, publique essa versão em um ambiente full-stack, como o hosting integrado do projeto ou outro provedor Node.js compatível.

## Execução local

Instale Node.js 22 ou superior e pnpm. Depois, execute:

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm dev
```

O servidor não deve ter uma porta fixa em produção. A porta é fornecida pelo ambiente de hospedagem.

## Variáveis necessárias

A versão funcional precisa receber as variáveis abaixo no ambiente de execução. Os valores não devem ser gravados no GitHub nem em arquivos `.env` versionados.

| Variável | Finalidade |
|---|---|
| `DATABASE_URL` | Conexão MySQL/TiDB para usuários, atividades, fila offline, revendedores e itens |
| `JWT_SECRET` | Assinatura das sessões |
| `VITE_APP_ID` | Identificação da aplicação OAuth |
| `OAUTH_SERVER_URL` | Servidor OAuth |
| `VITE_OAUTH_PORTAL_URL` | Portal de login exibido no navegador |
| `OWNER_OPEN_ID` | Identificador da conta proprietária, promovida automaticamente a administradora |
| `OWNER_NAME` | Nome da conta proprietária |
| `BUILT_IN_FORGE_API_URL` | Endpoint de serviços internos necessários ao backend |
| `BUILT_IN_FORGE_API_KEY` | Credencial privada do backend |
| `VITE_FRONTEND_FORGE_API_URL` | Endpoint público necessário ao frontend |
| `VITE_FRONTEND_FORGE_API_KEY` | Credencial pública do frontend |
| `VITE_ANALYTICS_ENDPOINT` | Endpoint opcional de métricas |
| `VITE_ANALYTICS_WEBSITE_ID` | Identificador opcional de métricas |
| `VITE_APP_TITLE` | Título do aplicativo |
| `VITE_APP_LOGO` | Logo configurada para o aplicativo |

Configure também as URLs de retorno OAuth para o domínio final, incluindo o callback `/api/oauth/callback`, conforme o provedor de autenticação utilizado.

## Banco de dados

Após configurar `DATABASE_URL`, gere e aplique as migrações de forma controlada:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

As tabelas principais incluem `users`, `userActivities`, `offlineOperations`, `sellers` e `sellerItems`. A sincronização offline utiliza identificadores de operação e de cliente para evitar duplicidade durante novas tentativas.

## Publicação full-stack

O fluxo recomendado é instalar as dependências, configurar os segredos no ambiente de produção, aplicar as migrações, executar os testes e gerar o build. O processo de execução deve iniciar `server/_core/index.ts` com a porta fornecida pelo host. O domínio final precisa usar HTTPS para que OAuth, instalação PWA e service worker funcionem corretamente.

Antes de liberar a aplicação, confirme o login Google, a promoção da conta proprietária, a criação de revendedores e itens, a alteração de pagamentos, a sincronização após ficar offline e a instalação do PWA em celular.

## GitHub Pages — versão limitada

Se o GitHub Pages for obrigatório, ele deve ser tratado somente como uma demonstração estática. Essa publicação não deve prometer login, banco, permissões, relatórios persistidos, sincronização offline com o servidor ou pagamentos persistidos. Para disponibilizar uma versão estática separada, crie uma entrada de build específica, remova as chamadas ao backend e informe visualmente que se trata de uma demonstração sem persistência. Não substitua a versão full-stack por essa variante.

## Estado da validação

A versão enviada foi validada com typecheck, seis testes Vitest e build de produção. As funcionalidades de autenticação, persistência, sincronização offline, PWA e perfil dependem das variáveis de ambiente e do host full-stack configurados corretamente.
