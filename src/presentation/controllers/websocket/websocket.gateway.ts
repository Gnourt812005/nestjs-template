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
import { Inject } from '@nestjs/common';
import { LOGGER_SERVICE } from '@/application/interfaces/logger.interface';
import type { ILoggerService } from '@/application/interfaces/logger.interface';
import { errorMessage } from '@/shared/utils';

@NestWebSocketGateway({
  cors: { origin: '*' },
  namespace: 'hivek',
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly logger: ILoggerService,
  ) {
    this.logger.setContext(WebSocketGateway.name);
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token || client.handshake.query?.token;
    const authHeader = client.handshake.headers['authorization'];

    try {
      // const payload = this.jwtService.verifyHandshake(authHeader, token);
      // const userId = payload.sub;
      // if (!userId) {
      //   throw new Error('No user ID found in token payload');
      // }

      // const room = `user_${userId}`;
      // await client.join(room);
      this.logger.log(`Client ${client.id} authenticated and joined user room`);
    } catch (error) {
      this.logger.warn(`Connection rejected: Invalid token (Client: ${client.id}). Error: ${errorMessage(error)}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log(`Received ping from ${client.id}: ${JSON.stringify(data)}`);
    return { event: 'pong', data: `This is your message: ${JSON.stringify(data)}` };
  }
}
