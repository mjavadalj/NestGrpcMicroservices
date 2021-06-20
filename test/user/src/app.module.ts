import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { credentials } from 'grpc';
import { join } from 'path';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // MongooseModule.forRoot('mongodb://localhost/ecomnestmicro'),
    UserModule,
    // ClientsModule.register([
    //   {
    //     name: 'PRODUCT_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'product',
    //       protoPath: join(__dirname, '../../../proto/product.proto'),
    //       credentials: credentials.createInsecure(),
    //       url: '0.0.0.0:1007',
    //     },
    //   },
    // ]),
    // ClientsModule.register([
    //   {
    //     name: 'PRODUCT_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'products_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
