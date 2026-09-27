Spec / base SHA / responsável / repositório:
03-frontends / 99e2e25877dd25dcd7d1714ffa33b5bea3062be6 / Claude (agente) / App-CarSync (branch feat/cybersecurity)

Observação de protocolo: EXECUTION.md pede worktree dedicado (`git worktree add -b sec-2026/03-frontends`).
Este trabalho foi feito diretamente na branch `feat/cybersecurity`, já isolada da main e criada
pelo mantenedor para esta frente, para não fragmentar o ambiente de desenvolvimento em uso.

---

Checkpoint: T1.C1
Estado: VERIFICADO
Requisito: R07 (inventário)
Arquivos e teste/comando: inspeção direta de src/ e app/ + varredura por AsyncStorage/SecureStore/expo-file-system
Resultado observado e data: 2026-09-26

Inventário:
- Plataforma: Expo/React Native (iOS, Android, Web). Base URL: EXPO_PUBLIC_API (https://api.carsync.me/).
- Único dado sensível persistido no cliente: o JWT (`auth_token`), via src/utils/secureStorage.ts.
  - Nativo (iOS/Android): expo-secure-store — Keychain/Keystore, já criptografado pelo SO.
  - Web: AsyncStorage puro, sem nenhuma criptografia (achado corrigido em T3.C1).
- `auth_user` (src/contexts/AuthContext.tsx) é código morto: só é deletado (linhas 55 e 117 antes desta
  auditoria), nunca escrito. Nenhum dado de usuário fica persistido sob essa chave.
- src/contexts/VehicleContext.tsx usa AsyncStorage direto para preferências não sensíveis (veículo/ícone
  de perfil escolhidos) — fora de escopo do R07.
- src/services/AudioQueuePlayer.ts usa expo-file-system para cache temporário de áudio (.mp3), sem dado
  sensível, limpo com deleteAsync — fora de escopo.
- MFA/2FA (MfaContainer, TwoFactorQRCodeContainer, TwoFactorSetupContainer, TwoFactorSuccessContainer):
  UI desconectada do fluxo real. Secret exibido é placeholder hardcoded, QR é um View vazio, `signIn()`
  chamado por essas telas é um no-op em AuthContext.tsx. Nenhuma rota do app navega para /mfa. Não existe
  segredo real de MFA para proteger localmente hoje. Repassado ao handoff (README do projeto alega MFA
  como funcionalidade entregue; não está, no código atual).
- Dependências disponíveis para criptografia no cliente: crypto-js@4.2.0 (já em uso em src/services/api.ts
  para o HMAC). expo-crypto não está instalado. Reuso do crypto-js em T3.C1, sem nova dependência.
Evidência: este arquivo
Dependência externa / responsável / ação para desbloquear: nenhuma

---

Checkpoint: T2.C1
Estado: VERIFICADO
Requisito: R10 (insumo — dono é 02-api), R07
Arquivos e teste/comando: leitura de src/services/authService.ts, src/types/login.ts, src/services/api.ts;
grep case-insensitive por "refresh" em src/ e app/ (zero ocorrências)
Resultado observado e data: 2026-09-26

- Contrato real de login/registro: POST /api/v1/auth com {email, senha} → resposta {token}. POST /api/v1/user
  (registro) → {id}. Nenhum dos dois retorna refreshToken, expiresIn ou objeto de usuário.
- Não existe refresh token em nenhum lugar do código do cliente. Não é uma incompatibilidade de integração:
  o cliente implementa fielmente o contrato real que o próprio backend expõe hoje. A ausência de rotação de
  token é uma característica do design atual da API (dono: 02-api), não um defeito de 03-frontends.
- api.ts já implementa: logout forçado em 401/403/423 (AuthContext limpa sessão), retry com backoff em 429.
  Isso cobre o que é verificável sem executar login de verdade.
- Limitação registrada: não posso digitar credenciais em campos de login (regra de segurança da sessão do
  agente), então login/registro ao vivo não foi executado por mim; verificação feita por inspeção de código
  e do histórico de comportamento já observado nesta sessão (login e cadastro funcionando após correções
  anteriores de URL/HMAC no eas.json).
Evidência: este arquivo
Dependência externa / responsável / ação para desbloquear: teste end-to-end de login ao vivo depende de
quem tiver acesso a inserir credenciais reais (mantenedor do projeto)

---

Checkpoint: T2.C2
Estado: REUTILIZADO
Requisito: R10 (insumo)
Arquivos e teste/comando: mesma verificação de T2.C1
Resultado observado e data: 2026-09-26

Nenhuma incompatibilidade de integração confirmada em T2.C1 — nada a corrigir no cliente. Não foi criada
lógica de refresh token client-side contra um endpoint que não existe no backend atual, conforme limite do
protocolo ("não criar... só para preencher documentação"). Sem commit de código para este checkpoint.
Evidência: T2.C1, acima
Dependência externa / responsável / ação para desbloquear: nenhuma
