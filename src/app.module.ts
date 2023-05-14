import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { LoggerMiddleware } from './util/LoggerMiddleware';
import { myPlugin } from './util/logger/logPlugin';

@Module({
  imports: [
    // * util
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // code first 방식을 사용할 예정이기 때문에 자동으로 스키마 파일을 생성해서 등록할 수 있도록 옵션 설정
      autoSchemaFile: true,
      // 에러를 어느 정도 선으로 전달할지
      includeStacktraceInErrorResponses: false,
      // * ===== 로그 ===== * //
      plugins: [myPlugin],
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
        entities: [User],
      }),
    }),
    // * service
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // TODO gql 방식에는 맞지 않는 로그라 새로 구현 필요
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
