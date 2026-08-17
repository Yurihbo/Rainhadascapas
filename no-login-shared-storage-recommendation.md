# Arquitetura recomendada: PWA sem login e dados compartilhados

## Conclusão

É possível remover o login Google e manter o PWA instalado no GitHub Pages, mas o GitHub Pages não é um banco de dados. Para que alterações feitas em um celular apareçam em outro, o aplicativo ainda precisa de um serviço externo, como o Firestore já integrado ao projeto.

A recomendação para este caso privado é usar **Firebase Anonymous Authentication + Firestore compartilhado**. O usuário não vê tela de login, e o Firebase cria uma identidade temporária para autorizar o aplicativo. O Firestore continua sendo a fonte compartilhada entre os dispositivos, enquanto o PWA continua sendo servido pelo GitHub Pages.

## Comparação

| Opção | Compartilha entre dispositivos | Login visível | Segurança | Recomendação |
|---|---:|---:|---|---|
| GitHub Pages + localStorage | Não | Não | Apenas local | Não atende ao vínculo |
| GitHub Pages + Firebase anônimo + Firestore | Sim | Não | Baixa a moderada; qualquer cliente do projeto pode ser autorizado conforme as regras | **Recomendada para operação privada** |
| GitHub Pages + Firestore sem qualquer autenticação | Sim | Não | Fraca; regras não conseguem distinguir clientes | Evitar |
| GitHub Pages + Google Auth + Firestore | Sim | Sim | Mais forte | Tecnicamente possível, mas o PWA iOS apresentou a limitação do contexto isolado |
| Backend próprio + sessão/código | Sim | Opcional | Configurável | Mais complexo e exige hospedagem de backend |

## O que já existe no projeto

O código já contém o listener `onSnapshot`, a fila de escrita serializada e o documento compartilhado `sharedWorkspaces/main`. Portanto, a parte mais valiosa da sincronização pode ser preservada. O que precisa mudar é o gate de autenticação: atualmente a interface espera uma sessão Google autorizada e as regras exigem um e-mail da allowlist.

A migração sem login deve substituir esse gate por uma chamada a `signInAnonymously`, remover a tela de Google e ajustar as regras do Firestore para aceitar usuários anônimos apenas no documento compartilhado. Também é necessário remover as referências de perfil e atividades que dependem de `session.user.uid`, substituindo-as por configurações locais do dispositivo ou desativando o histórico individual.

## Limitações importantes

A autenticação anônima não transforma o site em privado. Ela apenas cria uma identidade técnica temporária para que as regras do Firebase possam autorizar o cliente. Se o endereço público for descoberto, outra pessoa poderá tentar usar o mesmo projeto. Para um site realmente privado, seria necessário manter alguma forma de autenticação, um código validado por backend ou uma rede privada.

O Firestore também oferece persistência offline na web. O cache local permite ler e alterar dados sem conexão e sincronizar quando a conexão retornar; no web, a persistência precisa ser configurada e o cache permanece no dispositivo até ser limpo [1]. A sincronização entre aparelhos ocorre pelo backend do Firestore, não pelo cache do navegador.

## Recomendação prática

Para o objetivo descrito, eu recomendo **remover o Google Auth da interface, manter o PWA e preservar o Firestore com autenticação anônima invisível**. Essa solução é mais simples do que continuar tentando fazer a sessão Google do Safari atravessar o contexto do PWA iOS. Ela mantém o vínculo entre dispositivos e preserva o funcionamento do GitHub Pages.

Antes de aplicar a migração, é necessário confirmar duas decisões: se o usuário aceita que qualquer pessoa que obtenha o endereço possa potencialmente acessar o workspace, e se o histórico individual, perfil por conta e allowlist de cinco e-mails podem ser removidos ou convertidos em dados locais do aparelho.

## Referências

[1]: https://firebase.google.com/docs/firestore/manage-data/enable-offline "Firebase — Access data offline"
[2]: https://firebase.google.com/docs/auth/web/anonymous-auth "Firebase — Authenticate with Firebase Anonymously Using JavaScript"
[3]: https://firebase.google.com/docs/rules/rules-and-auth "Firebase — Security Rules and Authentication"
