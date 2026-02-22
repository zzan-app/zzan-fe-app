import Constants from 'expo-constants';
import type { ChatApiResponse, ChatRequest } from '../model/chatApiModel';

const getChatBotBaseUrl = (): string => {
  const baseUrl = Constants.expoConfig?.extra?.chatApiUrl;
  if (!baseUrl) {
    throw new Error('EXPO_PUBLIC_CHATBOT_URL is not configured');
  }
  return baseUrl;
};

export const chatApi = {
  async sendMessage(request: ChatRequest): Promise<ChatApiResponse> {
    const baseUrl = getChatBotBaseUrl();

    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },
};
