/**
 * A normalized error object with guaranteed `message` and `name`.
 */
export interface NormalizedError {
  message: string;
  name: string;
  stack?: string;
  cause?: unknown;
}

/**
 * Safely extracts a structured error from an `unknown` catch variable.
 *
 * In TypeScript, `catch` blocks receive `unknown`, so accessing `.message`
 * requires casting to `any` — which is error-prone and disables typechecks.
 * `toError` handles the narrowing for you.
 *
 * @example
 * ```ts
 * try {
 *   someRiskyOperation();
 * } catch (err) {
 *   const { message, name } = toError(err);
 *   logger.error(`[${name}] ${message}`);
 * }
 * ```
 */
export function toError(err: unknown): NormalizedError {
  if (err instanceof Error) {
    return {
      message: err.message,
      name: err.name,
      stack: err.stack,
      cause: err.cause,
    };
  }

  if (err !== null && err !== undefined && typeof err === 'object') {
    const obj = err as Record<string, unknown>;
    return {
      message: typeof obj.message === 'string' ? obj.message : String(err),
      name: typeof obj.name === 'string' ? obj.name : 'UnknownError',
      stack: typeof obj.stack === 'string' ? obj.stack : undefined,
      cause: obj.cause,
    };
  }

  return {
    message: err !== null && err !== undefined ? String(err) : 'Unknown error',
    name: 'UnknownError',
  };
}

/**
 * Quick inline helper to get just the error message from an unknown catch variable.
 *
 * @example
 * ```ts
 * catch (err) {
 *   logger.error(errorMessage(err));
 * }
 * ```
 */
export function errorMessage(err: unknown, fallback = 'Unknown error'): string {
  return toError(err).message || fallback;
}
