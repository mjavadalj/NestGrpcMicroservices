import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [],
})
export class CommentModule {}
