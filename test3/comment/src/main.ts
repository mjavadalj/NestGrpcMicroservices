import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ServerCredentials } from 'grpc';
var protoLoader = require('@grpc/proto-loader');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, '../../../proto/product.proto'),
       url: 'localhost:5001',
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(1008);
}
bootstrap();
