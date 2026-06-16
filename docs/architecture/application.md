# Application Layer Principles

The **Application** layer coordinates use‑cases. It contains **no business rules** – those live in the Core layer – but it orchestrates commands, queries, DTOs and services to fulfil a request.

## What belongs here?

| Category | Description |
|----------|-------------|
| **Commands** | Write‑side objects (`*.command.ts`) that represent an intention to change state. Each command has a matching DTO (`*.dto.ts`) and a handler (`*.handler.ts`). |
| **Queries** | Read‑side objects (`*.query.ts`) that request data. Handlers delegate to read‑service implementations and return DTOs. |
| **DTOs** | Data Transfer Objects used for input validation (via Zod) and output shaping. They live in `dtos/`. |
| **Mappers** | Functions that translate between Domain aggregates and DTOs (e.g., `campaign.mapper.ts`). |
| **Events** | Domain events emitted by command handlers, defined in `events/`. |
| **Services** | Application‑level utilities that are not pure domain logic (e.g., authentication helpers, file upload orchestration). |
| **Interfaces** | Contracts for external services required by the application (JWT, Mailer, MessageQueue, Unit of Work). |

## Naming Conventions

### Folder & File Structure
Each command or query is a **feature folder** named with kebab-case (e.g., `campaign-create`, `user-update-profile`). Inside, the files follow the pattern `<feature>.<type>.ts`:

| Artifact | Folder | File Pattern | Example |
|----------|--------|--------------|---------|
| Command folder | `commands/<feature>/` | — | `commands/campaign-create/` |
| Command class | — | `<feature>.command.ts` | `campaign-create.command.ts` → `CampaignCreateCommand` |
| Command DTO | — | `<feature>.dto.ts` | `campaign-create.dto.ts` → `CampaignCreateDto` |
| Command Handler | — | `<feature>.handler.ts` | `campaign-create.handler.ts` → `CampaignCreateHandler` |
| Query folder | `queries/<feature>/` | — | `queries/campaign-get-by-id/` |
| Query class | — | `<feature>.query.ts` | `campaign-get-by-id.query.ts` → `CampaignGetByIdQuery` |
| Query Handler | — | `<feature>.handler.ts` | `campaign-get-by-id.handler.ts` → `CampaignGetByIdHandler` |
| Event | `events/<feature>/` | `<feature>.event.ts` | `notification-dispatched.event.ts` |

### Class Naming

| Artifact | Pattern | Example |
|----------|---------|---------|
| Command | `{Feature}Command` | `CampaignCreateCommand`, `CampaignUpdateStatusCommand` |
| Command DTO | `{Feature}Dto` | `CampaignCreateDto` |
| Command Handler | `{Feature}CommandHandler` | `CampaignCreateCommandHandler` |
| Query | `{Feature}Query` | `CampaignGetByIdQuery`, `UserGetListQuery` |
| Query Handler | `{Feature}QueryHandler` | `CampaignGetByIdQueryHandler` |
| Event | `{EventName}Event` | `NotificationDispatchedEvent` |

### Shared DTOs
Reusable DTOs (not specific to a single command/query) live in `dtos/` and are named with domain prefix:
- `campaign.dto.ts` → `CampaignDto`
- `pagination.dto.ts` → `PaginationDto`
- `user.dto.ts` → `UserDto`

## Key Principles
1. **CQRS Separation** – Commands mutate state via the Core layer; Queries read data via read‑services without touching aggregates.
2. **Stateless Handlers** – Command and query handlers are lightweight, injected with the necessary repositories or services.
3. **Validation** – Input DTOs are validated with Zod before reaching handlers.
4. **Transaction Management** – Write operations use the Unit of Work (`IUnitOfWork`) to ensure atomicity across multiple repository calls.
5. **Event‑Driven** – After a successful command, relevant domain events are published for other parts of the system (e.g., notifications).
6. **DTO Organization** – The `dtos/` folder contains only reusable JSON‑type definitions and query filter objects. Command‑specific DTOs live alongside their command files, not in the shared DTO folder.
7. **Dependency Injection** – Handlers and services must receive dependencies via DI tokens (e.g., `@Inject(CAMPAIGN_REPOSITORY) private readonly repo: ICampaignRepository`). Direct instantiation of concrete classes is prohibited.
8. **DI Token Convention** – For every interface used as a port (repository, service, etc.), a corresponding `Symbol` token should be exported and used for injection.
9. **Service Layer** – Reusable business policies, validation helpers, or complex orchestration logic belong in the `services/` folder, keeping handlers focused on orchestration only.

## How it works
* A controller (Presentation layer) receives an HTTP request.
* It extracts the appropriate **Command DTO**, validates it, and dispatches the **Command** to its handler via NestJS's `CommandBus`.
* The handler loads the required **Aggregate Root** through a repository interface, invokes domain methods, and persists the aggregate using the same repository within a Unit of Work.
* Any **Domain Events** emitted are captured by event listeners and processed (e.g., sending emails).
* For reads, the controller creates a **Query**, the **Query Handler** calls a read‑service implementation (found in Infrastructure), and returns the resulting DTO.

## Example (simplified command handler)
```ts
@CommandHandler(CampaignUpdateStatusCommand)
export class CampaignUpdateStatusCommandHandler implements ICommandHandler<CampaignUpdateStatusCommand> {
  constructor(
    private readonly campaignRepo: ICampaignRepository,
    private readonly uow: IUnitOfWork,
  ) {}

  async execute(cmd: CampaignUpdateStatusCommand) {
    await this.uow.start();
    const campaign = await this.campaignRepo.findById(cmd.campaignId);
    campaign.updateStatus(cmd.newStatus); // domain rule inside aggregate
    await this.campaignRepo.save(campaign);
    await this.uow.commit();
    return { success: true };
  }
}
```

The handler contains **no business logic** beyond orchestrating the call to the aggregate.

---

For a full overview of the folder layout, see the **Application Layer** section in `architecture.md`.