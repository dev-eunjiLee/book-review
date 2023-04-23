import { Field, InputType, ObjectType } from '@nestjs/graphql';

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
export class CreateUserInboundPortOutputDto {
  @Field(() => Boolean)
  ok: boolean;
}

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}
