/**
 * Type guard: checks if a value is a non-null, non-array object.
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

/**
 * Type guard: checks if a value is a plain object (constructor === Object).
 */
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return isObject(val) && val.constructor === Object;
}

/**
 * Type guard: checks if a value is a string.
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

/**
 * Type guard: checks if a value is a finite number (not NaN, not Infinity).
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val) && isFinite(val);
}

/**
 * Type guard: checks if a value is a boolean.
 */
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}

/**
 * Type guard: narrows null | undefined to the non-null type.
 */
export function isDefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

/**
 * Type guard: checks if a value is a Promise.
 */
export function isPromise(val: unknown): val is Promise<unknown> {
  return val instanceof Promise;
}

/**
 * Type guard: checks if a value is an array.
 */
export function isArray<T = unknown>(val: unknown): val is T[] {
  return Array.isArray(val);
}

/**
 * Checks if a value is "empty" – null, undefined, empty string, empty array, or empty object.
 */
export function isEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  if (isString(val)) return val.trim().length === 0;
  if (Array.isArray(val)) return val.length === 0;
  if (isObject(val)) return Object.keys(val).length === 0;
  return false;
}

/**
 * Type guard: checks if a value is a function.
 */
export function isFunction(val: unknown): val is (...args: unknown[]) => unknown {
  return typeof val === 'function';
}
