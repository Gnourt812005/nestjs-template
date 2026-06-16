import { INestApplication, Logger } from '@nestjs/common';
import helmet from 'helmet';

export function setupApplication(app: INestApplication): void {
  // Apply Security Headers
  app.use((req, res, next) => {
    if (!req.path?.startsWith('/service/graphql')) {
      return helmet()(req, res, next);
    }
    return next();
  });


  // Apply CORS
  app.enableCors({
    origin: '*', // Adjust for production environments
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Prefix for all routes
  app.setGlobalPrefix('service');
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}