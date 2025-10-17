#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}  NestJS Microservice Setup Script  ${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

# Install base microservice package
echo -e "${GREEN}Installing @nestjs/microservices...${NC}"
yarn add @nestjs/microservices

echo ""
echo -e "${YELLOW}Select Microservice Transport:${NC}"
echo "1) Kafka"
echo "2) Redis"
echo "3) gRPC"
echo "4) MQTT"
echo "5) NATS"
echo "6) RabbitMQ"
echo "7) TCP (No additional packages needed)"
echo "8) Install Multiple Transports"
echo "9) Exit"
echo ""

read -p "Enter your choice (1-9): " choice

case $choice in
  1)
    echo -e "${GREEN}Installing Kafka transport...${NC}"
    yarn add kafkajs
    echo -e "${GREEN}✓ Kafka transport installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.KAFKA,"
    echo "  options: {"
    echo "    client: {"
    echo "      brokers: ['localhost:9092'],"
    echo "    },"
    echo "    consumer: {"
    echo "      groupId: 'my-consumer-group',"
    echo "    },"
    echo "  },"
    echo "});"
    ;;
  2)
    echo -e "${GREEN}Installing Redis transport...${NC}"
    yarn add ioredis
    echo -e "${GREEN}✓ Redis transport installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.REDIS,"
    echo "  options: {"
    echo "    host: 'localhost',"
    echo "    port: 6379,"
    echo "  },"
    echo "});"
    ;;
  3)
    echo -e "${GREEN}Installing gRPC transport...${NC}"
    yarn add @grpc/grpc-js @grpc/proto-loader
    echo -e "${GREEN}✓ gRPC transport installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo "import { join } from 'path';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.GRPC,"
    echo "  options: {"
    echo "    package: 'hero',"
    echo "    protoPath: join(__dirname, './hero.proto'),"
    echo "    url: 'localhost:5000',"
    echo "  },"
    echo "});"
    ;;
  4)
    echo -e "${GREEN}Installing MQTT transport...${NC}"
    yarn add mqtt
    echo -e "${GREEN}✓ MQTT transport installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.MQTT,"
    echo "  options: {"
    echo "    url: 'mqtt://localhost:1883',"
    echo "  },"
    echo "});"
    ;;
  5)
    echo -e "${GREEN}Installing NATS transport...${NC}"
    yarn add nats
    echo -e "${GREEN}✓ NATS transport installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.NATS,"
    echo "  options: {"
    echo "    servers: ['nats://localhost:4222'],"
    echo "  },"
    echo "});"
    ;;
  6)
    echo -e "${GREEN}Installing RabbitMQ transport...${NC}"
    yarn add amqplib amqp-connection-manager
    echo -e "${GREEN}✓ RabbitMQ transport installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.RMQ,"
    echo "  options: {"
    echo "    urls: ['amqp://localhost:5672'],"
    echo "    queue: 'my_queue',"
    echo "    queueOptions: {"
    echo "      durable: false,"
    echo "    },"
    echo "  },"
    echo "});"
    ;;
  7)
    echo -e "${GREEN}✓ TCP transport is built-in, no additional packages needed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Transport } from '@nestjs/microservices';"
    echo ""
    echo "// In main.ts:"
    echo "app.connectMicroservice({"
    echo "  transport: Transport.TCP,"
    echo "  options: {"
    echo "    host: 'localhost',"
    echo "    port: 3001,"
    echo "  },"
    echo "});"
    ;;
  8)
    echo -e "${YELLOW}Select transports to install (space-separated numbers, e.g., '1 2 3'):${NC}"
    echo "1) Kafka"
    echo "2) Redis"
    echo "3) gRPC"
    echo "4) MQTT"
    echo "5) NATS"
    echo "6) RabbitMQ"
    echo ""
    read -p "Enter your choices: " -a choices
    
    packages=""
    for c in "${choices[@]}"; do
      case $c in
        1) packages="$packages kafkajs" ;;
        2) packages="$packages ioredis" ;;
        3) packages="$packages @grpc/grpc-js @grpc/proto-loader" ;;
        4) packages="$packages mqtt" ;;
        5) packages="$packages nats" ;;
        6) packages="$packages amqplib amqp-connection-manager" ;;
        *) echo -e "${RED}Invalid choice: $c${NC}" ;;
      esac
    done
    
    if [ -n "$packages" ]; then
      echo -e "${GREEN}Installing selected transports...${NC}"
      yarn add $packages
      echo -e "${GREEN}✓ All selected transports installed successfully!${NC}"
    else
      echo -e "${RED}No valid transports selected.${NC}"
    fi
    ;;
  9)
    echo -e "${YELLOW}Exiting without installing additional transports.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}  Microservice setup completed!      ${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${YELLOW}Note: Don't forget to call await app.startAllMicroservices() in your main.ts${NC}"
