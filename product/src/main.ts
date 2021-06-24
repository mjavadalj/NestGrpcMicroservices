import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ServerCredentials } from 'grpc';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
var protoLoader = require('@grpc/proto-loader');

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(1007);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'product',
  //       protoPath: join(__dirname, '../../../proto/product.proto'),
  //       credentials: ServerCredentials.createInsecure(),
  //       url: '0.0.0.0:1007',
  //     },
  //   },
  // );

  // const app = await NestFactory.create(AppModule);
  // const microservice = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'product',
  //     protoPath: join(__dirname, 'proto/product.proto'),
  //     url: 'localhost:3000',
  //   },
  // });
  // // app.enableCors();
  // await app.startAllMicroservicesAsync();

  // await app.listen(1007);

  // console.log(`Application is running on: ${await app.getUrl()}`);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'producta_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );
  // app.listen(() => {
  //   console.log('listening');
  // });

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [
  //         'amqps://tcdltebj:8Ah0V7NsboDCyyo6RyYkhSzNMU0c9ptu@snake.rmq2.cloudamqp.com/tcdltebj',
  //       ],
  //       queue: 'products_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );
  // app.listen(() => {
  //   console.log('listening');
  // });

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, '../../proto/product.proto'),
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);

  await app.startAllMicroservicesAsync();
  await app.listen(1007);

  // const app = await NestFactory.create(AppModule);
  // const microservice = app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       'amqps://tcdltebj:8Ah0V7NsboDCyyo6RyYkhSzNMU0c9ptu@snake.rmq2.cloudamqp.com/tcdltebj',
  //     ],
  //     queue: 'products_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservicesAsync();
  // await app.listen(1007);
}
bootstrap();
