<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Template</h1>

<p align="center">
  A production-ready <strong>NestJS 11</strong> template with <strong>Clean Architecture</strong>, <strong>Domain-Driven Design (DDD)</strong>, and <strong>CQRS</strong> patterns — plus automated setup scripts for faster project initialization.
</p>

<p align="center">
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-setup-scripts">Setup Scripts</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-documentation">Docs</a>
</p>

---

## 🏗️ Architecture

The template follows a strict **Clean Architecture** layered approach with **DDD** and **CQRS** principles:

```
Infrastructure <-> Presentation → Application → Core
```

**Rule of Dependency**: Inner layers MUST NOT know about outer layers. The Core layer has zero framework imports.

### Layers Overview

| Layer | Responsibility | Depends On |
|---|---|---|
| **Core** (`src/core/`) | Pure domain model — aggregates, entities, value objects, domain events, repository interfaces, enums, exceptions | Nothing |
| **Application** (`src/application/`) | CQRS orchestration — commands (write), queries (read), DTOs (Zod), mappers, service interfaces (ports) | Core |
| **Infrastructure** (`src/infrastructure/`) | I/O & framework integrations — MongoDB (Mongoose), repositories, read-services, mailer, logger, WebSocket, modules, NestJS config | Core, Application |
| **Presentation** (`src/presentation/`) | Entry points — HTTP controllers, WebSocket gateway, exception filters, interceptors, guards, pipes | Application |

### CQRS Flow

```
Write Path:
  Controller → CommandBus → Handler → loads Aggregate via Repository
    → calls domain method → saves Aggregate via Repository (inside UoW transaction)

Read Path:
  Controller → QueryBus → Handler → calls Read-Service → returns DTOs (bypasses domain model)
```

### Domain Events → Integration Events

1. Aggregate calls `this.addDomainEvent(new ExampleEvent(...))` to register an internal event
2. After UoW commit, handler fetches domain events, maps them to Integration Events, enqueues to Outbox
3. Integration events are dispatched via message broker (RabbitMQ) for async processing

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Gnourt812005/nestjs-template.git
cd nestjs-template
yarn install
```

### 2. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Required variables: `MONGODB_URI`, `JWT_SECRET`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`

### 3. Start Development

```bash
# Development mode with watch
yarn start:dev

# Production mode
yarn start:prod

# Debug mode
yarn start:debug
```

The server starts at `http://[HOST]:[PORT]/service` with Swagger docs at `http://[HOST]:[PORT]/service/docs`.

---

## 📦 Features

### 🧱 Architecture & Patterns
- **Clean Architecture** — Strict 4-layer separation of concerns
- **DDD** — Aggregates, entities, value objects, domain events, repositories
- **CQRS** — Separate command (write) and query (read) paths via `@nestjs/cqrs`
- **Transaction Management** — `AsyncLocalStorage`-based Unit of Work with automatic commit/rollback
- **Event-Driven** — Domain events → Integration events → Outbox → Message broker

### ✅ Pre-installed & Configured
- **NestJS 11.x** — Latest stable version
- **TypeScript 5.7.x** — ES2024 target, NodeNext module resolution
- **ESLint 9.x** — Flat config format with NestJS/TypeScript rules
- **Prettier** — Code formatting
- **Jest** — Testing framework
- **Path Aliases** — `@/`, `@core/`, `@application/`, `@infrastructure/`, `@presentation/`, `@shared/`

### 🔌 Integrations
- **MongoDB** — Mongoose 9 with `@nestjs/mongoose`, snake_case fields, soft-delete plugin
- **Authentication** — JWT + Passport, bearer token, API key, reCAPTCHA
- **WebSocket** — Socket.IO gateway with room-based user targeting
- **Email** — Handlebars templates via `@nestjs-modules/mailer`
- **Validation** — Zod schemas via `nestjs-zod`
- **Swagger** — Auto-generated OpenAPI documentation
- **Throttling** — Rate limiting via `@nestjs/throttler`
- **Logging** — Structured logging via `ILoggerService` interface
- **Security** — Helmet headers, CORS

### 🎯 Available Setup Scripts

All scripts are in [`package-script/`](./package-script/):

