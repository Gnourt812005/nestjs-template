import { toDate } from './parse';

/**
 * Supported locale keys.
 */
export type Locale = 'en' | 'vi';

const LOCALE_MAP: Record<Locale, string> = {
  en: 'en-US',
  vi: 'vi-VN',
};

/**
 * Predefined format aliases.
 *
 * | Alias        | EN example                     | VI example                         |
 * |--------------|--------------------------------|------------------------------------|
 * | `short`      | 15/06/2026                     | 15/06/2026                         |
 * | `medium`     | Jun 15, 2026                   | 15 Thg 6, 2026                     |
 * | `long`       | June 15, 2026                  | 15 Tháng Sáu, 2026                 |
 * | `full`       | Monday, June 15, 2026          | Thứ Hai, 15 Tháng Sáu, 2026        |
 * | `iso`        | 2026-06-15                     | 2026-06-15                         |
 * | `timeShort`  | 14:30                          | 14:30                              |
 * | `timeFull`   | 14:30:00                       | 14:30:00                           |
 */
export type FormatAlias =
  | 'short'
  | 'medium'
  | 'long'
  | 'full'
  | 'iso'
  | 'timeShort'
  | 'timeFull';

const FORMAT_ALIASES: Record<FormatAlias, { type: 'pattern' | 'intl'; value: string | Intl.DateTimeFormatOptions }> = {
  short: { type: 'pattern', value: 'dd/MM/yyyy' },
  medium: { type: 'intl', value: { dateStyle: 'medium' } },
  long: { type: 'intl', value: { dateStyle: 'long' } },
  full: { type: 'intl', value: { dateStyle: 'full' } },
  iso: { type: 'pattern', value: 'yyyy-MM-dd' },
  timeShort: { type: 'pattern', value: 'HH:mm' },
  timeFull: { type: 'pattern', value: 'HH:mm:ss' },
};

// Tokens ordered longest-first so longer tokens match before shorter ones
const TOKEN_PATTERN = /dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|ss|EEEE|EEE|a/g;

/**
 * Formats a Date (or date-like value) to a string using the given pattern or alias.
 *
 * @param date  - Date object, ISO string, timestamp, or null/undefined.
 * @param format - Token pattern (e.g. `"dd/MM/yyyy"`) or a `FormatAlias`.
 * @param locale - `'en'` or `'vi'` (default `'vi'`).
 *
 * @example
 * ```ts
 * formatDate('2026-06-15', 'dd/MM/yyyy')           // "15/06/2026"
 * formatDate('2026-06-15', 'long', 'en')           // "June 15, 2026"
 * formatDate('2026-06-15', 'full', 'vi')           // "Thứ Hai, 15 Tháng Sáu, 2026"
 * formatDate('2026-06-15', 'MMM d, yyyy', 'en')    // "Jun 15, 2026"
 * formatDate('2026-06-15', 'HH:mm')                // "00:00"
 * ```
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  format: string | FormatAlias = 'short',
  locale: Locale = 'vi',
): string {
  const parsed = toDate(date);
  if (!parsed) return '';

  const localeStr = LOCALE_MAP[locale];

  // Resolve alias
  const alias = FORMAT_ALIASES[format as FormatAlias];
  if (alias) {
    if (alias.type === 'intl') {
      return new Intl.DateTimeFormat(localeStr, alias.value as Intl.DateTimeFormatOptions).format(parsed);
    }
    format = alias.value as string;
  }

  // Token replacement
  return format.replace(TOKEN_PATTERN, (match) => {
    switch (match) {
      case 'dd':
        return parsed.getDate().toString().padStart(2, '0');
      case 'd':
        return parsed.getDate().toString();
      case 'MMMM':
        return new Intl.DateTimeFormat(localeStr, { month: 'long' }).format(parsed);
      case 'MMM':
        return new Intl.DateTimeFormat(localeStr, { month: 'short' }).format(parsed);
      case 'MM':
        return (parsed.getMonth() + 1).toString().padStart(2, '0');
      case 'M':
        return (parsed.getMonth() + 1).toString();
      case 'yyyy':
        return parsed.getFullYear().toString();
      case 'yy':
        return parsed.getFullYear().toString().slice(-2);
      case 'HH':
        return parsed.getHours().toString().padStart(2, '0');
      case 'H':
        return parsed.getHours().toString();
      case 'hh':
        return (parsed.getHours() % 12 || 12).toString().padStart(2, '0');
      case 'h':
        return (parsed.getHours() % 12 || 12).toString();
      case 'mm':
        return parsed.getMinutes().toString().padStart(2, '0');
      case 'ss':
        return parsed.getSeconds().toString().padStart(2, '0');
      case 'EEEE':
        return new Intl.DateTimeFormat(localeStr, { weekday: 'long' }).format(parsed);
      case 'EEE':
        return new Intl.DateTimeFormat(localeStr, { weekday: 'short' }).format(parsed);
      case 'a':
        return parsed.getHours() < 12 ? 'AM' : 'PM';
      default:
        return match;
    }
  });
}

// Re-export parse for convenience

