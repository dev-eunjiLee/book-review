import {
  CreateUserInboundPortInputDto,
  CreateUserInboundPortOutputDto,
} from '../inbound-ports/create-user.inbound-port';

export const CREATE_USER_OUTBOUND_PORT = 'CREATE_USER_OUTBOUND_PORT';

export type CreateUserOutboundInputDto = CreateUserInboundPortInputDto;
export class CreateUserOutboundOutputDto extends CreateUserInboundPortOutputDto {}

export interface CreateUserOutboundPort {
  execute(
    param: CreateUserOutboundInputDto,
  ): Promise<CreateUserOutboundOutputDto>;
}
