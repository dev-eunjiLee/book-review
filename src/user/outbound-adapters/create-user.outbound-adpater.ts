import {
  CreateUserOutboundInputDto,
  CreateUserOutboundOutputDto,
  CreateUserOutboundPort,
} from '../oubound-port/create-user.outbound-port';
import { Injectable } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class CreateUserOutboundAdapter implements CreateUserOutboundPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    param: CreateUserOutboundInputDto,
  ): Promise<CreateUserOutboundOutputDto> {
    console.log(param);

    const userCreation = await this.userRepository.create(param);

    let user: User;
    try {
      user = await this.userRepository.save<User>(userCreation);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ('code' in error) {
          const code = error.code;
          if (code === 'ER_DUP_ENTRY') {
            throw new GraphQLError('Duplication');
          }
        }
      }
      throw new GraphQLError(error);
    }
    // TODO output 제대로 추가
    return { ok: true };
  }
}
