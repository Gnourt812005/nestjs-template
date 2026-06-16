<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Template</h1>

<p align="center">
  A collection of production-ready <strong>NestJS 11</strong> templates for different architectures.
  <br/>
  Choose the branch that fits your project needs.
</p>

<p align="center">
  <a href="#-available-templates">Templates</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-comparison">Comparison</a>
</p>

---

## 📦 Available Templates

| Branch | Architecture | Best For |
|---|---|---|
| [`module`](https://github.com/Gnourt812005/nestjs-template/tree/module) | **Module-Based** (Facade + Internal services) | Standard CRUD features, rapid development |
| [`clean-architecture`](https://github.com/Gnourt812005/nestjs-template/tree/clean-architecture) | **Clean Architecture + DDD + CQRS** | Complex domains with rich business rules |

---

## 🚀 Quick Start

```bash
# Pick your template
git clone -b <branch> https://github.com/Gnourt812005/nestjs-template.git my-project
cd my-project
yarn install
cp .env.example .env
yarn start:dev
```

**Examples:**

```bash
# Module-based (recommended for most projects)
git clone -b module https://github.com/Gnourt812005/nestjs-template.git my-app

# Clean Architecture (for complex domains)
git clone -b master https://github.com/Gnourt812005/nestjs-template.git my-app
```

---

## ⚡ Comparison

| Aspect | `clean-architecture` (Clean Architecture) | `module` (Module-Based) |
|---|---|---|
| Layers | Core → Application → Infrastructure → Presentation | Single module per feature |
| Complexity | High (aggregates, repositories, handlers, mappers) | Low (controller + service + schema) |
| Service pattern | CQRS (Command/Query bus) | Facade + Internal services |
| Best for | Rich domain logic, event sourcing, multi-actor workflows | CRUD features, APIs, rapid onboarding |
| DB coupling | Abstracted via repository interfaces | Direct Mongoose model in services |
| Scaffolding | `scripts/init.sh domain` / `command` / `query` | `scripts/init.sh module` |

---

## 📖 Documentation

Detailed docs are available on each branch's `docs/` folder.

---

<p align="center">
  Made with ❤️ for faster NestJS development
</p>