import {
  CreateUserInboundPort,
  CreateUserInboundPortInputDto,
  CreateUserInboundPortOutputDto,
} from '../inbound-ports/create-user.inbound-port';
import { Inject, Injectable } from '@nestjs/common';
import {
  CREATE_USER_OUTBOUND_PORT,
  CreateUserOutboundPort,
} from '../oubound-port/create-user.outbound-port';

@Injectable()
export class CreateUserService implements CreateUserInboundPort {
  constructor(
    @Inject(CREATE_USER_OUTBOUND_PORT)
    private readonly createUserOutboundAdapter: CreateUserOutboundPort,
  ) {}

  async execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto> {
    console.log(params);
    return await this.createUserOutboundAdapter.execute(params);
  }
}
