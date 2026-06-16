# Core Layer Principles

The **Core** layer is the heart of the system. It contains **pure domain logic** that is completely independent of any framework, database or external service. The goal is to model the business concepts and rules in a way that can be understood and tested without any infrastructure concerns.

## What belongs here?

| Category | Folder / Path | Description |
|----------|---------------|-------------|
| **Aggregate Roots** | `aggregate-roots/` | Entry points for the application. Encapsulate a cluster of related entities and value objects and enforce invariants. |
| **Entities** | `entities/` | Objects with a stable identity (`id`). Simple data holders used by aggregates. |
| **Value Objects** | `value-objects/` | Immutable objects compared by their values, not by identity. |
| **Domain Events** | `events/` | Objects representing something significant that has happened in the domain (e.g., `EntityHardDeletedEvent`). |
| **Domain Exceptions** | `exceptions/` | Specific error types representing business rule violations. |
| **Interfaces** | `interfaces/` | Contracts that outer layers must implement (repository interfaces, storage service contracts). |
| **Base Classes** | `common/` | Reusable abstract classes (`BaseEntity`, `BaseAggregateRoot`, `BaseValueObject`, `BaseRepository`) providing common functionality. |
| **Enums & Types** | `enums/`, `types/` | Domain‑specific enumerations and shared TypeScript types. |

## Naming Conventions

### File Naming
All files in the core layer use **kebab-case** with a typed suffix:

| Artifact | File Pattern | Example |
|----------|--------------|---------|
| Aggregate Root | `<name>.aggregate.ts` | `campaign.aggregate.ts` |
| Entity | `<name>.entity.ts` | `kol-profile.entity.ts` |
| Value Object | `<name>.value-object.ts` | `kol-platform-info.value-object.ts` |
| Domain Event | `<name>.domain-event.ts` | `entity-hard-deleted.domain-event.ts` |
| Enum | `<name>.enum.ts` | `campaign-status.enum.ts` |
| Exception | `<name>.exception.ts` | `campaign.exception.ts` |
| Base Class | `base.<name>.ts` | `base.aggregate-root.ts` |

### Class Naming

| Artifact | Pattern | Example |
|----------|---------|---------|
| Aggregate Root | `{Domain}Root` | `CampaignRoot`, `UserRoot` |
| Entity | `{EntityName}` | `KolProfile`, `KpiLog` |
| Value Object | `{Name}VO` | `KolPlatformInfoVO`, `PhoneNumberVO` |
| Domain Event | `{Name}Event` | `EntityHardDeletedEvent` |
| Enum | `E{Name}` | `ECampaignStatus`, `EParticipantStatus` |
| Exception | `{Domain}Exception` | `CampaignException`, `UserException` |
| Repository Interface | `I{Name}Repository` | `ICampaignRepository` |

### Enum Member & Value Naming

- **Enum members / aliases** are written in `SCREAMING_SNAKE_CASE` (e.g., `FINDING_KOL`, `IN_PROGRESS`).
- **Actual string values** are written in lowercase `snake_case` (e.g., `'finding_kol'`, `'in_progress'`).

```ts
export enum ECampaignStatus {
  DRAFT = 'draft',
  FINDING_KOL = 'finding_kol',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
```

### DI Token Convention

For every interface that acts as a port (e.g., repository or service contract), a corresponding `Symbol` token must be exported alongside the interface. The token uses `SCREAMING_SNAKE_CASE`:

```ts
export const CAMPAIGN_REPOSITORY = Symbol('CampaignRepository');
```

## Key Principles

1. **Pure TypeScript** – No imports from NestJS, Mongoose, Express, etc.
2. **Encapsulation** – All business rules live inside aggregates. External code can only interact through the aggregate's public methods.
3. **Immutability** – Value objects are immutable; any change results in a new instance.
4. **Single Responsibility** – Each class has one clear responsibility (e.g., an aggregate manages its own invariants, a repository only persists aggregates).
5. **Dependency Inversion** – The core defines *interfaces*; concrete implementations live in the Infrastructure layer.
6. **Early Return** – Avoid deep if/else nesting; fail fast on invalid state.
7. **Domain Events & Outbox** – Aggregates can register internal domain events. These events are extracted by the Application layer and persisted to the Outbox atomically within the same transaction to trigger side-effects (Reliable Event-Driven Architecture).

