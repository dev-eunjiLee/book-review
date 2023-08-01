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
          Please recommend books that I would like using the book list I gave you.
          My book list is ${input.bookList}.
          Return the answer as a JSON object with key "title", "author", "publishing_company", "ISBN_code" and value in Korean.
          And I want to except served my book list
        `,
      },
    ];
  }

  async request(message: ChatGPTRequestMessageType[]): Promise<any> {
    console.log(message);
    let content: string;
    try {
      const result = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: message,
      });
      content = result?.data?.choices?.[0]?.message?.content as string;
    } catch (e) {
      console.error(e);
      throw e;
    }

    return content;
  }
}
