<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Template</h1>

<p align="center">
  A production-ready NestJS template with automated setup scripts for faster project initialization.
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-setup-scripts">Setup Scripts</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-branches">Branches</a>
</p>

---

## 📋 Description

This is a **production-ready NestJS template** designed to accelerate project setup and development. Instead of manually installing packages for each new project, this template provides interactive setup scripts that let you quickly configure your NestJS application with the exact features you need.

### 🎯 Why Use This Template?

- ⚡ **Fast Setup**: Get started in minutes, not hours
- 🎨 **Modular**: Choose only the packages you need
- 🔧 **Interactive Scripts**: User-friendly installation wizards
- 📦 **Pre-configured**: ESLint, Prettier, TypeScript all set up
- 🌿 **Multiple Branches**: Specialized templates for different use cases (coming soon)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Gnourt812005/nestjs-template.git
cd nestjs-template
```

### 2. Install Dependencies

```bash
yarn install
```

This will install all essential packages needed for a basic NestJS application. See [`package-script/common.sh`](./package-script/common.sh) for the list of included packages.

### 3. Choose Your Additional Packages

Navigate to the `package-script` directory to find setup scripts for additional features:

```bash
chmod +x package-script/*.sh

cd package-script
```

Run any script based on your needs:

```bash
# Set up database (MongoDB, Prisma, Redis, etc.)
./database.sh

# Set up microservices (Kafka, Redis, gRPC, etc.)
./microservice.sh

# Set up authentication (JWT, Passport, etc.)
./authentication.sh

# Set up WebSocket
./websocket.sh

# Install common utilities
./common.sh
```

### 4. Start Development

```bash
# Development mode with watch
yarn start:dev

# Production mode
yarn start:prod

# Debug mode
yarn start:debug
```

## 📦 Features

### ✅ Pre-installed & Configured

- **NestJS 11.x** - Latest stable version
- **TypeScript 5.9.x** - With ES2024 support
- **ESLint 9.x** - Flat config format with NestJS rules
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Clean Architecture** - Organized folder structure

### 🎯 Available Setup Scripts

All scripts are located in the [`package-script`](./package-script/) directory:

| Script | Description |
|--------|-------------|
| [`authentication.sh`](./package-script/authentication.sh) | JWT, Passport, Auth0, OAuth2, etc. |
| [`common.sh`](./package-script/common.sh) | Common utilities (Logger, Config, Validation, etc.) |
| [`database.sh`](./package-script/database.sh) | MongoDB, Prisma, Redis, GraphQL, Elasticsearch |
| [`microservice.sh`](./package-script/microservice.sh) | Kafka, Redis, gRPC, MQTT, NATS, RabbitMQ |
| [`websocket.sh`](./package-script/websocket.sh) | WebSocket and Socket.io |
| [`testing.sh`](./package-script/testing.sh) | Additional testing tools |

See [`package-script/README.md`](./package-script/README.md) for detailed information about each script.

## 🛠️ Setup Scripts

### Database Setup

```bash
./package-script/database.sh
```

**Available Options:**
- MongoDB (Mongoose)
- MongoDB (@nestjs/mongoose)
- Prisma ORM
- Redis (ioredis)
- GraphQL with Neo4j
- Elasticsearch

### Microservice Setup

```bash
./package-script/microservice.sh
```

**Available Transports:**
- Kafka
- Redis
- gRPC
- MQTT
- NATS
- RabbitMQ
- TCP (built-in)

### Authentication Setup

```bash
./package-script/authentication.sh
```

**Available Options:**
- JWT (@nestjs/jwt)
- Passport (@nestjs/passport)
- bcrypt (password hashing)
- Auth0
- OAuth2

### Common Utilities

```bash
./package-script/common.sh
```

**Available Categories:**
- Essential packages (Config, Validation, Logger, etc.)
- Utilities (Date-fns, Lodash, UUID, etc.)
- HTTP clients (Axios, Fetch)
- Scheduling (Cron, Bull Queue)

## 📁 Project Structure

```
nestjs-template/
├── src/
│   ├── application/        # Business logic & use cases
│   ├── core/              # Domain models & interfaces
│   ├── infrastructure/    # External services & implementations
│   ├── presentation/      # Controllers & DTOs
│   ├── shared/           # Shared utilities & helpers
│   ├── app.module.ts     # Root module
│   └── main.ts           # Application entry point
├── package-script/        # Installation scripts
│   ├── authentication.sh
│   ├── common.sh
│   ├── database.sh
│   ├── microservice.sh
│   ├── websocket.sh
│   ├── testing.sh
│   └── README.md
├── test/                  # E2E tests
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── nest-cli.json         # NestJS CLI configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies & scripts
```

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

## 🏗️ Build & Deploy

```bash
# Build for production
yarn build

# Run production build
yarn start:prod
```

## 🌿 Branches

This repository uses different branches for specialized templates:

- **`main`** - Base template with minimal setup
- **`microservice`** _(coming soon)_ - Pre-configured microservice template
- **`graphql`** _(coming soon)_ - GraphQL API template
- **`rest-api`** _(coming soon)_ - RESTful API template
- **`full-stack`** _(coming soon)_ - Full-stack with Next.js
- **`monorepo`** _(coming soon)_ - NX monorepo template

> 💡 **Tip**: Check out different branches based on your project requirements!

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new setup scripts
- Improve existing scripts
- Fix bugs
- Update documentation
- Suggest new template branches

## 📚 Resources

### NestJS Documentation
- [Official Documentation](https://docs.nestjs.com)
- [Discord Community](https://discord.gg/G7Qnnhy)
- [Video Courses](https://courses.nestjs.com/)

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
    <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  </a>
  <a href="https://yarnpkg.com/" target="_blank">
    <img src="https://img.shields.io/badge/Yarn-Package%20Manager-2C8EBB?style=for-the-badge&logo=yarn" alt="Yarn">
  </a>
</p>
