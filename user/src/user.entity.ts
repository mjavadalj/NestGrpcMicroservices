import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
enum UserType {
  NORMAL = 'normal',
  VIP = 'vip',
}
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  @Index({ unique: true }) //TODO: check the dup keys other place
  username: string;

  @ApiProperty({
    description: 'The type of user',
    default: 'normal',
    enum: ['normal', 'vip'],
  })
  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.NORMAL,
  })
  // @ApiProperty({ example: "vip", description: 'The type of the user' }) //TODO: the entity must be in entity folder i think
  type: UserType;

  @Column()
  salt: string;

  @Column('simple-array', { nullable: true })
  comments: string[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
