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
| **Constants / Enums** | `SCREAMING_SNAKE_CASE`.
* **Rationale**: Keeps the persistence layer aligned with typical MongoDB conventions while keeping the TypeScript codebase consistent.

## 4. Enum Naming Convention
* **Rule**: Enum members (the alias) must be written in `SCREAMING_SNAKE_CASE` (e.g., `ORDER_STATUS_PENDING`). The actual string value assigned to the enum should be in `snake_case` (e.g., `'order_status_pending'`).
* **Rationale**: Improves readability in code while keeping the persisted values consistent with typical database conventions.

## 3. Follow Existing Patterns
* **Rule**: When adding new code (e.g., a new command, handler, repository, or controller), locate a similar existing implementation and copy its structure and naming.
* **Steps**:
  1. Identify the closest existing feature (e.g., `campaign-create` for a new campaign command).
  2. Duplicate the folder/file layout.
  3. Adjust names according to the naming conventions above.
  4. Ensure the new code uses the same DI token pattern (`export const SOME_TOKEN = Symbol('SOME_TOKEN');`).
* **Rationale**: Guarantees uniformity, reduces cognitive load, and prevents accidental architectural drift.

---

These rules should be reviewed during code reviews and enforced by linting where possible.
First with core, 