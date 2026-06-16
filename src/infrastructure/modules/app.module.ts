import { Module } from '@nestjs/common';
import { MongoModule } from '@/infrastructure/mongo/mongo.module';
import { WebSocketModule } from '@/infrastructure/websocket/websocket.module';
import { APP_PIPE, APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ThrottlerModule } from '@nestjs/throttler';
import { InfrastructureModule } from './infrastructure.module';
import { HttpExceptionFilter } from '@/presentation/middleware/filters';
import { LoggingInterceptor, TransformInterceptor } from '@/presentation/middleware/interceptors';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    InfrastructureModule,
    ScheduleModule.forRoot(),
    MongoModule,
    WebSocketModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 60, // 60 requests per TTL
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
  ],
})
export class AppModule {}
