/**
 * Verifica src/utils/totp.ts contra os 5 vetores oficiais do RFC 6238 Apêndice B (SHA1).
 * Roda com: node scripts/verify-totp-rfc-vectors.js
 * Não precisa de dependência nova: usa o mesmo crypto-js já instalado no projeto.
 *
 * Reimplementa (não importa) a lógica de src/utils/totp.ts porque esse arquivo é TypeScript/ESM
 * e o projeto não tem ts-node/Jest configurado; as funções abaixo espelham exatamente as de lá.
 */

const CryptoJS = require('crypto-js/core');
const HmacSHA1 = require('crypto-js/hmac-sha1');

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function bytesToBase32(bytes) {
  let bits = 0, value = 0, output = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  return output;
}

function base32ToBytes(base32) {
  const clean = base32.toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '');
  let bits = 0, value = 0;
  const bytes = [];
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

function bytesToWordArray(bytes) {
  const words = [];
  for (let i = 0; i < bytes.length; i++) {
    words[i >>> 2] = (words[i >>> 2] || 0) | (bytes[i] << (24 - (i % 4) * 8));
  }
  return CryptoJS.lib.WordArray.create(words, bytes.length);
}

function wordArrayToBytes(wordArray) {
  const bytes = [];
  for (let i = 0; i < wordArray.sigBytes; i++) {
    bytes.push((wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
  }
  return bytes;
}

function intToBytes(num, length) {
  const bytes = new Array(length).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    bytes[i] = num % 256;
    num = Math.floor(num / 256);
  }
  return bytes;
}

function getTotpCode(base32Secret, timeStepSeconds, digits, forTimeMs) {
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

// RFC 6238 Apêndice B: seed ASCII "12345678901234567890" (20 bytes), SHA1, 8 dígitos, passo de 30s.
const asciiSeed = '12345678901234567890';
const seedBytes = Array.from(asciiSeed).map((c) => c.charCodeAt(0));
const base32Seed = bytesToBase32(seedBytes);

const vectors = [
  { timeSec: 59, expected: '94287082' },
  { timeSec: 1111111109, expected: '07081804' },
  { timeSec: 1111111111, expected: '14050471' },
  { timeSec: 1234567890, expected: '89005924' },
  { timeSec: 2000000000, expected: '69279037' },
];

console.log('Seed ASCII (RFC 6238 Apêndice B):', asciiSeed);
console.log('Seed em Base32 (entrada real de getTotpCode):', base32Seed);
console.log('');

let allPass = true;
for (const v of vectors) {
  const actual = getTotpCode(base32Seed, 30, 8, v.timeSec * 1000);
  const pass = actual === v.expected;
  allPass = allPass && pass;
  console.log(
    `T=${v.timeSec}s -> esperado ${v.expected}, obtido ${actual} -> ${pass ? 'PASS' : 'FAIL'}`
  );
}

// Round-trip do codec Base32: bytes aleatórios -> base32 -> bytes, deve bater byte a byte.
const randomBytes = wordArrayToBytes(CryptoJS.lib.WordArray.random(20));
const roundTrip = base32ToBytes(bytesToBase32(randomBytes));
const roundTripOk =
  randomBytes.length === roundTrip.length && randomBytes.every((b, i) => b === roundTrip[i]);

console.log('');
console.log(`Round-trip Base32 (20 bytes aleatórios) -> ${roundTripOk ? 'PASS' : 'FAIL'}`);
console.log('');
console.log(allPass && roundTripOk ? '5/5 vetores RFC 6238 + round-trip Base32: TUDO PASS' : 'FALHOU — ver acima');

process.exit(allPass && roundTripOk ? 0 : 1);
