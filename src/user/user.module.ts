import { Module } from '@nestjs/common';
import { CREATE_USER_INBOUND_PORT } from './inbound-ports/create-user.inbound-port';
import { CreateUserService } from './services/create-user.service';
import { CreateUserResolver } from './resolvers/create-user.resolver';
import { ReadUserResolver } from './resolvers/read-user.resolver';

@Module({
  providers: [
    // services implemented by interfaces
    {
      provide: CREATE_USER_INBOUND_PORT,
      useClass: CreateUserService,
    },

    // resolvers
    CreateUserResolver,
    ReadUserResolver,
  ],
})
export class UserModule {}
