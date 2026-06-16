import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { setupApplication, setupSwagger } from '@infrastructure/nest-config';
import { Logger } from '@nestjs/common';
import { env, envInt } from '@/shared/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApplication(app);
  setupSwagger(app);

  // Start HTTP server first (prioritize HTTP availability)
  const host = env('HOST', '[IP_ADDRESS]');
  const port = envInt('PORT', 3000);
  await app.listen(port, host);

  Logger.log(`==========================================================`);
  Logger.log(`🚀 Application is running on: http://${host}:${port}/service`);
  Logger.log(`📖 Swagger admin docs available at: http://${host}:${port}/service/admin/docs`);
  Logger.log(`📖 Swagger client docs available at: http://${host}:${port}/service/client/docs`);
  Logger.log(`==========================================================`);
}
bootstrap();
