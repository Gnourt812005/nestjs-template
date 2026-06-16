/**
 * Converts a string enum to an array of its values.
 *
 * @example
 * ```ts
 * enum Status { DRAFT = 'draft', ACTIVE = 'active' }
 * enumToArray(Status) // ['draft', 'active']
 * ```
 */
export function enumToArray<T extends Record<string, string>>(e: T): string[] {
  return Object.values(e);
}

/**
 * Converts a string enum to an array of `{ value, label }` pairs for dropdowns / select inputs.
 *
 * @example
 * ```ts
 * enumToOptions(Status)
 * // [{ value: 'draft', label: 'Draft' }, { value: 'active', label: 'Active' }]
 * ```
 */
export function enumToOptions<T extends Record<string, string>>(
  e: T,
  formatLabel?: (value: string) => string,
): { value: string; label: string }[] {
  return enumToArray(e).map((value) => ({
    value,
    label: formatLabel ? formatLabel(value) : value.charAt(0).toUpperCase() + value.slice(1),
  }));
}

/**
 * Converts a string enum to a key→value map.
 *
 * @example
 * ```ts
 * enumToMap(Status) // { DRAFT: 'draft', ACTIVE: 'active' }
 * ```
 */
export function enumToMap<T extends Record<string, string>>(e: T): Record<keyof T, string> {
  return { ...e };
}
