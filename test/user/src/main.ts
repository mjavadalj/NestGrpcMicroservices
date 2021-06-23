import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { microserviceOptions } from './grpc.options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // const config = new DocumentBuilder()
  //   .setTitle('Users')
  //   .setDescription('The users API description')
  //   .setVersion('1.0')
  //   .addTag('users')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  // await app.listen(3000);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'product',
  //       protoPath: join(__dirname, '../src/proto/product.proto'),
  //     },
  //   },
  // );

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'product',
  //       protoPath: join(__dirname, '../src/proto/product.proto'),
  //       url: 'localhost:3000',
  //     },
  //   },
  // );
  // await app.listen(() => {
  //   console.log('user service has started');
  // });

  // const app = await NestFactory.create(AppModule);
  // const microservice = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'product',
  //     protoPath: join(__dirname, '../src/proto/product.proto'),
  //   },
  // });
  // app.enableCors();
  // await app.startAllMicroservicesAsync();
  // await app.listen(3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(microserviceOptions);

  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [
  //         'amqps://tcdltebj:8Ah0V7NsboDCyyo6RyYkhSzNMU0c9ptu@snake.rmq2.cloudamqp.com/tcdltebj',
  //       ],
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
}
bootstrap();
