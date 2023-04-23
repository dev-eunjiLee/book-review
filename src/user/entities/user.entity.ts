import { Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';

export class User extends CommonEntity {
  @Column()
  @Field(() => String)
  @IsString()
  nickname: string;

  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  id: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;
}
