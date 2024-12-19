import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Linkt API')
    .setDescription('Linkt API description')
    .setVersion('1.0')
    .build();

  const corsOptions: CorsOptions = {
    credentials: true,
    origin: 'https://linkt.one',
  };

  app.enableCors(corsOptions);
  app.use(cookieParser());

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}
bootstrap();
