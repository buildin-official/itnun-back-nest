import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setting } from './setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(setting.was.port);
}

bootstrap();
