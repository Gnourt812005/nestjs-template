/**
 * Reads a required environment variable. Throws if missing and no fallback.
 *
 * @param key    - Environment variable name (e.g. `'DATABASE_URL'`)
 * @param fallback - Optional default value
 */
export function env(key: string, fallback?: string): string {
  const val = process.env[key] ?? fallback;
  if (val === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val;
}

/**
 * Reads an integer environment variable.
 *
 * @param key    - Environment variable name
 * @param fallback - Optional default value
 */
export function envInt(key: string, fallback?: number): number {
  const val = process.env[key];
  if (val === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  const parsed = parseInt(val, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid integer, got: ${val}`);
  }
  return parsed;
}

/**
 * Reads a boolean environment variable.
 * Accepts `'true'`, `'1'` → `true`; `'false'`, `'0'` → `false`.
 *
 * @param key    - Environment variable name
 * @param fallback - Optional default value
 */
export function envBool(key: string, fallback?: boolean): boolean {
  const val = process.env[key];
  if (val === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  if (val === 'true' || val === '1') return true;
  if (val === 'false' || val === '0') return false;
  throw new Error(`Environment variable ${key} must be a boolean, got: ${val}`);
}

/**
 * Reads a float environment variable.
 *
 * @param key    - Environment variable name
 * @param fallback - Optional default value
 */
export function envFloat(key: string, fallback?: number): number {
  const val = process.env[key];
  if (val === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  const parsed = parseFloat(val);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number, got: ${val}`);
  }
  return parsed;
}
