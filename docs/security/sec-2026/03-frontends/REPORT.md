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
operacional, fora do alcance do próprio processo do app. Diferente da alegação anterior (baseada só em
código), isso agora tem prova real: o mantenedor rodou o app num Android real via Expo Go, logou e enviou
print da tela autenticada rodando nativamente — fecha a exigência da própria spec de que "web sem storage
sensível não substitui prova de criptografia mobile" (detalhe em `STATUS.md`, checkpoint T3.C2).

![App rodando nativamente num Android real, logado, via Expo Go](t3-native-device-real.jpg)

## MFA com TOTP real (RFC 6238)

A auditoria revisou o módulo de MFA/2FA já existente no app (`/two-factor-setup`, `/two-factor-qrcode`,
`/mfa`, `/two-factor-success`) e encontrou uma lacuna de segurança: a verificação aceitava qualquer código
de 6 dígitos e o secret/QR exibidos eram um valor fixo de exemplo, sem nenhuma proteção real por trás da
tela. Isso foi corrigido com uma implementação real de TOTP em [`src/utils/totp.ts`](../../../../src/utils/totp.ts):

- **Algoritmo**: HOTP (RFC 4226) + TOTP (RFC 6238) sobre HMAC-SHA1, usando `crypto-js` (já dependência do
  projeto, mesma lib do HMAC em `api.ts`) — sem depender de lib de terceiro para TOTP, cuja compatibilidade
  com React Native não é garantida.
- **Correção comprovada**: testado contra os 5 vetores oficiais do RFC 6238 Apêndice B (SHA1) — T=59s,
  1111111109s, 1111111111s, 1234567890s, 2000000000s — **5/5 PASS**, byte a byte, incluindo o codec Base32
  (round-trip verificado), via [`scripts/verify-totp-rfc-vectors.js`](../../../../scripts/verify-totp-rfc-vectors.js)
  (commitado no repo). Não é só "reproduzível em tese": o mantenedor rodou o script no próprio terminal,
  de forma independente desta sessão, e bateu o mesmo resultado (print em `STATUS.md`, checkpoint T4.C2).
- **Setup real**: `/two-factor-qrcode` gera um segredo Base32 aleatório de 20 bytes na primeira visita,
  persiste via `secureStorage` (o mesmo mecanismo agora cifrado no web por R07/T3.C1 — sinergia direta
  entre as duas entregas desta frente) e renderiza um QR code real (`react-native-qrcode-svg`, nova
  dependência, reaproveitando `react-native-svg` já instalado) com a URI `otpauth://` padrão, escaneável
  por Google Authenticator/Authy. Confirmado ao vivo no preview: o app gerou o segredo real
  `3TYI KNH6 RDIG QYQE RR42 ZM2Z SHXN AWIR` e um QR code genuíno (não mais um placeholder vazio).
- **Verificação real**: `/mfa` decodifica o segredo salvo e chama `verifyTotpCode`, que só aceita um
  código que bate com o cálculo real pra aquela janela de tempo (±30s de tolerância) — não é mais "qualquer
  6 dígitos passa" como na versão antiga. Testado ao vivo dos dois lados: código correto calculado para o
  segredo real acima → navega para `/two-factor-success` (sucesso real); código errado (111111) → permanece
  em `/mfa` (rejeitado). Os dois caminhos são reprodutíveis (detalhes no `STATUS.md`, checkpoint T4.C3).
- **Bug de navegação encontrado e corrigido**: o wizard existia mas seus botões "Continuar" não estavam
  encadeados direito — o da tela do QR pulava direto pra tela de sucesso sem passar pela verificação, e o
  de `/mfa` não navegava pra lugar nenhum mesmo com o código certo (chamava só um `signIn()` que é
  no-op). Corrigido para que o QR leve a `/mfa` e `/mfa` leve a `/two-factor-success` somente quando o
  código bate de verdade (detalhes em `STATUS.md`, checkpoint T4.C2).

**Evidência visual** (capturas reais; o segredo no QR abaixo é diferente do citado em "Setup real" acima
porque foi capturado numa sessão/navegador diferente — cada instalação sem storage prévio gera seu próprio
segredo aleatório, não é uma inconsistência):

![QR code real gerado em /two-factor-qrcode](mfa-qrcode.png)
![Código correto aceito em /mfa](mfa-verificacao.png)

## Achados de rede real (login ao vivo, 2026-09-27)

O mantenedor executou login (válido e inválido) no preview com credenciais reais e compartilhou os prints
do DevTools (Network) comigo — evidência sanitizada abaixo, sem senha/token/username reais (detalhe
completo em `STATUS.md`, checkpoint T2.C1).

