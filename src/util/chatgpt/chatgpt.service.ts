import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { CHATGPT_MODULE_CONFIG, OPENAI } from './token';

@Injectable()
export class ChatGPTService {
  constructor(
    @Inject(OPENAI)
    private readonly openai: OpenAIApi,
    @Inject(CHATGPT_MODULE_CONFIG)
    private readonly config: any,
  ) {
    console.log(config);
    console.log(openai);
  }
}
