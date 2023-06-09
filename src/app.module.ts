import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ReviewModule } from './review/review.module';
import { BookModule } from './book/book.module';
import { Book } from './book/types/entities/book.entity';
import { ChatGPTModule } from './util/chatgpt/chatgpt.module';

@Module({
  imports: [
    // * util
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // code first 방식을 사용할 예정이기 때문에 자동으로 스키마 파일을 생성해서 등록할 수 있도록 옵션 설정
      autoSchemaFile: true,
      // 에러를 어느 정도 선으로 전달할지
      includeStacktraceInErrorResponses: false,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      /**
       * AppModule 에서 셋팅한 ConfigModule 을 사용하기 위해 forRootAsync 로 셋팅함
       * 그리고 그 내부에서 ConfigService를 사용하기 위해 ConfigService 를 inject 처리
       */

      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DB'),
        synchronize: true,
        entities: [User, Book],
      }),
    }),
    // * chatGPT
    ChatGPTModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get<string>('CHATGPT_API_KEY') as string,
      }),
    }),
    // * service
    UserModule,
    ReviewModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