| Script | Description |
|--------|-------------|
| [`authentication.sh`](./package-script/authentication.sh) | JWT, Passport, Auth0, OAuth2 |
| [`common.sh`](./package-script/common.sh) | Logger, Config, Validation, Date utilities |
| [`database.sh`](./package-script/database.sh) | MongoDB, Prisma, Redis, Elasticsearch |
| [`microservice.sh`](./package-script/microservice.sh) | Kafka, RabbitMQ, Redis, gRPC, NATS, MQTT |
| [`websocket.sh`](./package-script/websocket.sh) | WebSocket and Socket.io |
| [`testing.sh`](./package-script/testing.sh) | Additional testing tools |

See [`package-script/README.md`](./package-script/README.md) for detailed information.

---

## 📁 Project Structure

```
nestjs-template/
├── src/
│   ├── core/                          # Pure domain model (framework-agnostic)
│   │   ├── aggregate-roots/           # Aggregate roots (e.g., ExampleRoot)
│   │   ├── common/                    # Base classes (BaseEntity, BaseAggregateRoot,
│   │   │                               # BaseValueObject, DomainEvent, IntegrationEvent)
│   │   ├── entities/                  # Simple entity definitions
│   │   ├── enums/                     # Domain enums (EAggregateType)
│   │   ├── events/                    # Domain events
│   │   ├── exceptions/                # Domain exceptions (NotFound, Conflict, etc.)
│   │   ├── interfaces/
│   │   │   ├── repositories/         # Repository contracts (return Aggregate Roots)
│   │   │   └── storage/              # Storage service contract
│   │   ├── types/                     # Shared TypeScript types (Nullable, Optional)
│   │   └── value-objects/            # Immutable value objects
│   │
│   ├── application/                   # CQRS orchestration
│   │   ├── commands/                  # Write side: Command classes, DTOs (Zod), Handlers
│   │   │   └── <feature>/            # e.g., example-create/
│   │   ├── queries/                   # Read side: Query classes, DTOs, Handlers
│   │   │   └── <feature>/            # e.g., example-get-by-id/
│   │   ├── dtos/                      # Shared DTOs (ExampleDto, PaginationDto, ProjectionDto)
│   │   ├── events/                    # Application-level events
│   │   ├── interfaces/               # Ports (ILoggerService, IUnitOfWork, IMailerService,
│   │   │                               # IWebSocketService, IMessageQueueService, read-service interfaces)
│   │   ├── mappers/                   # Aggregate Root ↔ DTO mapping
│   │   └── services/                 # Application services (auth, upload, etc.)
│   │
│   ├── infrastructure/                # I/O & framework integrations
│   │   ├── logger/                    # NestLoggerService (implements ILoggerService)
│   │   ├── mailer/                    # NestjsMailerService + Handlebars templates
│   │   ├── modules/                   # NestJS modules
│   │   │   ├── app.module.ts          # Root module
│   │   │   ├── infrastructure.module.ts  # Global infrastructure module
│   │   │   └── example.module.ts      # Domain module example
│   │   ├── mongo/                     # MongoDB (Mongoose)
│   │   │   ├── repositories/         # Repository implementations (maps docs ↔ aggregates)
│   │   │   ├── read-services/        # Read-service implementations (returns DTOs)
│   │   │   ├── schemas/              # Mongoose schemas (snake_case fields)
│   │   │   ├── utils/                # Projection, sanitize, soft-delete utilities
│   │   │   ├── mongo-uow.ts          # AsyncLocalStorage-based transaction management
│   │   │   └── mongo.module.ts       # Global Mongo module
│   │   ├── nest-config/              # App setup (helmet, CORS, global prefix) + Swagger
│   │   └── websocket/                # WebSocket service (room-based emit)
│   │
│   ├── presentation/                  # Entry points
│   │   ├── controllers/
│   │   │   ├── http/                 # REST controllers (delegate to CommandBus/QueryBus)
│   │   │   ├── resolvers/            # GraphQL resolvers (scaffold)
│   │   │   └── websocket/            # WebSocket gateway (auth, room join, ping/pong)
│   │   ├── decorators/               # @Public() decorator
│   │   ├── middleware/
│   │   │   ├── filters/              # HttpExceptionFilter (domain → HTTP status mapping)
│   │   │   ├── guards/               # Auth/role guards (scaffold)
│   │   │   ├── interceptors/         # LoggingInterceptor, TransformInterceptor
│   │   │   └── pipes/                # Validation pipes
│   │   └── utils/                    # ApiResponse types/helper, versioned route util
│   │
│   └── shared/                        # Cross-cutting utilities (framework-agnostic)
│       ├── date/                     # Date formatting, parsing, relative time
│       └── utils/                    # Crypto, enum, env, error, pagination, string, type, validation
│
├── docs/                              # Documentation
│   ├── architecture/                 # Layer architecture docs
│   ├── domain/                       # Domain-specific docs
│   ├── rules/                        # Coding rules (custom-rules.md)
│   ├── skills/                       # Testing skills
│   └── tech/                         # Tech integration guides (WebSocket)
│
├── package-script/                    # Installation scripts
├── scripts/                           # Helper scripts
├── test/                              # E2E tests
├── .env.example                       # Environment variable template
│
├── eslint.config.mjs                  # ESLint flat config
├── nest-cli.json                      # NestJS CLI config
├── tsconfig.json                      # TypeScript config with path aliases
└── package.json                       # Dependencies & scripts
```

