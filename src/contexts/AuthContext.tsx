/**
 * AuthContext.tsx
 * Contexto de autenticação do CarSync.
 *
 * Mudanças de segurança:
 * - JWT armazenado no expo-secure-store (criptografado no dispositivo)
 *   em vez do AsyncStorage (texto puro).
 * - Assina o evento de logout forçado do api.ts (authEvents),
 *   garantindo que um 401/403 qualquer redirecione para o login.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSecureItem, setSecureItem, deleteSecureItem } from '@/src/utils/secureStorage';
import { getMe } from '@/src/services/authService';
import { authEvents } from '@/src/utils/authEvents';

// ─── Chaves do SecureStore ────────────────────────────────────────────────────

const SECURE_KEY_TOKEN = 'auth_token';
const SECURE_KEY_USER  = 'auth_user';

// ─── Tipo do contexto ─────────────────────────────────────────────────────────

interface AuthContextType {
  userToken: string | null;
  username: string | null;
  isLoading: boolean;
  signIn: (usuario: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserTokenState] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Carrega o token salvo ao iniciar o app ────────────────────────────────
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await getSecureItem(SECURE_KEY_TOKEN);
        if (token) {
          setUserTokenState(token);
          try {
            const me = await getMe();
            setUsername(me.username);
          } catch {
            // Token inválido / expirado → limpa a sessão
            await deleteSecureItem(SECURE_KEY_TOKEN);
            await deleteSecureItem(SECURE_KEY_USER);
            setUserTokenState(null);
          }
        }
      } catch (e) {
        console.error('[AuthContext] Falha ao carregar o token do SecureStore', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  // ── Atualiza username ao trocar o token ───────────────────────────────────
  useEffect(() => {
    if (!userToken) {
      setUsername(null);
      return;
    }
    getMe()
      .then((me) => setUsername(me.username))
      .catch(() => setUsername(null));
  }, [userToken]);

  // ── Assina o evento de logout forçado (401/403/423) ───────────────────────
  useEffect(() => {
    const unsubscribe = authEvents.onForceLogout(() => {
      console.warn('[AuthContext] Logout forçado recebido do api.ts');
      signOut();
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Ações ────────────────────────────────────────────────────────────────

  /**
   * Persiste o token no SecureStore e atualiza o estado.
   * Chamado pelo authService após login bem-sucedido.
   */
  const setUserToken = async (token: string | null) => {
    if (token) {
      await setSecureItem(SECURE_KEY_TOKEN, token);
    } else {
      await deleteSecureItem(SECURE_KEY_TOKEN);
    }
    setUserTokenState(token);
  };

  /**
   * signIn — placeholder mantido por compatibilidade.
   * O fluxo real de login é feito por loginUser() no authService,
   * que salva o token e chama setUserToken().
   */
  const signIn = async (_usuario: string, _senha: string) => {
    // O loginUser() do authService já persiste o token.
    // Este método pode ser removido futuramente.
  };

  /** Remove todos os dados de sessão e limpa o SecureStore. */
  const signOut = async () => {
    await deleteSecureItem(SECURE_KEY_TOKEN);
    await deleteSecureItem(SECURE_KEY_USER);
    setUserTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, username, isLoading, signIn, signOut, setUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
