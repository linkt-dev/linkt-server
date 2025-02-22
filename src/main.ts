import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log'],
  });
  const config = new DocumentBuilder()
    .setTitle('Linkt API')
    .setDescription('Linkt API description')
    .setVersion('1.0')
    .build();

  const corsOptions: CorsOptions = {
    credentials: true,
    origin: ['https://www.linkt.one', 'http://localhost:3000', 'https://localhost:3000'],
  };

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsOptions);
  app.use(cookieParser());

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.setGlobalPrefix('/api/v1');
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
