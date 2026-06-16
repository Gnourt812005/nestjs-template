# Module Architecture

This document describes the **Module-Based Architecture** — the standard pattern for organizing feature modules in this project. Each module is a self-contained NestJS feature that owns its own controllers, services, schema, events, and more.

---

## 1. Core Philosophy

Each module follows the **Facade + Internal** service pattern:

```
Module
├── Controllers (entry points — inject only the facade)
└── Services
    ├── Facade Service (public, exported — the module's API)
    │   ├── InternalReader    (private — read operations)
    │   ├── InternalWriter    (private — write operations)
    │   └── InternalValidator (private — business rules)
    └── Internal (not exported)
```

**Rules:**
- The **Facade Service** is the *only* service exported from the module. Controllers and other modules inject only the facade.
- **Internal services** are private to the module — they are never exported or injected by external consumers.
- The **Mongoose Schema** IS the primary type. No separate DTO layer is needed for simple modules — services work directly with `Model<Document>`.

---

## 2. Module Folder Structure

```
src/modules/<name>/
├── <name>.module.ts           # NestJS @Module() decorator
├── controllers/               # HTTP/REST endpoints
│   ├── <name>.controller.ts
│   └── index.ts
├── services/                  # Business logic
│   ├── <name>.service.ts      # PUBLIC FACADE — exported from module
│   ├── internal/              # PRIVATE — not exported
│   │   ├── <name>-reader.service.ts
│   │   ├── <name>-writer.service.ts  
│   │   ├── <name>-validator.service.ts
│   │   └── index.ts
│   └── index.ts
├── schemas/                   # Mongoose schema & type definitions
│   ├── <name>.schema.ts
│   └── index.ts
├── crons/                     # Scheduled tasks (ScheduleModule)
│   ├── <name>.cron.ts
│   └── index.ts
├── subscribers/               # Event subscribers (@OnEvent)
│   ├── <name>.subscriber.ts
│   └── index.ts
├── events/                    # Custom event classes
│   ├── <name>.event.ts
│   └── index.ts
├── interfaces/                # TypeScript interfaces & types
│   └── index.ts
└── enums/                     # Enum definitions
    └── index.ts
```

### 2.1 Minimum Scaffold

For simple modules, only these folders are needed:

```
src/modules/<name>/
├── <name>.module.ts
├── controllers/
│   └── <name>.controller.ts
├── services/
│   └── <name>.service.ts
└── schemas/
    └── <name>.schema.ts
```

### 2.2 Full Scaffold

Add the optional folders for more complex modules:

| Folder | Purpose | Requires |
|---|---|---|
| `crons/` | Scheduled tasks via `@Cron` / `@Interval` | `@nestjs/schedule` |
| `subscribers/` | Event handlers via `@OnEvent` | `@nestjs/event-emitter` |
| `events/` | Custom event classes emitted by the module | — |
| `interfaces/` | TypeScript interfaces (input types, DTO shapes, options) | — |
| `enums/` | Enum constants used by the module | — |
| `services/internal/` | Private business logic (reader, writer, validator) | — |

---

## 3. File Templates

### 3.1 Module (`<name>.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { <Name>Controller } from './controllers/<name>.controller';
import { <Name>Service } from './services/<name>.service';
import { Internal<Name>ReaderService } from './services/internal/<name>-reader.service';
import { Internal<Name>WriterService } from './services/internal/<name>-writer.service';
import { <Name>, <Name>Schema } from './schemas/<name>.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: <Name>.name, schema: <Name>Schema }]),
  ],
  controllers: [<Name>Controller],
  providers: [
    <Name>Service,
    Internal<Name>ReaderService,
    Internal<Name>WriterService,
  ],
  exports: [<Name>Service], // Only the facade is exported
})
export class <Name>Module {}
```

### 3.2 Controller (`controllers/<name>.controller.ts`)

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { <Name>Service } from '../services/<name>.service';

@ApiTags('<name>s')
@Controller('<name>s')
export class <Name>Controller {
  constructor(private readonly <name>Service: <Name>Service) {}

  @Get()
  async findAll() {
    return this.<name>Service.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.<name>Service.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.<name>Service.findById(id);
  }
}
```

### 3.3 Facade Service (`services/<name>.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { Internal<Name>ReaderService } from './internal/<name>-reader.service';
import { Internal<Name>WriterService } from './internal/<name>-writer.service';

