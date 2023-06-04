import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ChatGPTService } from './chatgpt.service';
import { OPENAI } from './token';

export type ChatGPTConfig = {
  apiKey: string;
};

@Module({})
export class ChatGptModule {
  static forRoot(config: ChatGPTConfig): DynamicModule {
    const openAIAPI = new OpenAIApi(new Configuration(config));

    return {
      module: ChatGptModule,
      providers: [
        {
          provide: OPENAI,
          useValue: openAIAPI,
        },
        ChatGPTService,
      ],
      exports: [ChatGPTService],
    };
  }
}
