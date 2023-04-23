import { Module } from '@nestjs/common';
import { CREATE_USER_INBOUND_PORT } from './inbound-ports/create-user.inbound-port';
import { CreateUserService } from './services/create-user.service';
import { CreateUserResolver } from './resolvers/create-user.resolver';
import { ReadUserResolver } from './resolvers/read-user.resolver';
import { CREATE_USER_OUTBOUND_PORT } from './oubound-port/create-user.outbound-port';
import { CreateUserOutboundAdapter } from './outbound-adapters/create-user.outbound-adpater';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    // services implemented by interfaces
    {
      provide: CREATE_USER_INBOUND_PORT,
      useClass: CreateUserService,
    },
    {
      provide: CREATE_USER_OUTBOUND_PORT,
      useClass: CreateUserOutboundAdapter,
    },

    // resolvers
    CreateUserResolver,
    ReadUserResolver,
  ],
})
export class UserModule {}
