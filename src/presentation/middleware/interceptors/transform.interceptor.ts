import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseHelper } from '@/presentation/utils/api-response.helper';
import type { ApiResponse } from '@/presentation/utils/api-response.type';
import { PaginatedResponseDto } from '@/application/dtos/pagination.dto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    // Skip GraphQL — let resolvers handle their own shape
    const type = context.getType() as string;
    if (type === 'graphql') {
      return next.handle() as unknown as Observable<ApiResponse<T>>;
    }

    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((responseBody) => {
        // Already in ApiResponse shape — pass through
        if (
          responseBody &&
          typeof responseBody === 'object' &&
          'success' in (responseBody as Record<string, unknown>) &&
          'data' in (responseBody as Record<string, unknown>)
        ) {
          return responseBody as unknown as ApiResponse<T>;
        }

        // Paginated response (has { data: T[], cursor } )
        if (ApiResponseHelper.isPaginatedResponse(responseBody)) {
          const paginated = responseBody as PaginatedResponseDto<T>;

          return ApiResponseHelper.success(paginated.data, {
            cursor: paginated.cursor ?? '',
            has_next: paginated.hasNext ?? false,
            limit: paginated.limit ?? paginated.data.length,
          }) as ApiResponse<T>;
        }

        // Standard response — wrap with meta: null
        return ApiResponseHelper.success(responseBody as T);
      }),
    );
  }
}