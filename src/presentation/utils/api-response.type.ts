export interface ApiResponse<T> {
  success: boolean;       // Always present. True for 2xx, False for 4xx/5xx
  data: T | null;         // Holds payload on success; null on error
  error: {                // Holds details on error; null on success
    code: string;         // Machine-readable error identifier (e.g., "NOT_FOUND")
    message: string;      // Human-readable generic error message
    details?: Array<{     // Optional: Contextual errors (validation, boundaries)
      field?: string;
      message: string;
    }>;
  } | null;
  meta: (CursorPaginationMeta & {
    [key: string]: any;
  }) | {                // Holds metadata; null if not applicable
    [key: string]: any;   // Allows for other custom metadata keys
  } | null;
}

export interface CursorPaginationMeta {
  cursor: string;
  has_next: boolean;
  limit: number;
}
