import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'crypto';

/**
 * Hashes a string using the specified algorithm (default SHA-256).
 * Useful for idempotency keys, checksums, and data fingerprints.
 *
 * @example
 * ```ts
 * hashData('hello')        // '2cf24dba5fb0a30e26e83b2ac5b9e29e...'
 * hashData('hello', 'md5') // '5d41402abc4b2a76b9719d911017c592'
 * ```
 */
export function hashData(data: string, algorithm: 'sha256' | 'sha512' | 'md5' = 'sha256'): string {
  return createHash(algorithm).update(data).digest('hex');
}

/**
 * Generates a cryptographically secure random hex token.
 *
 * @param bytes - Number of random bytes (default 32 → 64 hex chars).
 *
 * @example
 * ```ts
 * generateToken()      // 'a1b2c3d4...' (64 chars)
 * generateToken(16)    // 'a1b2c3d4...' (32 chars)
 * ```
 */
export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString('hex');
}

/**
 * Generates a numeric OTP of the given length using cryptographically
 * secure random bytes (avoids modulo bias for length ≤ 6).
 *
 * @example
 * ```ts
 * generateOtp()     // '483920'
 * generateOtp(4)    // '7291'
 * ```
 */
export function generateOtp(length = 6): string {
  let otp = '';
  const bytes = randomBytes(length);
  for (let i = 0; i < length; i++) {
    otp += (bytes[i] % 10).toString();
  }
  return otp;
}

/**
 * Encrypts a string using AES-256-CBC.
 * Returns a string in the format `iv:encrypted` (both hex-encoded).
 *
 * @param plaintext - Text to encrypt
 * @param key       - Encryption key (will be padded / truncated to 32 bytes)
 *
 * @example
 * ```ts
 * const encrypted = encrypt('secret', 'my-encryption-key')
 * // '7a8b...:f3e2...'
 * ```
 */
export function encrypt(plaintext: string, key: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(
    'aes-256-cbc',
    Buffer.from(key.padEnd(32).slice(0, 32)),
    iv,
  );
  let encrypted = cipher.update(plaintext, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a string previously encrypted with `encrypt()`.
 *
 * @param encryptedText - String in `iv:encrypted` format
 * @param key           - Same key used when encrypting
 *
 * @example
 * ```ts
 * decrypt('7a8b...:f3e2...', 'my-encryption-key')
 * // 'secret'
 * ```
 */
export function decrypt(encryptedText: string, key: string): string {
  const [ivHex, encrypted] = encryptedText.split(':');
  if (!ivHex || !encrypted) {
    throw new Error('Invalid encrypted text format');
  }
  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key.padEnd(32).slice(0, 32)),
    Buffer.from(ivHex, 'hex'),
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
