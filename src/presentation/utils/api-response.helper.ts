import type { ApiResponse, CursorPaginationMeta } from './api-response.type';
import { isObject } from '@/shared/utils';

export class ApiResponseHelper {
  static success<T>(data: T, meta?: CursorPaginationMeta | Record<string, any> | null): ApiResponse<T> {
    return {
      success: true,
      data,
      error: null,
      meta: meta ?? null,
    };
  }

  static error(
    code: string,
    message: string,
    details?: Array<{ field?: string; message: string }>,
  ): ApiResponse<null> {
    return {
      success: false,
      data: null,
      error: { code, message, details },
      meta: null,
    };
  }

  /**
   * Check if a value looks like a paginated response (has `data` array + `cursor`)
   */
  static isPaginatedResponse(value: unknown): value is { data: unknown[]; cursor: string | null; hasNext: boolean; limit: number } {
    if (!isObject(value)) return false;
    const obj = value as Record<string, unknown>;
    return Array.isArray(obj.data) && ('cursor' in obj) && ('hasNext' in obj) && ('limit' in obj);
  }
}