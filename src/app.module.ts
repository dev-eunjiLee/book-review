import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // * util
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // code first 방식을 사용할 예정이기 때문에 자동으로 스키마 파일을 생성해서 등록할 수 있도록 옵션 설정
      autoSchemaFile: true,
    }),
    // * service
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
