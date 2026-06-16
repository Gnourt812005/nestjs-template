import { DomainEvent } from '../common/base.domain-event';
import { EAggregateType } from '../enums/aggregate-type.enum';

export interface ExamplePayload {
}

export class ExampleEvent extends DomainEvent<ExamplePayload> {
  public readonly eventType = 'ExampleEvent';
  public readonly aggregateType = EAggregateType.EXAMPLE;

  constructor(
    aggregateId: string,
    payload: ExamplePayload,
    metadata?: Record<string, unknown>,
  ) {
    super(aggregateId, payload, metadata);
  }
}
