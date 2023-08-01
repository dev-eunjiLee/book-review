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
}
