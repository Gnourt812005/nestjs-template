/**
 * Checks if a string is a valid email address.
 */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * Checks if a string is a valid Vietnamese phone number.
 * Accepts `0xxxxxxxxx` (10 digits) or `+84xxxxxxxxx` (11 digits).
 */
export function isPhoneVN(phone: string): boolean {
  return /^(0|\+84)\d{9,10}$/.test(phone.replace(/[\s.-]/g, ''));
}

/**
 * Checks if a string is a valid URL (http, https, or other protocol).
 */
export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a filename has one of the allowed extensions.
 *
 * @example
 * ```ts
 * isFileType('photo.jpg', ['jpg', 'png']) // true
 * isFileType('photo.jpg', ['png'])         // false
 * ```
 */
export function isFileType(filename: string, allowedExtensions: string[]): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? allowedExtensions.includes(ext) : false;
}

/**
 * Checks if a string is a valid MongoDB ObjectId (24 hex characters).
 */
export function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

/**
 * Checks if a password meets minimum strength requirements:
 * - at least `minLength` characters (default 8)
 * - at least one uppercase letter
 * - at least one lowercase letter
 * - at least one digit
 * - at least one special character
 */
export function isStrongPassword(password: string, minLength = 8): boolean {
  if (password.length < minLength) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}
