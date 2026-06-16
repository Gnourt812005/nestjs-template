# Documentation Guide

This repository contains a set of architectural and rule documents that describe how the **HiveK** server is structured. Below is a quick guide on how to navigate and read the most important files.

## Folder Overview

```
apps/server/docs/
├─ architecture/          # High‑level architecture overview (`architecture.md`)
│   ├─ architecture.md    # Layers, dependencies and constraints
│   ├─ core.md            # Core layer principles
│   ├─ application.md     # Application layer principles
│   ├─ infrastructure.md  # Infrastructure layer principles
│   └─ presentation.md    # Presentation layer principles
├─ domain/                # Documentation for each domain (e.g., campaign, user)
│   └─ <domain-name>.md   # Flow, use‑cases and specific domain details
├─ tech/                  # Technical integration guidelines
│   └─ <tech-name>.md     # How to integrate a specific technology (e.g., RabbitMQ, GraphQL)
├─ rules/                # Project‑specific coding rules
│   └─ custom-rules.md   # No `any`, naming conventions, enum style, etc.
└─ README.md             # **You are here** – quick start guide
```

## How to Read the Docs

1. **Start with `architecture/architecture.md`** – it gives a visual diagram of the layer dependencies and explains the overall design philosophy (Clean Architecture, DDD, CQRS).
2. **Drill down into each layer** – open the corresponding `*.md` file (`core.md`, `application.md`, `infrastructure.md`, `presentation.md`) to see concrete folder structures, responsibilities and key conventions.
3. **Check the coding rules** – `rules/custom-rules.md` lists mandatory standards (no `any`, naming per layer, enum alias/value style, DI token usage). Treat this as a checklist during code reviews.
4. **Cross‑reference** – each layer file contains a *Current Folder Structure* section that mirrors the actual file system. Use it to locate implementations quickly.

## Quick Tips

* **Naming** – follow the layer‑specific conventions (snake_case for DB fields, camelCase for code). Enum members are `SCREAMING_SNAKE_CASE` with lower‑snake values.
* **DI Tokens** – every interface that acts as a port should have an exported `Symbol` token used for NestJS injection.
* **Reuse** – when adding new features, copy the folder layout of a similar existing feature (e.g., `campaign-create`) and adapt the names.

---

Feel free to update these documents as the codebase evolves. Keeping them in sync with the source ensures new team members can get up to speed quickly.
