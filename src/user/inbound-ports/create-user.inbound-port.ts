import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { CommonOutputDto } from '../../common/common.output.dto';
import { User } from '../entities/user.entity';
import { CommonDto } from '../../common/common.dto';

export const CREATE_USER_INBOUND_PORT = 'CREATE_USER_INBOUND_PORT';

@InputType()
export class CreateUserInboundPortInputDto extends IntersectionType(
  PickType<User, keyof User>(User, ['id', 'nickname', 'password']),
  CommonDto,
) {}

// TODO: CreateUserInboundPortOutputDto 완성
@ObjectType()
export class CreateUserInboundPortOutputDto extends CommonOutputDto {
  @Field(() => User, { nullable: true })
  user?: User;
}

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}
