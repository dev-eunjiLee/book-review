import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonOutputDto } from '../../common/common.output.dto';

export const CREATE_USER_INBOUND_PORT = 'CREATE_USER_INBOUND_PORT';

@InputType()
export class CreateUserInboundPortInputDto {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  id: string;

  @Field(() => String)
  password: string;
}

// TODO: CreateUserInboundPortOutputDto 완성
@ObjectType()
export class CreateUserInboundPortOutputDto extends CommonOutputDto {}

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}