- **Refresh token — implementado (achado corrigido por evidência de rede real)**: contrato real de login é
  `{email, password} → {token, refreshToken}`. O contrato completo do backend (`AuthController.java`/`AuthDtos.java`) confirma
  `POST /api/v1/auth/refresh` (`{refreshToken}` → `{token, refreshToken}`, rotaciona os dois). `authService.ts` persiste o refreshToken no login; `api.ts` tenta renová-lo via esse
  endpoint quando uma requisição recebe 401, só forçando logout se a renovação falhar; `AuthContext.tsx`
  limpa os dois tokens no logout. `ILoginResponse` agora declara `refreshToken`. Testado ao vivo contra a
  API real: corrompi só o access token salvo (mantendo o refresh token real intacto) e recarreguei o app —
  o servidor rejeitou com 401, o cliente renovou sozinho via `/auth/refresh` e a sessão continuou normal,
  sem cair no login (detalhe e prints de console em `STATUS.md`, checkpoint T2.C1). Achado extra corrigido
  no mesmo dia: como o app chama `getMe()` de dois lugares independentes, duas requisições podiam tomar 401
  ao mesmo tempo e cada uma tentar renovar por conta própria — arriscando falhar se o backend invalidar o
  refresh token a cada uso. Corrigido com uma renovação compartilhada entre chamadas concorrentes
  (`inFlightRefresh`); confirmado por medição exata que agora só uma chamada de refresh acontece mesmo com
  duas 401 simultâneas.
- **Erro de credencial inválida sem vazamento (achado positivo)**: login com credencial errada → 401
  Unauthorized → `{error: "Unauthorized", message: "Credenciais inválidas: Usuário não encontrado ou senha
  incorreta", details: []}`. A mensagem é única e genérica pros dois casos (usuário inexistente ou senha
  errada) — comportamento correto contra enumeração de usuário. Sem stack trace, sem detalhe interno de
  servidor/framework.
- **CORS observado, não aprofundado aqui (handoff a 02-api)**: a resposta de `/api/v1/auth` inclui
  `Access-Control-Allow-Origin` refletindo a origem de dev (`http://localhost:8081`) e
  `Access-Control-Allow-Credentials: true`. Não testei se o servidor reflete qualquer `Origin` recebida —
  se refletir, combinado com `credentials: true`, é uma configuração de CORS insegura (qualquer site
  poderia emitir requisição autenticada usando as credenciais de quem visitar). Confirmar isso exige
  requisições contra a API de produção a partir de outras origens, fora da lista de escrita desta frente —
  repasso como pergunta direta para 02-api.
- **`EXPO_PUBLIC_HMAC_SECRET` não é um segredo real depois de compilado (achado anterior desta sessão,
  cross-cutting para 02-api/06-compliance)**: `src/services/api.ts` assina requisições com HMAC usando
  uma chave lida de `EXPO_PUBLIC_*`. Qualquer variável `EXPO_PUBLIC_*` é embutida em texto puro no
  bundle JS distribuído — extraível de qualquer APK/build, independentemente de como a chave é guardada
  no processo de build (já corrigido nesta sessão para não vazar via git: `eas.json` usa
  `environment: preview` + `eas env:set --visibility sensitive`, mas isso não afeta a exposição no app
  instalado). Não alterado nesta frente — é decisão de arquitetura do lado de quem emite/valida a
  assinatura (02-api): um secret fixo no cliente mobile não garante autenticidade real do requisitante.

**Evidência visual** (DevTools real, capturado pelo mantenedor em 2026-09-27 — só imagens sem senha, token
ou username reais; detalhe da ressalva sobre o que ficou de fora em `STATUS.md`, checkpoint T2.C1):

![Headers de resposta com CORS e Authorization redundante](t2c1-cors-headers.png)
![Headers do 401 de credencial inválida](t2c1-erro-401-headers.png)
![Corpo do 401, mensagem genérica sem vazamento](t2c1-erro-401-response.png)
![Local Storage com auth_token cifrado (prefixo Salted__), não o JWT em texto puro](t3c1-localstorage-real.png)
![POST /auth/refresh → 200 OK, valor do Authorization truncado](t2c1-refresh-real.png)

## Impedimentos

- `FRONTEND-HANDOFF.md` (entrada esperada pelo protocolo, referenciada em `03-frontends.md`) não estava
  presente em `Downloads/mobile` nem em nenhum outro lugar acessível nesta sessão. Este `REPORT.md` foi
  produzido como equivalente funcional, sem o template oficial. Se o arquivo existir em outro lugar,
  reconciliar formato depois.
