import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
