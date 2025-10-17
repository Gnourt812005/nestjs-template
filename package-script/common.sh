#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}  NestJS Common Packages Setup       ${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

echo -e "${YELLOW}Select packages to install:${NC}"
echo "1)  Validation (class-validator, class-transformer)"
echo "2)  Configuration (@nestjs/config)"
echo "3)  HTTP Client (@nestjs/axios, axios)"
echo "4)  Rate Limiting (@nestjs/throttler)"
echo "5)  API Documentation (@nestjs/swagger)"
echo "6)  Task Scheduling (@nestjs/schedule)"
echo "7)  Event Emitter (@nestjs/event-emitter)"
echo "8)  File Upload Support (multer)"
echo "9)  Caching (@nestjs/cache-manager)"
echo "10) Logging (winston, nest-winston)"
echo "11) CORS and Helmet (Security)"
echo "12) Compression"
echo "13) All Essential Packages"
echo "14) All Packages (Complete Setup)"
echo "15) Custom Selection (Multiple)"
echo "16) Exit"
echo ""

read -p "Enter your choice (1-16): " choice

case $choice in
  1)
    echo -e "${GREEN}Installing Validation packages...${NC}"
    yarn add class-validator class-transformer
    echo -e "${GREEN}✓ Validation packages installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Add ValidationPipe in main.ts${NC}"
    echo "app.useGlobalPipes(new ValidationPipe());"
    ;;
  2)
    echo -e "${GREEN}Installing Configuration package...${NC}"
    yarn add @nestjs/config
    echo -e "${GREEN}✓ Configuration package installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Import ConfigModule in app.module.ts${NC}"
    echo "ConfigModule.forRoot({ isGlobal: true })"
    ;;
  3)
    echo -e "${GREEN}Installing HTTP Client packages...${NC}"
    yarn add @nestjs/axios axios
    echo -e "${GREEN}✓ HTTP Client packages installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Import HttpModule in your module${NC}"
    echo "import { HttpModule } from '@nestjs/axios';"
    ;;
  4)
    echo -e "${GREEN}Installing Rate Limiting package...${NC}"
    yarn add @nestjs/throttler
    echo -e "${GREEN}✓ Rate Limiting package installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Configure ThrottlerModule${NC}"
    echo "ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }])"
    ;;
  5)
    echo -e "${GREEN}Installing Swagger/OpenAPI documentation...${NC}"
    yarn add @nestjs/swagger swagger-ui-express
    echo -e "${GREEN}✓ Swagger installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Setup in main.ts${NC}"
    echo "const config = new DocumentBuilder().setTitle('API').build();"
    echo "const document = SwaggerModule.createDocument(app, config);"
    echo "SwaggerModule.setup('api', app, document);"
    ;;
  6)
    echo -e "${GREEN}Installing Task Scheduling package...${NC}"
    yarn add @nestjs/schedule
    echo -e "${GREEN}✓ Task Scheduling installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Import ScheduleModule${NC}"
    echo "ScheduleModule.forRoot()"
    ;;
  7)
    echo -e "${GREEN}Installing Event Emitter package...${NC}"
    yarn add @nestjs/event-emitter
    echo -e "${GREEN}✓ Event Emitter installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Import EventEmitterModule${NC}"
    echo "EventEmitterModule.forRoot()"
    ;;
  8)
    echo -e "${GREEN}Installing File Upload support...${NC}"
    yarn add -D @types/multer
    echo -e "${GREEN}✓ Multer types installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Use @UploadedFile() decorator${NC}"
    echo "@Post('upload')"
    echo "@UseInterceptors(FileInterceptor('file'))"
    echo "uploadFile(@UploadedFile() file: Express.Multer.File) {}"
    ;;
  9)
    echo -e "${GREEN}Installing Caching packages...${NC}"
    yarn add @nestjs/cache-manager cache-manager
    echo -e "${GREEN}✓ Caching packages installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Import CacheModule${NC}"
    echo "CacheModule.register({ isGlobal: true })"
    ;;
  10)
    echo -e "${GREEN}Installing Logging packages...${NC}"
    yarn add winston nest-winston
    echo -e "${GREEN}✓ Winston logger installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Configure in main.ts${NC}"
    echo "import { WinstonModule } from 'nest-winston';"
    ;;
  11)
    echo -e "${GREEN}Installing Security packages...${NC}"
    yarn add helmet
    echo -e "${GREEN}✓ Security packages installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Add helmet in main.ts${NC}"
    echo "import helmet from 'helmet';"
    echo "app.use(helmet());"
    echo ""
    echo -e "${YELLOW}CORS: Enable in main.ts${NC}"
    echo "app.enableCors();"
    ;;
  12)
    echo -e "${GREEN}Installing Compression...${NC}"
    yarn add compression
    yarn add -D @types/compression
    echo -e "${GREEN}✓ Compression installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Add compression in main.ts${NC}"
    echo "import * as compression from 'compression';"
    echo "app.use(compression());"
    ;;
  13)
    echo -e "${GREEN}Installing Essential packages...${NC}"
    yarn add class-validator class-transformer @nestjs/config @nestjs/swagger swagger-ui-express
    yarn add -D @types/multer
    echo -e "${GREEN}✓ Essential packages installed!${NC}"
    echo ""
    echo -e "${YELLOW}Installed:${NC}"
    echo "✓ Validation (class-validator, class-transformer)"
    echo "✓ Configuration (@nestjs/config)"
    echo "✓ API Documentation (@nestjs/swagger)"
    echo "✓ File Upload types"
    ;;
  14)
    echo -e "${GREEN}Installing ALL common packages...${NC}"
    yarn add class-validator class-transformer @nestjs/config @nestjs/axios axios @nestjs/throttler @nestjs/swagger swagger-ui-express @nestjs/schedule @nestjs/event-emitter @nestjs/cache-manager cache-manager winston nest-winston helmet compression
    yarn add -D @types/multer @types/compression
    echo -e "${GREEN}✓ All common packages installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Complete package list installed!${NC}"
    ;;
  15)
    echo -e "${YELLOW}Enter package numbers to install (space-separated, e.g., '1 2 5 9'):${NC}"
    echo "1-Validation 2-Config 3-HTTP 4-RateLimit 5-Swagger 6-Schedule"
    echo "7-Events 8-Upload 9-Cache 10-Logging 11-Security 12-Compression"
    echo ""
    read -p "Enter your choices: " -a choices
    
    packages=""
    dev_packages=""
    
    for c in "${choices[@]}"; do
      case $c in
        1) packages="$packages class-validator class-transformer" ;;
        2) packages="$packages @nestjs/config" ;;
        3) packages="$packages @nestjs/axios axios" ;;
        4) packages="$packages @nestjs/throttler" ;;
        5) packages="$packages @nestjs/swagger swagger-ui-express" ;;
        6) packages="$packages @nestjs/schedule" ;;
        7) packages="$packages @nestjs/event-emitter" ;;
        8) dev_packages="$dev_packages @types/multer" ;;
        9) packages="$packages @nestjs/cache-manager cache-manager" ;;
        10) packages="$packages winston nest-winston" ;;
        11) packages="$packages helmet" ;;
        12) packages="$packages compression"; dev_packages="$dev_packages @types/compression" ;;
        *) echo -e "${RED}Invalid choice: $c${NC}" ;;
      esac
    done
    
    if [ -n "$packages" ]; then
      echo -e "${GREEN}Installing selected packages...${NC}"
      yarn add $packages
    fi
    if [ -n "$dev_packages" ]; then
      yarn add -D $dev_packages
    fi
    
    if [ -n "$packages" ] || [ -n "$dev_packages" ]; then
      echo -e "${GREEN}✓ Selected packages installed successfully!${NC}"
    else
      echo -e "${RED}No valid packages selected.${NC}"
    fi
    ;;
  16)
    echo -e "${YELLOW}Exiting without installing packages.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}   Package installation completed!   ${NC}"
echo -e "${GREEN}=====================================${NC}"