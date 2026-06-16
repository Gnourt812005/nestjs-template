<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Template</h1>

<p align="center">
  A production-ready <strong>NestJS 11</strong> template featuring <strong>Module-Based Architecture</strong> with Facade + Internal service pattern, plus automated scaffolding for rapid development.
</p>

<p align="center">
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-scaffolding">Scaffolding</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-documentation">Docs</a>
</p>

---

## 🏗️ Architecture

The template follows a **Module-Based Architecture** — each feature is a self-contained NestJS module with its own controllers, services, schema, events, and more.

### Module = Feature

```
src/modules/<name>/
├── <name>.module.ts       # NestJS @Module() — registers schemas, controllers, providers
├── controllers/           # HTTP/REST endpoints
├── services/              # Facade Service (public) + Internal services (private)
├── schemas/               # Mongoose schema = the module's primary type
├── crons/                 # Scheduled tasks (@Cron)
├── subscribers/           # Event handlers (@OnEvent)
├── events/                # Custom event classes
├── interfaces/            # TypeScript interfaces
└── enums/                 # Enum constants
```

### Facade + Internal Service Pattern

```
Controller
  └─▶ FacadeService (public, exported — the module's API)
        ├─▶ InternalReaderService  (private — read operations)
        ├─▶ InternalWriterService  (private — write operations)
        └─▶ InternalValidatorService (private — business rules)
```

**Key rules:**
- The **Facade Service** is the *only* service exported from the module
- **Internal services** are private — never exported or injected by external consumers
- The **Mongoose Schema** IS the primary type (services work directly with `Model<Document>`)

### Legacy Clean Architecture

The template also supports a Clean Architecture + DDD + CQRS pattern for complex domains (see `src/core/`, `src/application/`, `src/infrastructure/`, `src/presentation/`). Use the module-based approach for standard CRUD features and Clean Architecture for domains with rich business rules.

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Gnourt812005/nestjs-template.git
cd nestjs-template
yarn install
```

### 2. Environment Setup

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

The server starts at `http://[HOST]:[PORT]/service`.

---

## 📦 Features

### 🧱 Module Architecture
- **Self-contained modules** — Each feature owns its controllers, services, schema, events, etc.
- **Facade Pattern** — Public facade service + private internal services (reader, writer, validator)
- **Schema = Type** — Services work directly with Mongoose models. No DTO layer for simple modules.
- **CRUD Scaffolding** — One command generates a complete module with all boilerplate

### ✅ Pre-installed & Configured
- **NestJS 11.x** — Latest stable version
- **TypeScript 5.7.x** — ES2024 target, NodeNext module resolution
- **ESLint 9.x** — Flat config format with NestJS/TypeScript rules
- **Prettier** — Code formatting
- **Jest** — Testing framework
- **Path Aliases** — `@/` → `src/`
- **Config** — `@nestjs/config` with `.env` loading
- **Scheduling** — `@nestjs/schedule` for cron jobs
- **Event Emitter** — `@nestjs/event-emitter` for pub/sub

### 🔌 Integrations
- **MongoDB** — Mongoose 9 with `@nestjs/mongoose`, snake_case fields
- **Authentication** — JWT + Passport, bearer token, API key
- **WebSocket** — Socket.IO gateway with room-based user targeting
- **Email** — Handlebars templates via `@nestjs-modules/mailer`
- **Validation** — Zod schemas via `nestjs-zod`
- **Swagger** — Auto-generated OpenAPI documentation
- **Throttling** — Rate limiting via `@nestjs/throttler`
- **Security** — Helmet headers, CORS

### 🎯 Legacy Clean Architecture
For complex domains with rich business rules, the existing Clean Architecture layers remain available:
- `src/core/` — Pure domain model (aggregates, entities, value objects, domain events)
- `src/application/` — CQRS orchestration (commands, queries, handlers)
- `src/infrastructure/` — Framework integrations (MongoDB repositories, UoW, mailer, logger)
- `src/presentation/` — Entry points (controllers, guards, interceptors, filters)

---

## ⚡ Scaffolding

Generate code fast with the `scripts/init.sh` tool:

```bash
./scripts/init.sh module <Name>           # Minimum: controller + facade service + schema
./scripts/init.sh module <Name> --full    # Full: adds internal services, crons, subscribers, events
./scripts/init.sh domain <Name>           # Clean Architecture domain (aggregate + repo + schema + controller)
./scripts/init.sh command <Name>          # CQRS command (dto + command + handler)
./scripts/init.sh query <Name>            # CQRS query (dto + query + handler)
./scripts/init.sh domain-event <Name>     # Core domain event class
./scripts/init.sh integration-event <Name> # Application integration event class
./scripts/init.sh vo <Name>               # Core value object
./scripts/init.sh enum <Name>             # Core enum
```

### Example: Create a Product Module

```bash
./scripts/init.sh module product
```

