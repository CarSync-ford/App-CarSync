/**
 * secureStorage.ts
 * Abstração de armazenamento seguro com fallback para web.
 *
 * - iOS / Android: usa expo-secure-store (criptografado no SO).
 * - Web: expo-secure-store não existe; os valores são cifrados com AES
 *   (crypto-js) antes de ir para o AsyncStorage. A chave de cifra fica
 *   numa entrada separada do AsyncStorage, isolada do ciphertext.
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js/core';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const WEB_ENCRYPTION_KEY_STORAGE_KEY = '__carsync_web_storage_key';

async function getOrCreateWebEncryptionKey(): Promise<string> {
  const existing = await AsyncStorage.getItem(WEB_ENCRYPTION_KEY_STORAGE_KEY);
  if (existing) return existing;

  const generated = CryptoJS.lib.WordArray.random(32).toString();
  await AsyncStorage.setItem(WEB_ENCRYPTION_KEY_STORAGE_KEY, generated);
  return generated;
}

export async function getSecureItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    const ciphertext = await AsyncStorage.getItem(key);
    if (!ciphertext) return null;

    const encryptionKey = await getOrCreateWebEncryptionKey();
    try {
      const plaintext = AES.decrypt(ciphertext, encryptionKey).toString(Utf8);
      return plaintext || null;
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(key);
}

export async function setSecureItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    const encryptionKey = await getOrCreateWebEncryptionKey();
    const ciphertext = AES.encrypt(value, encryptionKey).toString();
    await AsyncStorage.setItem(key, ciphertext);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecureItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}
