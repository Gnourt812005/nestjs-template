import { BaseEntity } from './base.entity';
import { DomainEvent } from './base.domain-event';

export abstract class BaseAggregateRoot<Props> extends BaseEntity<Props> {
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: Props, id?: string) {
    super(props, id);
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  public get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }
}
