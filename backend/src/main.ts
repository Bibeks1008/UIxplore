import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ['http://localhost:5173', 'https://uixplore.netlify.app'];

  // Enable CORS with dynamic origin handling
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests without an origin (e.g., server-to-server communication)
        callback(null, true);
        return;
      }
      if (whitelist.includes(origin)) {
        console.log('Allowed CORS for:', origin);
        callback(null, true);
      } else {
        console.log('Blocked CORS for:', origin);
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(8080);
}
bootstrap();
