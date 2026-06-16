/**
 * Safely converts an input value (Date, string, number, etc.) to a Date object.
 * Returns null if the value is invalid or cannot be parsed.
 */
export function toDate(value: unknown): Date | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
}
