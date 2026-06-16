import { Locale } from './format';
import { toDate } from './parse';

const LOCALE_MAP: Record<Locale, string> = { en: 'en', vi: 'vi' };

/**
 * Returns a human-friendly relative time string using `Intl.RelativeTimeFormat`.
 *
 * @example
 * ```ts
 * timeAgo(new Date(Date.now() - 60000), 'en')    // "1 minute ago"
 * timeAgo(new Date(Date.now() - 60000), 'vi')    // "1 phút trước"
 * timeAgo(new Date(Date.now() + 3600000), 'en')  // "in 1 hour"
 * ```
 */
export function timeAgo(
  date: Date | string | number | null | undefined,
  locale: Locale = 'vi',
): string {
  const parsed = toDate(date);
  if (!parsed) return '';

  const now = new Date();
  const diffMs = parsed.getTime() - now.getTime();

  const rtf = new Intl.RelativeTimeFormat(LOCALE_MAP[locale], { numeric: 'auto' });

  const seconds = Math.round(diffMs / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (Math.abs(seconds) < 60) return rtf.format(seconds, 'second');
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  if (Math.abs(days) < 7) return rtf.format(days, 'day');
  if (Math.abs(weeks) < 5) return rtf.format(weeks, 'week');
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  return rtf.format(years, 'year');
}

/**
 * Checks whether two dates fall on the same calendar day.
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Returns `true` if the given date is today.
 */
export function isToday(date: Date | string | number | null | undefined): boolean {
  const parsed = toDate(date);
  return parsed ? isSameDay(parsed, new Date()) : false;
}

/**
 * Returns `true` if the given date is yesterday.
 */
export function isYesterday(date: Date | string | number | null | undefined): boolean {
  const parsed = toDate(date);
  if (!parsed) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(parsed, yesterday);
}

/**
 * Returns `true` if the given date is tomorrow.
 */
export function isTomorrow(date: Date | string | number | null | undefined): boolean {
  const parsed = toDate(date);
  if (!parsed) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(parsed, tomorrow);
}

export type DateDiffUnit =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

/**
 * Calculates the difference between two dates in the requested unit.
 * Returns a positive number when `end` is after `start`.
 */
export function dateDiff(
  start: Date | string | number,
  end: Date | string | number,
  unit: DateDiffUnit = 'days',
): number {
  const s = toDate(start);
  const e = toDate(end);
  if (!s || !e) return 0;

  const diffMs = e.getTime() - s.getTime();

  switch (unit) {
    case 'milliseconds':
      return diffMs;
    case 'seconds':
      return Math.floor(diffMs / 1000);
    case 'minutes':
      return Math.floor(diffMs / 60_000);
    case 'hours':
      return Math.floor(diffMs / 3_600_000);
    case 'days':
      return Math.floor(diffMs / 86_400_000);
    case 'weeks':
      return Math.floor(diffMs / 604_800_000);
    case 'months':
      return (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
    case 'years':
      return e.getFullYear() - s.getFullYear();
    default:
      return 0;
  }
}

