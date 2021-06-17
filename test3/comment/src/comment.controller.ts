import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  ClientProxy,
  GrpcMethod,
} from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @GrpcMethod('ProductController', 'AddComment')
  async addComment(
    comment: Comment,
    metadata: Metadata,
    call: ServerUnaryCall<any>,
  ) {
    console.log('adding comment: ', { comment });
    return this.commentService.addComment(comment);
  }
  @Get('/test')
  async test() {
    return 'ok';
  }
}
