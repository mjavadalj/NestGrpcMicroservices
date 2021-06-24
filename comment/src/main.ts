import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ServerCredentials } from 'grpc';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
var protoLoader = require('@grpc/proto-loader');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, '../../proto/product.proto'),
      url: 'localhost:5001',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Comments')
    .setDescription('The comments API description')
    .setVersion('1.0')
    .addTag('comments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);

  await app.startAllMicroservicesAsync();
  await app.listen(1008);
}
bootstrap();
