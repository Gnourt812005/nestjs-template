# Infrastructure Layer Principles

The **Infrastructure** layer provides concrete implementations for the ports defined in the Core and Application layers. It contains all framework‑specific code (NestJS modules, Mongoose models, RabbitMQ clients, etc.) and external service integrations.

## What belongs here?
| Category | Description |
|----------|-------------|
| **Modules** | NestJS `@Module` classes that group related providers (repositories, services, adapters) per domain. Each domain (e.g., `campaign`, `user`, `notification`) gets its own module, making it easy to see which commands/queries belong to which domain. |
| **Repositories** | Implementations of the repository interfaces from `core/interfaces/repositories`. They translate between Mongoose documents and domain **Aggregate Roots**. |
| **Read‑Service Implementations** | Concrete classes that implement the read‑service interfaces from `application/interfaces`. They perform optimized queries and return DTOs directly. |
| **Adapters / Providers** | Implementations of other ports such as storage (`IStorageService`), mailer (`IMailerService`), message queue (`IMessageQueueService`), etc. |
| **Configuration Modules** | Modules that expose configuration values (environment variables, RabbitMQ settings) via NestJS providers. |
| **Utility Modules** | Logging (`nest-logger`), authentication strategies (`auth`), Cloudinary integration, GraphQL schema registration, WebSocket gateway, etc. |

## Key Principles
1. **Domain‑Scoped Modules** – Each domain has its own NestJS module (e.g., `CampaignModule`, `UserModule`). The module imports the necessary repositories, services, and adapters, and registers the command and query handlers that belong to that domain. This keeps the wiring clear and maintainable.
2. **Port‑Implementation Mapping** – Every interface (port) declared in Core or Application has exactly one concrete implementation in this layer. The implementation is exported as a provider using a **DI token** (`Symbol`) defined alongside the interface.
3. **Avoid Circular Dependencies** – Modules only depend on lower‑level modules (e.g., `InfrastructureModule` imports domain modules, but domain modules never import `InfrastructureModule`). Shared utilities (e.g., logger) are placed in a separate `Common` module that can be imported by any other module without creating cycles.
4. **Registration Strategy** – Simple providers (e.g., a storage service) can be registered directly in `infrastructure.module.ts`. More complex groups (e.g., all campaign‑related providers) are encapsulated in their own module file (`campaign.module.ts`) and then re‑exported from the root `InfrastructureModule`.
5. **Isolation from Core** – The Infrastructure layer should never import anything from the Core layer other than the defined interfaces. This guarantees that the Core remains framework‑agnostic.

## Example Module Layout
```
src/infrastructure/
  modules/
    campaign.module.ts      # Provides CampaignRepository, CampaignReadService, command/query handlers
    user.module.ts          # Provides UserRepository, UserReadService, auth services
    notification.module.ts  # Provides NotificationRepository, mailer adapters
    infrastructure.module.ts # Root module that imports all domain modules and common utilities
  mongo/
    repositories/…          # Mongoose repository implementations
    read-services/…         # Read‑service implementations
    schemas/…               # Mongoose schema definitions
  auth/
    jwt.service.ts
    strategies/…
  cloudinary/
    cloudinary-storage.service.ts
  graphql/
    schema.gql
    types/…
  mailer/
    nestjs-mailer.service.ts
    templates/…
  rabbitmq/
    rabbitmq.service.ts
    producer/…
    consumer/…
  websocket/
    websocket.gateway.ts
    websocket.service.ts
  nest-config/
    nest-config.service.ts
  nest-logger/
    winston-logger.service.ts
```

## How Modules are Wired
```ts
// src/infrastructure/modules/campaign.module.ts
@Module({
  imports: [MongoModule], // provides Mongoose connection
  providers: [
    { provide: CAMPAIGN_REPOSITORY, useClass: MongoCampaignRepository },
    { provide: CAMPAIGN_READ_SERVICE, useClass: MongoCampaignReadService },
    CampaignCreateHandler,
    CampaignUpdateHandler,
    // other command/query handlers for the campaign domain
  ],
  exports: [CAMPAIGN_REPOSITORY, CAMPAIGN_READ_SERVICE],
})
export class CampaignModule {}

// src/infrastructure/infrastructure.module.ts
@Module({
  imports: [CampaignModule, UserModule, NotificationModule, AuthModule, CloudinaryModule, RabbitMqModule, WebsocketModule, LoggerModule],
})
export class InfrastructureModule {}
```

## Avoiding Circular Dependencies
* Keep **domain modules** independent; they only import shared utilities (e.g., `LoggerModule`).
* If two domains need to communicate, use **event publishing** (via the Event Bus) rather than direct imports.
* Centralize cross‑cutting concerns (logger, config) in their own modules that have no dependencies on domain modules.

---

For a complete overview of the folder layout, see the **Infrastructure Layer** section in `architecture.md`.
