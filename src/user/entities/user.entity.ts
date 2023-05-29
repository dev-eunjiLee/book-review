import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';

@Entity('User')
@InputType('UserInputType')
@ObjectType()
export class User extends CommonEntity {
  @Column()
  @Field(() => String)
  @IsString()
  nickname: string;

  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;
}
