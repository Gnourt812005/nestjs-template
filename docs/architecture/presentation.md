# Presentation Layer Principles

The **Presentation** layer is the entry point for external clients (HTTP, GraphQL, WebSocket). It contains only thin adapters that forward requests to the Application layer. No business logic should reside here.

## What belongs here?
| Category | Description |
|----------|-------------|
| **Controllers** | NestJS REST controllers that map HTTP routes to commands or queries. They perform request validation using DTOs and delegate to the `CommandBus` / `QueryBus`. |
| **Resolvers** | GraphQL resolvers that perform the same orchestration as controllers, keeping a single source of truth for use‑cases. |
| **Decorators** | Parameter decorators (`@CurrentUser`, `@Public`, `@Roles`) that extract common data from the request context. |
| **Guards** | Authentication and authorization guards (`JwtAuthGuard`, `RolesGuard`, `ApiKeyGuard`, `RecaptchaGuard`). They must be registered globally or per‑route and rely on DI tokens for the underlying services. |
| **Interceptors** | Cross‑cutting concerns such as logging, tracing, or response transformation. |
| **Filters** | Global exception filters that translate domain exceptions into proper HTTP responses (e.g., 400, 404, 500). |
| **Pipes** | Validation pipes that apply Zod schemas to incoming payloads and handle file‑upload validation. |

## Key Principles
1. **Thin Controllers** – Controllers should only extract data, validate it, and dispatch a command or query. No business rules are implemented here.
2. **Guard‑First** – Every protected route must be guarded by the appropriate authentication/authorization guard. Guards obtain their dependencies via DI tokens (e.g., `@Inject(JWT_STRATEGY) private readonly strategy`).
3. **Decorator Usage** – Use decorators to keep controller signatures clean and to centralize common request‑parsing logic.
4. **Exception Mapping** – Global filters convert domain exceptions (defined in Core) into HTTP status codes and error payloads, ensuring consistent error responses.
5. **Reuse Across Transports** – The same command/query handlers are used by both REST controllers and GraphQL resolvers, guaranteeing identical behaviour.
6. **DI Token Convention** – Any service used by guards, interceptors, or filters must be injected via a `Symbol` token defined alongside its interface.

## Example Guard
```ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(JWT_STRATEGY) private readonly strategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    const payload = await this.strategy.validate(token);
    request.user = payload;
    return true;
  }
}
```

## Example Controller
```ts
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: CreateCampaignDto) {
    return this.commandBus.execute(new CreateCampaignCommand(dto));
  }
}
```

The controller simply forwards the validated DTO to the command bus; all business rules are enforced inside the Core layer.

---

For a full overview of the folder layout, see the **Presentation Layer** section in `architecture.md`.
