import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { Response } from 'express';
import {
  DomainException,
  NotFoundDomainException,
  ConflictDomainException,
  ForbiddenDomainException,
  UnauthorizedDomainException,
  BadRequestDomainException,
} from '@/core/exceptions';
import { ApiResponseHelper } from '@/presentation/utils/api-response.helper';
import { type ILoggerService, LOGGER_SERVICE } from '@/application';
import { isFunction, isObject, isString } from '@/shared/utils';

type ErrorDetail = { field?: string; message: string };

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor (
    @Inject(LOGGER_SERVICE)
    private readonly logger: ILoggerService,
  ) {
    this.logger.setContext(HttpExceptionFilter.name)
  }

  catch(exception: any, host: ArgumentsHost) {
    if (isFunction(host.getType) && (host.getType() as string) === 'graphql') {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // ---------- DOMAIN EXCEPTIONS (checked first) ----------
    if (exception instanceof DomainException) {
      const { status, code } = this.mapDomainException(exception);
      const body = ApiResponseHelper.error(code, exception.message);
      this.logger.warn(`${request.method} ${request.url} ${status} - ${code}: ${exception.message}`);
      return response.status(status).json(body);
    }

    // ---------- HTTP EXCEPTIONS (NestJS built-in) ----------
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      const rawMessage = isString(res) ? res : (res as any).message || exception.message;
      const message = Array.isArray(rawMessage) ? rawMessage.join(',') : rawMessage;
      const code = this.httpStatusToCode(status);
      const details = this.extractDetails(res);
      const body = ApiResponseHelper.error(code, message, details);

      if (status >= 500) {
        this.logger.error(`${request.method} ${request.url} ${status} - ${exception.message}`, exception.stack);
      } else {
        this.logger.warn(`${request.method} ${request.url} ${status} - ${code}: ${message}`);
      }
      return response.status(status).json(body);
    }

    // ---------- UNHANDLED ERRORS ----------
    const message = exception?.message || 'Internal server error';
    this.logger.error(`${request.method} ${request.url} 500 - ${message}`, exception?.stack);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      ApiResponseHelper.error('INTERNAL_ERROR', message),
    );
  }

  private mapDomainException(exception: DomainException): { status: HttpStatus; code: string } {
    if (exception instanceof NotFoundDomainException) return { status: HttpStatus.NOT_FOUND, code: 'NOT_FOUND' };
    if (exception instanceof ConflictDomainException) return { status: HttpStatus.CONFLICT, code: 'CONFLICT' };
    if (exception instanceof ForbiddenDomainException) return { status: HttpStatus.FORBIDDEN, code: 'FORBIDDEN' };
    if (exception instanceof UnauthorizedDomainException) return { status: HttpStatus.UNAUTHORIZED, code: 'UNAUTHORIZED' };
    if (exception instanceof BadRequestDomainException) return { status: HttpStatus.BAD_REQUEST, code: 'BAD_REQUEST' };
    return { status: HttpStatus.BAD_REQUEST, code: 'DOMAIN_ERROR' };
  }

  private httpStatusToCode(status: number): string {
    const map: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.CONFLICT]: 'CONFLICT',
      [HttpStatus.TOO_MANY_REQUESTS]: 'RATE_LIMITED',
      [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP_VERSION_NOT_SUPPORTED',
    };
    return map[status] || 'INTERNAL_ERROR';
  }

  private extractDetails(res: string | object): ErrorDetail[] | undefined {
    if (!isObject(res)) return undefined;
    const body = res as Record<string, any>;
    if (Array.isArray(body.errors)) {
      return body.errors.map((e: any) => ({
        field: e.property || e.field || e.path,
        message: isString(e) ? e : e.constraints ? Object.values(e.constraints).join('; ') : e.message,
      }));
    }
    if (Array.isArray(body.message)) {
      return body.message.map((msg: string) => ({ message: msg }));
    }
    return undefined;
  }
}
