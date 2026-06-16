# Documentation Guide

This repository contains a set of architectural and rule documents that describe how the **HiveK** server is structured. Below is a quick guide on how to navigate and read the most important files.

## Folder Overview

```
apps/server/docs/
├─ architecture/          # Architecture documentation
│   ├─ module.md          # Module‑based architecture (current standard)
│   ├─ architecture.md    # (legacy) Clean Architecture layers
│   ├─ core.md            # (legacy) Core layer principles
│   ├─ application.md     # (legacy) Application layer principles
│   ├─ infrastructure.md  # (legacy) Infrastructure layer principles
│   └─ presentation.md    # (legacy) Presentation layer principles
├─ domain/                # Documentation for each domain (e.g., campaign, user)
│   └─ <domain-name>.md   # Flow, use‑cases and specific domain details
├─ tech/                  # Technical integration guidelines
│   └─ <tech-name>.md     # How to integrate a specific technology (e.g., RabbitMQ, GraphQL)
├─ rules/                # Project‑specific coding rules
│   └─ custom-rules.md   # No `any`, naming conventions, enum style, etc.
└─ README.md             # **You are here** – quick start guide
```

## How to Read the Docs

1. **Start with `architecture/module.md`** – it describes the current module-based architecture with Facade + Internal service pattern.
2. **For legacy Clean Architecture references** – see the deprecated `architecture.md`, `core.md`, `application.md`, `infrastructure.md`, `presentation.md` files.
3. **Check the coding rules** – `rules/custom-rules.md` lists mandatory standards (no `any`, naming per layer, enum alias/value style, DI token usage). Treat this as a checklist during code reviews.
4. **Cross‑reference** – each layer file contains a *Current Folder Structure* section that mirrors the actual file system. Use it to locate implementations quickly.

## Quick Tips

* **Naming** – follow the layer‑specific conventions (snake_case for DB fields, camelCase for code). Enum members are `SCREAMING_SNAKE_CASE` with lower‑snake values.
* **DI Tokens** – every interface that acts as a port should have an exported `Symbol` token used for NestJS injection.
* **Reuse** – when adding new features, copy the folder layout of a similar existing feature (e.g., the `example/` module) and adapt the names.
* **Module init** – use `scripts/init.sh module <Name>` to scaffold a new feature module automatically.

---

Feel free to update these documents as the codebase evolves. Keeping them in sync with the source ensures new team members can get up to speed quickly.
