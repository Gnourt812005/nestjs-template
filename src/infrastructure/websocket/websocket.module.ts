import { Global, Module } from '@nestjs/common';
import { WebSocketGateway } from '@/presentation/controllers';
import { WebSocketService } from './websocket.service';
import { WEBSOCKET_SERVICE } from '@/application/interfaces';

@Global()
@Module({
  imports: [],
  providers: [
    WebSocketGateway,
    {
      provide: WEBSOCKET_SERVICE,
      useClass: WebSocketService,
    },
  ],
  exports: [WEBSOCKET_SERVICE],
})
export class WebSocketModule {}
