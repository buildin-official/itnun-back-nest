import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setting } from './setting';
import { winstonLogger } from './utils/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(setting.was.port);
}

bootstrap();
