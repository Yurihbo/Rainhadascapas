# Direção visual — Rainha das Capas

## Abordagens consideradas

### Theme Name: Black Label ERP
Very Brief Intro: Um painel escuro e editorial, com dourado preciso, inspirado em etiquetas premium e operações de atacado. A interface transmite controle, exclusividade e ritmo de negócio.
Probability: 0.07

### Theme Name: Ivory Ledger
Very Brief Intro: Uma experiência clara de escritório, com papel marfim, azul petróleo e detalhes dourados, evocando livros-caixa bem cuidados e uma operação transparente.
Probability: 0.03

### Theme Name: Carbon Atelier
Very Brief Intro: Uma linguagem quase industrial, com carvão, cobre e superfícies técnicas, equilibrando a autoridade de um ERP com pequenos gestos de oficina e inventário.
Probability: 0.09

## Abordagem escolhida: Black Label ERP

### Design Movement
Editorial luxury utilitarianism: uma fusão entre design editorial de alto contraste, dashboards de operações e materiais premium de varejo.

### Core Principles
1. O dado é protagonista: números, status e próximos passos têm hierarquia mais forte que ornamentos.
2. O dourado é sinal, não preenchimento: ele marca ação, seleção, progresso e valor sem transformar tudo em brilho.
3. A estrutura é assimétrica e modular: uma barra lateral forte organiza o sistema, enquanto o conteúdo respira em blocos com pesos diferentes.
4. Toda ação deve parecer reversível e segura: estados, feedbacks e microinterações deixam claro o que mudou.

### Color Philosophy
O preto profundo (#0F0F0F) cria um palco calmo para a operação, enquanto o dourado Rainha (#C9A227) funciona como uma assinatura de confiança e prosperidade. Branco quente e cinzas minerais preservam a legibilidade; vermelho, verde e âmbar ficam reservados para situações financeiras, evitando ruído cromático.

### Layout Paradigm
Persistent sidebar + command header + asymmetric dashboard canvas. O conteúdo começa com uma faixa de contexto e se distribui em uma grade editorial irregular: um bloco principal de fluxo semanal, indicadores compactos e uma coluna de ações rápidas. Em telas menores, a barra lateral se transforma em navegação inferior e os blocos empilham sem perder a ordem de leitura.

### Signature Elements
- Filetes dourados de 1px e pequenos marcadores de seção, lembrando etiquetas de catálogo.
- Cartões em carvão com cantos moderados e sombras suaves, nunca excessivamente arredondados.
- Tipografia numérica grande, com pequenos rótulos em caixa alta e tracking generoso.

### Interaction Philosophy
A interface responde com discrição: hover revela contexto, active confirma toque e toasts registram conclusão. Ações primárias têm dourado sólido; ações secundárias usam contorno e texto claro. Estados financeiros são imediatamente reconhecíveis e nunca dependem somente de cor.

### Animation
Entradas de conteúdo usam fade + deslocamento vertical curto, em cascata de 40ms. Hover desloca cartões no máximo 2px e aumenta contraste. Modais e drawers entram em 220ms com easing ease-out. Nenhuma animação deve alterar layout de forma brusca, e prefers-reduced-motion desativa efeitos não essenciais.

### Typography System
Headlines: Playfair Display, em pesos 500–600, para dar assinatura editorial aos títulos de página. Interface e dados: DM Sans, em pesos 400–700, para legibilidade operacional. Números-chave usam DM Sans com peso 700 e tracking levemente negativo; labels usam 11–12px, uppercase e letter-spacing de 0.12em.

### Brand Essence
A central de comando para a distribuidora que transforma pedidos, pagamentos e estoque em uma operação atacadista mais previsível — feita para quem vende com volume e quer enxergar cada detalhe. Personalidade: precisa, elegante, resolutiva.

### Brand Voice
Headlines são diretas e seguras; CTAs usam verbos de ação; microcopy é curta, humana e operacional. Evitar promessas genéricas ou linguagem de startup.

Exemplo de headline: “A semana sob controle.”
Exemplo de CTA: “Registrar movimento”.

### Wordmark & Logo
O símbolo é uma coroa geométrica de três pontas, construída a partir de duas capas sobrepostas: uma forma aberta sugere proteção, enquanto a ponta central marca liderança. O wordmark “RAINHA DAS CAPAS” usa caixa alta compacta com espaçamento amplo e uma linha dourada fina abaixo.

### Signature Brand Color
Rainha Gold — #C9A227. Um dourado terroso e proprietário, usado para orientar a operação e não para decorar cada superfície.

## Decisões de implementação

A primeira entrega será uma experiência frontend navegável, com dados demonstrativos claramente tratados como estado inicial de interface. O shell incluirá dashboard, revendedores, relatórios, pagamentos, mercadorias, semanas e configurações; ações essenciais terão feedback visual. Persistência real, login, banco seguro, sincronização offline e emissão efetiva de PDFs exigem backend e integração posterior, portanto serão representados nesta fase por fluxos de UI preparados para evolução.

## Style Decisions

As superfícies operacionais do dashboard usam carvão e grafite como base; branco e marfim aparecem apenas como contraste deliberado. A hierarquia prioriza valores-chave, status financeiro e próxima ação. O Rainha Gold #C9A227 fica reservado para navegação selecionada, ações primárias, progresso, linha do gráfico e filetes editoriais; verde, vermelho e âmbar comunicam apenas estados financeiros.
