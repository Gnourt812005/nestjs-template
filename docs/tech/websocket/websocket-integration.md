# WebSocket Integration Strategy

This document outlines the strategy for integrating WebSockets into the `apps/server` project using `@nestjs/websockets` and `socket.io`. The design follows Clean Architecture principles by abstracting the real-time communication behind an interface in the application layer.

## 1. Core Abstraction (Application Layer)

Create `apps/server/src/application/interfaces/web-socket.interface.ts` to define the contract for real-time communication.

```typescript
export interface IWebSocketService {
  /**
   * Send a message to a specific user.
   * @param userId The recipient user ID.
   * @param event The event name.
   * @param data The payload.
   */
  emitToUser<T = any>(userId: string, event: string, data: T): void;

  /**
   * Broadcast a message to all connected users in a room (e.g., enterprise room).
   * @param room The room ID.
   * @param event The event name.
   * @param data The payload.
   */
  broadcastToRoom<T = any>(room: string, event: string, data: T): void;

  /**
   * Broadcast a message to all connected users.
   * @param event The event name.
   * @param data The payload.
   */
  broadcastAll<T = any>(event: string, data: T): void;
}

export const IWebSocketService = Symbol('IWebSocketService');
```

## 2. Infrastructure Implementation

Create `apps/server/src/infrastructure/websocket/websocket.gateway.ts` and `apps/server/src/infrastructure/websocket/websocket.service.ts`.

### 2.1 WebSocket Gateway
Handles connections, disconnections, and incoming socket events.

```typescript
import {
  WebSocketGateway as NestWebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard'; // Custom Guard

@NestWebSocketGateway({
  cors: { origin: '*' },
  namespace: 'hivek',
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(WebSocketGateway.name);

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    // Authentication logic here (extract JWT from headers/query)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    return { event: 'pong', data };
  }
}
```

### 2.2 WebSocket Service
Implements the `IWebSocketService` interface by interacting with the `WebSocketGateway`.

```typescript
import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from './websocket.gateway';
import { IWebSocketService } from '../../application/interfaces/web-socket.interface';

@Injectable()
export class WebSocketService implements IWebSocketService {
  constructor(private readonly gateway: WebSocketGateway) {}

  emitToUser<T = any>(userId: string, event: string, data: T): void {
    this.gateway.server.to(`user_${userId}`).emit(event, data);
  }

  broadcastToRoom<T = any>(room: string, event: string, data: T): void {
    this.gateway.server.to(room).emit(event, data);
  }

  broadcastAll<T = any>(event: string, data: T): void {
    this.gateway.server.emit(event, data);
  }
}
```

## 3. Distributed Real-time (RabbitMQ/Redis Integration)

When scaling to multiple instances, WebSockets need a "pub/sub" adapter to synchronize messages across instances.

- **Option A (Socket.io-adapter):** Use `@socket.io/redis-adapter`.
- **Option B (RabbitMQ-driven):**
  1. Server A receives a RabbitMQ event (via `RabbitMQService`).
  2. Server A's `TestMqController` (or a dedicated messaging handler) receives the event.
  3. It calls `IWebSocketService.emitToUser()` if the user is connected to Server A.
  4. Every server instance listens to the same RabbitMQ events, so whichever instance has the user connected will push the message via its local WebSocket.

## 4. Authentication (JWT)

A custom `WsJwtGuard` will be implemented to extract the JWT from the WebSocket handshake (e.g., `auth: { token: '...' }`) and validate it using the existing `AuthModule` logic.

## 5. Next Steps

1.  **Install Dependencies:**
    ```bash
    yarn workspace server add @nestjs/websockets @nestjs/platform-socket.io socket.io
    ```
2.  **Define Interface:** Create `apps/server/src/application/interfaces/web-socket.interface.ts`.
3.  **Implement Infrastructure:** Create files in `apps/server/src/infrastructure/websocket/`.
4.  **Register Module:** Create `WebSocketModule` and add to `AppModule`.
5.  **Create Test Client:** Provide a simple HTML/JS snippet to test the connection.
