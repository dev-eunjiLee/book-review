import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  ReadUserInboundPortInputDto,
  ReadUserInboundPortOutputDto,
} from '../inbound-ports/read-user.inbound-port';

@Resolver()
export class ReadUserResolver {
  @Query(() => ReadUserInboundPortOutputDto)
  async readUser(
    @Args('input') readUserInboundInputDto: ReadUserInboundPortInputDto,
  ): Promise<ReadUserInboundPortOutputDto> {
    return Promise.resolve(new ReadUserInboundPortOutputDto());
  }
}
