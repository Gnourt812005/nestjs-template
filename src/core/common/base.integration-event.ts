import * as crypto from 'crypto';

export interface TransportMetadata {
  exchange?: string;
  routingKey?: string;
  [key: string]: unknown;
}

export interface EventMetadata {
  correlationId?: string;
  causationId?: string;
  requestId?: string;
  [key: string]: unknown;
}

export abstract class IntegrationEvent<T = any> {
  abstract eventType: string;
  version = 1;
  eventId = crypto.randomUUID();
  occurredAt = new Date();

  constructor(
    public readonly payload: T,
    public readonly metadata?: EventMetadata,
    public readonly transport?: TransportMetadata,
  ) {}
}
