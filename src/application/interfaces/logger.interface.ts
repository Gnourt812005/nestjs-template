import type { JsonObject } from '@/core/types';

export interface ILoggerService {
	setContext(context: string): void;
	log(message: string, context?: string, metadata?: JsonObject): void;
	error(message: string, trace?: string, context?: string, metadata?: JsonObject): void;
	warn(message: string, context?: string, metadata?: JsonObject): void;
	debug(message: string, context?: string, metadata?: JsonObject): void;
	verbose(message: string, context?: string, metadata?: JsonObject): void;
}

export const LOGGER_SERVICE = Symbol('ILoggerService');