@Injectable()
export class <Name>Service {
  constructor(
    private readonly reader: Internal<Name>ReaderService,
    private readonly writer: Internal<Name>WriterService,
  ) {}

  async findAll() {
    return this.reader.findAll();
  }

  async findById(id: string) {
    return this.reader.findById(id);
  }

  async create(data: any) {
    return this.writer.create(data);
  }

  async update(id: string, data: any) {
    return this.writer.update(id, data);
  }

  async delete(id: string) {
    return this.writer.delete(id);
  }
}
```

### 3.4 Internal Reader Service (`services/internal/<name>-reader.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { <Name>, <Name>Document } from '../../schemas/<name>.schema';

@Injectable()
export class Internal<Name>ReaderService {
  constructor(
    @InjectModel(<Name>.name) private readonly model: Model<<Name>Document>,
  ) {}

  async findAll() {
    return this.model.find().exec();
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }
}
```

### 3.5 Internal Writer Service (`services/internal/<name>-writer.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { <Name>, <Name>Document } from '../../schemas/<name>.schema';

@Injectable()
export class Internal<Name>WriterService {
  constructor(
    @InjectModel(<Name>.name) private readonly model: Model<<Name>Document>,
  ) {}

  async create(data: any) {
    return this.model.create(data);
  }

  async update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
```

### 3.6 Mongoose Schema (`schemas/<name>.schema.ts`)

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: '<name>s',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class <Name> {
  // Define fields here
  // @Prop({ required: true })
  // name: string;

  created_at: Date;
  updated_at: Date;
}

export type <Name>Document = HydratedDocument<<Name>>;
export const <Name>Schema = SchemaFactory.createForClass(<Name>);
```

### 3.7 Cron Job (`crons/<name>.cron.ts`)

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class <Name>Cron {
  private readonly logger = new Logger(<Name>Cron.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.logger.log('Running scheduled task...');
    // TODO: implement
  }
}
```

### 3.8 Event Subscriber (`subscribers/<name>.subscriber.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class <Name>Subscriber {
  @OnEvent('<name>.created')
  handle<Name>Created(payload: any) {
    // TODO: handle event
  }
}
```

### 3.9 Event Class (`events/<name>.event.ts`)

```typescript
export class <Name>Event {
  constructor(
    public readonly payload: any,
  ) {}
}
```

---

## 4. Module Registration

Modules are registered in `src/nest-config/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductModule } from '../modules/product/product.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myapp'),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ProductModule,
    UserModule,
    // ... other modules
  ],
})
export class AppModule {}
```

---

## 5. Key Conventions

| Convention | Rule |
|---|---|
| **Schema = Type** | Services work directly with `Model<Document>`. No DTO layer unless complexity demands it. |
| **Facade Export** | Only the facade service is exported from each module. Internal services are private. |
| **Snake Case DB** | Schema field names and collection names use `snake_case` (e.g., `created_at`, `user_id`). |
| **Module Namespace** | Modules live under `src/modules/<name>/`. The folder name matches the feature (kebab-case). |
| **Index Barrel** | Every folder has an `index.ts` barrel export. |
| **Controller Path** | Controllers use the global prefix `/service` (configured in `app.setup.ts`). |

---

## 6. Comparison with Clean Architecture

This module architecture is **lighter and faster** than the Clean Architecture + DDD + CQRS pattern.

| Aspect | Clean Architecture (legacy) | Module Architecture (current) |
|---|---|---|
| Layers | Core → Application → Infrastructure → Presentation | Single module per feature |
| Complexity | High (aggregates, repositories, handlers, mappers) | Low (controller + service + schema) |
| Best for | Complex domains with rich business rules | CRUD-heavy features, rapid development |
| DB coupling | Abstracted via repository interfaces | Direct Mongoose model in services |
| Service pattern | CQRS (Command/Query bus) | Facade + Internal services |

**When to use which:**
- **Module Architecture**: For standard features (products, users, orders, etc.)
- **Clean Architecture**: For domains with complex business rules, event sourcing, or multi-actor workflows

---

## 7. Scaffolding

Use the `init.sh` script to generate a new module:

```bash
# Minimum scaffold (controller + service facade + schema)
./scripts/init.sh module <Name>

# Full scaffold (adds crons, subscribers, events, interfaces, enums, internal services)
./scripts/init.sh module <Name> --full
```

This will create the complete folder structure with boilerplate files ready for implementation.