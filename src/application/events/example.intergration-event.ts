import { EventMetadata, IntegrationEvent, TransportMetadata } from '@/core/common/base.integration-event';

export interface ExampleEventPayload {
}

export class ExampleEvent extends IntegrationEvent<ExampleEventPayload> {
  public readonly eventType = 'ExampleEvent';

  constructor(
    payload: ExampleEventPayload,
    metadata?: EventMetadata,
    transport?: TransportMetadata,
  ) {
    super(payload, metadata, transport);
  }
}
