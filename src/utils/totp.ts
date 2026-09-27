/**
 * totp.ts
 * TOTP (RFC 6238) sobre HOTP (RFC 4226), usando crypto-js/hmac-sha1.
 * Compatível com Google Authenticator / Authy: secret em Base32, SHA1, 6 dígitos, passo de 30s.
 */

import HmacSHA1 from 'crypto-js/hmac-sha1';
import CryptoJS from 'crypto-js/core';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function bytesToBase32(bytes: number[]): string {
  let bits = 0;
  let value = 0;
  let output = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }
  return output;
}

function base32ToBytes(base32: string): number[] {
  const clean = base32.toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const char of clean) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return bytes;
}

function bytesToWordArray(bytes: number[]) {
  const words: number[] = [];
  for (let i = 0; i < bytes.length; i++) {
    words[i >>> 2] = (words[i >>> 2] || 0) | (bytes[i] << (24 - (i % 4) * 8));
  }
  return CryptoJS.lib.WordArray.create(words, bytes.length);
}

function wordArrayToBytes(wordArray: CryptoJS.lib.WordArray): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < wordArray.sigBytes; i++) {
    bytes.push((wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
  }
  return bytes;
}

function intToBytes(num: number, length: number): number[] {
  const bytes: number[] = new Array(length).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    bytes[i] = num % 256;
    num = Math.floor(num / 256);
  }
  return bytes;
}

export function generateBase32Secret(byteLength = 20): string {
  const randomWords = CryptoJS.lib.WordArray.random(byteLength);
  return bytesToBase32(wordArrayToBytes(randomWords));
}

export function getTotpCode(
  base32Secret: string,
  timeStepSeconds = 30,
  digits = 6,
  forTimeMs: number = Date.now()
): string {
  const counter = Math.floor(forTimeMs / 1000 / timeStepSeconds);
  const counterWordArray = bytesToWordArray(intToBytes(counter, 8));
  const keyWordArray = bytesToWordArray(base32ToBytes(base32Secret));

  const digestBytes = wordArrayToBytes(HmacSHA1(counterWordArray, keyWordArray));

  const offset = digestBytes[digestBytes.length - 1] & 0x0f;
  const binCode =
    ((digestBytes[offset] & 0x7f) << 24) |
    ((digestBytes[offset + 1] & 0xff) << 16) |
    ((digestBytes[offset + 2] & 0xff) << 8) |
    (digestBytes[offset + 3] & 0xff);

  const otp = binCode % 10 ** digits;
  return String(otp).padStart(digits, '0');
}

export function verifyTotpCode(
  base32Secret: string,
  code: string,
  windowSteps = 1,
  timeStepSeconds = 30
): boolean {
  const clean = code.trim();
  if (!/^\d+$/.test(clean)) return false;

  for (let errorWindow = -windowSteps; errorWindow <= windowSteps; errorWindow++) {
    const time = Date.now() + errorWindow * timeStepSeconds * 1000;
    if (getTotpCode(base32Secret, timeStepSeconds, clean.length, time) === clean) {
      return true;
    }
  }
  return false;
}

export function buildOtpAuthUri(secret: string, accountName: string, issuer = 'CarSync'): string {
  const label = encodeURIComponent(`${issuer}:${accountName}`);
  const query = [
    `secret=${encodeURIComponent(secret)}`,
    `issuer=${encodeURIComponent(issuer)}`,
    'algorithm=SHA1',
    'digits=6',
    'period=30',
  ].join('&');
  return `otpauth://totp/${label}?${query}`;
}
