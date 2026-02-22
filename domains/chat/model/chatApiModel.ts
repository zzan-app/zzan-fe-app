export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  query: string;
  history: ChatHistoryItem[];
}

export interface LiquorSource {
  id: string;
  name: string;
  type: string;
  alcohol: string;
  volume: string;
  brewery: string;
  image_url: string;
  score?: number;
}

export interface ChatApiResponse {
  answer: string;
  sources: LiquorSource[];
  suggested_questions: string[];
}
