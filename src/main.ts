import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MqttOptions, Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  app.connectMicroservice<MqttOptions>({
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${configService.get('MQTT_HOST')}:${configService.get(
        'MQTT_PORT',
      )}`,
      // username: configService.get('MQTT_USERNAME'),
      // password: configService.get('MQTT_PASSWORD'),
      subscribeOptions: {
        qos: 1,
      },
    },
  });

  app.setGlobalPrefix('/api/periodic');

  const config = new DocumentBuilder()
    .setTitle('Periodic')
    .setDescription('This for periodic api operations')
    .setVersion('1.0')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.startAllMicroservices();
  await app.listen(configService.get('PERIODIC_PORT'), '0.0.0.0');
}
bootstrap();
