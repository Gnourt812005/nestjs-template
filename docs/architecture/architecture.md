# Clean Architecture, DDD, & CQRS Convention

> **Note**: This document has been refreshed to reflect the recent refactor of the `apps/server` codebase. The layer structure and responsibilities remain consistent, but file locations and naming conventions have been updated. See the updated sections below.

This document outlines the architecture, layer constraints, and implementation details for the `apps/server` project. It aims to maintain a strict separation of concerns following Clean Architecture, Domain-Driven Design (DDD), and CQRS principles.

The architectural layers dependency diagram:
`Infrastructure <-> Presentation -> Application -> Core`

**Rule of Dependency**: Inner layers MUST NOT know about outer layers.

---

## 1. Core Layer (`src/core`)
Contains the pure domain model: aggregates, entities, value objects, domain exceptions and the contracts that the outer layers must implement.

### Current Folder Structure
```
aggregate-roots/      # Root aggregates (campaign, user, enterprise, etc.)
common/               # Base classes for aggregates, entities, repositories, value objects
entities/             # Simple entity definitions used by aggregates
enums/                # Domain enums (status, types, etc.)
exceptions/           # Domain‑specific exception classes
interfaces/
  repositories/       # Repository contracts returning aggregates
  storage/            # Storage service contract (e.g., file storage)
types/                # Shared TypeScript types
value-objects/        # Immutable value objects
```

### Constraints & Implementation Details
* **Aggregate Roots (`aggregate-roots/*`)**:
  * The sole entry point for the Application layer to work with the domain.
  * Encapsulate related entities and value objects, enforcing transactional boundaries.
* **Entities (`entities/*`)**:
  * Extend `BaseEntity`, have an `id`, and provide static `create(props)` and constructor signatures.
* **Value Objects (`value-objects/*`)**:
  * Extend `BaseValueObject`, are immutable and compared by value.
* **Exceptions (`exceptions/*`)**:
  * Domain‑specific error types (e.g., `CampaignException`, `UserException`).
* **Interfaces (`interfaces/repositories/*`)**:
  * Define repository contracts that must return full Aggregate Roots.
  * Implemented in the Infrastructure layer.
* **Storage Interface (`interfaces/storage/*`)**:
  * Abstract contract for file storage services used by domain aggregates.
* **Common Base Classes (`common/*`)**:
  * Provide reusable base implementations for aggregates, entities, repositories and value objects.

---

## 2. Application Layer (`src/application`)
Contains application‑specific business rules and orchestrates use‑cases. The project follows a strict CQRS approach.

### Current Folder Structure
```
commands/            # Write side – Command objects, DTOs, and handlers
dtos/                # Data Transfer Objects used by commands and queries
events/              # Domain events emitted by command handlers
interfaces/          # Service contracts (e.g., JWT, Mailer, MessageQueue, UoW)
mappers/             # Convert Aggregate Roots ↔ DTOs
queries/             # Read side – Query objects and handlers
services/            # Application‑level services (auth, upload, etc.)
```

### Constraints & Implementation Details
* **CQRS Segregation**:
  * Write side lives in `commands/` and must interact with the Core layer (Aggregate Roots & Repositories) and the Unit of Work.
  * Read side lives in `queries/` and uses the read‑service interfaces defined in `interfaces/` to fetch DTOs directly, without touching domain entities.
* **Commands (`commands/*`)**:
  * Each command has a `.command.ts`, `.dto.ts`, and `.handler.ts`.
  * Handlers enforce business rules via Core aggregates and persist changes through repositories.
* **Queries (`queries/*`)**:
  * Queries are thin wrappers that call the appropriate read‑service implementation (e.g., `mongo/read-services`).
  * They return DTOs defined in `dtos/`.
* **DTOs (`dtos/*`)**:
  * Strictly typed with Zod validation where needed.
* **Mappers (`mappers/*`)**:
  * Map domain aggregates to DTOs for command responses and vice‑versa for input validation.
* **Events (`events/*`)**:
  * Emitted by command handlers and can be consumed by other parts of the system (e.g., notification service).
* **Services (`services/*`)**:
  * Application‑level utilities such as authentication logic and file upload handling that are not pure domain logic.

---

## 3. Infrastructure Layer (`src/infrastructure`)
The outermost layer handling all I/O, external services, and framework‑specific integrations.

