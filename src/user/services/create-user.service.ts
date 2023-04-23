import {
  CreateUserInboundPort,
  CreateUserInboundPortInputDto,
  CreateUserInboundPortOutputDto,
} from '../inbound-ports/create-user.inbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService implements CreateUserInboundPort {
  async execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto> {
    console.log(params);
    return Promise.resolve(new CreateUserInboundPortOutputDto());
  }
}
