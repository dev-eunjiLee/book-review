import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { CommonOutputDto } from '../../common/common.output.dto';

export const READ_USER_INBOUND_PORT = 'READ_USER_INBOUND_PORT';

@InputType()
export class ReadUserInboundPortInputDto {
  @Field(() => Boolean, { description: '전체 데이터를 원할 경우 true' })
  @IsBoolean()
  all: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  userId?: string;
}

@ObjectType()
export class ReadUserInboundPortOutputDto extends CommonOutputDto {}

export interface ReadUserInboundPort {
  execute(
    params: ReadUserInboundPortInputDto,
  ): Promise<ReadUserInboundPortOutputDto>;
}
