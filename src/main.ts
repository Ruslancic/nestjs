import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(PORT);
  console.info('SERVER IS RUNNING ON PORT', PORT);
}
bootstrap();
