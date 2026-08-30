# Documentação — Rainha das Capas

## 1. Visão geral

Rainha das Capas é um sistema de gestão comercial desenvolvido para centralizar a operação de uma loja que trabalha com revendedores, mercadorias e controle financeiro.

A aplicação organiza a operação em módulos independentes conectados por uma camada de dados compartilhada.

## 2. Módulos

### Dashboard

Responsável pela visão consolidada da operação.

Apresenta indicadores financeiros, quantidade de revendedores, pedidos, recebimentos e movimentações.

### Revendedores

Gerenciamento dos parceiros comerciais e seus registros.

### Mercadorias

Controle dos itens comercializados.

### Pagamentos

Gerenciamento dos lançamentos financeiros e seus estados.

### Semanas

Organização dos períodos de operação e histórico.

### Relatórios

Consolidação das movimentações e informações financeiras de cada período.

### Configurações

Preferências e configurações gerais da aplicação.

### Meu perfil

Informações e personalização do perfil utilizado na operação.

## 3. Dados

A camada de persistência utiliza Firebase/Firestore para sincronização em tempo real.

O documento principal do workspace compartilhado é:

```text
sharedWorkspaces/main
```

O listener do Firestore mantém os clientes sincronizados.

## 4. Autenticação

A versão atual utiliza Firebase Anonymous Authentication.

Cada dispositivo recebe uma identidade técnica anônima, enquanto o vínculo operacional acontece através do workspace compartilhado.

Não existe uma tela de login convencional no fluxo atual.

## 5. Regras do Firestore

As regras limitam o acesso aos documentos permitidos e exigem uma sessão autenticada anonimamente.

A regra geral bloqueia caminhos que não estejam explicitamente autorizados.

## 6. Frontend

O frontend utiliza React 19 com TypeScript e Vite.

A interface utiliza componentes reutilizáveis e bibliotecas especializadas para:

- formulários;
- menus;
- diálogos;
- tabelas;
- gráficos;
- notificações;
- animações;
- navegação.

## 7. Gráficos

O dashboard utiliza Recharts para representação visual de movimentações e indicadores.

## 8. PWA

O projeto disponibiliza recursos de Progressive Web App através de manifesto, Service Worker e mecanismos de cache.

O objetivo é permitir que a aplicação seja instalada e continue funcional em cenários de conectividade limitada.

## 9. Build

O processo de build utiliza Vite para o frontend e esbuild para empacotamento do servidor.

```bash
pnpm run build
```

## 10. Testes

Os testes são executados através do Vitest:

```bash
pnpm test
```

A verificação estática do TypeScript pode ser executada com:

```bash
pnpm exec tsc --noEmit
```

## 11. Variáveis de ambiente

A configuração do Firebase é carregada através de variáveis Vite.

Exemplos:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

Chaves privadas, tokens administrativos e credenciais de servidor não devem ser armazenados no repositório.

## 12. Publicação

O projeto possui workflow de GitHub Actions para geração e publicação do build.

A aplicação publicada utiliza o caminho base configurado pelo Vite para funcionar corretamente no GitHub Pages.

## 13. Portfólio e proteção do código

Quando o projeto for utilizado como demonstração de portfólio, recomenda-se separar:

```text
Repositório privado
    └── Código-fonte completo
    └── Configurações operacionais
    └── Infraestrutura
    └── Desenvolvimento

Repositório público
    └── README
    └── Screenshots
    └── Documentação
    └── Descrição técnica
```

Essa estrutura permite apresentar o projeto profissionalmente sem disponibilizar publicamente toda a implementação comercial.

## 14. Screenshots

As imagens desta documentação representam as principais áreas da aplicação:

- Dashboard
- Histórico de semanas
- Controle de pagamentos
