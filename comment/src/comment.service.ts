import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  async addComment({ text, user,productName }): Promise<Comment> {
    return this.commentRepository.addComment({ text, user,productName });
  }
}
