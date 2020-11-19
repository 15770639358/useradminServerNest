import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {LoginJwtMiddleware} from './middleware/auth_vetify/loginJwt'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoginJwtMiddleware)
  await app.listen(3000);
}
bootstrap();
