import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMe } from '@/src/services/authService';

interface AuthContextType {
  userToken: string | null;
  username: string | null;
  isLoading: boolean;
  signIn: (usuario: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega o token inicial do storage
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        if (token) {
          setUserToken(token);
          // Busca o nome do usuário ao restaurar a sessão
          try {
            const me = await getMe();
            setUsername(me.username);
          } catch {
            // Token inválido/expirado: limpa a sessão
            await AsyncStorage.removeItem('@auth_token');
            setUserToken(null);
          }
        }
      } catch (e) {
        console.error('Falha ao carregar o token', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  // Atualiza o username sempre que o token muda (ex: após login)
  useEffect(() => {
    if (!userToken) {
      setUsername(null);
      return;
    }
    getMe()
      .then((me) => setUsername(me.username))
      .catch(() => setUsername(null));
  }, [userToken]);

  const signIn = async (usuario: string, senha: string) => {
    // Futuro: Chamada real da API JWT aqui
    const mockToken = "eyMockTokenAuth123";
    
    await AsyncStorage.setItem('@auth_token', mockToken);
    await AsyncStorage.setItem('@auth_user', usuario);
    setUserToken(mockToken);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@auth_user');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, username, isLoading, signIn, signOut, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
