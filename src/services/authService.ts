import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from './api';
import { IRegisterPayload, IRegisterResponse } from '@/src/types/register';;
import { ILoginPayload, ILoginResponse } from '@/src/types/login';;

export async function registerUser(payload: IRegisterPayload): Promise<IRegisterResponse> {
  const response = await apiFetch('/api/v1/user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || 'Erro ao realizar o cadastro.';
    throw new Error(errorMessage);
  }

  return data;
}

export async function loginUser(payload: ILoginPayload): Promise<ILoginResponse> {
  const response = await apiFetch('/api/v1/auth', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || 'E-mail ou senha incorretos.';
    throw new Error(errorMessage);
  }

  await AsyncStorage.setItem('@auth_token', data.token);

  return data;
}

export async function getMe(): Promise<{ username: string }> {
  const response = await apiFetch('/api/v1/user/me');

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'Não autorizado.');
  }

  return data;
}