Generates:
```
src/modules/product/
├── product.module.ts          # NestJS module with Mongoose schema registration
├── controllers/
│   ├── product.controller.ts  # CRUD endpoints (findAll, findById, create)
│   └── index.ts
├── services/
│   ├── product.service.ts     # Facade — works directly with Model<ProductDocument>
│   └── index.ts
└── schemas/
    ├── product.schema.ts      # Mongoose schema with snake_case timestamps
    └── index.ts
```

And automatically registers `ProductModule` in `src/nest-config/app.module.ts`.

---

## 📁 Project Structure

```
nestjs-template/
├── src/
│   ├── example/                      # Reference module (full scaffold example)
│   │   ├── example.module.ts
│   │   ├── controllers/
│   │   ├── services/
│   │   │   ├── example.service.ts    # Facade
│   │   │   └── internal/             # Private reader/writer services
│   │   ├── schemas/
│   │   ├── crons/
│   │   ├── subscribers/
│   │   ├── events/
│   │   ├── interfaces/
│   │   └── enums/
│   │
│   ├── modules/                      # Feature modules (scaffolded via init.sh)
│   │   └── <name>/                   # Each feature gets its own module folder
│   │
│   ├── nest-config/                  # App configuration
│   │   ├── app.module.ts             # Root module (Config, Mongoose, Schedule, EventEmitter, modules)
│   │   ├── app.setup.ts              # Helmet, CORS, global prefix
│   │   └── swagger.setup.ts          # Swagger/OpenAPI setup
│   │
│   ├── middlewares/                  # Global middleware
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   │
│   ├── shared/                       # Cross-cutting utilities
│   │   ├── date/
│   │   ├── enums/
│   │   └── utils/
│   │
│   ├── core/                         # [Legacy] Clean Architecture — domain model
│   ├── application/                  # [Legacy] CQRS orchestration
│   ├── infrastructure/               # [Legacy] Framework integrations
│   └── presentation/                 # [Legacy] Entry points
│
├── docs/                             # Documentation
│   ├── architecture/module.md        # Module architecture guide (current standard)
│   ├── rules/custom-rules.md         # Coding standards
│   └── ...
├── scripts/
│   └── init.sh                       # Scaffolding script
├── package-script/                   # Installation scripts
├── test/                             # E2E tests
└── package.json
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
| **Database** | MongoDB via Mongoose 9 + `@nestjs/mongoose` 11 |
| **Validation** | Zod 4 via `nestjs-zod` |
| **WebSocket** | Socket.IO (`@nestjs/platform-socket.io`, `@nestjs/websockets`) |
| **Auth** | Passport + JWT + bcrypt |
| **Email** | Nodemailer + Handlebars via `@nestjs-modules/mailer` |
| **Security** | Helmet, `@nestjs/throttler` |
| **Scheduling** | `@nestjs/schedule` |
| **Event Emitter** | `@nestjs/event-emitter` |
| **API Docs** | Swagger/OpenAPI via `@nestjs/swagger` |
| **Logging** | NestJS Logger + `nest-winston` |
| **Testing** | Jest + Supertest |
| **Linting** | ESLint 9 flat config + Prettier |
| **Package Manager** | Yarn |

---

## 📖 Documentation

| Path | Description |
|---|---|
| [`docs/README.md`](./docs/README.md) | Documentation index & navigation |
| [`docs/architecture/module.md`](./docs/architecture/module.md) | **Module-based architecture** — current standard |
| [`docs/architecture/architecture.md`](./docs/architecture/architecture.md) | Clean Architecture layers & dependencies |
| [`docs/architecture/core.md`](./docs/architecture/core.md) | Core layer principles, naming conventions, examples |
| [`docs/architecture/application.md`](./docs/architecture/application.md) | Application layer CQRS patterns |
| [`docs/architecture/infrastructure.md`](./docs/architecture/infrastructure.md) | Infrastructure implementations & module wiring |
| [`docs/architecture/presentation.md`](./docs/architecture/presentation.md) | Controllers, guards, interceptors, filters |
| [`docs/rules/custom-rules.md`](./docs/rules/custom-rules.md) | Coding standards (no `any`, naming, enums, module structure) |

---

## 🌿 Branches

- **`main`** — Current: Module-based architecture + Clean Architecture (legacy)
- **`microservice`** _(coming soon)_ — Pre-configured microservice template

---

## 🤝 Contributing

When adding new features:
1. Follow the module pattern in `src/example/` as a reference
2. Use `./scripts/init.sh module <Name>` to scaffold
3. Follow the [custom rules](./docs/rules/custom-rules.md)
4. Register the module in `src/nest-config/app.module.ts`

---

<p align="center">
  Made with ❤️ for faster NestJS development
</p>

<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/Built%20with-NestJS-E0234E?style=for-the-badge&logo=nestjs" alt="Built with NestJS">
  </a>
  <a href="https://yarnpkg.com/" target="_blank">
    <img src="https://img.shields.io/badge/Yarn-Package%20Manager-2C8EBB?style=for-the-badge&logo=yarn" alt="Yarn">
  </a>
</p>