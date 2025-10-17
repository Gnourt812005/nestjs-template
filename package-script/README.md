# 📦 Package Scripts Documentation

This directory contains setup scripts to quickly configure your NestJS project with common packages and features.

## 🚀 Quick Start

Run the master setup script:
```bash
./package-script/setup-all.sh
```

Or run individual scripts as needed.

---

## 📋 Available Scripts

### 1. **setup-all.sh** - Master Setup Script ⭐
The main entry point that provides an interactive menu to run any or all setup scripts.

```bash
./package-script/setup-all.sh
```

**Features:**
- Interactive menu with all options
- Quick Start (essential packages)
- Full Stack (all packages)
- Custom selection

---

### 2. **common.sh** - Common Packages
Install frequently used NestJS packages.

```bash
./package-script/common.sh
```

**Available Options:**
- ✅ Validation (class-validator, class-transformer)
- ⚙️ Configuration (@nestjs/config)
- 🌐 HTTP Client (@nestjs/axios)
- 🛡️ Rate Limiting (@nestjs/throttler)
- 📚 Swagger/OpenAPI Documentation
- ⏰ Task Scheduling (@nestjs/schedule)
- 📢 Event Emitter
- 📁 File Upload (multer)
- 💾 Caching
- 📝 Logging (winston)
- 🔒 Security (helmet, CORS)
- 🗜️ Compression

---

### 3. **database.sh** - Database Setup
Configure database connections and ORMs.

```bash
./package-script/database.sh
```

**Available Options:**
- 🍃 MongoDB (Mongoose)
- 🍃 MongoDB (@nestjs/mongoose)
- 💎 Prisma ORM
- 🔴 Redis (ioredis)
- 🔷 GraphQL with Neo4j
- 🔍 Elasticsearch

**Example Usage:**
```bash
# After running the script, follow the prompts
# For Prisma, it will automatically run 'prisma init'
```

---

### 4. **authentication.sh** - Authentication
Set up authentication strategies.

```bash
./package-script/authentication.sh
```

**Available Options:**
- 🔑 JWT Authentication
- 👤 Local (Username/Password)
- 🌐 OAuth2 (Google, Facebook, GitHub)
- 🔐 Session-based Authentication
- 🔐 API Key Authentication
- ⚡ Complete Auth Setup (All strategies)

---

### 5. **microservice.sh** - Microservices
Install microservice transport layers.

```bash
./package-script/microservice.sh
```

**Available Options:**
- 📨 Kafka
- 🔴 Redis
- 🔧 gRPC
- 📡 MQTT
- 🌊 NATS
- 🐰 RabbitMQ
- 🔌 TCP (built-in)

**Example Usage:**
```typescript
// After installation, configure in main.ts:
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
  },
});
```

---

### 6. **websocket.sh** - WebSocket Support
Add real-time communication capabilities.

```bash
./package-script/websocket.sh
```

**Available Options:**
- 🔌 Socket.IO (Most Popular)
- ⚡ WS (Lightweight)
- 🚀 µWebSockets (High Performance)
- 🔴 Socket.IO + Redis Adapter (Multi-server)

---

### 7. **testing.sh** - Testing Tools
Enhance your testing capabilities.

```bash
./package-script/testing.sh
```

**Available Options:**
- 🧪 E2E Testing Enhanced
- 📊 Coverage Tools
- 🎭 Mocking (jest-mock-extended)
- 🐳 Integration Testing (testcontainers)
- 🔬 API Testing (supertest + chai)

---

## 💡 Usage Examples

### Example 1: Starting a New Project
```bash
# Run the master script
./package-script/setup-all.sh

# Choose option 7 (Quick Start)
# This installs essential packages
```

### Example 2: Adding Database Support
```bash
# Run database script
./package-script/database.sh

# Select Prisma (option 3)
# Follow prompts to configure
```

### Example 3: Complete Setup
```bash
# Run master script
./package-script/setup-all.sh

# Choose option 8 (Full Stack)
# Installs everything
```

### Example 4: Custom Selection
```bash
# Run master script
./package-script/setup-all.sh

# Choose option 9 (Custom Selection)
# Enter: 1 2 3
# This runs common, database, and auth scripts
```

---

## 🎯 Recommended Setup Workflows

### Minimal API Project
```bash
./package-script/setup-all.sh
# Select: Quick Start (option 7)
```
**Installs:** Validation, Config, Swagger, Security

### Full REST API
1. Common packages (Validation, Config, Swagger)
2. Database (Prisma or Mongoose)
3. Authentication (JWT)

### Microservices Project
1. Common packages
2. Database (Prisma + Redis)
3. Microservices (Choose transports)

### Real-time Application
1. Common packages
2. Database
3. WebSocket (Socket.IO)
4. Authentication

---

## 🔧 Script Features

All scripts include:
- ✅ Interactive menus
- 🎨 Color-coded output
- 📝 Usage examples after installation
- ✨ Multiple selection support
- 🛡️ Error handling
- 📚 Documentation links

---

## 📝 Notes

1. **Make scripts executable:**
   ```bash
   chmod +x package-script/*.sh
   ```

2. **All scripts use Yarn** as the package manager

3. **Scripts can be run multiple times** - they're idempotent

4. **Check installed packages:**
   ```bash
   yarn list --depth=0
   ```

5. **After installation**, follow the usage examples provided by each script

---

## 🐛 Troubleshooting

**Issue: Permission Denied**
```bash
chmod +x package-script/*.sh
```

**Issue: Script Not Found**
```bash
# Run from project root
cd /path/to/project
./package-script/setup-all.sh
```

**Issue: Package Installation Failed**
```bash
# Clear cache and retry
yarn cache clean
rm -rf node_modules
yarn install
```

---

## 🌟 Tips

1. **Start with Quick Start** for essential packages
2. **Add features incrementally** as your project grows
3. **Use Docker scripts** for consistent development environments
4. **Run testing setup** before writing tests
5. **Read the usage examples** after each installation

---

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord](https://discord.gg/nestjs)
- [NestJS GitHub](https://github.com/nestjs/nest)

---

## 🤝 Contributing

To add a new script:
1. Create `your-feature.sh` in this directory
2. Follow the existing script format
3. Add color-coded output
4. Include usage examples
5. Update this README
6. Add to `setup-all.sh` menu

---

**Happy coding! 🚀**