---

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov

# Watch mode
yarn test:watch
```

---

## 🏗️ Build & Deploy

```bash
# Build for production
yarn build

# Run production build
yarn start:prod
```

---

## 📚 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | NestJS 11 |
| **Language** | TypeScript 5.7 (ES2024, NodeNext) |
| **CQRS** | `@nestjs/cqrs` 11 |
| **Database** | MongoDB via Mongoose 9 + `@nestjs/mongoose` 11 |
| **Validation** | Zod 4 via `nestjs-zod` |
| **WebSocket** | Socket.IO (`@nestjs/platform-socket.io`, `@nestjs/websockets`) |
| **Auth** | Passport + JWT + bcrypt |
| **Email** | Nodemailer + Handlebars via `@nestjs-modules/mailer` |
| **Security** | Helmet, `@nestjs/throttler` |
| **API Docs** | Swagger/OpenAPI via `@nestjs/swagger` |
| **Logging** | NestJS Logger + `nest-winston` |
| **Testing** | Jest + Supertest |
| **Linting** | ESLint 9 flat config + Prettier |
| **Package Manager** | Yarn |

---

## 📖 Documentation

Comprehensive documentation is in the [`docs/`](./docs/) folder:

| Path | Description |
|---|---|
| [`docs/README.md`](./docs/README.md) | Quick start guide for reading the docs |
| [`docs/architecture/architecture.md`](./docs/architecture/architecture.md) | High-level architecture diagram & layer dependencies |
| [`docs/architecture/core.md`](./docs/architecture/core.md) | Core layer principles, naming conventions, examples |
| [`docs/architecture/application.md`](./docs/architecture/application.md) | Application layer CQRS patterns |
| [`docs/architecture/infrastructure.md`](./docs/architecture/infrastructure.md) | Infrastructure implementations & module wiring |
| [`docs/architecture/presentation.md`](./docs/architecture/presentation.md) | Controllers, guards, interceptors, filters |
| [`docs/rules/custom-rules.md`](./docs/rules/custom-rules.md) | Coding standards (no `any`, naming, enums, DI tokens) |

---

## 🌿 Branches

- **`main`** — Clean Architecture + DDD + CQRS template with MongoDB
- **`microservice`** _(coming soon)_ — Pre-configured microservice template
- **`graphql`** _(coming soon)_ — GraphQL API template
- **`rest-api`** _(coming soon)_ — RESTful API template
- **`full-stack`** _(coming soon)_ — Full-stack with Next.js
- **`monorepo`** _(coming soon)_ — NX monorepo template

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new features following the established patterns
- Improve existing implementations
- Fix bugs
- Update documentation
- Suggest new template branches

When adding new code, follow the [custom rules](./docs/rules/custom-rules.md) and copy the folder layout of a similar existing feature.

---

## 📚 Resources

### NestJS Documentation
- [Official Documentation](https://docs.nestjs.com)
- [Discord Community](https://discord.gg/G7Qnnhy)
- [Video Courses](https://courses.nestjs.com/)

### Architecture References
- [Martin Fowler — CQRS](https://martinfowler.com/bliki/CQRS.html)
- [Domain-Driven Design Quickly](https://www.infoq.com/minibooks/domain-driven-design-quickly/)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Useful Tools
- [NestJS DevTools](https://devtools.nestjs.com)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

---

<p align="center">
  Made with ❤️ for faster NestJS development
</p>

<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/Built%20with-NestJS-E0234E?style=for-the-badge&logo=nestjs" alt="Built with NestJS">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  </a>
  <a href="https://yarnpkg.com/" target="_blank">
    <img src="https://img.shields.io/badge/Yarn-Package%20Manager-2C8EBB?style=for-the-badge&logo=yarn" alt="Yarn">
  </a>
</p>