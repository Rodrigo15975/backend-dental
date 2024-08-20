import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  // Habilitar el rawBody para stripe
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: true,
  });
  const port = process.env.PORT || 5000;
  app.use(cookie());
  // configurar enableCors
  app.enableCors({
    // tienes que poner credentials, para que reciba del front
    credentials: true,
    origin: 'http://localhost:5173',
    // [
    // 'http://localhost:8081',
    // 'http://192.168.1.6:8081',
    // ],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
