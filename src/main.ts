import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();
//setting up mixpanel
const mixpanel = require('mixpanel');
export const panel = mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN, { protocol: 'http' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //to make sure DTO validation is working
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
