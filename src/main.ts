import { createMicroserviceOptions } from '@aimeter/aimeter-backend-library';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MqttOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );

  const configService = app.get(ConfigService);

  app.connectMicroservice<MqttOptions>(
    createMicroserviceOptions('PERIODIC', {
      url: configService.get('MQTT_URL'),
      username: configService.get('MQTT_USERNAME'),
      password: configService.get('MQTT_PASSWORD'),
    }),
  );

  app.setGlobalPrefix('/api/periodic');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.startAllMicroservices();
  await app.listen(configService.get('PERIODIC_PORT'), '0.0.0.0');
}
bootstrap();
