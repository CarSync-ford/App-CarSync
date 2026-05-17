import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API?.replace(/\/$/, '') ?? '';

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${BASE_URL}${path}`;

  const token = await AsyncStorage.getItem('@auth_token');

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  return response;
}
