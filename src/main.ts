import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";
import * as config from 'config';


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port: number = serverConfig.port;
  await app.listen(port);
  logger.log(`Application start : http://localhost:${port}`)
}
bootstrap();
