import {
  CreateUserOutboundInputDto,
  CreateUserOutboundOutputDto,
  CreateUserOutboundPort,
} from '../oubound-port/create-user.outbound-port';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

    // TODO try-catch 추가
    const result = await this.userRepository.save(userCreation);

    // TODO output 제대로 추가
    return Promise.resolve(new CreateUserOutboundOutputDto());
  }
}
