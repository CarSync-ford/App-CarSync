# ENTREGA — CarSync App

Documento de entrega do projeto **CarSync** para o Challenge Ford.

---

## Identificação

- **Projeto:** CarSync — Monitoramento Veicular Inteligente
- **Tecnologia:** React Native + Expo (TypeScript)

---

## Checklist de Requisitos Obrigatórios

### ✅ Mínimo de 5 telas navegáveis

| # | Tela | Rota |
|---|------|------|
| 1 | Login | `/login` |
| 2 | Cadastro | `/register` |
| 3 | Início (Dashboard) | `/(tabs)/` |
| 4 | Agendamento | `/(tabs)/agendamento` |
| 5 | Chat IA | `/(tabs)/chat` |
| 6 | MFA / 2FA | `/mfa` | 2FA desabilitado temporariamente
| 7 | Setup 2FA | `/two-factor-setup` | 2FA desabilitado temporariamente
| 8 | Sucesso 2FA | `/two-factor-success` | 2FA desabilitado temporariamente

**Total: 8 telas navegáveis** (requisito mínimo: 5 ✅)

---

### ✅ Componentes reutilizáveis

Mais de 20 componentes organizados por módulo em `src/components/`:

- **Auth:** `LoginContainer`, `RegisterContainer`, `LoginInput`, `PasswordRules`
- **Início:** `Header`, `Card`, `CardCarro`, `FuelGauge`, `OilLevel`, `SpeedChart`, `TirePressure`, `OtherInfos`, `NotificationPanel`
- **Agendamento:** `AgendamentoCard`, `AgendamentosList`, `HistoricoList`, `FordinhoBanner`, `NovoAgendamentoModal`, `CalendarPicker`
- **Chat:** `ChatBubble`, `ChatHeader`, `ChatInput`, `TypingIndicator`
- **MFA:** `MfaContainer`, `OtpInput`

---

### ✅ useState e useEffect

- `useState` utilizado em 11+ componentes para gerenciar estado local (formulários, modais, loading, etc.)
- `useEffect` utilizado em 8+ componentes para efeitos colaterais (keyboard listeners, animações, restauração de sessão)

---

### ✅ AsyncStorage funcionando

O `AsyncStorage` é usado para persistência do token de autenticação JWT:

| Arquivo | Operação |
|---------|----------|
| `src/services/api.ts` | Lê o token e injeta no header `Authorization` de toda requisição |
| `src/services/authService.ts` | Salva o token após login bem-sucedido |
| `src/contexts/AuthContext.tsx` | Restaura e limpa a sessão ao iniciar/encerrar o app |

---

### ✅ Dados mockados

Localizados em `src/data/`:

| Arquivo | Conteúdo |
|---------|----------|
| `veiculoMock.ts` | Velocidade, combustível, pressão dos pneus, nível de óleo e dados OBD |
| `agendamentosMock.ts` | Lista de agendamentos e histórico de manutenções |
| `notificacoesMock.ts` | Notificações do veículo |

---

### ✅ API externa

Integração com API REST autenticada via JWT:

| Método | Rota | Função |
|--------|------|--------|
| `POST` | `/api/v1/user` | Cadastro de usuário |
| `POST` | `/api/v1/auth` | Login e obtenção do token |
| `GET` | `/api/v1/user/me` | Dados do usuário autenticado |

---

### ✅ TypeScript

- `tsconfig.json` configurado com path aliases (`@/`)
- 6 arquivos de interfaces em `src/interfaces/`
- `src/types/index.ts` como barrel de types do domínio
- Todos os componentes, serviços e contextos totalmente tipados

---

## Diferenciais implementados

- 🔐 **Autenticação JWT** com persistência via AsyncStorage
- 🎨 **Design premium** com gradientes, glassmorphism (BlurView) e animações
- 📱 **Safe Area** dinâmica (compatível com notch, Dynamic Island e Android)
- 🎥 **Vídeo** de apresentação na tela de login/cadastro (expo-video)
- 🔔 **Painel de notificações** com animação (Modal nativo, funciona no Expo Go)
- 🌐 **Header dinâmico** exibindo o nome do usuário autenticado via API
- 🧠 **Contexto global** de autenticação com React Context API
