import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {
  CREATE_USER_INBOUND_PORT,
  CreateUserInboundPort,
  CreateUserInboundPortInputDto,
  CreateUserInboundPortOutputDto,
} from '../inbound-ports/create-user.inbound-port';

@Resolver()
export class CreateUserResolver {
  constructor(
    @Inject(CREATE_USER_INBOUND_PORT)
    private readonly createUserService: CreateUserInboundPort,
  ) {}

  @Mutation(() => CreateUserInboundPortOutputDto)
  async createUser(
    @Args('input') createUserInputDto: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto> {
    return await this.createUserService.execute(createUserInputDto);
  }

  // TODO: 실제 필요한 query 생성하고 나면 삭제 필요(최소 1개 이상의 query가 있어야 autoSchema가 정상 동작해서 임시로 넣어둠)
  @Query(() => CreateUserInboundPortOutputDto)
  async getUser(
    @Args('input') createUserInputDto: CreateUserInboundPortInputDto,
  ) {
    return null;
  }
}
