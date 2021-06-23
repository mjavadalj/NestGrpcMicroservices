import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'testSecret123',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    // ClientsModule.register([
    //   {
    //     name: 'PRODUCT_SERVICE',
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
    // ]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '../../proto/product.proto'),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'COMMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '../../proto/product.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
