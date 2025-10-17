#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}   NestJS WebSocket Setup Script     ${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

echo -e "${YELLOW}Select WebSocket Implementation:${NC}"
echo "1) Socket.IO (Most Popular)"
echo "2) WS (Lightweight WebSocket)"
echo "3) µWebSockets (High Performance)"
echo "4) Socket.IO with Redis Adapter (Multi-server)"
echo "5) Install Multiple"
echo "6) Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
  1)
    echo -e "${GREEN}Installing Socket.IO...${NC}"
    yarn add @nestjs/websockets @nestjs/platform-socket.io socket.io
    yarn add -D @types/socket.io
    echo -e "${GREEN}✓ Socket.IO installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';"
    echo "import { Server } from 'socket.io';"
    echo ""
    echo "@WebSocketGateway()"
    echo "export class EventsGateway {"
    echo "  @WebSocketServer()"
    echo "  server: Server;"
    echo ""
    echo "  @SubscribeMessage('message')"
    echo "  handleMessage(client: any, payload: any): string {"
    echo "    return 'Hello world!';"
    echo "  }"
    echo "}"
    ;;
  2)
    echo -e "${GREEN}Installing WS (Lightweight WebSocket)...${NC}"
    yarn add @nestjs/websockets @nestjs/platform-ws ws
    yarn add -D @types/ws
    echo -e "${GREEN}✓ WS installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// In main.ts, specify ws adapter:"
    echo "import { WsAdapter } from '@nestjs/platform-ws';"
    echo ""
    echo "app.useWebSocketAdapter(new WsAdapter(app));"
    echo ""
    echo "@WebSocketGateway()"
    echo "export class EventsGateway {"
    echo "  @SubscribeMessage('message')"
    echo "  handleMessage(client: any, data: any): string {"
    echo "    return 'Hello from WS!';"
    echo "  }"
    echo "}"
    ;;
  3)
    echo -e "${GREEN}Installing µWebSockets (High Performance)...${NC}"
    yarn add @nestjs/websockets uWebSockets.js
    echo -e "${GREEN}✓ µWebSockets installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Note:${NC} µWebSockets is a high-performance alternative."
    echo "It requires custom adapter implementation."
    echo ""
    echo -e "${YELLOW}Features:${NC}"
    echo "- Extremely fast (C++ based)"
    echo "- Low memory footprint"
    echo "- Suitable for high-traffic applications"
    ;;
  4)
    echo -e "${GREEN}Installing Socket.IO with Redis Adapter...${NC}"
    yarn add @nestjs/websockets @nestjs/platform-socket.io socket.io socket.io-redis ioredis
    yarn add -D @types/socket.io @types/ioredis
    echo -e "${GREEN}✓ Socket.IO with Redis Adapter installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example (Multi-server setup):${NC}"
    echo "import { IoAdapter } from '@nestjs/platform-socket.io';"
    echo "import { createAdapter } from 'socket.io-redis';"
    echo "import { RedisClient } from 'redis';"
    echo ""
    echo "const pubClient = new RedisClient({ host: 'localhost', port: 6379 });"
    echo "const subClient = pubClient.duplicate();"
    echo ""
    echo "io.adapter(createAdapter({ pubClient, subClient }));"
    echo ""
    echo -e "${YELLOW}Benefits:${NC}"
    echo "- Scale across multiple server instances"
    echo "- Shared state via Redis"
    echo "- Load balancing support"
    ;;
  5)
    echo -e "${YELLOW}Select WebSocket implementations to install (space-separated, e.g., '1 2'):${NC}"
    echo "1) Socket.IO"
    echo "2) WS"
    echo "3) µWebSockets"
    echo "4) Socket.IO with Redis"
    echo ""
    read -p "Enter your choices: " -a choices
    
    packages="@nestjs/websockets"
    dev_packages=""
    
    for c in "${choices[@]}"; do
      case $c in
        1)
          packages="$packages @nestjs/platform-socket.io socket.io"
          dev_packages="$dev_packages @types/socket.io"
          ;;
        2)
          packages="$packages @nestjs/platform-ws ws"
          dev_packages="$dev_packages @types/ws"
          ;;
        3)
          packages="$packages uWebSockets.js"
          ;;
        4)
          packages="$packages @nestjs/platform-socket.io socket.io socket.io-redis ioredis"
          dev_packages="$dev_packages @types/socket.io @types/ioredis"
          ;;
        *)
          echo -e "${RED}Invalid choice: $c${NC}"
          ;;
      esac
    done
    
    if [ -n "$packages" ]; then
      echo -e "${GREEN}Installing selected WebSocket implementations...${NC}"
      yarn add $packages
      if [ -n "$dev_packages" ]; then
        yarn add -D $dev_packages
      fi
      echo -e "${GREEN}✓ All selected implementations installed successfully!${NC}"
    else
      echo -e "${RED}No valid implementations selected.${NC}"
    fi
    ;;
  6)
    echo -e "${YELLOW}Exiting without installing WebSocket packages.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}   WebSocket setup completed!        ${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create a gateway using: nest g gateway events"
echo "2. Configure CORS if needed"
echo "3. Add authentication guards if required"
echo "4. Test with a WebSocket client"