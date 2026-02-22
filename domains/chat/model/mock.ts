import type { ChatResponse } from "./chatModel";

export const MOCK_CHAT_RESPONSE: ChatResponse = {
  message: "기본 답변",
  timestamp: Date.now(),
};

export const getMockChatResponse = (userMessage: string): ChatResponse => {
  return {
    message: `응답: ${userMessage}`,
    timestamp: Date.now(),
  };
};