## Current Folder Structure

```
core/
├── aggregate-roots/
├── common/
│   ├── base.aggregate-root.ts
│   ├── base.entity.ts
│   ├── base.repository.interface.ts
│   ├── base.value-object.ts
│   ├── domain-event.interface.ts
│   └── index.ts
├── entities/
├── enums/
├── events/          # Internal Domain Events
├── exceptions/
├── interfaces/
├── types/
└── value-objects/
```

## How to use it

- **Application layer** obtains an aggregate via a repository interface, calls a method on the aggregate (e.g., `campaignRoot.updateStatus(...)`), and then persists the aggregate using the same repository.
- **Unit tests** can instantiate aggregates directly, call methods, and assert state without any database or framework setup.

## Example (simplified)

```ts
// src/core/aggregate-roots/campaign.aggregate.ts
import { BaseAggregateRoot } from '../common/base.aggregate-root';
import { ECampaignStatus } from '../enums/campaign-status.enum';
import { CampaignException } from '../exceptions/campaign.exception';

export class CampaignRoot extends BaseAggregateRoot {
  private constructor(private props: CampaignProps) { super(); }

  static create(props: CampaignProps): CampaignRoot {
    if (props.budget <= 0) throw new CampaignException('Budget must be positive');
    return new CampaignRoot(props);
  }

  updateStatus(newStatus: ECampaignStatus) {
    if (!isValidTransition(this.props.status, newStatus)) {
      throw new CampaignException('Invalid status transition');
    }
    this.props.status = newStatus;
  }
}
```

## Domain Events, Integration Events, & Mappers

Our architecture distinguishes cleanly between internal business facts (Domain Events) and asynchronous external communication (Integration Events), wired together by the `EventMapper`.

### 1. Domain Events
A **Domain Event** represents an important business fact that occurred inside a domain boundary. It reflects domain language and business behavior.

* **Base Class**: `DomainEvent<T>` (found in `src/core/common/base.domain-event.ts`)
* **Naming**: The class is named `{Action}Event` (e.g., `UserSignUpEvent`, `VerificationOtpCreatedEvent`), and its `eventType` property matches the class name without the `Event` suffix (e.g., `eventType = 'UserSignUp'`).
* **Characteristics**:
  * Internal to the application/domain.
  * Encapsulated and raised directly by aggregate roots (`BaseAggregateRoot.addDomainEvent`).
  * Purely business-logic focused, containing no infrastructure dependencies.

### 2. Integration Events
An **Integration Event** represents communication intended for external systems, messaging brokers (RabbitMQ), or asynchronous background processors.

* **Base Class**: `IntegrationEvent<T>` (found in `src/core/common/base.integration-event.ts`)
* **Characteristics**:
  * Public communication contract.
  * Contains stable, versioned schemas with standard metadata (e.g., `correlationId`, `causationId`) and transport details (e.g., `exchange`, `routingKey`).
  * Written to outbox tables and dispatched via message queues.

### 3. Event Mapper
The **Event Mapper** (`src/application/mappers/event.mapper.ts`) translates internal Domain Events into one or many public Integration Events. 

* Isolates the core domain model from public contract schemas.
* Provides `mapToIntegrationEvent` and `mapToIntegrationEvents` mapping entry points.

---

## Example: Domain Events & Outbox Lifecycle

1. **Register**: The aggregate root registers an event internally.
2. **Commit**: The handler runs within a Unit of Work transaction.
3. **Map & Enqueue**: The handler fetches the domain events, uses the `EventMapper` to convert them into Integration Events, enqueues them into the `OutboxService` inside the same transaction, and clears the aggregate's domain events queue.

```ts
// src/core/aggregate-roots/enterprise.aggregate.ts
export class EnterpriseRoot extends BaseAggregateRoot<EnterpriseProps> {
  // ...
  public markForHardDelete(): void {
    this.addDomainEvent(new EntityHardDeletedEvent(
      this.id!,
      {
        entityId: this.id!,
        targetType: TargetType.ENTERPRISE,
      }
    ));
  }
}
```

The aggregate root contains **no NestJS decorators**, no database calls, and can be unit‑tested in isolation.

---

For a full overview of the folder layout, see the **Core Layer** section in `architecture.md`.
