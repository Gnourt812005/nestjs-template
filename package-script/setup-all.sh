#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        🚀 NestJS Template Setup Master Script 🚀          ║"
echo "║                                                            ║"
echo "║           Complete Project Configuration Tool             ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${YELLOW}This script will help you set up your NestJS project with common packages.${NC}"
echo -e "${YELLOW}You can run individual setup scripts or install everything at once.${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}Available Setup Scripts:${NC}"
echo ""
echo -e "  ${MAGENTA}1)${NC}  📦 Common Packages       - Validation, Config, HTTP, Swagger, etc."
echo -e "  ${MAGENTA}2)${NC}  🗄️  Database              - MongoDB, Prisma, Redis, Neo4j, Elasticsearch"
echo -e "  ${MAGENTA}3)${NC}  🔐 Authentication        - JWT, OAuth2, Passport strategies"
echo -e "  ${MAGENTA}4)${NC}  🔌 Microservices         - Kafka, Redis, gRPC, NATS, RabbitMQ"
echo -e "  ${MAGENTA}5)${NC}  🌐 WebSockets            - Socket.IO, WS, Redis adapter"
echo -e "  ${MAGENTA}6)${NC}  🧪 Testing               - E2E, Coverage, Mocking, Integration tests"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${MAGENTA}7)${NC}  ⚡ Quick Start           - Essential packages only (recommended)"
echo -e "  ${MAGENTA}8)${NC}  🎯 Full Stack            - All packages (complete setup)"
echo -e "  ${MAGENTA}9)${NC}  🛠️  Custom Selection      - Choose multiple scripts to run"
echo ""
echo -e "  ${MAGENTA}0)${NC}  ❌ Exit"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

read -p "$(echo -e ${CYAN}Enter your choice \(0-9\): ${NC})" choice

case $choice in
  1)
    echo -e "${GREEN}Running Common Packages setup...${NC}"
    bash "$SCRIPT_DIR/common.sh"
    ;;
  2)
    echo -e "${GREEN}Running Database setup...${NC}"
    bash "$SCRIPT_DIR/database.sh"
    ;;
  3)
    echo -e "${GREEN}Running Authentication setup...${NC}"
    bash "$SCRIPT_DIR/authentication.sh"
    ;;
  4)
    echo -e "${GREEN}Running Microservices setup...${NC}"
    bash "$SCRIPT_DIR/microservice.sh"
    ;;
  5)
    echo -e "${GREEN}Running WebSockets setup...${NC}"
    bash "$SCRIPT_DIR/websocket.sh"
    ;;
  6)
    echo -e "${GREEN}Running Testing setup...${NC}"
    bash "$SCRIPT_DIR/testing.sh"
    ;;
  7)
    echo -e "${GREEN}⚡ Installing Quick Start packages...${NC}"
    echo ""
    echo -e "${YELLOW}This will install:${NC}"
    echo "  ✓ Validation (class-validator, class-transformer)"
    echo "  ✓ Configuration (@nestjs/config)"
    echo "  ✓ Swagger API Documentation"
    echo "  ✓ Basic security (helmet, cors)"
    echo ""
    read -p "$(echo -e ${YELLOW}Continue? \(y/n\): ${NC})" confirm
    if [[ $confirm == [yY] ]]; then
      yarn add class-validator class-transformer @nestjs/config @nestjs/swagger swagger-ui-express helmet
      yarn add -D @types/multer
      echo ""
      echo -e "${GREEN}✓ Quick Start packages installed successfully!${NC}"
      echo ""
      echo -e "${YELLOW}Next steps:${NC}"
      echo "1. Add ValidationPipe in main.ts"
      echo "2. Import ConfigModule in app.module.ts"
      echo "3. Setup Swagger documentation"
      echo "4. Configure helmet and CORS"
    fi
    ;;
  8)
    echo -e "${GREEN}🎯 Installing FULL STACK (all packages)...${NC}"
    echo ""
    echo -e "${RED}⚠️  WARNING: This will install A LOT of packages!${NC}"
    echo -e "${YELLOW}Estimated size: ~500MB of node_modules${NC}"
    echo ""
    read -p "$(echo -e ${YELLOW}Are you sure? \(yes/no\): ${NC})" confirm
    if [[ $confirm == "yes" ]]; then
      echo ""
      echo -e "${GREEN}Installing all packages...${NC}"
      echo ""
      
      # Common packages
      echo -e "${CYAN}[1/6] Common packages...${NC}"
      yarn add class-validator class-transformer @nestjs/config @nestjs/axios axios @nestjs/throttler @nestjs/swagger swagger-ui-express @nestjs/schedule @nestjs/event-emitter @nestjs/cache-manager cache-manager winston nest-winston helmet compression
      
      # Authentication
      echo -e "${CYAN}[2/6] Authentication...${NC}"
      yarn add @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
      
      # Microservices
      echo -e "${CYAN}[3/6] Microservices...${NC}"
      yarn add @nestjs/microservices
      
      # WebSockets
      echo -e "${CYAN}[4/6] WebSockets...${NC}"
      yarn add @nestjs/websockets @nestjs/platform-socket.io socket.io
      
      # Testing
      echo -e "${CYAN}[5/6] Testing tools...${NC}"
      yarn add -D @nestjs/testing supertest jest-mock-extended jest-coverage-badges
      
      # Dev dependencies
      echo -e "${CYAN}[6/6] Type definitions...${NC}"
      yarn add -D @types/passport-jwt @types/passport-local @types/bcrypt @types/socket.io @types/multer @types/compression @types/supertest @types/jest
      
      echo ""
      echo -e "${GREEN}✓✓✓ FULL STACK installation completed! ✓✓✓${NC}"
    else
      echo -e "${YELLOW}Installation cancelled.${NC}"
    fi
    ;;
  9)
    echo -e "${GREEN}🛠️  Custom Selection${NC}"
    echo ""
    echo -e "${YELLOW}Enter the numbers of scripts to run (space-separated, e.g., '1 2 3'):${NC}"
    echo "1) Common  2) Database  3) Auth  4) Microservices  5) WebSocket  6) Testing"
    echo ""
    read -p "Your selection: " -a selections
    
    for sel in "${selections[@]}"; do
      case $sel in
        1) bash "$SCRIPT_DIR/common.sh" ;;
        2) bash "$SCRIPT_DIR/database.sh" ;;
        3) bash "$SCRIPT_DIR/authentication.sh" ;;
        4) bash "$SCRIPT_DIR/microservice.sh" ;;
        5) bash "$SCRIPT_DIR/websocket.sh" ;;
        6) bash "$SCRIPT_DIR/testing.sh" ;;
        *) echo -e "${RED}Invalid selection: $sel${NC}" ;;
      esac
      echo ""
    done
    ;;
  0)
    echo -e "${YELLOW}Exiting setup script. Goodbye!${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                 Setup Completed! 🎉                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📚 Documentation:${NC} https://docs.nestjs.com"
echo -e "${YELLOW}💬 Discord:${NC} https://discord.gg/nestjs"
echo -e "${YELLOW}🐙 GitHub:${NC} https://github.com/nestjs/nest"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
