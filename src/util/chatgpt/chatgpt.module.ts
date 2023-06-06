import { DynamicModule, Global, Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ChatGPTService } from './chatgpt.service';
import { CHATGPT_MODULE_CONFIG, OPENAI } from './token';
import { TypeChatGPTConfig } from './types';

@Global()
@Module({})
export class ChatGPTModule {
  static forRootAsync(options: {
    inject: Array<any>;
    useFactory: any;
  }): DynamicModule {
    return {
      module: ChatGPTModule,
      providers: [
        {
          provide: CHATGPT_MODULE_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        {
          provide: OPENAI,
          useFactory: (config: TypeChatGPTConfig) => {
            console.log(config);
            return new OpenAIApi(new Configuration(config));
          },
          inject: [CHATGPT_MODULE_CONFIG],
        },
        ChatGPTService,
      ],
      exports: [ChatGPTService],
    };
  }
}
