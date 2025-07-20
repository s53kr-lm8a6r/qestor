import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get configuration from environment variables
  const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000',
  ];
  const apiPort = parseInt(process.env.API_PORT || '3001', 10);
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Enable CORS for Next.js frontend
  app.enableCors({
    origin: nodeEnv === 'production' ? corsOrigins : corsOrigins,
    credentials: true,
  });

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  await app.listen(apiPort);
  console.log(`API is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${nodeEnv}`);
  console.log(`CORS Origins: ${corsOrigins.join(', ')}`);
}
bootstrap();
