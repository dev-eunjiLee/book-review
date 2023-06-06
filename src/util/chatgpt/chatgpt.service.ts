import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { CHATGPT_MODULE_CONFIG, OPENAI } from './token';
import {
  ChatGPTRequestMessageType,
  CreateChatGPTRequestMessageInputType,
} from './types/chatgpt.type';

@Injectable()
export class ChatGPTService {
  constructor(
    @Inject(OPENAI)
    private readonly openai: OpenAIApi,
    @Inject(CHATGPT_MODULE_CONFIG)
    private readonly config: any,
  ) {
    console.log('🚀🚀🚀🚀', config);
    console.log('🚀🚀🚀🚀', openai);
  }

  createChatGPTMEssage(
    input: CreateChatGPTRequestMessageInputType,
  ): ChatGPTRequestMessageType[] {
    console.log(input);

    return [
      {
        role: 'system',
        content: 'You are book specialist',
      },
      {
        role: 'user',
        content: `
          I want to get book list you recommend by my book list.
          My book list is "해리포터", "셜록홈즈", "용의자 X의 헌신".
          My requirements like this.
          1. Your answer keys must be "title", "author", "publishing company", "ISBN code in Korea"
          2. Your answer values must be Korean
        `,
      },
    ];
  }

  async request(prompt: string): Promise<any> {
    console.log(prompt);
    let result;
    try {
      result = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are book specialist',
          },
          {
            role: 'user',
            content: `
              I want to get book list you recommend by my book list.
              My book list is "해리포터", "셜록홈즈", "용의자 X의 헌신".
              My requirements like this.
              1. Your answer keys must be "title", "author", "publishing company", "ISBN code in Korea"
              2. Your answer values must be Korean
            `,
          },
        ],
      });
      const content = result?.data?.choices?.[0]?.message?.content;
      console.log(content);
    } catch (e) {
      console.error(e);
    }
    console.log(result);
    return result;
  }
}
