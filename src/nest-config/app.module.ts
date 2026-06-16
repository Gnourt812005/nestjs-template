import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExampleModule } from '../example/example.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // Database
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs-template',
      }),
    }),

    // Scheduling (for @Cron decorators)
    ScheduleModule.forRoot(),

    // Event Emitter (for @OnEvent decorators)
    EventEmitterModule.forRoot(),

    // Feature modules
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}