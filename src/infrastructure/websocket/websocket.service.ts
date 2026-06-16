import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '../../presentation/controllers/websocket/websocket.gateway';
import { IWebSocketService } from '@/application/interfaces';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, } from 'socket.io';

@Injectable()
export class WebSocketService implements IWebSocketService {
  constructor() {}
  @WebSocketServer() server: Server;

  emitToUser<T>(userId: string, event: string, data: T): void {
    const room = `user_${userId}`;
    this.server.to(room).emit(event, data);
  }

  broadcastToRoom<T>(room: string, event: string, data: T): void {
    this.server.to(room).emit(event, data);
  }

  broadcastAll<T>(event: string, data: T): void {
    this.server.emit(event, data);
  }

  async disconnectUser(userId: string): Promise<void> {
    const room = `user_${userId}`;
    if (!this.server) {
      return;
    }
    const sockets = await this.server.in(room).fetchSockets();
    for (const socket of sockets) {
      socket.disconnect(true);
    }
  }
}
