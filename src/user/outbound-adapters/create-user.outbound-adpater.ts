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
import { CustomGraphQLError } from '../../common/common.graphql.error';

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
      // TODO 로그 공통으로 셋팅할 방법 확인하기
      console.error(error);
      // TODO Graphql에러 처리 로직 확인하기
      if (error instanceof QueryFailedError) {
        if ('code' in error) {
          const code = error.code;
          if (code === 'ER_DUP_ENTRY') {
            throw new CustomGraphQLError({
              message: 'Duplication',
              requestId: param.requestId,
            });
          } else if (code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            // param example: 'ㅓㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍhi3333'
            throw new GraphQLError('부정확한 필드');
          }
        }
      }
      throw new GraphQLError(error, {
        extensions: {
          requestId: param.requestId,
        },
      });
    }
    // TODO output 제대로 추가
    return { ok: true, user, requestId: param.requestId };
  }
}
