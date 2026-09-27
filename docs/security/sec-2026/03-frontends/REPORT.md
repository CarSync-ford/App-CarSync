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

## Achados repassados a outras frentes

- **MFA/2FA é UI desconectada (insumo R20 — Mobile Top 10, e achado de honestidade de conformidade)**:
  `MfaContainer`, `TwoFactorQRCodeContainer`, `TwoFactorSetupContainer`, `TwoFactorSuccessContainer`
  existem como telas, mas o secret exibido é um placeholder fixo, o QR é um espaço vazio reservado, e
  `signIn()` (chamado por essas telas) é um no-op em `AuthContext.tsx`. Nenhuma rota do app navega para
  `/mfa`. **O README do projeto lista MFA como funcionalidade entregue — não está, no código atual.**
  Repasso para 06-compliance (R20, honestidade do checklist) e para quem decidir sobre o texto do README.
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
