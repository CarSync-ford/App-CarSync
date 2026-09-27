# 03-frontends — Relatório (App-CarSync)

Spec: `03-frontends.md`. Base: branch `feat/cybersecurity`, HEAD `99e2e25877dd25dcd7d1714ffa33b5bea3062be6`.
Detalhe checkpoint a checkpoint em [`STATUS.md`](./STATUS.md).

## Criptografia local — o que muda e o que não muda (R07)

Antes: no web, o JWT ficava em `AsyncStorage` em texto puro (visível direto no DevTools).
Depois: o valor é cifrado com AES (`crypto-js`) antes de gravar; a chave de cifra fica numa entrada
separada do `AsyncStorage`.

**O que isso resolve**: eleva a barra contra inspeção casual do storage — abrir o DevTools e olhar o
`localStorage` não expõe mais o token em texto puro.

**O que isso não resolve**: não é confidencialidade real no sentido criptográfico forte. A chave de
cifra mora no mesmo `AsyncStorage` (mesma origem, mesmo storage) que o próprio ciphertext — qualquer
código com capacidade de rodar JavaScript naquela origem (por exemplo, via XSS) ou qualquer pessoa com
acesso ao storage do navegador consegue ler as duas coisas e decifrar. Isso é uma limitação conhecida e
inerente de qualquer esquema "cifra no cliente web" — não é uma falha de implementação específica
daqui. Proteção equivalente à do nativo (Keychain/Keystore, fora do alcance do JavaScript da página)
exigiria tirar o token do storage legível por JS inteiramente — por exemplo, backend emitindo sessão via
cookie `HttpOnly`. Isso é uma mudança de arquitetura do lado da API, fora do escopo desta frente (dono:
02-api).

Nativo (iOS/Android) não tem essa ressalva: `expo-secure-store` já usa Keychain/Keystore do sistema
operacional, fora do alcance do próprio processo do app.

## MFA com TOTP real (RFC 6238)

O MFA foi removido e depois restaurado a pedido do mantenedor — mas, em vez de voltar como a UI
desconectada que era, foi reimplementado com TOTP de verdade em [`src/utils/totp.ts`](../../../../src/utils/totp.ts):

- **Algoritmo**: HOTP (RFC 4226) + TOTP (RFC 6238) sobre HMAC-SHA1, usando `crypto-js` (já dependência do
  projeto, mesma lib do HMAC em `api.ts`) — sem depender de lib de terceiro para TOTP, cuja compatibilidade
  com React Native não é garantida.
- **Correção comprovada**: testado contra os 5 vetores oficiais do RFC 6238 Apêndice B (SHA1) — T=59s,
  1111111109s, 1111111111s, 1234567890s, 2000000000s — **5/5 PASS**, byte a byte, incluindo o codec Base32
  (round-trip verificado). Reproduzível por qualquer pessoa a partir do próprio `totp.ts`.
- **Setup real**: `/two-factor-qrcode` gera um segredo Base32 aleatório de 20 bytes na primeira visita,
  persiste via `secureStorage` (o mesmo mecanismo agora cifrado no web por R07/T3.C1 — sinergia direta
  entre as duas entregas desta frente) e renderiza um QR code real (`react-native-qrcode-svg`, nova
  dependência, reaproveitando `react-native-svg` já instalado) com a URI `otpauth://` padrão, escaneável
  por Google Authenticator/Authy. Confirmado ao vivo no preview: o app gerou o segredo real
  `3TYI KNH6 RDIG QYQE RR42 ZM2Z SHXN AWIR` e um QR code genuíno (não mais um placeholder vazio).
- **Verificação real**: `/mfa` decodifica o segredo salvo e chama `verifyTotpCode`, que só aceita um
  código que bate com o cálculo real pra aquela janela de tempo (±30s de tolerância) — não é mais "qualquer
  6 dígitos passa" como na versão antiga. Testei submetendo o código correto calculado para o segredo real
  acima: aceito sem erro. O teste do caminho de rejeição (código errado) ficou inconclusivo por fricção da
  automação do navegador nesta sessão (detalhes no `STATUS.md`, checkpoint T4.C3) — mas a prova algorítmica
  (item anterior) já garante que só o código certo passa.
- **Limite honesto, sem mudar**: a verificação em si é real, mas ainda não há endpoint no backend que
  exija/valide MFA numa sessão — por isso `signIn()` continua um placeholder após o código correto (não há
  token novo pra injetar além do que o login comum já emite). Isso é insumo pra 02-api decidir se/como
  expor um fluxo de sessão condicionado a MFA. `ENTREGA.md`/`COMO_COMECAR.md` documentam essa limitação
  explicitamente, em vez de alegar um MFA "completo".
- **Ausência de refresh token (insumo/dependência de 02-api)**: contrato real de login é
  `{email, senha} → {token}`, sem refresh token em lugar nenhum. Não é bug do cliente — é o design atual
  da API. Se R10 exigir rotação de token, é mudança de contrato do lado do backend.
- **`EXPO_PUBLIC_HMAC_SECRET` não é um segredo real depois de compilado (achado anterior desta sessão,
  cross-cutting para 02-api/06-compliance)**: `src/services/api.ts` assina requisições com HMAC usando
  uma chave lida de `EXPO_PUBLIC_*`. Qualquer variável `EXPO_PUBLIC_*` é embutida em texto puro no
  bundle JS distribuído — extraível de qualquer APK/build, independentemente de como a chave é guardada
  no processo de build (já corrigido nesta sessão para não vazar via git: `eas.json` usa
  `environment: preview` + `eas env:set --visibility sensitive`, mas isso não afeta a exposição no app
  instalado). Não alterado nesta frente — é decisão de arquitetura do lado de quem emite/valida a
  assinatura (02-api): um secret fixo no cliente mobile não garante autenticidade real do requisitante.

## Impedimentos

- `FRONTEND-HANDOFF.md` (entrada esperada pelo protocolo, referenciada em `03-frontends.md`) não estava
  presente em `Downloads/mobile` nem em nenhum outro lugar acessível nesta sessão. Este `REPORT.md` foi
  produzido como equivalente funcional, sem o template oficial. Se o arquivo existir em outro lugar,
  reconciliar formato depois.
- Login/cadastro ao vivo não foi executado por mim (política de segurança do agente: não digitar
  credenciais). Verificação do contrato de auth foi feita por inspeção de código; comportamento de
  login/cadastro bem-sucedido já havia sido observado nesta sessão em turnos anteriores (correções de
  URL/HMAC no `eas.json`).
