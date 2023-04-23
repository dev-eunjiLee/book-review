import {
  CreateUserOutboundInputDto,
  CreateUserOutboundOutputDto,
  CreateUserOutboundPort,
} from '../oubound-port/create-user.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserOutboundAdapter implements CreateUserOutboundPort {
  execute(
    param: CreateUserOutboundInputDto,
  ): Promise<CreateUserOutboundOutputDto> {
    console.log(param);
    return Promise.resolve(new CreateUserOutboundOutputDto());
  }
}
