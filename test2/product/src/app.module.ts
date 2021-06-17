import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './product.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
