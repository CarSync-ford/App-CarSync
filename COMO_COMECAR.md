# Como Começar — CarSync App

Guia passo a passo para rodar o projeto localmente.

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- [Expo Go](https://expo.dev/go) no celular (iOS ou Android) **ou** um emulador Android/iOS configurado

## 1. Clonar o repositório

```bash
git clone https://github.com/CarSync-ford/App-CarSync.git
cd carsync/App-CarSync
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto `App-CarSync/`:

```env
EXPO_PUBLIC_API=https://carsync-api-dev.jollypebble-2e99731e.eastus.azurecontainerapps.io
```

> ⚠️ Sem essa variável, as chamadas de login e cadastro não funcionarão.

## 4. Iniciar o servidor de desenvolvimento

```bash
npm start
```

Isso abrirá o Metro Bundler. Você verá um QR code no terminal.

## 5. Rodar no dispositivo

### Expo Go (mais rápido)
Abra o app **Expo Go** no celular e escaneie o QR code exibido no terminal.

### Emulador Android
```bash
npm run android
```

### Simulador iOS (apenas macOS)
```bash
npm run ios
```

## Estrutura do Projeto

```
App-CarSync/
├── app/                    # Telas (Expo Router)
│   ├── (tabs)/             # Telas com tab bar
│   │   ├── index.tsx       # Tela Início
│   │   ├── agendamento.tsx # Tela Agendamento
│   │   └── chat.tsx        # Chat IA
│   ├── login.tsx           # Tela de Login
│   ├── register.tsx        # Tela de Cadastro
│   └── mfa.tsx             # Autenticação 2FA
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── contexts/           # Contextos React (AuthContext)
│   ├── data/               # Dados mockados
│   ├── interfaces/         # Interfaces TypeScript
│   ├── services/           # Chamadas à API e AsyncStorage
│   ├── types/              # Types TypeScript
│   └── utils/              # Funções utilitárias (validação)
├── assets/                 # Imagens, fontes e vídeos
└── constants/              # Constantes globais (cores, etc.)
```

## Tecnologias utilizadas

| Tecnologia | Uso |
|------------|-----|
| React Native + Expo | Framework mobile |
| Expo Router | Navegação baseada em arquivos |
| TypeScript | Tipagem estática |
| AsyncStorage | Persistência do token JWT |
| expo-video | Reprodução de vídeo |
| expo-blur | Efeito de vidro no Header |
| expo-linear-gradient | Gradientes nas telas de auth |
| react-native-safe-area-context | Safe areas (notch, status bar) |
