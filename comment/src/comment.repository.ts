import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async addComment({ text, user ,productName}): Promise<Comment> {
    const comment = new Comment();
    comment.text = text;
    comment.user = user;
    comment.productName = productName;
    comment.save();
    return comment;
  }
}
