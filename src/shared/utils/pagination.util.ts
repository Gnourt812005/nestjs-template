/**
 * Metadata for offset-based pagination.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Builds pagination metadata from total count and current page/limit.
 *
 * @example
 * ```ts
 * buildPaginationMeta(50, 1, 20)
 * // { page: 1, limit: 20, totalItems: 50, totalPages: 3, hasNext: true, hasPrev: false }
 * ```
 */
export function buildPaginationMeta(
  totalItems: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Safely parses and sanitises page / limit query params with optional max clamping.
 *
 * @example
 * ```ts
 * parsePager('2', '50', 100) // { page: 2, limit: 50, skip: 50 }
 * parsePager()               // { page: 1, limit: 20, skip: 0 }
 * parsePager('abc', '-5')    // { page: 1, limit: 1,  skip: 0 }
 * ```
 */
export function parsePager(
  page?: number | string,
  limit?: number | string,
  maxLimit = 100,
): { page: number; limit: number; skip: number } {
  const p = typeof page === 'string' ? parseInt(page, 10) : (page ?? 1);
  const l = typeof limit === 'string' ? parseInt(limit, 10) : (limit ?? 20);
  const safePage = Math.max(1, isNaN(p) ? 1 : p);
  const safeLimit = Math.max(1, Math.min(isNaN(l) ? 20 : l, maxLimit));
  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
}

/**
 * Encodes a cursor for cursor-based pagination (base64 JSON).
 *
 * @param id        - Unique identifier (e.g. MongoDB ObjectId)
 * @param sortValue - Value to sort by (timestamp, number, etc.)
 */
export function encodeCursor(id: string, sortValue: string | number | Date): string {
  return Buffer.from(
    JSON.stringify({ id, sort: sortValue instanceof Date ? sortValue.toISOString() : sortValue }),
  ).toString('base64');
}

/**
 * Decodes a cursor back to `{ id, sort }`.
 * Returns `null` for invalid / malformed cursors.
 */
export function decodeCursor(cursor: string): { id: string; sort: string } | null {
  try {
    const raw = Buffer.from(cursor, 'base64').toString('utf-8');
    const decoded = JSON.parse(raw);
    if (!decoded.id || decoded.sort === undefined) return null;
    return { id: String(decoded.id), sort: String(decoded.sort) };
  } catch {
    return null;
  }
}
