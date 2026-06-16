# Project Specific Rules

These rules complement the existing technical standards and are enforced across the codebase.

## 1. No `any`
* **Rule**: Never use the `any` type. All variables, function parameters and return types must be explicitly typed.
* **Rationale**: Guarantees type safety and enables reliable refactoring.

## 2. Naming Conventions per Layer
| Layer | Naming Style |
|-------|--------------|
| **Database / Mongoose schemas** | `snake_case` for field names (e.g., `created_at`, `user_id`). |
| **Core, Application, Presentation, Shared** | `camelCase` for variables, functions, and methods; `PascalCase` for classes and interfaces. |
| **Constants / Enums** | `SCREAMING_SNAKE_CASE`. |
* **Rationale**: Keeps the persistence layer aligned with typical MongoDB conventions while keeping the TypeScript codebase consistent.

## 3. Module Structure
* **Rule**: Each feature module lives in `src/modules/<name>/` with the following standard structure:
  * **Minimum** (quick scaffold): `module.ts` + `controllers/` + `services/` + `schemas/`
  * **Full** (complex modules): `module.ts` + `controllers/` + `services/` + `services/internal/` + `schemas/` + `crons/` + `subscribers/` + `events/` + `interfaces/` + `enums/`
* **Facade Pattern**: The main `<name>.service.ts` is the public facade — it's the only service exported from the module. Controllers and other modules inject only the facade.
* **Internal Services**: Business logic in `services/internal/` is private to the module and never exported. Internal services are split into reader, writer, and validator roles.
* **Schema = Type**: Services work directly with `Model<Document>`. No DTO layer is needed for simple modules — the Mongoose schema IS the primary type.
* **Registration**: The module is imported into `src/nest-config/app.module.ts`.
* **Scaffolding**: Use `scripts/init.sh module <Name>` for a minimum scaffold, or `scripts/init.sh module <Name> --full` for all folders.

## 4. Enum Naming Convention
* **Rule**: Enum members (the alias) must be written in `SCREAMING_SNAKE_CASE` (e.g., `ORDER_STATUS_PENDING`). The actual string value assigned to the enum should be in `snake_case` (e.g., `'order_status_pending'`).
* **Rationale**: Improves readability in code while keeping the persisted values consistent with typical database conventions.

## 5. Follow Existing Patterns
* **Rule**: When adding new code (e.g., a new feature module, controller, or service), locate a similar existing implementation and copy its structure and naming.
* **Steps**:
  1. Identify the closest existing feature (e.g., the `src/example/` module for a new module).
  2. Duplicate the folder/file layout.
  3. Adjust names according to the naming conventions above.
  4. Register the module in `src/nest-config/app.module.ts`.
* **Rationale**: Guarantees uniformity, reduces cognitive load, and prevents accidental architectural drift.

---

These rules should be reviewed during code reviews and enforced by linting where possible.