### Current Folder Structure
```
auth/                # Authentication services & strategies (JWT, OAuth providers)
cloudinary/          # Cloudinary storage integration
graphql/             # GraphQL schema and type definitions
mailer/              # Email service and templates
modules/             # NestJS modules that wire up the above services
mongo/               # MongoDB specific implementations (repositories, schemas, read‑services, UoW)
nest-config/         # Configuration service for environment variables and RabbitMQ settings
nest-logger/         # Centralized logging (Winston)
rabbitmq/            # RabbitMQ connection, producer/consumer utilities
websocket/           # WebSocket gateway and service
```

### Constraints & Implementation Details
* **Repositories (`mongo/repositories`)**:
  * Implement domain repository interfaces defined in `core/interfaces`.
  * Translate MongoDB documents **only** into complete **Aggregate Roots** and vice‑versa.
* **Read Service Implementations (`mongo/read-services`)**:
  * Provide highly optimized queries that return DTOs directly, bypassing the domain model.
* **Database Mappers (`mongo/repositories/.../mappers`)**:
  * Convert between Mongoose documents and Aggregate Roots.
* **Unit of Work (`mongo/mongo-uow.ts`)**:
  * Concrete `IUnitOfWork` implementation using Mongoose sessions for transaction support.
* **Auth Services (`auth/*`)**:
  * JWT handling and OAuth strategies for Facebook, Google, Twitter, YouTube.
* **Cloudinary (`cloudinary/*`)**:
  * Service for uploading and managing media assets.
* **GraphQL (`graphql/*`)**:
  * Schema definition (`schema.gql`) and TypeScript type mappings for all domain entities.
* **Mailer (`mailer/*`)**:
  * Email sending service with Handlebars templates for campaign notifications and OTPs.
* **Modules (`modules/*.module.ts`)**:
  * NestJS modules that import providers from the above sub‑folders and expose them to the rest of the application.
* **Configuration (`nest-config/*`)**:
  * Centralized configuration service exposing environment variables and RabbitMQ settings.
* **Logging (`nest-logger/*`)**:
  * Winston‑based logger injected across layers for consistent structured logging.
* **RabbitMQ (`rabbitmq/*`)**:
  * Connection handling, producer/consumer registration, and raw consumer utilities.
* **WebSocket (`websocket/*`)**:
  * Gateway and service enabling real‑time event broadcasting.

---

## 4. Presentation Layer (`src/presentation`)
Exposes the application via HTTP, GraphQL and other transport mechanisms. It contains only thin adapters that forward requests to the Application layer.

### Current Folder Structure
```
controllers/          # NestJS REST controllers (auth, campaign, user, etc.)
decorators/           # Parameter decorators (e.g., @CurrentUser, @Public)
middleware/
  guards/             # Auth/role guards, API‑key guard, reCAPTCHA guard
  interceptors/       # Logging, tracing interceptors
  filters/            # Global exception handling (domain & HTTP)
  pipes/              # Validation pipes (file upload, DTO validation)
resolvers/            # GraphQL resolvers mapping to the same command/query handlers
```

### Constraints & Implementation Details
* **Controllers (`controllers/*`)**:
  * Only orchestrate request data and delegate to command/query handlers.
  * No business logic; validation is performed via DTOs and Zod pipes.
* **Decorators (`decorators/*`)**:
  * Provide convenient extraction of common request data (e.g., current user, public route flag).
* **Guards (`middleware/guards/*`)**:
  * Enforce authentication, role‑based access, API‑key checks, and reCAPTCHA verification.
* **Interceptors (`middleware/interceptors/*`)**:
  * Handle logging, request/response transformation, and performance tracing.
* **Filters (`middleware/filters/*`)**:
  * Convert domain exceptions into appropriate HTTP responses and log errors.
* **Pipes (`middleware/pipes/*`)**:
  * Validate and transform incoming payloads (file uploads, DTO validation).
* **Resolvers (`resolvers/*`)**:
  * GraphQL entry points that internally use the same command/query handlers as REST controllers, ensuring a single source of truth.

---

## 5. Shared Module (`src/shared`)
Provides cross‑cutting utilities that are framework‑agnostic and used by all layers.

### Current Folder Structure
```
utils/                # Generic helpers (e.g., `cn`, `deepClone`)
constants/           # Global constants and enums that are not domain‑specific
```

### Constraints & Implementation Details
* Must remain completely pure – no imports from NestJS, Mongoose, or other infrastructure.
* Contains only generic TypeScript utilities, helper functions and global constants.
* No business logic; domain‑specific types have been moved to `src/core/types` and common DTOs are now located in `src/application/dtos`.
