export type ChatGPTRequestMessageType = {
  role: 'system' | 'user';
  content: string;
};

export type CreateChatGPTRequestMessageInputType = {
  [key: string]: any;
};
